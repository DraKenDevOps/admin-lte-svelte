# LAYOUT SETTINGS — menu section removed, config moved to Settings

Date: 2026-10-29 · Follows `PHASE-1-notes.md` / `PHASES-4-10-notes.md` (Phase 9 subset delivered early)

## What changed

1. **Sidebar**: the 12-entry "Layout Options" section is **removed from the menu**
   (`nav_items.ts`; the `badge: 12` went with it). Replaced by one top-level
   **Settings** entry (`bi bi-gear-fill`, `/settings`).
2. **New layout store**: `src/lib/layout/layout-state.svelte.ts` — a `$state`
   flag mirror (same pattern as `theme/color-mode.svelte.ts`):
   `fixedSidebar · fixedHeader · fixedFooter · sidebarMini · collapsed ·
   withoutHover · topNav · customArea`. Values persist to
   `localStorage["adminlte.layout.v1"]`; writes funnel through
   `setFlag`/`resetLayout` (single-writer discipline), including the
   source-implied couplings: `collapsed` ⇒ `sidebar-mini`, top-nav clears the
   sidebar flags (they are *disabled*, not lost, when top-nav is on).
3. **New component**: `src/lib/components/Settings.svelte` — Card-wrapped form
   switches with hints derived verbatim from the source `layout/*.html` body
   classes, a live readout of the wanted body classes, and a
   "Reset to defaults" button. Hosted by the new `routes/settings/+page.svelte`.
4. **Shell wiring** (`Shell.svelte`): `$effect` calls `applyLayoutToBody`, the
   single applier; `loadLayout()` restores persisted flags on mount (no
   first-paint flash — `app.html`'s initial classes equal the defaults).
   Structurally: `{#if !layout.topNav}` unmounts `<AppSidebar />` (source
   top-nav page has **no aside**), and `{#if layout.customArea}` renders the
   verbatim `app-content-bottom-area` strip after the page content.

## Flag → body-class mapping (verbatim from source `layout/*.html`)

| Flag | Class |
|---|---|
| default | `sidebar-expand-lg bg-body-tertiary` |
| `fixedSidebar` | + `layout-fixed` |
| `fixedHeader` | + `fixed-header` |
| `fixedFooter` | + `fixed-footer` |
| `sidebarMini` | + `sidebar-mini` |
| `collapsed` | + `sidebar-collapse` (+ `sidebar-mini`) |
| `withoutHover` | + `sidebar-without-hover` |
| `topNav` | **all sidebar classes removed** (source: "no sidebar-expand-* on `<body>`") |
| combined | e.g. Fixed Complete = the three fixed flags together |

## Gotchas recorded

- The applier only manages its own class set; `document.body` classes owned by
  others (`modal-open`, …) are never touched. On the first run it *adopts* the
  classes `app.html` put on `<body>`, otherwise a stale default flash on reload.
- `vite preview` must be restarted after a rebuild (sirv startup snapshot) —
  reconfirmed during this change.
- Top-nav is a structural approximation: header keeps `app-header` and spans
  the full width, but the source's in-header navigation bar is deferred to
  Phase 9 proper.

## Verification (§5)

svelte-check **0 errors**; `pnpm run build` green; production preview:
8 switches → classes land live on `<body>`; reload persistence reproduces the
stored flag set (top-nav reload: body = `bg-body-tertiary` only, no aside);
reset restores the shipped defaults; `/` unaffected (0 console errors).
