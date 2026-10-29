<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        class?: string;
        value: string;
        sup?: string;
        descriptionText: string;
        icon?: Snippet;
        footerLink?: string;
        href?: string;
    }

    let { class: boxClass = "text-bg-primary", value, sup, descriptionText, icon, footerLink = "link-light", href = "#" }: Props = $props();
</script>

<div class="small-box {boxClass}">
    <div class="inner">
        <h3>
            {value}{#if sup}<sup class="fs-5">{sup}</sup>{/if}
        </h3>
        <p>{descriptionText}</p>
    </div>
    {#if icon}{@render icon()}{/if}
    <a {href} class="small-box-footer {footerLink} link-underline-opacity-0 link-underline-opacity-50-hover">
        More info <i class="bi bi-link-45deg"></i>
    </a>
</div>
