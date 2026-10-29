# Phase 0 NOTES — scaffold, vendoring, SPA shell config

Status: **complete** · Date: 2026-10-29 · Source of truth: `migrations/svelte/MIGRATION-PLAN.md` + `migrations/README.md` §2–§5

## What was done

- Scaffolded with `npx sv@latest create admin-lte-svelte --template minimal --types ts --no-add-ons --install pnpm`.
  → SvelteKit **3** + Vite **8** + Svelte **5.57** (+ `@sveltejs/adapter-auto` installed by default, not used).
- Dependencies pinned: bootstrap 5.3.8, overlayscrollbars 2.17.0, chart.js 4.6.1, sortablejs 1.15.7
  (+ `@types/sortablejs` 1.15.9), jsvectormap 1.7.0, `@fontsource/source-sans-3` 5.3.1, bootstrap-icons 1.13.1,
  `@sveltejs/adapter-static` 4.0.0. Later added `@types/bootstrap` 5.2.11 (Phase 2 note below).
- Vendored AdminLTE 4.10.1 (version fingerprint per README §4.1 — npm `admin-lte` is 4.10.0):
  `css/adminlte.css` (sha256 `1327B4A7A334D961`, 378 348 B), `css/adminlte-colors.css` (sha256 `E231768059EDEE6A`),
  `js/adminlte.esm.js` (sha256 `C220ED5354C37EC0`) + `js/types/*` incl. `types/util/`
  → into `src/lib/adminlte/`. `// @ts-nocheck` prepended to the bundle because the base tsconfig enables `checkJs`.
- All 34 asset images copied to `static/img/` (referenced as `/img/...`).
- SPA config: `vite.config.ts` holds `sveltekit({ compilerOptions: { runes … }, adapter: adapter-static({ fallback: 'index.html' }) })`
  (SvelteKit 3 has no `svelte.config.js`; everything lives in the Vite plugin options).
- `src/app.html`: verbatim no-flash head script (theme init before paint) + body classes
  `layout-fixed sidebar-expand-lg bg-body-tertiary`.
- `src/routes/+layout.ts`: `ssr = false, csr = true, prerender = false`. `src/app.css` imports the vendored CSS.
- `src/global.d.ts`: ambient shims for jsvectormap (ships no types). Kept as a *global* file (no top-level exports).
- `src/lib/adminlte/index.ts` barrel; `shell-init.ts` (`initialize()` replay + `initAccessibility()`, guarded `once`);
  `actions.ts` (pushmenu / cardWidget / sidebarSearch / fullscreenToggle / overlayScrollbars / chart / devRegistry);
  `theme/color-mode.svelte.ts` (mirror-only rune state); `theme/chart-theme.ts` (preset port incl. `areaFill`).

## Deviations & gotchas (record for §7 diff)

1. **`$lib` alias removed in SvelteKit 3.** The generator's tsconfig previously crashed the build with
   `module_removed_lib`. Decision: treat `#lib` as *the* alias (SvelteKit 3's supported spelling; wired via
   `package.json` → `imports`) and keep `paths` for `#lib` in `tsconfig.json`. All app code imports `#lib/...`;
   `app.css` uses a relative `./lib/...` `@import` for the vendored CSS. Do **not** re-introduce `alias: { $lib }`
   (deprecated in Kit 3, removed in a future release).
2. **No `.svelte-kit/tsconfig.json` anymore** — root `tsconfig.json` extends `$app/tsconfig` directly.
3. Robocopy baseline of the source tree was *not* recorded at Phase 0 start (process slip). Integrity of the
   original dist is instead fingerprinted at `notes/SOURCE-TREE-FINGERPRINT.md` (verified clean: 191 files,
   no stray `src/`).
4. a11y warnings (`href="#"`, `role` on `<canvas>`, etc.) are accepted verbatim-markup lint noise;
   the svelte-check gate is **0 errors**, warnings float.

## Verification (§5)

`svelte-check`: 0 errors (warnings tracked per phase). `pnpm run build` green at end of Phase 3 batch.
