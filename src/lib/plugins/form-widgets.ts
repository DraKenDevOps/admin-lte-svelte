/**
 * Mount/destroy helpers for the form demo pages. Tom Select, Flatpickr, and
 * Quill own the node they enhance, so each action tears its instance down
 * when the route unmounts (same shape as `use:sortable`).
 */
import type { Action } from "svelte/action";
import TomSelect from "tom-select";
import flatpickrFn from "flatpickr";
import type { Options as FlatpickrOptions } from "flatpickr/dist/types/options";
import Quill from "quill";
import type { QuillOptions } from "quill";
import { devRegistry } from "#lib/adminlte/actions";

type TomSelectSettings = ConstructorParameters<typeof TomSelect>[1];

/** `use:tomSelect` — the package entry is the complete build (`virtual_scroll` included). */
export const tomSelect: Action<HTMLSelectElement, TomSelectSettings> = (node, settings) => {
    devRegistry.bump("tomSelect");
    const instance = new TomSelect(node, settings ?? {});
    return {
        destroy() {
            instance.destroy();
        }
    };
};

/** `use:flatpickr` on a text input. */
export const flatpickr: Action<HTMLInputElement, Partial<FlatpickrOptions>> = (node, options) => {
    devRegistry.bump("flatpickr");
    const instance = flatpickrFn(node, options ?? {});
    return {
        destroy() {
            if (Array.isArray(instance)) {
                for (const picker of instance) picker.destroy();
            } else {
                instance.destroy();
            }
        }
    };
};

/** `use:quill` on an editor root. Snow theme inserts a toolbar sibling; remove it too. */
export const quill: Action<HTMLElement, QuillOptions> = (node, options) => {
    devRegistry.bump("quill");
    new Quill(node, options);
    for (const label of node.querySelectorAll(".ql-header .ql-picker-label")) {
        label.setAttribute("aria-label", "Heading format");
    }
    const toolbar = node.previousElementSibling;
    return {
        destroy() {
            if (toolbar?.classList.contains("ql-toolbar")) toolbar.remove();
        }
    };
};

/**
 * `use:formValidation` — source `forms/validation.html` submit listener.
 * `.needs-validation` and `.needs-validation-tooltip` get `was-validated`
 * and do not submit while a field is invalid.
 */
export const formValidation: Action<HTMLElement> = (node) => {
    devRegistry.bump("formValidation");
    const forms = [...node.querySelectorAll<HTMLFormElement>(".needs-validation, .needs-validation-tooltip")];
    const offs = forms.map((form) => {
        const onSubmit = (event: Event): void => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        };
        form.addEventListener("submit", onSubmit, false);
        return () => form.removeEventListener("submit", onSubmit, false);
    });
    return {
        destroy() {
            for (const off of offs) off();
        }
    };
};
