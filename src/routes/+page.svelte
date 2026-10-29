<!--
	Dashboard v1 — port of the source `index.html` main content (Phase 3,
	MIGRATION-PLAN §4.2). Markup is verbatim from the source `app-main`;
	behaviour delegates to AdminLTE's document-level click delegation, and the
	Chart.js / jsvectormap / Sortable instances live in Svelte actions +
	`onMount` lifecycles. Structure mirrors the source script bottom:
	  - revenue chart with `areaFill` theme gradient
	  - animated sparklines ×3
	  - jsvectormap world map (source pages loaded it as a global script —
	    here it is imported, with the global bridge the map data needs)
	  - Sortable widgets row (`group: 'shared'`, handle `.card-header`)
-->
<script lang="ts">
    import { onMount } from "svelte";
    import Card from "#lib/components/Card.svelte";
    import SmallBox from "#lib/components/SmallBox.svelte";
    import { chart } from "#lib/adminlte/actions";
    import { sortable } from "#lib/plugins/sortable";
    import type { ApexOptions } from "apexcharts";

    const revenueChartConfig: ApexOptions = {
        series: [
            {
                name: "Digital Goods",
                data: [28, 48, 40, 19, 86, 27, 90]
            },
            {
                name: "Electronics",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ],
        chart: {
            type: "area",
            height: 300
        },
        colors: ["#0d6efd", "#20c997"],
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 2 },
        legend: { show: false },
        xaxis: {
            categories: ["Jan '23", "Feb '23", "Mar '23", "Apr '23", "May '23", "Jun '23", "Jul '23"]
        },
        yaxis: { min: 0 }
    };

    const sparkline = (data: number[]): ApexOptions => ({
        series: [{ data }],
        chart: {
            type: "area",
            height: 50,
            sparkline: { enabled: true }
        },
        stroke: { curve: "straight", width: 2 },
        fill: { opacity: 0.3 },
        colors: ["#DCE6EC"],
        yaxis: { min: 0 },
        tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } }
    });

    const sparkline1 = sparkline([1000, 1200, 920, 927, 931, 1027, 819, 930, 1021]);
    const sparkline2 = sparkline([515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921]);
    const sparkline3 = sparkline([15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21]);

    // jsvectormap map data (`dist/maps/world.js`) sets a bare global — bridge it
    // the way the source pages' script order did.
    let worldMapInitialized = $state(false);
    onMount(async () => {
        const { default: jsVectorMap } = await import("jsvectormap");
        (globalThis as { jsVectorMap?: unknown }).jsVectorMap = jsVectorMap as unknown;
        await import("jsvectormap/dist/maps/world.js");
        new jsVectorMap({ selector: "#world-map", map: "world" });
        worldMapInitialized = true;
    });
</script>

<svelte:head>
    <title>AdminLTE v4 | Dashboard</title>
    <meta name="description" content="AdminLTE 4 dashboard, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

<!--begin::App Content Header-->
<div class="app-content-header">
    <!--begin::Container-->
    <div class="container-fluid">
        <!--begin::Row-->
        <div class="row">
            <div class="col-sm-6">
                <h1 class="mb-0 fs-3">Dashboard</h1>
            </div>
            <div class="col-sm-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb float-sm-end">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>
            </div>
        </div>
        <!--end::Row-->
    </div>
    <!--end::Container-->
</div>
<!--end::App Content Header-->

<!--begin::App Content-->
<div class="app-content">
    <!--begin::Container-->
    <div class="container-fluid">
        <!--begin::Row-->
        <div class="row">
            <!--begin::Col-->
            <div class="col-lg-3 col-6">
                <!--begin::Small Box Widget 1-->
                <SmallBox class="text-bg-primary" value="150" descriptionText="New Orders">
                    {#snippet icon()}
                        <svg class="small-box-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path
                                d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                            ></path>
                        </svg>
                    {/snippet}
                </SmallBox>
                <!--end::Small Box Widget 1-->
            </div>
            <!--end::Col-->
            <div class="col-lg-3 col-6">
                <!--begin::Small Box Widget 2-->
                <SmallBox class="text-bg-success" value="53" sup="%" descriptionText="Bounce Rate">
                    {#snippet icon()}
                        <svg class="small-box-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path
                                d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"
                            ></path>
                        </svg>
                    {/snippet}
                </SmallBox>
                <!--end::Small Box Widget 2-->
            </div>
            <!--end::Col-->
            <div class="col-lg-3 col-6">
                <!--begin::Small Box Widget 3-->
                <SmallBox class="text-bg-warning" value="44" descriptionText="User Registrations" footerLink="link-dark">
                    {#snippet icon()}
                        <svg class="small-box-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path
                                d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"
                            ></path>
                        </svg>
                    {/snippet}
                </SmallBox>
                <!--end::Small Box Widget 3-->
            </div>
            <!--end::Col-->
            <div class="col-lg-3 col-6">
                <!--begin::Small Box Widget 4-->
                <SmallBox class="text-bg-danger" value="65" descriptionText="Unique Visitors">
                    {#snippet icon()}
                        <svg class="small-box-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                            ></path>
                            <path
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                            ></path>
                        </svg>
                    {/snippet}
                </SmallBox>
                <!--end::Small Box Widget 4-->
            </div>
            <!--end::Col-->
        </div>
        <!--end::Row-->

        <!--begin::Row-->
        <div class="row">
            <!-- Start col -->
            <div class="col-lg-7 connectedSortable" use:sortable>
                <Card class="mb-4" tools={false}>
                    {#snippet header()}<h3 class="card-title">Sales Value</h3>{/snippet}
                    <div
                        class="position-relative"
                        role="img"
                        aria-label="Area chart of digital goods and electronics sales, January to July 2023"
                        use:chart={revenueChartConfig}
                    ></div>
                </Card>
                <!-- /.card -->
            </div>
            <!-- /.Start col -->
        </div>
        <!-- /.row (main row) -->
    </div>
    <!--end::Container-->
</div>
<!--end::App Content-->
