# Phase 3 NOTES — Dashboard v1 route + demo routes + catch-all

Status: **complete** · Date: 2026-10-29

## What was done

- `routes/+page.svelte` — Dashboard v1 port (source `index.html` app-main): 4 SmallBoxes, revenue line
  chart with `areaFill` gradient, Direct Chat card, world-map card + 3 sparklines, Sortable widgets row
  (`group: 'shared'`, handle `.card-header`).
- jsvectormap world map: global-script bridge at runtime (see PHASE-1 note 2); container-local events
  discarded on unmount.
- `routes/ui/timeline/+page.svelte` — verbatim `UI/timeline.html` main content; asset paths rewritten to
  `/img/...` (`static/img/`). Pure CSS/markup — nothing mounted.
- `routes/ui/general/+page.svelte` — verbatim `UI/general.html` main content, demo cards via
  `Card` primitive (`tools={false}` to match the source cards' plain headers), `use:bootstrapWidgets`
  on `app-content` root (see PHASE-2 note).
- `routes/[...not_migrated]/+page.svelte` — catch-all placeholder for every sidebar route that has not
  landed yet; shows the requested pathname and points to the owning phase.

## Deviations & gotchas (batch fixes, 2026-10-29)

1. **Chart.js `linear` not registered** — `chart-theme.ts` and `actions.ts` imported `Chart` from
   `chart.js`; V8 tree-shakes controllers/scales that auto-registered via `chart.js/auto`. Switched both to
   `import { Chart } from 'chart.js/auto'` (equivalent of the source pages loading the UMD bundle). Fix
   recorded so future files import from `chart.js/auto` only.
2. **`$lib` → `#lib` sweep** — all `src/**/*.{svelte,ts}` imports use `#lib/...`; `app.css` uses relative
   `./lib/...`; tsconfig `paths` maps `#lib` (+ `#lib/*`) only. See PHASE-0 note 1.
3. `vite preview` (sirv) snapshots `.svelte-kit/output/client` at startup — **restart `vite preview` after
   every `vite build`**, else the server serves stale hashed HTML and the page hydrates from cached chunks.
   Deep-links through the SPA fallback (`/ui/general`, `/mailbox/inbox`) verified on a fresh server.

## Verification (§5)

- svelte-check: **0 errors** (warnings: verbatim a11y-markup noise, tracked).
- `pnpm run build` green; production preview: `/` (4 canvases drawn, charts active, no console errors),
  `/ui/timeline`, `/ui/general` (20 cards), `/mailbox/inbox` (catch-all) all render with 0 console errors.

## Production chunk sizes (final phase build, §7 record)

| bundle | raw | gzip |
|---|---|---|
| app CSS (`assets/0.*.css`, adminlte.css + colors + font css) | 402.95 kB | 59.59 kB |
| `nodes/0` (layout/shell) | 19.15 kB | 5.75 kB |
| `nodes/2` (Dashboard v1) | 49.69 kB | 16.97 kB |
| `nodes/4` (ui/general) | 38.12 kB | 6.56 kB |
| `nodes/3` (catch-all) | 1.61 kB | 0.86 kB |
| `nodes/5` (ui/timeline) | 3.51 kB | 1.22 kB |
| vendor chunk `BvqdBUiW.js` (theme + bootstrap widgets) | 34.25 kB | 10.94 kB |
| `FmZS0fm-.js` (adminlte bundle + shell wiring) | 102.23 kB | 38.34 kB |
| `Dy12yo6v.js` / `L1lPfhYd.js` (kit runtime + boot) | 39.53 kB | 15.32 kB |
| misc chunk `BhE4Xmcr.js` (chart.js + jsvectormap bundle) | 343.15 kB | 115.82 kB |
| fonts (source-sans-3 woff2 set + bootstrap-icons woff2) | — | (fonts load lazily) |

Budget check (§5: page bundles ≤ 150 kB gz shared vendor): dashboard main page ≈ 16.97 + shared chunks;
largest roadblock is chart.js + maps at 115.8 kB gz — shared across `/` only. Under target for the scope
covered; Phase 5+ should lazy-load the map/chart chunk per route if bundles grow.
