/**
 * Vendored AdminLTE 4.10.1 ESM bundle — the ONLY non-TS module in `src/`
 * (MIGRATION-PLAN §2 TypeScript gate).
 *
 * Fingerprint (README §4.1):
 *   source : C:\Users\Anakin\Other\admin-lte-4  (static dist drop, unpublished)
 *   versions: adminlte.css / adminlte-colors.css / adminlte.esm.js — 4.10.1
 *   note   : npm `admin-lte` is 4.10.0; this vendored copy matches the local
 *            4.10.1 dist (see migrations/README.md §5 risk table)
 *   copied : 2026-10-29
 *
 * Types come from the copied `types/` tree (js/types of the same dist). Do not
 * call AdminLTE from outside `src/lib/adminlte/*` and `theme/*` (MIGRATION-PLAN
 * §1 principle 2).
 */
export * from "./adminlte.esm.js";
export type { ColorMode as ColorModeType } from "./adminlte.esm.js";
