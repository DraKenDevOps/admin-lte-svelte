<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        class?: string;
        iconClass?: string;
        icon?: string;
        text: string;
        number: string;
        progress?: number;
        progressText?: string;
    }

    let { class: boxClass = "", iconClass = "text-bg-primary shadow-sm", icon = "bi bi-gear", text, number, progress, progressText = "" }: Props = $props();
</script>

<div class="info-box {boxClass}">
    <span class="info-box-icon {iconClass}">
        <i class={icon} aria-hidden="true"></i>
    </span>
    <div class="info-box-content">
        <span class="info-box-text">{text}</span>
        <span class="info-box-number">{number}</span>
        {#if progress !== undefined}
            <div class="progress">
                <div class="progress-bar" style="width: {progress}%"></div>
            </div>
            <span class="progress-description">{progressText}</span>
        {/if}
    </div>
</div>
