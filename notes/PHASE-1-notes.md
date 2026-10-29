# Phase 1 NOTES — Shell, AppHeader, AppSidebar, AppFooter, nav data

Status: **complete** · Date: 2026-10-29

## What was done

- `src/lib/nav_items.ts` — full sidebar data tree from `starter.html` §504–1105, one plain object tree
  (`NavEntry`: header/label/icon/href/small/badge/iconClass/children/soon). Route ids mirror source paths
  (`/index` → `/`, `/pages/profile`, `/mailbox/inbox`, …) so `NAV_ITEMS` mapping stays mechanical.
- `Shell.svelte` — `.app-wrapper`/`.app-main` structure; `initShell()` replay anchored to **onMount only**
  (`shell-init.ts` guards `once`). Dev marker `data-shell-root="once"` survives route churn (§5 assertions).
  No Svelte handlers on `data-lte-toggle` / `data-bs-toggle` elements — Bootstrap + AdminLTE document-level
  delegation owns those (README §4.3).
- `AppHeader.svelte` — verbatim port (message/notif/user dropdowns, language menu, fullscreen, color-mode
  menu with `data-lte-theme-icon`).
- `AppSidebar.svelte` — recursive snippets render `NAV_ITEMS`; `menu-open`/`active` computed from
  `page.url.pathname`; `use:pushmenu` on `aside`, `use:overlayScrollbars` on `.sidebar-wrapper`.
- `AppFooter.svelte` — verbatim footer.
- `routes/+layout.svelte` = Shell + `app.css`; favicon via `#lib/assets/favicon.svg`.

## Deviations & gotchas

1. **`each_key_duplicate` runtime crash (fixed 2026-10-29).** The synthetic multi-level example from the
   source drawer repeats labels (`Level 1` ×3, `Level 2` ×3/2, `Level 3` ×3), so the previous key
   `(item.header ?? item.label)` collided and hydration aborted with an empty content area. Fix:
   keyed `{#each list as item, i (i)}` — legal because `NAV_ITEMS` is a static constant; comment left at
   the each block in `AppSidebar.svelte`. If NAV_ITEMS ever becomes dynamic, switch to assigned unique ids.
2. jsVectorMap world data (`dist/maps/world.js`) is a bare-global script; bridged at runtime via
   `(globalThis.jsVectorMap = await import('jsvectormap'))` before dynamic map import (Phase 3 usage).
3. Sidebar entries with `soon: true` (and any not-yet-written route) resolve to the catch-all
   `routes/[...not_migrated]` page after Phase 3; stable future hrefs, no 404.

## Verification (§5)

- svelte-check 0 errors; hydrate + click-through in production preview; init *not* re-run per route
  (`isShellInitialized()` dev assertion).
