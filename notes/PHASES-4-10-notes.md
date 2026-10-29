# Phases 4–10 — outline (not yet implemented)

Recorded 2026-10-29. Scope of the current session: Phases 0–3 + the demo routes
(`/ui/general`, `/ui/timeline`, catch-all) fully implemented and verified.
Additionally, the **Settings panel now owns the layout configuration** (see
`LAYOUT-SETTINGS-notes.md`) — the former "Layout Options" menu section is gone
and the Phase 9 flag matrix is already applied through the Settings store.

## Phase 4 — Widgets pages
- `widgets/small-box` (grid of all colour small-box variants), `widgets/info-box`, `widgets/cards`
  (all shipped card variants incl. gradient/outline/tools), `widgets/social`.
- Reuse `Card` / `SmallBox` / `InfoBox` primitives; count new widget snippets before writing; verbatim
  markup ports.

## Phase 5 — Charts plugin pages
- `charts/chartjs` page: the preset already lives in `theme/chart-theme.ts`; page uses 6+ demo configs.
- Keep `chart.js/auto` imports only (PHASE-3 note 1). Consider lazy import boundary around the charts
  chunk if bundle budget is exceeded.

## Phase 6 — Forms pages
- `forms/elements`, `forms/layout`, `forms/validation`, `forms/advanced`.
- Select2 → **Tom‑Select** (README §2 replacement decision): write `TomSelect.svelte` wrapper with
  `onMount/onDestroy` init/destroy + config prop; danger: TomSelect owns its DOM, keep outside `each` churn.

## Phase 7 — Tables pages
- `tables/simple` (Bootstrap demos), `tables/data` (**Tabulator**, bootstrap5 theme CSS import,
  `table.destroy()` in `onDestroy`). Sortable columns only where the source had them.

## Phase 8 — Examples/auth, mailbox, docs pages
- `examples/login` (+ register, forgot-password), `page-level auth shells` (v2 variants), lockscreen.
- `mailbox/inbox`, `mailbox/read`, `mailbox/compose` (inbox already maps to the catch-all today).
- Remove the matching `soon: true` flags in `nav_items.ts` as each route lands.

## Phase 9 — Layout variants
- Mostly delivered early via the Settings panel (`LAYOUT-SETTINGS-notes.md`):
  flags store + body-class application + top-nav approximation.
- Remaining for a proper Phase 9: the source top-nav's in-header navigation
  bar (currently the sidebar is simply removed and the header spans the
  width), the logo-switch branding variant, and the `/layouts` visual diff
  against the untouched sources (fingerprint:
  `notes/SOURCE-TREE-FINGERPRINT.md`). `layout-rtl` stays out of scope
  (README §4.4).

## Phase 10 — Final pass
- Shared README §4.6 checklist per phase; route churn ×10 with devRegistry assertions on all new routes.
- Robocopy/byte-diff the source tree against a pristine copy (baseline gap noted in PHASE-0-notes §3).
- Final `pnpm run check` (0 errors) + `build` + chunk-size re-record into this notes tree or §5.

## Known loose ends right now
- Several `nav_items.ts` entries (e.g. `/widgets/social`, `/mailbox/inbox`, `/forms/elements`) intentionally
  have no `soon: true` yet but land on the catch-all — harmless, but set `soon` consistently as phases land.
- `each_key_duplicate` lesson: any future dynamic sidebar data needs unique keys (PHASE-1 note 1).
- Restart `vite preview` after every rebuild (PHASE-3 note 3).
