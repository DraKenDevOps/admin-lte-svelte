<!--
	Catch-all for sidebar entries whose routes a phase has not migrated yet.
	Gives every future href in `nav_items.ts` a stable, navigable target that
	explains the state instead of 404ing, so the tree stays consistent while
	phases land one by one (MIGRATION-PLAN §4, route ids stay frozen).
-->
<script lang="ts">
	import { page } from '$app/state';
	import { findNavTrail } from '#lib/nav_items';

	const pathname = $derived(page.url.pathname);
	const trail = $derived(findNavTrail(pathname));
	const label = $derived(trail?.entry.label);
</script>

<svelte:head>
	<title>AdminLTE v4 | {label ?? 'Not migrated yet'}</title>
	<meta
		name="description"
		content="Placeholder for AdminLTE pages that have not been migrated to Svelte yet."
	/>
</svelte:head>

<div class="app-content-header">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-6">
				<h1 class="mb-0 fs-3">Page not migrated yet</h1>
			</div>
			<div class="col-sm-6">
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb float-sm-end">
						<li class="breadcrumb-item"><a href="/">Home</a></li>
						{#if trail}
							{#each trail.ancestors as ancestor (ancestor)}
								<li class="breadcrumb-item">{ancestor}</li>
							{/each}
							<li class="breadcrumb-item active" aria-current="page">{label}</li>
						{:else}
							<li class="breadcrumb-item active" aria-current="page">Not migrated</li>
						{/if}
					</ol>
				</nav>
			</div>
		</div>
	</div>
</div>

<div class="app-content">
	<div class="container-fluid">
		<div class="row">
			<div class="col-12">
				<div class="callout callout-warning">
					<h4 class="callout-title">This page is on the roadmap</h4>
					{#if trail}
						<p class="mb-2">
							<strong>{label}</strong>
							(<code>{pathname}</code>) is reserved in the sidebar. Its content is still the
							AdminLTE 4.10.1 source page and has not been ported yet.
						</p>
					{:else}
						<p class="mb-2">
							<code>{pathname}</code>
							is not a migrated page.
						</p>
					{/if}
					<p class="mb-0">
						Go back to the
						<a href="/">Dashboard</a>.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
