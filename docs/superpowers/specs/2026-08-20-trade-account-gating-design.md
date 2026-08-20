# Trade account gating — design

**Date:** 2026-08-20
**Status:** Approved, not yet implemented
**Files affected:** `site/roomplanner/` (new signup/login UI + gating logic), new Netlify Functions, new Netlify DB table. No changes to `site/index.html` or the landing page.

## Problem

The room planner's Trade/Homeowner toggle (`site/roomplanner/js/app.js`) is
purely client-side and unauthenticated today. `state.mode` lives in
`localStorage` (key `kerf.v2`); any visitor can click "Trade" in the header
and instantly get 22% off list price (`SETTINGS.tradeDiscount` in
`site/roomplanner/js/data.js`), ex-GST, with zero verification. `isTrade()`
gates dozens of pricing/display call sites across `app.js` and
`pricing.js`, but nothing gates `isTrade()` itself.

The user's requirement: trade pricing must only be reachable by someone who
filled out a business-details questionnaire and has a real account. This
must be invisible to retail customers — they should never see a path to
trade pricing at all, not just be told no.

## Constraint carried over from the landing page's own rules

Same data-integrity posture as `BILT_STUDIO_HANDOFF.md`: don't fabricate
review counts, approval processes, or security guarantees the build doesn't
actually provide. Specifically or scope was deliberately narrowed during
brainstorming and must be represented honestly:

- **This is a UI-only gate, not a pricing-security fix.** The 22% discount
  and the pricing formula remain present in the publicly shipped JS bundle,
  exactly as they are today. Logging in unlocks the *toggle*, not a
  server-computed price. A sufficiently determined person reading the
  bundle's source could still find the trade discount rate. This was an
  explicit, informed trade-off the user chose (over moving pricing
  calculation server-side) to keep scope proportionate. Do not describe
  this feature as "trade pricing is now secure" anywhere in copy or code
  comments — describe it accurately as gating the toggle's visibility and
  reachability behind a real login.
- **No phone/SMS verification.** Originally requested, then explicitly
  dropped by the user once the recurring per-signup/per-login SMS cost was
  raised. Phone number is still a signup field, just unverified.
- **No manual review queue.** Signup auto-activates the account
  immediately — this was explicit from the user's first message ("it will
  be automatically made where they can log in").

## Architecture

**Platform: Netlify** (Functions + Netlify DB). Chosen because nothing is
deployed live yet (confirmed with the user), and this environment already
has Netlify Database/Netlify Functions tooling set up — no new provider
account or config needed. `site/vercel.json` remains in the repo for
static hosting only; trade accounts are a Netlify-only capability and the
room planner must degrade to "Trade login unavailable" (not crash) if the
Netlify Functions endpoints are unreachable — e.g. someone previews the
static files without Netlify's function runtime.

Three Netlify Functions, all under `site/netlify/functions/`:

1. **`trade-signup`** — POST, takes the questionnaire fields, validates
   them server-side, hashes the password (bcrypt), inserts a row into
   `trade_accounts`, and returns a signed session token. The account is
   active immediately — no separate "activate" step.
2. **`trade-login`** — POST, takes email + password, looks up the account,
   verifies the password hash, returns a signed session token on success
   or a generic "invalid email or password" error on failure (never reveal
   whether the email exists — standard login-enumeration hygiene, not
   scope creep, since it's the same amount of code either way).
3. **`trade-session`** — POST, takes a token, verifies its signature and
   expiry, returns `{ valid: true, businessName }` or `{ valid: false }`.
   Called once when the room planner loads.

Sessions are **stateless JWTs** — no session table. Signed with a secret
held in a Netlify environment variable (`TRADE_SESSION_SECRET`), 30-day
expiry. The token is stored in the browser's `localStorage` (alongside the
existing `kerf.v2` planner state) under a new key, `bilt.trade.session`.
Logging out simply clears that key client-side — no server-side
invalidation needed for a JWT-based scheme at this scope.

## Data model

One table, `trade_accounts`, in Netlify DB (Postgres):

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, primary key | |
| `business_name` | text, not null | |
| `abn` | text, not null | Stored as submitted. Not validated against the official ABN Lookup registry — out of scope; format-checked only (11 digits). |
| `website` | text, nullable | Not all trades have one. |
| `address` | text, not null | Single free-text field, not structured street/suburb/postcode — matches the low-friction intent from brainstorming. |
| `phone` | text, not null | Unverified, per the dropped-SMS decision above. |
| `email` | text, not null, unique | Also the login identifier. |
| `password_hash` | text, not null | bcrypt, cost factor 10. |
| `trade_type` | text, not null | One of: `builder`, `cabinetmaker`, `renovator`, `other`. |
| `years_in_business` | integer, not null | |
| `kitchens_per_year` | integer, not null | Rough estimate, not audited. |
| `created_at` | timestamptz, not null, default now() | |

No `approved` or `status` column — deliberately omitted, since there is no
review step to track.

## Signup flow (questionnaire)

New route inside the room planner app: `#/trade-signup`. A single-page
form (matching the app's existing `pl-*` component style, not a new visual
language) with all ten fields from the data model above (`id`/`created_at`
excluded, obviously), client-side validated for required fields and basic
format (email shape, ABN digit count), then POSTed to `trade-signup`.

On success: the returned session token is stored, and the user lands
straight in the planner with `state.mode = 'trade'` — no separate "check
your email" step, since there is no email verification.

On failure (e.g. duplicate email): the form shows the server's error
inline and does not create a duplicate account.

## Login flow

New route `#/trade-login`: email + password fields, "Log in" button, and a
"New trade account? Sign up" link to `#/trade-signup`. POSTs to
`trade-login`. On success, stores the token and switches to trade mode,
same as signup's success path. On failure, shows the generic invalid-
credentials message.

## Gating the header toggle

Today (`app.js`, function that renders the header, around the `data-act="mode"`
buttons): the Trade/Homeowner toggle always renders.

New behavior: on app init, if `bilt.trade.session` exists in
`localStorage`, call `trade-session` to verify it.

- **Valid session:** render the toggle exactly as today, default to
  `state.mode = 'trade'`, and make the business name available (e.g. in
  the existing account-ish area of the UI) so a logged-in tradesperson can
  see which account they're in.
- **No session, or session invalid/expired:** do not render the toggle at
  all. Render a single "Trade login" button in its place, linking to
  `#/trade-login`. `state.mode` is forced to `'homeowner'` and the
  `isTrade()` codepaths are therefore unreachable through the UI — a
  retail visitor has no control that could ever set `state.mode` to
  `'trade'`.
- **Invalid/expired token found:** clear `bilt.trade.session` and fall
  through to the "no session" case above, rather than erroring.

This is the entire gating mechanism. No changes to `pricing.js`, no
changes to any of the dozens of existing `isTrade()` call sites — they
already do the right thing once `state.mode` can no longer be attacker-
controlled through the UI.

## Error handling

- Netlify Functions unreachable (e.g. static-only preview): the "Trade
  login" button still renders, but attempting to log in or sign up shows
  "Trade accounts aren't available in this preview" rather than a raw
  network error or a silent hang.
- Duplicate ABN: not blocked — multiple accounts could plausibly share an
  ABN (e.g. two staff at the same business signing up separately). Only
  email is unique.
- Password requirements: minimum 8 characters, checked client-side before
  submit and re-checked server-side (never trust client validation alone).

## Testing / verification

This codebase has no test runner (confirmed in the landing-page work).
Verification is manual/browser-based against the deployed Netlify
Functions (Netlify dev server locally, or Netlify's own preview
deploys) — signup a fresh account, confirm trade pricing appears
immediately with no separate activation step, log out, confirm the
toggle disappears and only "Trade login" shows, log back in, confirm
trade pricing returns.

## Out of scope

- Server-side pricing computation (see Constraint section above — this
  was a deliberate, informed choice to keep the UI-only gate).
- SMS/phone verification (explicitly dropped by the user).
- Manual account review/approval queue (explicitly not wanted).
- ABN validation against the Australian Business Register.
- Password reset / forgot-password flow — not raised by the user; flag as
  a follow-up if this ships and gets real signups, since accounts with no
  recovery path will eventually generate support requests.
- Rate limiting / throttling on `trade-login` — not implemented in this
  pass. Each login attempt runs a bcrypt cost-10 compare, a real CPU cost;
  without a limit an attacker (or a buggy client) can drive sustained
  compute load via repeated attempts. Flag as a follow-up alongside
  password reset above.
- Any change to the landing page (`site/index.html`) — this is entirely
  scoped to the room planner sub-app.
