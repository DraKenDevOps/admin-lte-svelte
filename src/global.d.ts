// Ambient module shims for third-party packages that ship no types.
// Must stay a global (non-module) declaration file — keep it free of
// top-level imports/exports.

/** jsvectormap 1.7 — minimal surface for the dashboard's world map. */
declare module "jsvectormap" {
    export default class jsVectorMap {
        constructor(options: {
            selector: string;
            map: string;
            zoomButtons?: Record<string, unknown>;
            selectedRegions?: string[];
            regionStyle?: Record<string, unknown>;
            labels?: Record<string, unknown>;
        });
        mapData?: Record<string, unknown>;
        series?: Record<string, unknown>;
    }
}

declare module "jsvectormap/dist/maps/world.js";
