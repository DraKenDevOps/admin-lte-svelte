import { ColorMode } from "#lib/adminlte";

/**
 * Mirror-only color-mode store (MIGRATION-PLAN §3.3, README §4.4 "one writer
 * rule"). The vendored `ColorMode` module owns
 * `document.documentElement.dataset.bsTheme` — this store only reads it back
 * so Svelte UI can react. It NEVER writes the attribute itself; AdminLTE's
 * own toggle button in the header keeps its shipped `data-bs-theme-value`
 * click path.
 */
export type ColorModeChoice = "light" | "dark" | "auto";

export const colorMode = $state<{ choice: ColorModeChoice; resolved: "light" | "dark" }>({
    choice: "auto",
    resolved: "light"
});

let started = false;

/** Start the mirror observers. Called once from `Shell.svelte`'s mount (next
 * to `initShell()`), never per-route. */
export function startColorModeMirror(): void {
    if (started) return;
    started = true;

    const root = document.documentElement;
    const syncResolved = () => {
        const resolved = root.getAttribute("data-bs-theme");
        if (resolved === "dark" || resolved === "light") {
            colorMode.resolved = resolved;
        }
    };

    // The theme the visitor picked: mirror the ColorMode module's changed
    // event, then fall back to reading its preference logic.
    const cm = new ColorMode();
    const syncChoice = () => {
        colorMode.choice = (cm.getPreferredTheme() ?? "auto") as ColorModeChoice;
    };

    syncResolved();
    syncChoice();

    new MutationObserver(syncResolved).observe(root, {
        attributes: true,
        attributeFilter: ["data-bs-theme"]
    });
    document.addEventListener("changed.lte.color-mode", (event) => {
        const detail = (event as CustomEvent<{ theme: ColorModeChoice }>).detail;
        if (detail) {
            colorMode.choice = detail.theme;
        } else {
            syncChoice();
        }
    });
    globalThis.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncChoice);
}
