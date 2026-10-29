<script lang="ts">
    import { page } from "$app/state";
    import { NAV_ITEMS, type NavEntry } from "#lib/nav_items";
    import { overlayScrollbars as overlayScrollbarsAction, pushmenu as pushmenuAction } from "#lib/adminlte/actions";

    const pathname = $derived(page.url.pathname);
    const isActive = (item: NavEntry, path: string): boolean =>
        (item.href !== undefined && item.href !== "#" && path === item.href) || (item.children ?? []).some((child) => isActive(child, path));
    const hasActiveChild = (item: NavEntry, path: string): boolean => (item.children ?? []).some((child) => isActive(child, path));
</script>

{#snippet items(list: NavEntry[], path: string)}
    {#each list as item, i (i)}
        {#if item.header}
            <li class="nav-header">{item.header}</li>
        {:else if item.children?.length}
            <li class="nav-item" class:menu-open={hasActiveChild(item, path)}>
                <a href={item.href ?? "#"} class="nav-link" class:active={isActive(item, path)}>
                    <i class={item.icon} aria-hidden="true"></i>
                    <p>
                        {item.label}
                        {#if item.small}<small>{item.small}</small>{/if}
                        {#if item.badge}<span class="nav-badge {item.badge.class}">{item.badge.text}</span>{/if}
                        <i class="nav-arrow bi bi-chevron-right"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    {@render items(item.children, path)}
                </ul>
            </li>
        {:else}
            <li class="nav-item">
                <a href={item.href ?? "#"} class="nav-link" class:active={isActive(item, path)}>
                    <i class={item.icon} aria-hidden="true"></i>
                    <p>
                        {item.label}
                        {#if item.small}<small>{item.small}</small>{/if}
                        {#if item.soon}<span class="nav-badge badge text-bg-secondary me-3">Soon</span>{/if}
                    </p>
                </a>
            </li>
        {/if}
    {/each}
{/snippet}

<aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark" use:pushmenuAction>
    <div class="sidebar-brand">
        <a href="/" class="brand-link">
            <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image opacity-75 shadow" />
            <span class="brand-text fw-light">AdminLTE 4</span>
        </a>
    </div>

    <div class="sidebar-search" role="search">
        <label for="sidebar-search-input" class="visually-hidden">Filter menu</label>
        <input
            type="search"
            id="sidebar-search-input"
            class="form-control form-control-sm"
            placeholder="Filter menu…"
            autocomplete="off"
            data-lte-toggle="sidebar-search"
            data-lte-target="#navigation"
        />
        <p class="fs-7 text-secondary mt-2 mb-0" data-lte-search-empty role="status" hidden>No matching pages.</p>
    </div>

    <div class="sidebar-wrapper" use:overlayScrollbarsAction>
        <nav class="mt-2" aria-label="Main navigation">
            <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" data-accordion="false" id="navigation">
                {@render items(NAV_ITEMS, pathname)}
            </ul>
        </nav>
    </div>
</aside>
