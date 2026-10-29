import { initialize, initAccessibility } from "./index.js";
import "bootstrap";
import type { PartialOptions as OverlayScrollbarsConfig } from "overlayscrollbars";

/**
 * Shell-mounted singletons (MIGRATION-PLAN §3.1): `initialize()` replays the
 * bundle's `onDOMContentLoaded` initializers against the live shell DOM. All
 * inits use `getOrCreateInstance`, so a replay is safe — but it must never run
 * per-route (README §5 "initialize() replay semantics"), so it is anchored to
 * the layout component's mount and guarded `once` here.
 */
let done = false;
export function initShell(): void {
    if (done) return;
    done = true;
    initialize(); // re-run initializers against live shell DOM (safe)
    initAccessibility(); // skip links + contrast meta
}

/** Exposed for dev assertions (route-churn tests, MIGRATION-PLAN §5). */
export function isShellInitialized(): boolean {
    return done;
}

/**
 * Bootstrap 5 is imported (above, data-API side effect) exactly like the
 * source pages load `bootstrap.min.js`: it wires `data-bs-toggle="dropdown"`
 * and the other Bootstrap behaviors through document-level delegation
 * (README §4.2). AdminLTE does not bundle Bootstrap itself.
 */

/** Shipped OverlayScrollbars options from the source pages' configure block. */
export const DEFAULT_SCROLLBAR_OPTIONS: OverlayScrollbarsConfig = {
    scrollbars: {
        theme: "os-theme-light",
        autoHide: "leave",
        clickScroll: true
    }
};

/** OverlayScrollbars must not fight touch input at phone widths (guard ported
 * verbatim from the source pages' `window.innerWidth <= 992`, README §5). */
export function isScrollbarAllowedOn(): boolean {
    return !(globalThis.window.innerWidth <= 992);
}
