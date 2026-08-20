# Trade Account Gating Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gatekeep the room planner's Trade/Homeowner pricing toggle behind a real signup/login flow, so the 22% trade discount is only reachable by someone who has created a trade account — retail visitors never see a path to it.

**Architecture:** Netlify Functions (TypeScript, modern `export default` + `Config` syntax) backed by Netlify Database (managed Postgres via Drizzle ORM). Three functions — `trade-signup`, `trade-login`, `trade-session` — share a bcrypt/JWT helper module. The room planner (`site/roomplanner/js/app.js`, a vanilla-JS ES-module SPA with a hash router) gets a new client-side auth module, two new routes (`#/trade-signup`, `#/trade-login`), and a change to its boot sequence and header rendering so the existing Trade/Homeowner toggle (`.seg` in `site/roomplanner/index.html`) only renders once a verified session exists — otherwise a single "Trade login" button renders in its place and `state.mode` is forced to `'retail'`.

**Tech Stack:** TypeScript (Netlify Functions), Drizzle ORM `@beta` + `@netlify/database` (Postgres), `bcryptjs` (password hashing), `jsonwebtoken` (session tokens). Client side stays plain JS/ES modules with inline-templated HTML strings, matching the existing `app.js` style exactly — no new frontend framework or build step.

## Global Constraints

- **This is a UI-only gate, not a pricing-security fix.** Do not move any pricing calculation (`site/roomplanner/js/pricing.js`) server-side. `SETTINGS.tradeDiscount` and every existing `isTrade()` call site stay exactly as they are. The only change is what controls whether the UI can ever set `state.mode = 'trade'`.
- **No SMS/phone verification.** Phone is a plain text field, collected but not verified. Do not integrate Twilio or any SMS provider.
- **No manual approval queue.** `trade-signup` creates and activates the account in one step — there is no `status`/`approved` column and no separate activation flow.
- **No password reset flow in this plan.** Explicitly deferred by the user to a later plan. Do not build a forgot-password route, but do not build anything that would make adding one later harder either (e.g. don't derive the password hash from anything unrecoverable-by-design beyond the hash itself, which bcrypt already is — this is a note for the future plan, not a constraint on this one).
- **`state.mode` values are `'trade'` and `'retail'`** (confirmed by reading `site/roomplanner/js/app.js:26` and `site/roomplanner/index.html:28` — NOT `'homeowner'`, despite the button's visible label being "Homeowner"). Use `'retail'` in all code, matching the existing codebase exactly.
- **Current default is unsafe and must change.** Today `state.mode` defaults to `'trade'` in both the initial state object (`app.js:26`) and `load()`'s fallback (`app.js:61`) — meaning a brand-new visitor with no localStorage history currently sees trade pricing by default, not just "anyone can click a toggle." This plan changes both defaults to `'retail'`.
- **Preview/local server:** `netlify dev` (not the existing `npx serve` static server used elsewhere in this project) is required for any task that touches a Function or the database, since `npx serve` cannot execute Netlify Functions. Run it from `site/` (where `netlify.toml` lives).
- **Netlify CLI version:** 26.0.0+ required for `netlify database` commands. If a `netlify database` subcommand is unrecognized, run `npm install -g netlify-cli@latest` first.
- **Do not set `config.path` to a Function's own default invocation path.** Discovered during Task 4: `netlify dev` (confirmed on netlify-cli 27.1.2) refuses to route requests to a Function whose `config.path` is identical to its default path (`/.netlify/functions/<filename>`) — every request gets a generic `405` instead of reaching the handler. Since none of these three Functions need a custom path (the default filename-based path is exactly what's wanted), `config` should declare only `method`, with no `path` key at all. (This correction was applied to Tasks 5 and 6 below after Task 4 hit it; Task 4's own file was already fixed directly.)
- **Drizzle insert errors from a unique-constraint violation put the actual Postgres message in `err.cause.message`, not `err.message`.** Discovered during Task 4: `err.message` on a thrown `DrizzleQueryError` is just `"Failed query: insert into ..."` — it never contains "unique"/"duplicate". Any code that needs to detect a duplicate-key error must check `err.cause?.message` (guarding that `cause` is an `Error`) in addition to `err.message`. This only affects Task 4 in this plan (no other task performs a duplicate-sensitive insert).
- **Never hand-run DDL or apply migrations to a hosted (preview/production) database.** Migration files are generated and committed; the Netlify deploy applies them. Only `netlify database migrations apply` (against the **local** dev database) is run directly, and only in Task 2.
- Spec source of truth: `site/docs/superpowers/specs/2026-08-20-trade-account-gating-design.md`. Field list, table shape, and out-of-scope items must match it exactly.

---

### Task 1: Manual prerequisite — link a Netlify site (user-performed, not automatable)

**Files:** none — this task produces no repo changes. It exists because every later task assumes a linked Netlify site and a provisioned database, and neither can be created from a non-interactive session (Netlify's login flow is an interactive OAuth browser flow).

**Interfaces:**
- Consumes: nothing.
- Produces: an authenticated, linked Netlify CLI session in `site/` (i.e. `netlify status` succeeds and shows a linked site) — every subsequent task's `netlify` commands depend on this.

- [ ] **Step 1: Confirm the Netlify CLI is installed and current**

Run: `netlify --version`
Expected: version `26.0.0` or higher. If the command is missing or older, run `npm install -g netlify-cli@latest` first.

- [ ] **Step 2: Log in**

Run (from anywhere): `netlify login`
This opens a browser for OAuth. A human must complete it — it cannot be scripted or run in a non-interactive session.

- [ ] **Step 3: Link or create the site**

From `site/`, run: `netlify init` (to create a new Netlify site for this repo) or `netlify link` (if a site already exists on Netlify for it).
Expected: `netlify status` afterward shows a linked site name, not "Not linked".

- [ ] **Step 4: Hand off**

Once linked, proceed to Task 2. Every command in Tasks 2–10 that starts with `netlify` assumes this step is already done.

---

### Task 2: Scaffold the database (schema, Drizzle client, first migration)

**Files:**
- Create: `site/package.json`
- Create: `site/db/schema.ts`
- Create: `site/db/index.ts`
- Create: `site/drizzle.config.ts`

**Interfaces:**
- Consumes: the linked Netlify site from Task 1.
- Produces: a `trade_accounts` Drizzle table (exported as `tradeAccounts` from `site/db/schema.ts`) and a configured `db` client (exported from `site/db/index.ts`) that Tasks 4–6's Functions import directly: `import { db } from "../../db/index.js"` and `import { tradeAccounts } from "../../db/schema.js"`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "bilt-studio-site",
  "private": true,
  "type": "module",
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "netlify database migrations apply"
  },
  "dependencies": {
    "@netlify/database": "^1.0.0",
    "drizzle-orm": "beta",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "drizzle-kit": "beta",
    "@netlify/functions": "^2.8.1",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^20.14.0",
    "typescript": "^5.5.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run (from `site/`): `npm install`
Expected: `node_modules/` created, no errors. If `drizzle-orm`/`drizzle-kit` resolve to a version without a `netlify-db` export, re-run `npm install drizzle-orm@beta drizzle-kit@beta` explicitly — the `beta` tag in `package.json` should already pull this, but confirm by running `npm ls drizzle-orm` and checking the installed version is the beta line (see Global Constraints in the design spec's parent skill: `drizzle-orm/netlify-db` only exists on `@beta`).

- [ ] **Step 3: Write the schema**

```typescript
// site/db/schema.ts
import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const tradeAccounts = pgTable("trade_accounts", {
  id: uuid().primaryKey(),
  businessName: text("business_name").notNull(),
  abn: text().notNull(),
  website: text(),
  address: text().notNull(),
  phone: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  tradeType: text("trade_type").notNull(),
  yearsInBusiness: integer("years_in_business").notNull(),
  kitchensPerYear: integer("kitchens_per_year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type TradeAccount = typeof tradeAccounts.$inferSelect;
export type NewTradeAccount = typeof tradeAccounts.$inferInsert;
```

Note: `id` has no database-generated default (no `gen_random_uuid()`) — it's supplied by the inserting code via Node's built-in `crypto.randomUUID()` (Task 4), which avoids depending on the `pgcrypto` extension being enabled.

- [ ] **Step 4: Write the Drizzle client**

```typescript
// site/db/index.ts
import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema.js";

export const db = drizzle({ schema });
```

- [ ] **Step 5: Write the Drizzle Kit config**

```typescript
// site/drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "netlify/database/migrations",
});
```

- [ ] **Step 6: Generate the first migration**

Run (from `site/`): `npm run db:generate`
Expected: a new file appears under `site/netlify/database/migrations/`. Open it and confirm it contains a single `CREATE TABLE "trade_accounts" (...)` statement matching the columns in Step 3.

- [ ] **Step 7: Apply it to the local dev database**

Run: `npm run db:migrate`
Expected: output confirms the migration applied with no errors. (This is the one command in this whole plan that applies a migration directly — it targets the local dev DB only, never a hosted one, per Global Constraints.)

- [ ] **Step 8: Commit**

```bash
cd "C:\Users\WIN10\Desktop\CLAUDE STORAGE\site"
git add package.json package-lock.json db/ drizzle.config.ts netlify/database/migrations/
git commit -m "Add trade_accounts schema and first migration"
```

---

### Task 3: Shared auth helpers (hashing + session tokens)

**Files:**
- Create: `site/netlify/functions/_shared/auth.ts`

**Interfaces:**
- Consumes: `process.env.TRADE_SESSION_SECRET` (set in Task 3's Step 4; consumed again by Tasks 4–6).
- Produces four exported functions that Tasks 4–6 import via `import { hashPassword, verifyPassword, signSession, verifySession } from "../_shared/auth.js"`:
  - `hashPassword(plain: string): Promise<string>`
  - `verifyPassword(plain: string, hash: string): Promise<boolean>`
  - `signSession(payload: { sub: string; businessName: string }): string`
  - `verifySession(token: string): { sub: string; businessName: string } | null`

- [ ] **Step 1: Write the helper module**

```typescript
// site/netlify/functions/_shared/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = () => {
  const s = Netlify.env.get("TRADE_SESSION_SECRET");
  if (!s) throw new Error("TRADE_SESSION_SECRET is not set");
  return s;
};

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export interface SessionPayload {
  sub: string;
  businessName: string;
}

export function signSession(payload: SessionPayload): string {
  return jwt.sign(payload, SECRET(), { expiresIn: "30d" });
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET());
    if (typeof decoded === "string") return null;
    const { sub, businessName } = decoded as Record<string, unknown>;
    if (typeof sub !== "string" || typeof businessName !== "string") return null;
    return { sub, businessName };
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Verify it type-checks**

Run (from `site/`): `npx tsc --noEmit netlify/functions/_shared/auth.ts --module esnext --moduleResolution bundler --target es2022 --skipLibCheck`
Expected: no output (no type errors). `Netlify` is a Netlify Functions global — if this specific invocation complains it's undeclared, that's expected outside the Netlify build/dev runtime and not a real error; the authoritative check is Task 4's `netlify dev` verification instead.

- [ ] **Step 3: Set the session secret locally**

Run: `netlify env:set TRADE_SESSION_SECRET "$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"`
Expected: confirmation the variable was set. This sets it for the linked Netlify site (available to `netlify dev` and deployed Functions alike) — it is not written to any file in the repo.

- [ ] **Step 4: Commit**

```bash
cd "C:\Users\WIN10\Desktop\CLAUDE STORAGE\site"
git add netlify/functions/_shared/auth.ts
git commit -m "Add password hashing and session token helpers"
```

---

### Task 4: `trade-signup` Function

**Files:**
- Create: `site/netlify/functions/trade-signup.ts`

**Interfaces:**
- Consumes: `db`/`tradeAccounts` from Task 2, `hashPassword`/`signSession` from Task 3.
- Produces: `POST /.netlify/functions/trade-signup`, consumed by the client module in Task 7. Request body (JSON): `{ businessName, abn, website, address, phone, email, password, tradeType, yearsInBusiness, kitchensPerYear }` (`website` optional, all others required). Success response `201`: `{ token: string, businessName: string }`. Failure responses: `400` `{ error: string }` for validation failures, `409` `{ error: "An account with this email already exists." }` for a duplicate email.

- [ ] **Step 1: Write the function**

```typescript
// site/netlify/functions/trade-signup.ts
import type { Context, Config } from "@netlify/functions";
import { randomUUID } from "node:crypto";
import { db } from "../../db/index.js";
import { tradeAccounts } from "../../db/schema.js";
import { hashPassword, signSession } from "./_shared/auth.js";

const TRADE_TYPES = new Set(["builder", "cabinetmaker", "renovator", "other"]);

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }

  const {
    businessName, abn, website, address, phone, email, password,
    tradeType, yearsInBusiness, kitchensPerYear,
  } = body;

  if (!isNonEmptyString(businessName)) return badRequest("Business name is required.");
  if (!isNonEmptyString(abn) || !/^\d{11}$/.test(abn.replace(/\s/g, ""))) {
    return badRequest("ABN must be 11 digits.");
  }
  if (!isNonEmptyString(address)) return badRequest("Address is required.");
  if (!isNonEmptyString(phone)) return badRequest("Phone number is required.");
  if (!isNonEmptyString(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return badRequest("A valid email is required.");
  }
  if (!isNonEmptyString(password) || password.length < 8) {
    return badRequest("Password must be at least 8 characters.");
  }
  if (typeof tradeType !== "string" || !TRADE_TYPES.has(tradeType)) {
    return badRequest("Trade type must be one of: builder, cabinetmaker, renovator, other.");
  }
  if (!Number.isInteger(yearsInBusiness) || (yearsInBusiness as number) < 0) {
    return badRequest("Years in business must be a whole number, 0 or more.");
  }
  if (!Number.isInteger(kitchensPerYear) || (kitchensPerYear as number) < 0) {
    return badRequest("Kitchens per year must be a whole number, 0 or more.");
  }

  const passwordHash = await hashPassword(password);
  const id = randomUUID();

  try {
    await db.insert(tradeAccounts).values({
      id,
      businessName: businessName.trim(),
      abn: abn.replace(/\s/g, ""),
      website: isNonEmptyString(website) ? website.trim() : null,
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      tradeType,
      yearsInBusiness,
      kitchensPerYear,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("unique") || message.includes("duplicate")) {
      return new Response(
        JSON.stringify({ error: "An account with this email already exists." }),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }
    throw err;
  }

  const token = signSession({ sub: id, businessName: businessName.trim() });
  return new Response(
    JSON.stringify({ token, businessName: businessName.trim() }),
    { status: 201, headers: { "Content-Type": "application/json" } },
  );
};

function badRequest(message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  path: "/.netlify/functions/trade-signup",
  method: ["POST"],
};
```

- [ ] **Step 2: Start the dev server**

Run (from `site/`, leave running in the background for this and the next two tasks): `netlify dev`
Expected: output shows a local URL (typically `http://localhost:8888`) and confirms Functions are being served.

- [ ] **Step 3: Verify a successful signup**

Run:
```bash
curl -s -X POST http://localhost:8888/.netlify/functions/trade-signup \
  -H "Content-Type: application/json" \
  -d '{"businessName":"Test Cabinetry Co","abn":"12345678901","website":"","address":"1 Test St, Brisbane","phone":"0400000000","email":"test@example.com","password":"password123","tradeType":"builder","yearsInBusiness":5,"kitchensPerYear":20}'
```
Expected: HTTP 201, JSON body with a `token` (a long JWT string) and `"businessName":"Test Cabinetry Co"`.

- [ ] **Step 4: Verify the duplicate-email rejection**

Run the same `curl` command from Step 3 again (same email).
Expected: HTTP 409, `{"error":"An account with this email already exists."}`.

- [ ] **Step 5: Verify a validation failure**

Run:
```bash
curl -s -X POST http://localhost:8888/.netlify/functions/trade-signup \
  -H "Content-Type: application/json" \
  -d '{"businessName":"","abn":"123","address":"","phone":"","email":"not-an-email","password":"short","tradeType":"nope","yearsInBusiness":-1,"kitchensPerYear":-1}'
```
Expected: HTTP 400, `{"error":"Business name is required."}` (the first failing check).

- [ ] **Step 6: Commit**

```bash
cd "C:\Users\WIN10\Desktop\CLAUDE STORAGE\site"
git add netlify/functions/trade-signup.ts
git commit -m "Add trade-signup Function"
```

---

### Task 5: `trade-login` Function

**Files:**
- Create: `site/netlify/functions/trade-login.ts`

**Interfaces:**
- Consumes: `db`/`tradeAccounts` from Task 2, `verifyPassword`/`signSession` from Task 3.
- Produces: `POST /.netlify/functions/trade-login`, consumed by Task 7. Request body: `{ email, password }`. Success `200`: `{ token, businessName }`. Failure `401`: `{ error: "Invalid email or password." }` — identical message whether the email doesn't exist or the password is wrong (no login enumeration).

- [ ] **Step 1: Write the function**

```typescript
// site/netlify/functions/trade-login.ts
import type { Context, Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { tradeAccounts } from "../../db/schema.js";
import { verifyPassword, signSession } from "./_shared/auth.js";

const INVALID = () =>
  new Response(JSON.stringify({ error: "Invalid email or password." }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }

  const { email, password } = body;
  if (typeof email !== "string" || typeof password !== "string") return INVALID();

  const [account] = await db
    .select()
    .from(tradeAccounts)
    .where(eq(tradeAccounts.email, email.trim().toLowerCase()))
    .limit(1);

  if (!account) return INVALID();

  const ok = await verifyPassword(password, account.passwordHash);
  if (!ok) return INVALID();

  const token = signSession({ sub: account.id, businessName: account.businessName });
  return new Response(
    JSON.stringify({ token, businessName: account.businessName }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};

export const config: Config = {
  method: ["POST"],
};
```

- [ ] **Step 2: Verify correct-credentials login**

With `netlify dev` still running from Task 4:
```bash
curl -s -X POST http://localhost:8888/.netlify/functions/trade-login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
Expected: HTTP 200, `{"token":"...","businessName":"Test Cabinetry Co"}`.

- [ ] **Step 3: Verify wrong-password rejection**

Run the same command with `"password":"wrongpassword"`.
Expected: HTTP 401, `{"error":"Invalid email or password."}`.

- [ ] **Step 4: Verify unknown-email rejection returns the same message**

Run the same command with `"email":"nobody@example.com"`.
Expected: HTTP 401, identical `{"error":"Invalid email or password."}` body — confirms no enumeration difference between "wrong password" and "no such account".

- [ ] **Step 5: Commit**

```bash
cd "C:\Users\WIN10\Desktop\CLAUDE STORAGE\site"
git add netlify/functions/trade-login.ts
git commit -m "Add trade-login Function"
```

---

### Task 6: `trade-session` Function

**Files:**
- Create: `site/netlify/functions/trade-session.ts`

**Interfaces:**
- Consumes: `verifySession` from Task 3.
- Produces: `POST /.netlify/functions/trade-session`, consumed by Task 7 on every room-planner page load. Request body: `{ token }`. Response `200` always (never an error status for a bad token — an invalid token is a normal, expected case, not a server error): `{ valid: true, businessName }` or `{ valid: false }`.

- [ ] **Step 1: Write the function**

```typescript
// site/netlify/functions/trade-session.ts
import type { Context, Config } from "@netlify/functions";
import { verifySession } from "./_shared/auth.js";

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { token } = body;
  if (typeof token !== "string") {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = verifySession(token);
  if (!session) {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ valid: true, businessName: session.businessName }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};

export const config: Config = {
  method: ["POST"],
};
```

- [ ] **Step 2: Verify a valid token**

Using the `token` value returned by Task 5 Step 2:
```bash
curl -s -X POST http://localhost:8888/.netlify/functions/trade-session \
  -H "Content-Type: application/json" \
  -d '{"token":"PASTE_THE_TOKEN_HERE"}'
```
Expected: HTTP 200, `{"valid":true,"businessName":"Test Cabinetry Co"}`.

- [ ] **Step 3: Verify an invalid token**

```bash
curl -s -X POST http://localhost:8888/.netlify/functions/trade-session \
  -H "Content-Type: application/json" \
  -d '{"token":"not-a-real-token"}'
```
Expected: HTTP 200, `{"valid":false}`.

- [ ] **Step 4: Commit**

```bash
cd "C:\Users\WIN10\Desktop\CLAUDE STORAGE\site"
git add netlify/functions/trade-session.ts
git commit -m "Add trade-session Function"
```

---

### Task 7: Client-side trade-auth module

**Files:**
- Create: `site/roomplanner/js/trade-auth.js`

**Interfaces:**
- Consumes: the three Functions from Tasks 4–6, over `fetch`.
- Produces, all as named exports consumed by Task 8's changes to `app.js`:
  - `TRADE_SESSION_KEY` — the string `'bilt.trade.session'`, the `localStorage` key.
  - `async function checkTradeSession(): Promise<{ valid: boolean; businessName?: string }>` — reads the stored token (if any), calls `trade-session`, clears the stored token if invalid, and returns the result. Returns `{ valid: false }` immediately with no network call if no token is stored.
  - `async function submitTradeSignup(fields: Record<string, unknown>): Promise<{ ok: true; businessName: string } | { ok: false; error: string }>` — posts to `trade-signup`, stores the token on success.
  - `async function submitTradeLogin(email: string, password: string): Promise<{ ok: true; businessName: string } | { ok: false; error: string }>` — posts to `trade-login`, stores the token on success.
  - `function tradeLogout(): void` — clears the stored token.
  - `function viewTradeSignup(): string` — an HTML template string for the `#/trade-signup` route.
  - `function viewTradeLogin(): string` — an HTML template string for the `#/trade-login` route.

- [ ] **Step 1: Write the module**

```javascript
/* ------------------------------------------------------------------
   trade-auth.js  ·  trade account signup/login/session, client side
   ------------------------------------------------------------------ */

export const TRADE_SESSION_KEY = 'bilt.trade.session';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function postJSON(path, body) {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    return { ok: false, status: 0, data: { error: "Trade accounts aren't available right now." } };
  }
}

export async function checkTradeSession() {
  const token = localStorage.getItem(TRADE_SESSION_KEY);
  if (!token) return { valid: false };
  const { ok, data } = await postJSON('/.netlify/functions/trade-session', { token });
  if (!ok || !data.valid) {
    localStorage.removeItem(TRADE_SESSION_KEY);
    return { valid: false };
  }
  return { valid: true, businessName: data.businessName };
}

export async function submitTradeSignup(fields) {
  const { ok, data } = await postJSON('/.netlify/functions/trade-signup', fields);
  if (!ok) return { ok: false, error: data.error || 'Something went wrong. Try again.' };
  localStorage.setItem(TRADE_SESSION_KEY, data.token);
  return { ok: true, businessName: data.businessName };
}

export async function submitTradeLogin(email, password) {
  const { ok, data } = await postJSON('/.netlify/functions/trade-login', { email, password });
  if (!ok) return { ok: false, error: data.error || 'Something went wrong. Try again.' };
  localStorage.setItem(TRADE_SESSION_KEY, data.token);
  return { ok: true, businessName: data.businessName };
}

export function tradeLogout() {
  localStorage.removeItem(TRADE_SESSION_KEY);
}

export function viewTradeLogin() {
  return `
  <div class="wrap-narrow">
    <h1>Trade login</h1>
    <p class="dimtx">Log in to see trade pricing.</p>
    <form id="tradeLoginForm" novalidate>
      <div class="field"><label for="tlEmail">Email</label><input id="tlEmail" name="email" type="email" required></div>
      <div class="field"><label for="tlPassword">Password</label><input id="tlPassword" name="password" type="password" required></div>
      <p id="tradeAuthErr" class="field-err" hidden></p>
      <button class="btn btn-pri" type="submit">Log in</button>
    </form>
    <p class="dimtx" style="margin-top:14px">New trade account? <a href="#/trade-signup">Sign up</a></p>
  </div>`;
}

export function viewTradeSignup() {
  return `
  <div class="wrap-narrow">
    <h1>Trade account signup</h1>
    <p class="dimtx">Tell us about your business — your account activates immediately, no waiting.</p>
    <form id="tradeSignupForm" novalidate>
      <div class="field"><label for="tsBusinessName">Business name</label><input id="tsBusinessName" name="businessName" type="text" required></div>
      <div class="field"><label for="tsAbn">ABN</label><input id="tsAbn" name="abn" type="text" inputmode="numeric" placeholder="11 digits" required></div>
      <div class="field"><label for="tsWebsite">Website (optional)</label><input id="tsWebsite" name="website" type="text"></div>
      <div class="field"><label for="tsAddress">Business address</label><input id="tsAddress" name="address" type="text" required></div>
      <div class="field"><label for="tsPhone">Phone</label><input id="tsPhone" name="phone" type="tel" required></div>
      <div class="field"><label for="tsEmail">Email</label><input id="tsEmail" name="email" type="email" required></div>
      <div class="field"><label for="tsPassword">Password</label><input id="tsPassword" name="password" type="password" minlength="8" required></div>
      <div class="field"><label for="tsTradeType">Trade type</label>
        <select id="tsTradeType" name="tradeType" required>
          <option value="">Select one</option>
          <option value="builder">Builder</option>
          <option value="cabinetmaker">Cabinetmaker</option>
          <option value="renovator">Renovator</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="field"><label for="tsYears">Years in business</label><input id="tsYears" name="yearsInBusiness" type="number" min="0" step="1" required></div>
      <div class="field"><label for="tsKitchens">Roughly how many kitchens a year?</label><input id="tsKitchens" name="kitchensPerYear" type="number" min="0" step="1" required></div>
      <p id="tradeAuthErr" class="field-err" hidden></p>
      <button class="btn btn-pri" type="submit">Create trade account</button>
    </form>
    <p class="dimtx" style="margin-top:14px">Already have an account? <a href="#/trade-login">Log in</a></p>
  </div>`;
}
```

- [ ] **Step 2: Commit**

```bash
cd "C:\Users\WIN10\Desktop\CLAUDE STORAGE\site"
git add roomplanner/js/trade-auth.js
git commit -m "Add client-side trade signup/login/session module"
```

---

### Task 8: Wire routing, gating, and forms into `app.js`

**Files:**
- Modify: `site/roomplanner/js/app.js`

**Interfaces:**
- Consumes: everything exported from Task 7's `trade-auth.js`.
- Produces: nothing further downstream — this is where the feature becomes live in the UI.

- [ ] **Step 1: Import the trade-auth module and add session state**

In `site/roomplanner/js/app.js`, find the existing import block (lines 5–21, ending with `import { wallElevation, roomPlan } from './planview.js';`) and add immediately after it:

```javascript
import {
  checkTradeSession, submitTradeSignup, submitTradeLogin,
  tradeLogout, viewTradeLogin, viewTradeSignup,
} from './trade-auth.js';
```

(`TRADE_SESSION_KEY` is deliberately not imported here — it's an implementation
detail of `trade-auth.js` itself; `app.js` never touches `localStorage` for the
session token directly, only through `checkTradeSession()`/`tradeLogout()`.
Task 10 Step 4's manual check reads the same literal key name only because
it's inspecting `localStorage` from outside the app, not importing the module.)

- [ ] **Step 2: Fix the unsafe default mode**

In the `state` object (currently `app.js:26`), change:
```javascript
  mode: 'trade',
```
to:
```javascript
  mode: 'retail',
```

In `load()` (currently `app.js:61`), change:
```javascript
      mode: d.mode || 'trade', theme: d.theme || null,
```
to:
```javascript
      mode: d.mode === 'trade' ? 'trade' : 'retail', theme: d.theme || null,
```
(This also fixes a subtler bug: the old `d.mode || 'trade'` treated a stored `'retail'` as falsy-safe but any *missing* key as `'trade'` — the new version is explicit that `'trade'` is the only value that ever restores trade mode.)

Add a new top-level variable right after the `state` object declaration (after its closing `};`) to track the verified session, separate from `state` since it is not persisted to `localStorage` itself (the token is; the verified business name is re-derived each load):
```javascript
let tradeSession = { valid: false };
```

- [ ] **Step 3: Force retail mode whenever there's no verified session**

Find `isTrade()` (currently `app.js:101`):
```javascript
const isTrade = () => state.mode === 'trade';
```
Change to:
```javascript
const isTrade = () => tradeSession.valid && state.mode === 'trade';
```
This is the actual gate: even if `state.mode` were somehow `'trade'` (e.g. stale `localStorage` from before this change shipped), pricing only switches to trade mode when `tradeSession.valid` is true.

- [ ] **Step 4: Add the two new routes**

In `route()` (currently `app.js:1536-1573`), find:
```javascript
  } else if (h === '#/how') {
    view.innerHTML = viewHow();
  } else {
```
Change to:
```javascript
  } else if (h === '#/how') {
    view.innerHTML = viewHow();
  } else if (h === '#/trade-login') {
    view.innerHTML = viewTradeLogin();
  } else if (h === '#/trade-signup') {
    view.innerHTML = viewTradeSignup();
  } else {
```

- [ ] **Step 5: Render the header gate**

Find `renderChrome()` (currently `app.js:1575-1581`):
```javascript
function renderChrome() {
  document.querySelectorAll('[data-act="mode"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === state.mode));
  const n = $('#notice');
  n.innerHTML = isTrade()
    ? `<span><span class="dot"></span><b>Trade account</b></span><span>${Math.round(SETTINGS.tradeDiscount * 100)}% off list, applied</span><span>Prices shown <b>ex GST</b></span><span>Free delivery over ${money0(SETTINGS.freeDeliveryOver)}</span>`
    : `<span><span class="dot"></span>Homeowner pricing</span><span>All prices <b>include GST</b></span><span>Free metro delivery over ${money0(SETTINGS.freeDeliveryOver)}</span><span>Flat pack or assembled</span>`;
}
```
Replace it with:
```javascript
function renderChrome() {
  const seg = $('#modeSeg');
  if (tradeSession.valid) {
    seg.innerHTML = `
      <button data-act="mode" data-mode="trade" type="button">Trade</button>
      <button data-act="mode" data-mode="retail" type="button">Homeowner</button>`;
    document.querySelectorAll('[data-act="mode"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === state.mode));
  } else {
    seg.innerHTML = `<a class="btn btn-ghost" href="#/trade-login">Trade login</a>`;
  }

  const n = $('#notice');
  n.innerHTML = isTrade()
    ? `<span><span class="dot"></span><b>${esc(tradeSession.businessName || 'Trade account')}</b></span><span>${Math.round(SETTINGS.tradeDiscount * 100)}% off list, applied</span><span>Prices shown <b>ex GST</b></span><span>Free delivery over ${money0(SETTINGS.freeDeliveryOver)}</span><span><a href="#" data-act="trade-logout">Log out</a></span>`
    : `<span><span class="dot"></span>Homeowner pricing</span><span>All prices <b>include GST</b></span><span>Free metro delivery over ${money0(SETTINGS.freeDeliveryOver)}</span><span>Flat pack or assembled</span>`;
}
```
Note this depends on Task 9's Step 1 giving the `.seg` element `id="modeSeg"`, and on `esc()` (already defined at `app.js:103`) for safe interpolation of the business name.

- [ ] **Step 6: Add form-submit and logout click handlers**

In the big `document.addEventListener('click', ...)` handler (currently `app.js:1605` onward), find:
```javascript
  if (act === 'mode') { state.mode = el.dataset.mode; save(); route(); return; }
```
and add immediately after it:
```javascript
  if (act === 'trade-logout') { e.preventDefault(); tradeLogout(); tradeSession = { valid: false }; state.mode = 'retail'; save(); route(); return; }
```

Then, separately, add a `submit` listener alongside the existing `document.addEventListener('click', ...)` and `document.addEventListener('keydown', ...)` listeners (near `app.js:1976-1984`), immediately before `window.addEventListener('hashchange', route);`:
```javascript
document.addEventListener('submit', async (e) => {
  const form = e.target;
  if (form.id !== 'tradeLoginForm' && form.id !== 'tradeSignupForm') return;
  e.preventDefault();

  const errEl = form.querySelector('#tradeAuthErr');
  errEl.hidden = true;

  const result = form.id === 'tradeLoginForm'
    ? await submitTradeLogin(form.email.value, form.password.value)
    : await submitTradeSignup({
        businessName: form.businessName.value,
        abn: form.abn.value,
        website: form.website.value,
        address: form.address.value,
        phone: form.phone.value,
        email: form.email.value,
        password: form.password.value,
        tradeType: form.tradeType.value,
        yearsInBusiness: Number(form.yearsInBusiness.value),
        kitchensPerYear: Number(form.kitchensPerYear.value),
      });

  if (!result.ok) {
    errEl.textContent = result.error;
    errEl.hidden = false;
    return;
  }

  tradeSession = { valid: true, businessName: result.businessName };
  state.mode = 'trade';
  save();
  location.hash = '#/plan';
});
```

- [ ] **Step 7: Check the session on boot**

Find the boot sequence at the end of the file (currently `app.js:1986-1990`):
```javascript
/* ---------------- boot ---------------- */
load();
applyTheme();
if (!state.jobName) state.jobName = 'Kitchen — 14 Hillcrest Ave';
route();
```
Change to:
```javascript
/* ---------------- boot ---------------- */
load();
applyTheme();
if (!state.jobName) state.jobName = 'Kitchen — 14 Hillcrest Ave';
route();
checkTradeSession().then((session) => {
  tradeSession = session;
  if (!session.valid && state.mode === 'trade') { state.mode = 'retail'; save(); }
  route();
});
```
The first `route()` call renders immediately with `tradeSession = { valid: false }` (the module-level default) so the page never flashes trade content while the session check is in flight; the second `route()` call after the check resolves either confirms retail (no visible change) or reveals the trade toggle.

- [ ] **Step 8: Commit**

```bash
cd "C:\Users\WIN10\Desktop\CLAUDE STORAGE\site"
git add roomplanner/js/app.js
git commit -m "Gate the trade pricing toggle behind a verified session"
```

---

### Task 9: Markup and styles

**Files:**
- Modify: `site/roomplanner/index.html`
- Modify: `site/roomplanner/css/app.css`

**Interfaces:**
- Consumes: nothing new.
- Produces: the `#modeSeg` element Task 8 Step 5 targets, and the `.field`/`.field-err`/`.wrap-narrow` classes Task 7's templates use.

- [ ] **Step 1: Give the toggle container an id**

In `site/roomplanner/index.html`, find (currently lines 26–29):
```html
      <div class="seg" role="group" aria-label="Pricing mode">
        <button data-act="mode" data-mode="trade" type="button">Trade</button>
        <button data-act="mode" data-mode="retail" type="button">Homeowner</button>
      </div>
```
Change to:
```html
      <div class="seg" id="modeSeg" role="group" aria-label="Pricing mode"></div>
```
The two buttons move into `renderChrome()`'s JS-rendered `innerHTML` (Task 8 Step 5) so the same element can swap between the toggle and the "Trade login" link. Leaving stale buttons in the static HTML would double-render on first paint before JS runs.

- [ ] **Step 2: Add form styles**

Append to the end of `site/roomplanner/css/app.css`:
```css
/* ---------------- trade auth forms ---------------- */
.wrap-narrow { max-width: 420px; margin: 0 auto; padding: 32px 20px 60px; }
.wrap-narrow h1 { font-family: var(--sans); font-size: 26px; font-weight: 700; margin: 0 0 6px; }
.field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
.field label { font-size: 12.5px; color: var(--ink-3); font-weight: 560; }
.field input, .field select {
  border: 1px solid var(--line-2); background: var(--surface); color: var(--ink);
  border-radius: 8px; padding: 10px 12px; font-size: 14.5px; font-family: var(--sans);
}
.field input:focus, .field select:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.field-err { color: #C0524A; font-size: 13px; margin: 0 0 14px; }
```

- [ ] **Step 3: Verify in the browser**

With `netlify dev` running (from Task 4), navigate to `http://localhost:8888/roomplanner/#/trade-signup`.
Take a screenshot with the `computer` tool.
Expected: the signup form renders with all ten fields, styled consistently with the rest of the app (dark background, rounded inputs), and a working "Log in" link at the bottom.

- [ ] **Step 4: Commit**

```bash
cd "C:\Users\WIN10\Desktop\CLAUDE STORAGE\site"
git add roomplanner/index.html roomplanner/css/app.css
git commit -m "Add trade auth form styles and gate the toggle's markup"
```

---

### Task 10: End-to-end verification in the browser

**Files:** none — verification only.

**Interfaces:**
- Consumes: the fully wired feature from Tasks 1–9.
- Produces: nothing further downstream — this is the final task.

- [ ] **Step 1: Confirm retail visitors see no trade path**

With `netlify dev` running, open `http://localhost:8888/roomplanner/#/shop` in a fresh browser context (clear `localStorage` first, or use a private window) — use the `javascript_tool` to run `localStorage.clear()` then reload.
Screenshot the header.
Expected: the pricing-mode area shows only a "Trade login" button — no Trade/Homeowner toggle, and no way to reach trade pricing.

- [ ] **Step 2: Sign up a new trade account through the UI**

Click "Trade login" → "Sign up", fill in all fields with test data (use a fresh email not used in Task 4's curl tests), submit.
Expected: redirected to `#/plan`, header now shows the Trade/Homeowner toggle with "Trade" active, and the business name appears in the notice bar.

- [ ] **Step 3: Confirm trade pricing is live**

Screenshot the planner with a cabinet in the cart.
Expected: prices show "ex GST" and the trade discount notice, matching the existing `isTrade()`-gated UI exactly as it behaved before this change — the only thing that changed is how you get there.

- [ ] **Step 4: Log out and confirm the gate re-closes**

Click "Log out" in the notice bar.
Expected: header reverts to showing only "Trade login"; `localStorage.getItem('bilt.trade.session')` is `null` (check via `javascript_tool`).

- [ ] **Step 5: Log back in with the same account**

Navigate to `#/trade-login`, enter the email/password from Step 2.
Expected: same result as Step 2 — toggle reappears, business name shown, trade pricing live.

- [ ] **Step 6: Confirm no console errors across the whole flow**

Use `read_console_messages` with `onlyErrors: true` after repeating Steps 1–5.
Expected: no logs.

No commit for this task — it is verification-only. If any expectation fails, fix the issue in the relevant earlier task's file and re-run this task's steps from Step 1.
