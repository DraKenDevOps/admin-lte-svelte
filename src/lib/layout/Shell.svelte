<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount } from "svelte";
    import AppHeader from "./AppHeader.svelte";
    import AppSidebar from "./AppSidebar.svelte";
    import AppFooter from "./AppFooter.svelte";
    import { initShell } from "#lib/adminlte/shell-init";
    import { startColorModeMirror } from "#lib/theme/color-mode.svelte";
    import { applyLayoutToBody, layout, loadLayout } from "#lib/layout/layout-state.svelte";

    let { children }: { children: Snippet } = $props();

    onMount(() => {
        loadLayout(); // restore persisted flags; the effect below re-applies
        initShell(); // `once` inside — replays inits against live shell DOM
        startColorModeMirror();
    });

    // Layout flags → <body> classes, re-applied on every flag change (the
    // Settings panel is the single writer; see layout-state.svelte.ts).
    $effect(() => {
        applyLayoutToBody(layout);
    });
</script>

<div class="app-wrapper" data-shell-root="once">
    <AppHeader />
    {#if !layout.topNav}
        <!-- top-nav variant: the source page has NO aside; the wrapper grid's
		     `auto` sidebar column then collapses and the header spans the width -->
        <AppSidebar />
    {/if}
    <main class="app-main">
        {@render children()}
        {#if layout.customArea}
            <div class="app-content-bottom-area">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6">
                            <div>App Content Bottom Area</div>
                        </div>
                        <div class="col-md-6 text-end">
                            <button type="submit" class="btn btn-secondary" name="save" value="create"> Refresh </button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </main>
    <AppFooter />
</div>
