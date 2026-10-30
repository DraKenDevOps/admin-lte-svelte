/**
 * Layout flags — the former "Layout Options" menu section now lives in the
 * Settings panel (moved 2026-10-29; MIGRATION-PLAN §4.4 Phase 9 subset).
 *
 * One-writer rule (mirrors `theme/color-mode.svelte.ts`): the flags are owned
 * by this store; `Settings.svelte` is the single UI writer, and
 * `Shell.svelte`'s `$effect` is the single applier (body classes + structural
 * options). Values persist to `localStorage` under `STORAGE_KEYS.appLayout`.
 *
 * Flag → body-class mapping is taken verbatim from the source dist's
 * `layout/*.html` body classes:
 *   default            : `sidebar-expand-lg bg-body-tertiary`
 *   fixedSidebar       : + `layout-fixed`
 *   fixedHeader        : + `fixed-header`
 *   fixedFooter        : + `fixed-footer`
 *   sidebarMini        : + `sidebar-mini`
 *   collapsed          : + `sidebar-collapse` (implies `sidebar-mini`)
 *   withoutHover       : + `sidebar-without-hover`
 *   topNav             : source `top-nav.html` has NO sidebar classes at all:
 *                        the `app-wrapper` grid's sidebar column (`auto`) turns
 *                        0 once the `<aside>` is not rendered, and the header
 *                        expands across the full width.
 */

import { STORAGE_KEYS } from "../../utils/keys";

export interface LayoutFlags {
    /** `layout-fixed` — sidebar stays put while content scrolls. */
    fixedSidebar: boolean;
    /** `fixed-header` — header stays on screen. */
    fixedHeader: boolean;
    /** `fixed-footer` — footer stays on screen. */
    fixedFooter: boolean;
    /** `sidebar-mini` — icon-only sidebar width. */
    sidebarMini: boolean;
    /** `sidebar-collapse` — start collapsed (implies `sidebar-mini`). */
    collapsed: boolean;
    /** `sidebar-without-hover` — collapsed sidebar does not expand on hover. */
    withoutHover: boolean;
    /** Top-nav variant: no sidebar, header navigates across the full width. */
    topNav: boolean;
    /** Extra `app-content-bottom-area` strip between content and footer. */
    customArea: boolean;
}

/** Defaults mirror `app.html`'s initial body classes (no first-paint flash:
 * `layout-fixed sidebar-expand-lg bg-body-tertiary`). */
export const layout = $state<LayoutFlags>({
    fixedSidebar: true,
    fixedHeader: false,
    fixedFooter: false,
    sidebarMini: false,
    collapsed: false,
    withoutHover: false,
    topNav: false,
    customArea: false
});

const ALL_FLAGS: (keyof LayoutFlags)[] = ["fixedSidebar", "fixedHeader", "fixedFooter", "sidebarMini", "collapsed", "withoutHover", "topNav", "customArea"];

/** Pure class computation for a given flag set (see module comment for the
 * source mapping). */
export function layoutBodyClassesFull(l: LayoutFlags): string[] {
    // Interval flag: source `top-nav.html` has no sidebar classes on <body>
    // (the wrapper grid's sidebar column turns to 0 once the aside is gone).
    if (l.topNav) {
        return ["bg-body-tertiary"];
    }
    const classes = ["sidebar-expand-lg", "bg-body-tertiary"];
    if (l.fixedSidebar) classes.push("layout-fixed");
    if (l.fixedHeader) classes.push("fixed-header");
    if (l.fixedFooter) classes.push("fixed-footer");
    if (l.sidebarMini || l.collapsed) classes.push("sidebar-mini");
    if (l.collapsed) classes.push("sidebar-collapse");
    if (l.withoutHover) classes.push("sidebar-without-hover");
    return classes;
}

/** Every class this store ever manages — the applier removes stale members
 * from `<body>` without disturbing classes other code owns (e.g. `modal-open`). */
const MANAGED_CLASSES = [
    "layout-fixed",
    "sidebar-expand-lg",
    "bg-body-tertiary",
    "fixed-header",
    "fixed-footer",
    "sidebar-mini",
    "sidebar-collapse",
    "sidebar-without-hover"
] as const;

let applied = new Set<string>();
let seeded = false;

/** Single applier — called from Shell's `$effect` whenever a flag changes. */
export function applyLayoutToBody(l: LayoutFlags): void {
    // First call adopts whatever `app.html` put on <body> (the no-flash default
    // classes) so a stale default can be removed once the flags differ from it.
    if (!seeded) {
        seeded = true;
        applied = new Set([...document.body.classList].filter((cls) => (MANAGED_CLASSES as readonly string[]).includes(cls)));
    }
    const next = new Set(layoutBodyClassesFull(l));
    for (const stale of MANAGED_CLASSES) {
        if (applied.has(stale) && !next.has(stale)) document.body.classList.remove(stale);
    }
    for (const cls of next) document.body.classList.add(cls);
    applied = next;
}

/** Restore persisted flags (Shell `onMount`, before the apply effect runs). */
export function loadLayout(): void {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.appLayout);
        if (!raw) return;
        const saved = JSON.parse(raw) as Partial<LayoutFlags>;
        for (const key of ALL_FLAGS) {
            if (typeof saved[key] === "boolean") layout[key] = saved[key];
        }
    } catch {
        // Corrupt or unavailable storage — defaults stay in place.
    }
}

/** Save every flag (called by the store writer on each change). */
export function saveLayout(value: LayoutFlags): void {
    try {
        const snapshot: Record<string, boolean> = {};
        for (const key of ALL_FLAGS) snapshot[key] = value[key];
        localStorage.setItem(STORAGE_KEYS.appLayout, JSON.stringify(snapshot));
    } catch {
        // Storage unavailable — settings just don't persist.
    }
}

/** Toggles with implied coupling enforce the source pages' invariant pairs:
 * `collapsed` always carries `sidebar-mini`, and `topNav` clears the sidebar
 * flags. All writes funnel through here (single-writer discipline). */
export function setFlag(key: keyof LayoutFlags, value: boolean): void {
    layout[key] = value;
    if (key === "collapsed" && value) layout.sidebarMini = true;
    if (key === "topNav" && value) {
        layout.fixedSidebar = false;
        layout.sidebarMini = false;
        layout.collapsed = false;
        layout.withoutHover = false;
    }
    saveLayout(layout);
}

/** Back to the shipped `app.html` defaults. */
export function resetLayout(): void {
    layout.fixedSidebar = true;
    layout.fixedHeader = false;
    layout.fixedFooter = false;
    layout.sidebarMini = false;
    layout.collapsed = false;
    layout.withoutHover = false;
    layout.topNav = false;
    layout.customArea = false;
    saveLayout(layout);
}
