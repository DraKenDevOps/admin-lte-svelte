/**
 * Svelte action wrappers for the pieces of AdminLTE/3rd-party behavior that
 * need a component *instance* (MIGRATION-PLAN §3.2). Everything toggle-only
 * stays as plain `data-lte-toggle="…"` markup — the bundle's document-level
 * delegation owns those clicks and Svelte must NOT attach its own handlers
 * on top (README §4.3).
 */
import type { Action } from "svelte/action";
import { CardWidget, FullScreen, PushMenu, SidebarSearch } from "./index.js";
import { DEFAULT_SCROLLBAR_OPTIONS, isScrollbarAllowedOn } from "./shell-init.js";
import { OverlayScrollbars } from "overlayscrollbars";
import ApexCharts, { type ApexOptions } from "apexcharts";
import { Toast, Tooltip } from "bootstrap";
import { mergeChartTheme, registerChartTheme } from "#lib/theme/chart-theme";

/** `use:pushmenu` on `aside.app-sidebar`. */
export const pushmenu: Action<HTMLElement> = (node) => {
    PushMenu.getOrCreateInstance(node);
};

/** `use:cardWidget` on `AdminCard` roots where cards mount fresh (e.g. inside
 * `{#each}`). Cheap and explicit initialization-through-DOM (README §4.3). */
export const cardWidget: Action<HTMLElement> = (node) => {
    const instance = CardWidget.getOrCreateInstance(node);
    return {
        destroy() {
            instance.dispose();
        }
    };
};

/** `use:sidebarSearch` on the header/sidebar search input. */
export const sidebarSearch: Action<HTMLElement> = (node) => {
    SidebarSearch.getOrCreateInstance(node);
};

/** `use:fullscreenToggle` on the header fullscreen button. */
export const fullscreenToggle: Action<HTMLElement> = (node) => {
    FullScreen.getOrCreateInstance(node);
};

let scrollbars: ReturnType<typeof OverlayScrollbars> | null = null;

/** `use:overlayScrollbars` on the single `.sidebar-wrapper` (MIGRATION-PLAN
 * §4.3). Includes the shipped `isMobile` guard; destroying and re-creating
 * across route changes is unnecessary because the scrollbar lives in the
 * shell — so the action destroys only when its node is really removed. */
export const overlayScrollbars: Action<HTMLElement> = (node) => {
    if (!isScrollbarAllowedOn()) return;
    scrollbars = OverlayScrollbars(node, DEFAULT_SCROLLBAR_OPTIONS);
    return {
        destroy() {
            scrollbars?.destroy();
            scrollbars = null;
        }
    };
};

/** `use:chart` on a chart container `<div>`: ApexCharts lifecycle plus
 * the AdminLTE chart-theme observer, destroyed with the node. */
export const chart: Action<HTMLElement, ApexOptions> = (node, config) => {
    devRegistry.bump("chart");
    const instance = new ApexCharts(node, mergeChartTheme(config));
    void instance.render();
    const themeEffect = registerChartTheme(instance);
    return {
        update(newConfig) {
            if (!newConfig) return;
            void instance.updateOptions(mergeChartTheme(newConfig));
        },
        destroy() {
            themeEffect.dispose();
            instance.destroy();
        }
    };
};

/** `use:bootstrapWidgets` on demo-page content roots. Ports the two page
 * scripts at the bottom of the source `UI/general.html`: Bootstrap tooltips
 * are NOT in the data-api (each trigger needs `getOrCreateInstance`), and
 * toasts need a click handler because `data-bs-toggle="toast"` markup alone
 * does nothing. Everything is disposed with the node so nothing leaks across
 * route churn. */
export const bootstrapWidgets: Action<HTMLElement> = (node) => {
    const tooltips = [...node.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]')].map((el) => Tooltip.getOrCreateInstance(el));
    const toastHandlers: Array<() => void> = [...node.querySelectorAll<HTMLElement>('[data-bs-toggle="toast"]')].map((btn) => {
        const handler = (event: Event): void => {
            event.preventDefault();
            const target = document.getElementById(btn.getAttribute("data-bs-target") ?? "");
            if (target) Toast.getOrCreateInstance(target).show();
        };
        btn.addEventListener("click", handler);
        return () => btn.removeEventListener("click", handler);
    });
    return {
        destroy() {
            for (const tooltip of tooltips) tooltip.dispose();
            for (const off of toastHandlers) off();
        }
    };
};

/** Dev-only instance registry for route-churn assertions (MIGRATION-PLAN §5).
 * Actions/velte wrappers register here; nothing touches it in production. */
const registry = new Map<string, number>();
export const devRegistry = {
    count(key: string): number {
        return registry.get(key) ?? 0;
    },
    bump(key: string): void {
        if (import.meta.env.DEV) {
            registry.set(key, (registry.get(key) ?? 0) + 1);
        }
    }
};
