	Dashboard v3 — port of the source `index3.html` main content.
	Markup is the source `app-content-header` and `app-content`; image
	paths point at `static/img`. Charts use `use:chart`.
-->
<script lang="ts">
    import { chart } from "#lib/adminlte/actions";
    import type { ApexOptions } from "apexcharts";

    const visitorsChartConfig: ApexOptions = {
        series: [
            {
                name: "High - 2023",
                data: [100, 120, 170, 167, 180, 177, 160]
            },
            {
                name: "Low - 2023",
                data: [60, 80, 70, 67, 80, 77, 100]
            }
        ],
        chart: {
            type: "line",
            height: 200
        },
        colors: ["#0d6efd", "#adb5bd"],
        stroke: { curve: "smooth", width: 3 },
        markers: { size: 4 },
        legend: { show: false },
        dataLabels: { enabled: false },
        xaxis: {
            categories: ["22th", "23th", "24th", "25th", "26th", "27th", "28th"]
        }
    };

    const salesChartConfig: ApexOptions = {
        series: [
            {
                name: "Net Profit",
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            },
            {
                name: "Revenue",
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            },
            {
                name: "Free Cash Flow",
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }
        ],
        chart: {
            type: "bar",
            height: 200
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%"
            }
        },
        legend: { show: false },
        colors: ["#0d6efd", "#20c997", "#ffc107"],
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
        },
        xaxis: {
            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
        },
        tooltip: {
            y: {
                formatter: (val: number) => `$ ${val} thousands`
            }
        }
    };
</script>

<svelte:head>
    <title>AdminLTE v4 | Dashboard v3</title>
    <meta name="description" content="AdminLTE 4 dashboard v3, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

<div class="app-content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="mb-0 fs-3">Dashboard v3</h1>
            </div>
            <div class="col-sm-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb float-sm-end">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Dashboard v3</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="app-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-6">
                <div class="card mb-4">
                    <div class="card-header border-0">
                        <div class="d-flex justify-content-between">
                            <h3 class="card-title">Online Store Visitors</h3>
                            <a href="javascript:void(0);" class="link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">View Report</a>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="d-flex">
                            <p class="d-flex flex-column">
                                <span class="fw-bold fs-5">820</span>
                                <span>Visitors Over Time</span>
                            </p>
                            <p class="ms-auto d-flex flex-column text-end">
                                <span class="text-success-emphasis">
                                    <i class="bi bi-arrow-up"></i> 12.5%
                                </span>
                                <span class="text-body-secondary">Since last week</span>
                            </p>
                        </div>

                        <div
                            class="position-relative mb-4"
                            id="visitors-chart"
                            use:chart={visitorsChartConfig}
                            role="img"
                            aria-label="Line chart of online store visitors this week and last week"
                        ></div>

                        <div class="d-flex flex-row justify-content-end">
                            <span class="me-2">
                                <i class="bi bi-square-fill text-primary"></i> This Week
                            </span>

                            <span> <i class="bi bi-square-fill text-body-secondary"></i> Last Week </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card mb-4">
                    <div class="card-header border-0">
                        <div class="d-flex justify-content-between">
                            <h3 class="card-title">Sales</h3>
                            <a href="javascript:void(0);" class="link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">View Report</a>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="d-flex">
                            <p class="d-flex flex-column">
                                <span class="fw-bold fs-5">$18,230.00</span>
                                <span>Sales Over Time</span>
                            </p>
                            <p class="ms-auto d-flex flex-column text-end">
                                <span class="text-success-emphasis">
                                    <i class="bi bi-arrow-up"></i> 33.1%
                                </span>
                                <span class="text-body-secondary">Since Past Year</span>
                            </p>
                        </div>

                        <div
                            class="position-relative mb-4"
                            id="sales-chart"
                            use:chart={salesChartConfig}
                            role="img"
                            aria-label="Column chart of net profit, revenue and free cash flow, February to October"
                        ></div>

                        <div class="d-flex flex-row justify-content-end">
                            <span class="me-2">
                                <i class="bi bi-square-fill text-primary"></i> This year
                            </span>

                            <span> <i class="bi bi-square-fill text-body-secondary"></i> Last year </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
