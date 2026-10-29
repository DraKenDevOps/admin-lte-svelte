<script lang="ts">
    import { chart } from "#lib/adminlte/actions";
    import { cssVar } from "#lib/theme/chart-theme";
    import type { ApexOptions } from "apexcharts";

    const salesChartConfig: ApexOptions = {
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
            height: 180
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

    const primary = cssVar("--bs-primary", "#0d6efd");

    const sparkline = (data: number[]): ApexOptions => ({
        series: [{ data }],
        chart: {
            type: "line",
            width: 150,
            height: 30,
            sparkline: { enabled: true }
        },
        colors: [primary],
        stroke: { width: 2 },
        tooltip: {
            fixed: { enabled: false },
            x: { show: false },
            y: { title: { formatter: () => "" } },
            marker: { show: false }
        }
    });

    const sparkline1 = sparkline([25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]);
    const sparkline2 = sparkline([12, 56, 21, 39, 73, 45, 64, 52, 36, 59, 44]);
    const sparkline3 = sparkline([15, 46, 21, 59, 33, 15, 34, 42, 56, 19, 64]);
    const sparkline4 = sparkline([30, 56, 31, 69, 43, 35, 24, 32, 46, 29, 64]);
    const sparkline5 = sparkline([20, 76, 51, 79, 53, 35, 54, 22, 36, 49, 64]);
    const sparkline6 = sparkline([5, 36, 11, 69, 23, 15, 14, 42, 26, 19, 44]);
    const sparkline7 = sparkline([12, 56, 21, 39, 73, 45, 64, 52, 36, 59, 74]);

    const pieChartConfig: ApexOptions = {
        series: [700, 500, 400, 600, 300, 100],
        chart: {
            type: "donut",
            height: 320
        },
        labels: ["Chrome", "Edge", "FireFox", "Safari", "Opera", "IE"],
        dataLabels: { enabled: false },
        colors: ["#0d6efd", "#20c997", "#ffc107", "#d63384", "#6f42c1", "#adb5bd"]
    };
</script>

Dashboard v2 — port of the source `index2.html` main content. Markup is the source `app-content-header` and `app-content`; image paths point at `static/img`.
Charts use `use:chart` (the theme preset already lives in the shell). -->

<svelte:head>
    <title>AdminLTE v4 | Dashboard v2</title>
    <meta name="description" content="AdminLTE 4 dashboard v2, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

<div class="app-content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="mb-0 fs-3">Dashboard v2</h1>
            </div>
            <div class="col-sm-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb float-sm-end">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Dashboard v2</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>
<div class="app-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                    <span class="info-box-icon text-bg-primary shadow-sm">
                        <i class="bi bi-gear-fill"></i>
                    </span>

                    <div class="info-box-content">
                        <span class="info-box-text">CPU Traffic</span>
                        <span class="info-box-number">
                            10
                            <small>%</small>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                    <span class="info-box-icon text-bg-danger shadow-sm">
                        <i class="bi bi-hand-thumbs-up-fill"></i>
                    </span>

                    <div class="info-box-content">
                        <span class="info-box-text">Likes</span>
                        <span class="info-box-number">41,410</span>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                    <span class="info-box-icon text-bg-success shadow-sm">
                        <i class="bi bi-cart-fill"></i>
                    </span>

                    <div class="info-box-content">
                        <span class="info-box-text">Sales</span>
                        <span class="info-box-number">760</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                    <span class="info-box-icon text-bg-warning shadow-sm">
                        <i class="bi bi-people-fill"></i>
                    </span>

                    <div class="info-box-content">
                        <span class="info-box-text">New Members</span>
                        <span class="info-box-number">2,000</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title">Monthly Recap Report</h5>

                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
                                <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                                <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                            </button>
                            <div class="btn-group">
                                <button type="button" class="btn btn-tool dropdown-toggle" aria-label="More options" data-bs-toggle="dropdown">
                                    <i class="bi bi-wrench"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" role="menu">
                                    <a href="#" class="dropdown-item">Action</a>
                                    <a href="#" class="dropdown-item">Another action</a>
                                    <a href="#" class="dropdown-item"> Something else here </a>
                                    <hr class="dropdown-divider" />
                                    <a href="#" class="dropdown-item">Separated link</a>
                                </div>
                            </div>
                            <button type="button" class="btn btn-tool" data-lte-toggle="card-remove" aria-label="Remove card">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <p class="text-center">
                                    <strong>Sales: 1 Jan, 2023 - 30 Jul, 2023</strong>
                                </p>

                                <div
                                    id="sales-chart"
                                    use:chart={salesChartConfig}
                                    role="img"
                                    aria-label="Area chart of digital goods and electronics sales, January to July 2023"
                                ></div>
                            </div>
                            <div class="col-md-4">
                                <p class="text-center">
                                    <strong>Goal Completion</strong>
                                </p>

                                <div class="progress-group">
                                    Add Products to Cart
                                    <span class="float-end"><b>160</b>/200</span>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar text-bg-primary" style="width: 80%"></div>
                                    </div>
                                </div>

                                <div class="progress-group">
                                    Complete Purchase
                                    <span class="float-end"><b>310</b>/400</span>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar text-bg-danger" style="width: 75%"></div>
                                    </div>
                                </div>

                                <div class="progress-group">
                                    <span class="progress-text">Visit Premium Page</span>
                                    <span class="float-end"><b>480</b>/800</span>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar text-bg-success" style="width: 60%"></div>
                                    </div>
                                </div>

                                <div class="progress-group">
                                    Send Inquiries
                                    <span class="float-end"><b>250</b>/500</span>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar text-bg-warning" style="width: 50%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-body">
                        <div class="row">
                            <div class="col-md-3 col-6">
                                <div class="text-center border-end">
                                    <span class="text-success-emphasis">
                                        <i class="bi bi-caret-up-fill"></i> 17%
                                    </span>
                                    <h5 class="fw-bold mb-0">$35,210.43</h5>
                                    <span class="text-uppercase">TOTAL REVENUE</span>
                                </div>
                            </div>

                            <div class="col-md-3 col-6">
                                <div class="text-center border-end">
                                    <span class="text-info-emphasis">
                                        <i class="bi bi-caret-left-fill"></i> 0%
                                    </span>
                                    <h5 class="fw-bold mb-0">$10,390.90</h5>
                                    <span class="text-uppercase">TOTAL COST</span>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="text-center border-end">
                                    <span class="text-success-emphasis">
                                        <i class="bi bi-caret-up-fill"></i> 20%
                                    </span>
                                    <h5 class="fw-bold mb-0">$24,813.53</h5>
                                    <span class="text-uppercase">TOTAL PROFIT</span>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="text-center">
                                    <span class="text-danger-emphasis">
                                        <i class="bi bi-caret-down-fill"></i> 18%
                                    </span>
                                    <h5 class="fw-bold mb-0">1200</h5>
                                    <span class="text-uppercase">GOAL COMPLETIONS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
