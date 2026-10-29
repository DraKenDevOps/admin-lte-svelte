	ApexCharts showcase — port of the source charts showcase (`charts/chartjs.html`
	/ `charts/apexcharts.html`) to ApexCharts.
-->
<script lang="ts">
	import { chart } from '#lib/adminlte/actions';
	import type { ApexOptions } from 'apexcharts';

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const thousands = (value: number) => `$${Math.round(value / 1000)}k`;
	const dollars = (value: number) => `$${value.toLocaleString()}`;

	const lineChartConfig: ApexOptions = {
		series: [
			{
				name: 'Revenue',
				data: [31200, 34800, 32600, 39400, 42100, 45800, 44300, 49700, 52400, 56900, 60200, 65800]
			}
		],
		chart: {
			type: 'line',
			height: 300
		},
		colors: ['#0d6efd'],
		stroke: { width: 3 },
		markers: { size: 4 },
		dataLabels: { enabled: false },
		legend: { show: false },
		xaxis: { categories: months },
		yaxis: { labels: { formatter: thousands } },
		tooltip: { y: { formatter: dollars } }
	};

	const areaChartConfig: ApexOptions = {
		series: [
			{
				name: 'New Visitors',
				data: [8100, 9300, 8700, 10400, 12200, 11600, 13900]
			},
			{
				name: 'Returning Visitors',
				data: [4200, 4600, 5100, 4900, 5800, 6300, 6900]
			}
		],
		chart: {
			type: 'area',
			height: 300
		},
		colors: ['#0d6efd', '#20c997'],
		dataLabels: { enabled: false },
		stroke: { curve: 'smooth', width: 2 },
		xaxis: {
			categories: months.slice(0, 7).map((month) => `${month} '25`)
		},
		yaxis: { min: 0 }
	};

	const columnChartConfig: ApexOptions = {
		series: [
			{
				name: 'Online Store',
				data: [44300, 55600, 57200, 61400]
			},
			{
				name: 'Retail Stores',
				data: [35100, 41200, 36800, 45300]
			}
		],
		chart: {
			type: 'bar',
			height: 300
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%'
			}
		},
		colors: ['#6f42c1', '#20c997'],
		dataLabels: { enabled: false },
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent']
		},
		xaxis: {
			categories: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']
		},
		yaxis: { labels: { formatter: thousands } },
		tooltip: { y: { formatter: dollars } }
	};

	const donutChartConfig: ApexOptions = {
		series: [3450, 2210, 1160, 940, 620],
		chart: {
			type: 'donut',
			height: 350
		},
		labels: ['Organic Search', 'Direct', 'Referral', 'Social Media', 'Email'],
		colors: ['#0d6efd', '#20c997', '#ffc107', '#d63384', '#6f42c1'],
		dataLabels: { enabled: false }
	};

	const radialValues = [76, 67, 61];
	const radialBarChartConfig: ApexOptions = {
		series: radialValues,
		chart: {
			type: 'radialBar',
			height: 350
		},
		labels: ['Sales', 'Marketing', 'Support'],
		colors: ['#0d6efd', '#20c997', '#ffc107'],
		plotOptions: {
			radialBar: {
				dataLabels: {
					total: {
						show: true,
						label: 'Average',
						formatter: () =>
							`${Math.round(radialValues.reduce((sum, value) => sum + value, 0) / radialValues.length)}%`
					}
				}
			}
		}
	};

	const mixedChartConfig: ApexOptions = {
		series: [
			{
				name: 'Orders',
				type: 'column',
				data: [440, 505, 414, 671, 227, 413, 201, 352, 752]
			},
			{
				name: 'Revenue',
				type: 'line',
				data: [23100, 26200, 22800, 34100, 18300, 24400, 15600, 21900, 38200]
			}
		],
		chart: {
			type: 'line',
			height: 300
		},
		colors: ['#20c997', '#0d6efd'],
		stroke: {
			width: [0, 3],
			curve: 'smooth'
		},
		dataLabels: { enabled: false },
		xaxis: {
			categories: months.slice(0, 9)
		},
		yaxis: [
			{
				title: { text: 'Orders' }
			},
			{
				opposite: true,
				title: { text: 'Revenue' },
				labels: { formatter: thousands }
			}
		],
		tooltip: {
			y: [
				{ formatter: (val: number) => `${val}` },
				{ formatter: dollars }
			]
		}
	};
</script>

<svelte:head>
	<title>AdminLTE v4 | ApexCharts</title>
	<meta name="description" content="AdminLTE 4 ApexCharts showcase, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

<div class="app-content-header">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-6">
				<h1 class="mb-0 fs-3">ApexCharts</h1>
			</div>
			<div class="col-sm-6">
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb float-sm-end">
						<li class="breadcrumb-item"><a href="/">Home</a></li>
						<li class="breadcrumb-item active" aria-current="page">ApexCharts</li>
					</ol>
				</nav>
			</div>
		</div>
	</div>
</div>

<div class="app-content">
	<div class="container-fluid">
		<div class="row g-4">
			<div class="col-12 col-lg-6">
				<div class="card h-100">
					<div class="card-header">
						<h3 class="card-title">Line Chart</h3>
						<div class="card-tools">
							<button
								type="button"
								class="btn btn-tool"
								data-lte-toggle="card-collapse"
								aria-label="Collapse card"
							>
								<i data-lte-icon="expand" class="bi bi-plus-lg"></i>
								<i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
							</button>
						</div>
					</div>
					<div class="card-body">
						<div
							id="line-chart"
							role="img"
							aria-label="Line chart of monthly revenue, January to December"
							use:chart={lineChartConfig}
						></div>
					</div>
				</div>
			</div>

			<div class="col-12 col-lg-6">
				<div class="card h-100">
					<div class="card-header">
						<h3 class="card-title">Area Chart</h3>
						<div class="card-tools">
							<button
								type="button"
								class="btn btn-tool"
								data-lte-toggle="card-collapse"
								aria-label="Collapse card"
							>
								<i data-lte-icon="expand" class="bi bi-plus-lg"></i>
								<i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
							</button>
						</div>
					</div>
					<div class="card-body">
						<div
							id="area-chart"
							role="img"
							aria-label="Area chart of new and returning visitors, January to July 2025"
							use:chart={areaChartConfig}
						></div>
					</div>
				</div>
			</div>

			<div class="col-12 col-lg-6">
				<div class="card h-100">
					<div class="card-header">
						<h3 class="card-title">Column Chart</h3>
						<div class="card-tools">
							<button
								type="button"
								class="btn btn-tool"
								data-lte-toggle="card-collapse"
								aria-label="Collapse card"
							>
								<i data-lte-icon="expand" class="bi bi-plus-lg"></i>
								<i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
							</button>
						</div>
					</div>
					<div class="card-body">
						<div
							id="column-chart"
							role="img"
							aria-label="Column chart of online store and retail store sales per quarter of 2025"
							use:chart={columnChartConfig}
						></div>
					</div>
				</div>
			</div>

			<div class="col-12 col-lg-6">
				<div class="card h-100">
					<div class="card-header">
						<h3 class="card-title">Donut Chart</h3>
						<div class="card-tools">
							<button
								type="button"
								class="btn btn-tool"
								data-lte-toggle="card-collapse"
								aria-label="Collapse card"
							>
								<i data-lte-icon="expand" class="bi bi-plus-lg"></i>
								<i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
							</button>
						</div>
					</div>
					<div class="card-body">
						<div
							id="donut-chart"
							role="img"
							aria-label="Donut chart of traffic sources"
							use:chart={donutChartConfig}
						></div>
					</div>
				</div>
			</div>

			<div class="col-12 col-lg-6">
				<div class="card h-100">
					<div class="card-header">
						<h3 class="card-title">Radial Bar Chart</h3>
						<div class="card-tools">
							<button
								type="button"
								class="btn btn-tool"
								data-lte-toggle="card-collapse"
								aria-label="Collapse card"
							>
								<i data-lte-icon="expand" class="bi bi-plus-lg"></i>
								<i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
							</button>
						</div>
					</div>
					<div class="card-body">
						<div
							id="radialbar-chart"
							role="img"
							aria-label="Radial bar chart of goal completion for sales, marketing and support"
							use:chart={radialBarChartConfig}
						></div>
					</div>
				</div>
			</div>

			<div class="col-12 col-lg-6">
				<div class="card h-100">
					<div class="card-header">
						<h3 class="card-title">Mixed Chart</h3>
						<div class="card-tools">
							<button
								type="button"
								class="btn btn-tool"
								data-lte-toggle="card-collapse"
								aria-label="Collapse card"
							>
								<i data-lte-icon="expand" class="bi bi-plus-lg"></i>
								<i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
							</button>
						</div>
					</div>
					<div class="card-body">
						<div
							id="mixed-chart"
							role="img"
							aria-label="Mixed chart of monthly orders and revenue"
							use:chart={mixedChartConfig}
						></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
