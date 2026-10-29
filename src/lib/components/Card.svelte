<script lang="ts">
    import type { Snippet } from "svelte";
    import { cardWidget } from "#lib/adminlte/actions";

    interface Props {
        class?: string;
        tools?: boolean;
        toolsExtra?: Snippet;
        header?: Snippet;
        footer?: Snippet;
        headerClass?: string;
        footerClass?: string;
        bodyClass?: string;
        children: Snippet;
    }

    let {
        class: cardClass = "",
        tools = true,
        toolsExtra,
        header,
        footer,
        headerClass = "",
        footerClass = "",
        bodyClass = "card-body",
        children
    }: Props = $props();
</script>

<div class="card {cardClass}" use:cardWidget>
    {#if header}
        <div class="card-header {headerClass}">
            {@render header()}
            <div class="card-tools">
                {#if toolsExtra}{@render toolsExtra()}{/if}
                {#if tools}
                    <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                        <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                        <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                    </button>
                    <button type="button" class="btn btn-tool" data-lte-toggle="card-remove" aria-label="Remove card">
                        <i class="bi bi-x-lg"></i>
                    </button>
                {/if}
            </div>
        </div>
    {/if}
    <div class={bodyClass}>
        {@render children()}
    </div>
    {#if footer}
        <div class="card-footer {footerClass}">
            {@render footer()}
        </div>
        <!-- /.card-footer -->
    {/if}
</div>
