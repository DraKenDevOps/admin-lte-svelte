/**
 * `use:sortable` — Sortable.js lifecycle for the dashboard's widgets row and
 * the kanban board (MIGRATION-PLAN §4.3). IMPORTANT (documented pattern from
 * the plan): Sortable mutates the DOM directly; never let Svelte re-render a
 * list that Sortable moves — keep the sorted content in a `{#key}`-free
 * static subtree or re-render the whole row deliberately.
 *
 * Also mirrors the source pages' cosmetic setup (card header cursor: move).
 */
import type { Action } from "svelte/action";
import Sortable from "sortablejs";
import type { Options as SortableOptions } from "sortablejs";
import { devRegistry } from "#lib/adminlte/actions";

export const sortable: Action<HTMLElement, SortableOptions | undefined> = (node, options) => {
    devRegistry.bump("sortable");
    const instance = Sortable.create(
        node,
        options ?? {
            group: "shared",
            handle: ".card-header"
        }
    );

    // Source pages set `cursor: move` on every sortable card header via
    // `cardHeader.style.cursor = 'move'` — keep the same look.
    for (const header of node.querySelectorAll(".connectingSortable .card-header, .connectedSortable .card-header")) {
        (header as HTMLElement).style.cursor = "move";
    }

    return {
        destroy() {
            instance.destroy();
        }
    };
};
