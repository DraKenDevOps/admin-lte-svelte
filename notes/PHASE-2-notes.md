# Phase 2 NOTES — Card / SmallBox / InfoBox primitives, Sortable, Bootstrap widgets

Status: **complete** · Date: 2026-10-29

## What was done

- `components/Card.svelte` — `.card` primitive with `class`, `tools`, `toolsExtra`, `header`, `footer`,
  `bodyClass`/`headerClass`/`footerClass` snippets/props. Root carries `use:cardWidget`
  (initialization-through-DOM; destroy only when node removed). Default collapse/remove tools emit
  `data-lte-toggle="card-collapse"` (delegation-driven; `data-lte-icon="expand|collapse"` mirrored).
- `components/SmallBox.svelte`, `components/InfoBox.svelte` — markup-only primitives.
- `plugins/sortable.ts` — `use:sortable` wrapper (Sortable mutates DOM; consumers must keep the column
  outside keyed `each` churn or use the documented `{#key}` boundaries).
- `adminlte/actions.ts` — **new `use:bootstrapWidgets` action** (2026-10-29): ports the two page scripts
  from `UI/general.html` — tooltips (`Tooltip.getOrCreateInstance` — tooltips are *not* in the Bootstrap
  data-api) and toast trigger buttons (`data-bs-toggle="toast"` + `getElementById(by target without '#')`,
  `Toast.getOrCreateInstance(...).show()` verbatim from the source script). Instances disposed with the node.
- Added devDep `@types/bootstrap` 5.2.11 — the first named import from `bootstrap` (`Toast`, `Tooltip`)
  needed types; the side-effect import in `shell-init.ts` never did.

## Deviations & gotchas

- Collapse/dropdown/modal/offcanvas/tab-pill behaviour of demo pages stays on the Bootstrap data-api —
  **no Svelte click handlers** on `data-bs-toggle` elements (README §4.3).

## Verification (§5)

- svelte-check 0 errors; `/ui/general` renders 20 demo cards; accordion/tab/modal/offcanvas/toast/tooltip
  operate in production preview; no console errors; `use:bootstrapWidgets` disposed on route change.
