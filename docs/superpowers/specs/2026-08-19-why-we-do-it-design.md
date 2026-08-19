# "Why we do this" section — design

**Date:** 2026-08-19
**Status:** Approved, not yet implemented
**File affected:** `site/index.html` (hand-patched directly — see caveat below)

## Problem

The landing page argues its case well (problem → shift → price → proof) but
never states, in one direct human sentence, *why BILT exists*. The site's own
handoff doc (`BILT_STUDIO_HANDOFF.md` §4) independently flags this as the
weakest beat on the page. The user separately described the page as
"uninspiring" and asked to "show the customer why we do it."

## Constraint

Per `BILT_STUDIO_HANDOFF.md` §1 and §8: never publish a founder story, review
count, certification, or other factual claim that hasn't been confirmed by
the owner. Confirmed in this brainstorm: there is no named founder and no
personal origin story to tell. The "why" is therefore a **belief statement**,
not a biography — and it must be built entirely from convictions the page
already asserts elsewhere (opaque quotes are the problem, showroom overhead
is waste, no salesperson, "the price is the price," BILT never hard-sells),
not new invented facts.

## Placement

New section, `id="bl-why"`, inserted immediately after `bl-convert` (the
post-hero CTA strip) and before `bl-problem` (currently unnumbered `01`).

**Deliberately left unnumbered.** The page's numbered eyebrows (01–11) are
the analytical/argument beats; the hero and `bl-convert` are mood beats with
no number. This section is a mood beat too — stating a conviction, not
building an argument — so it follows that precedent instead of shifting
every subsequent number.

## Layout

Two-column, matching the existing pattern already used by `bl-shift` and
`bl-planner` (one column is a photo/mock, the other is text) — not a new
pattern. `data-two` layout helper (2-col ≥940px, 1-col below), dark
background (`#16130F`) consistent with every other section.

- **Left column:** `K001.jpg` (dramatic marble-island, brass-pendant kitchen
  photo — real photography already in `img-stock/`, not yet used elsewhere
  on the page), full-height, `object-fit:cover`.
- **Right column:** eyebrow label "Why we do this" (no number — same
  `IBM Plex Mono` eyebrow style as every other section, just without the
  `NN /` prefix), then the statement set large in italic `Newsreader` (the
  same emphasis style the page already uses for phrases like *"the price is
  the price"*, scaled up toward headline size — not full `h2` scale, since
  this isn't a section title, it's a spoken line), then the supporting
  paragraph at the page's normal body copy size/color.

## Copy

> **Why we do this**
>
> *A kitchen quote should be a number, not a negotiation.*
>
> We got tired of quotes that changed depending on how the room read,
> showrooms you pay for whether you buy or not, and a salesperson standing
> between you and a straight answer. So we built the version where the
> number is just the number. Draw your kitchen, see what it costs, decide
> with nothing hidden.

## Implementation note

`index.html` is a generated file — `_build.py` reassembles it from a
design-tool export and will silently discard hand edits on its next run
(see `BILT_STUDIO_HANDOFF.md` §2, §8). This section will be hand-patched
directly into `index.html`, the same way the tech-cabinetry section, stock
photography, and typography fixes already were. If `_build.py` runs again,
this section needs to be re-applied or folded into the build script.

## Out of scope

- The separately-requested "trade account login" feature is explicitly not
  part of this spec — shelved per the user's own sequencing decision, to be
  brainstormed on its own once this section ships.
- No changes to section numbering, to `bl-shift`/`bl-planner` (the patterns
  this layout borrows from), or to any other section.
