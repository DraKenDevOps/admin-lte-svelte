/**
 * AdminLTE ApexCharts theme helper — styles every ApexCharts instance from
 * AdminLTE's CSS variables and `<html data-bs-theme>`, and updates live charts
 * whenever the color mode or `dir` attribute changes.
 */
import type ApexCharts from "apexcharts";
import type { ApexOptions } from "apexcharts";

let installed = false;
const liveCharts = new Set<ApexCharts>();

export const cssVar = (name: string, fallback = ""): string => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
};

export const alpha = (color: string, opacity: number): string => {
    let hex = String(color).trim().replace(/^#/, "");
    if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(hex)) {
        return color;
    }
    if (hex.length === 3) {
        hex = [...hex].map((c) => c + c).join("");
    }
    const [r, g, b] = [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const currentMode = (): "light" | "dark" => (document.documentElement.getAttribute("data-bs-theme") === "dark" ? "dark" : "light");

const buildThemePatch = (): ApexOptions => {
    const mode = currentMode();
    const foreColor = cssVar("--bs-secondary-color", mode === "dark" ? "#adb5bd" : "#6c757d");
    const fontFamily = cssVar("--bs-body-font-family", "inherit");
    const gridColor = `rgba(${cssVar("--bs-emphasis-color-rgb", mode === "dark" ? "255, 255, 255" : "0, 0, 0")}, 0.08)`;

    return {
        theme: { mode },
        chart: {
            background: "transparent",
            foreColor,
            fontFamily
        },
        grid: {
            borderColor: gridColor
        },
        tooltip: {
            theme: mode
        }
    };
};

export function mergeChartTheme(options: ApexOptions): ApexOptions {
    const patch = buildThemePatch();
    return {
        ...options,
        theme: {
            ...patch.theme,
            ...options.theme
        },
        chart: {
            toolbar: { show: false },
            ...patch.chart,
            ...options.chart
        },
        grid: {
            ...patch.grid,
            ...options.grid
        },
        tooltip: {
            ...patch.tooltip,
            ...options.tooltip
        }
    };
}

const refresh = (): void => {
    const patch = buildThemePatch();
    for (const chart of liveCharts) {
        void chart.updateOptions(patch, false, false);
    }
};

const install = (): void => {
    if (installed) return;
    installed = true;
    new MutationObserver(refresh).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-bs-theme", "dir"]
    });
    document.fonts?.addEventListener("loadingdone", refresh);
};

export function registerChartTheme(chart: ApexCharts): { dispose(): void } {
    install();
    liveCharts.add(chart);
    return {
        dispose() {
            liveCharts.delete(chart);
        }
    };
}
