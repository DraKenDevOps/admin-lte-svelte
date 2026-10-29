<!--
	Advanced form elements — port of forms/advanced.html. Tom Select and Flatpickr init through actions.
-->
<script lang="ts">
    import { flatpickr, tomSelect } from "#lib/plugins/form-widgets";
    import type TomSelect from "tom-select";
    import "tom-select/dist/css/tom-select.bootstrap5.css";
    import "flatpickr/dist/flatpickr.css";

    const countryConfig = {
        plugins: ["clear_button"],
        sortField: [{ field: "text", direction: "asc" as const }]
    };

    const tagsConfig = {
        plugins: ["remove_button"],
        create: true,
        persist: false
    };

    const PAGE_SIZE = 12;
    const FIRST_NAMES = [
        "Olivia",
        "Liam",
        "Emma",
        "Noah",
        "Ava",
        "Ethan",
        "Sofia",
        "Lucas",
        "Mia",
        "Mateo",
        "Isla",
        "Arjun",
        "Nora",
        "Hugo",
        "Yuki",
        "Amara",
        "Elena",
        "Omar",
        "Freya",
        "Diego",
        "Leila",
        "Jonas",
        "Priya",
        "Marek"
    ];
    const TEAMS = ["Frontend", "Backend", "Design"];
    const REVIEWERS = FIRST_NAMES.flatMap((first, index) =>
        ["Bennett", "Carter", "Dawson"].map((last, offset) => ({
            id: index * 3 + offset + 1,
            name: `${first} ${last}`,
            team: TEAMS[(index + offset) % TEAMS.length]
        }))
    );

    type Reviewer = (typeof REVIEWERS)[number];
    type ReviewerPage = { results: Reviewer[]; next: string | null };
    type PagedSelect = TomSelect & {
        getUrl(query: string): string;
        setNextUrl(query: string, url: string): void;
    };

    function fetchReviewers(url: string, signal: AbortSignal): Promise<ReviewerPage> {
        const params = new URLSearchParams(url.slice(url.indexOf("?") + 1));
        const query = (params.get("q") || "").toLowerCase();
        const page = Number(params.get("page") || 1);
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                const matches = REVIEWERS.filter((person) => `${person.name} ${person.team}`.toLowerCase().includes(query));
                const start = (page - 1) * PAGE_SIZE;
                const hasMore = start + PAGE_SIZE < matches.length;
                resolve({
                    results: matches.slice(start, start + PAGE_SIZE),
                    next: hasMore ? `/api/reviewers?q=${encodeURIComponent(query)}&page=${page + 1}` : null
                });
            }, 400);
            signal.addEventListener("abort", () => {
                clearTimeout(timer);
                reject(new DOMException("Aborted", "AbortError"));
            });
        });
    }

    let inFlight: AbortController | null = null;

    const reviewerConfig = {
        valueField: "id",
        labelField: "name",
        searchField: ["name", "team"],
        placeholder: "Type to search 72 people…",
        preload: "focus",
        loadThrottle: 300,
        plugins: ["virtual_scroll"],
        firstUrl: (query: string) => `/api/reviewers?q=${encodeURIComponent(query)}&page=1`,
        async load(this: PagedSelect, query: string, callback: (results?: Reviewer[]) => void) {
            if (inFlight) inFlight.abort();
            inFlight = new AbortController();
            try {
                const json = await fetchReviewers(this.getUrl(query), inFlight.signal);
                if (json.next) this.setNextUrl(query, json.next);
                callback(json.results);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return;
                callback();
            }
        },
        render: {
            option: (data: Reviewer, escape: (value: string) => string) =>
                `<div class="d-flex justify-content-between align-items-center"><span>${escape(data.name)}</span><span class="badge text-bg-secondary">${escape(data.team)}</span></div>`,
            loading_more: () => '<div class="p-2 text-body-secondary small">Loading more…</div>',
            no_more_results: () => '<div class="p-2 text-body-secondary small">End of results</div>'
        }
    };

    const deliveryDateOptions = { dateFormat: "Y-m-d" };
    const meetingStartOptions = { enableTime: true, dateFormat: "Y-m-d H:i" };
    const reportPeriodOptions = { mode: "range" as const, dateFormat: "Y-m-d" };
    const reminderTimeOptions = {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    };
</script>

<svelte:head>
    <title>AdminLTE v4 | Advanced Form Elements</title>
    <meta name="description" content="AdminLTE 4 Advanced Form Elements, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

<div class="app-content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="mb-0 fs-3">Advanced Elements</h1>
            </div>
            <div class="col-sm-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb float-sm-end">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Forms</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Advanced Elements</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>
<div class="app-content">
    <div class="container-fluid">
        <div class="row g-4">
            <div class="col-12">
                <div class="callout callout-info">
                    AdminLTE deliberately doesn't bundle form widgets. The controls on this page use the recommended third-party integrations &mdash;
                    <a href="https://tom-select.js.org/" target="_blank" rel="noopener noreferrer" class="callout-link">Tom Select</a>
                    and
                    <a href="https://flatpickr.js.org/" target="_blank" rel="noopener noreferrer" class="callout-link">Flatpickr</a>. See the
                    <a href="../docs/integrations.html" class="callout-link">Recommended Integrations</a>
                    page for the full list with install snippets.
                </div>
            </div>

            <!-- Tom Select -->
            <div class="col-md-6">
                <div class="card card-primary card-outline mb-4">
                    <div class="card-header">
                        <div class="card-title">Tom Select</div>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <label for="country" class="form-label">Single select with search</label>
                            <select id="country" use:tomSelect={countryConfig} class="form-control" aria-label="Single select with search">
                                <option value="">Select a country&hellip;</option>
                                <option>Australia</option>
                                <option>Brazil</option>
                                <option>Canada</option>
                                <option>France</option>
                                <option>Germany</option>
                                <option>Italy</option>
                                <option>Japan</option>
                                <option>Latvia</option>
                                <option>Netherlands</option>
                                <option>Spain</option>
                                <option>United Kingdom</option>
                                <option>United States</option>
                            </select>
                            <div class="form-text">
                                Start typing to filter the list; the &times; button clears the selection (<code>clear_button</code>).
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="post-tags" class="form-label">Multi-select with tags</label>
                            <select id="post-tags" use:tomSelect={tagsConfig} class="form-control" aria-label="Multi-select with tags" multiple>
                                <option value="bootstrap" selected>Bootstrap</option>
                                <option value="javascript" selected>JavaScript</option>
                                <option value="css">CSS</option>
                                <option value="accessibility">Accessibility</option>
                                <option value="performance">Performance</option>
                                <option value="tooling">Tooling</option>
                            </select>
                            <div class="form-text">Type to filter, press Enter to create a new tag, use the &times; button to remove one.</div>
                        </div>
                        <div>
                            <label for="reviewer" class="form-label">Remote data with pagination</label>
                            <select id="reviewer" use:tomSelect={reviewerConfig} class="form-control" aria-label="Remote data with pagination"></select>
                            <div class="form-text">
                                Backed by 72 records behind a stubbed endpoint. Typing is debounced (<code>loadThrottle</code>), stale requests are cancelled
                                with
                                <code>AbortController</code>, and scrolling to the bottom of the list pulls the next page (<code>virtual_scroll</code>).
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-body-secondary small">
                        Powered by
                        <a href="https://tom-select.js.org/" target="_blank" rel="noopener" class="link-body-emphasis">Tom Select</a>
                        &mdash; vanilla JS, no jQuery required.
                    </div>
                </div>
            </div>

            <!-- Flatpickr -->
            <div class="col-md-6">
                <div class="card card-success card-outline mb-4">
                    <div class="card-header">
                        <div class="card-title">Flatpickr</div>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <label for="delivery-date" class="form-label">Date picker</label>
                            <input
                                type="text"
                                id="delivery-date"
                                use:flatpickr={deliveryDateOptions}
                                class="form-control"
                                placeholder="Select a delivery date"
                            />
                        </div>
                        <div class="mb-4">
                            <label for="meeting-start" class="form-label">Date &amp; time picker</label>
                            <input type="text" id="meeting-start" use:flatpickr={meetingStartOptions} class="form-control" placeholder="Select date and time" />
                        </div>
                        <div class="mb-4">
                            <label for="report-period" class="form-label">Range picker</label>
                            <input
                                type="text"
                                id="report-period"
                                use:flatpickr={reportPeriodOptions}
                                class="form-control"
                                placeholder="Select a reporting period"
                            />
                            <div class="form-text">Pick a start date, then an end date.</div>
                        </div>
                        <div>
                            <label for="reminder-time" class="form-label">Time picker</label>
                            <input type="text" id="reminder-time" use:flatpickr={reminderTimeOptions} class="form-control" placeholder="Select a time" />
                        </div>
                    </div>
                    <div class="card-footer text-body-secondary small">
                        Powered by
                        <a href="https://flatpickr.js.org/" target="_blank" rel="noopener" class="link-body-emphasis">Flatpickr</a>
                        &mdash; vanilla JS, no jQuery required.
                    </div>
                </div>
            </div>

            <!-- Select2 → Tom Select -->
            <div class="col-12" id="select2">
                <div class="card card-secondary card-outline mb-4">
                    <div class="card-header">
                        <div class="card-title">Coming from Select2?</div>
                    </div>
                    <div class="card-body">
                        <p>
                            <a href="https://select2.org/" target="_blank" rel="noopener noreferrer">Select2</a>
                            is still maintained, but it is still a jQuery plugin &mdash; there is no jQuery-free build. Tom Select covers the same feature set in
                            roughly
                            <strong>20&nbsp;kB gzip</strong>, against Select2's
                            <strong>~50&nbsp;kB</strong> once jQuery is counted. The API maps across almost one-to-one:
                        </p>
                        <div class="table-responsive" tabIndex="0" role="region" aria-label="Select2 to Tom Select API mapping">
                            <table class="table table-sm table-striped align-middle mb-0">
                                <caption class="visually-hidden"> Select2 options and methods mapped to their Tom Select equivalents </caption>
                                <thead>
                                    <tr>
                                        <th scope="col" style="width: 50%">Select2</th>
                                        <th scope="col">Tom Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>$("#x").select2()</code></td>
                                        <td><code>new TomSelect("#x")</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>tags: true</code></td>
                                        <td><code>create: true</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>allowClear: true</code></td>
                                        <td><code>plugins: ["clear_button"]</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>closeOnSelect: false</code></td>
                                        <td><code>closeAfterSelect: false</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>maximumSelectionLength: 3</code></td>
                                        <td><code>maxItems: 3</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>minimumInputLength: 2</code></td>
                                        <td><code>shouldLoad: (q) =&gt; q.length &gt;= 2</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>ajax: &#123; url, delay: 250 &#125;</code></td>
                                        <td>
                                            <code>load(query, callback)</code> + <code>loadThrottle: 250</code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>ajax.processResults</code></td>
                                        <td>
                                            <code>valueField</code> / <code>labelField</code> /
                                            <code>searchField</code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>infinite scroll (<code>pagination.more</code>)</td>
                                        <td>
                                            <code>plugins: ["virtual_scroll"]</code> + <code>setNextUrl()</code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>templateResult</code> / <code>templateSelection</code></td>
                                        <td><code>render: &#123; option, item &#125;</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>dropdownParent: $("#modal")</code></td>
                                        <td class="text-body-secondary"> Not needed &mdash; the dropdown renders inline </td>
                                    </tr>
                                    <tr>
                                        <td><code>$("#x").val("2").trigger("change")</code></td>
                                        <td><code>ts.setValue("2")</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>$("#x").val()</code></td>
                                        <td><code>ts.getValue()</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>.on("select2:select", fn)</code></td>
                                        <td><code>ts.on("item_add", fn)</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>.on("change", fn)</code></td>
                                        <td><code>ts.on("change", fn)</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>$("#x").select2("open")</code></td>
                                        <td><code>ts.open()</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>$("#x").prop("disabled", true)</code></td>
                                        <td><code>ts.disable()</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>$("#x").select2("destroy")</code></td>
                                        <td><code>ts.destroy()</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>$("#x").empty().select2(&#123; data &#125;)</code></td>
                                        <td><code>ts.clearOptions(); ts.addOptions(data)</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer text-body-secondary small">
                        Locked into Select2 for now? AdminLTE ships a styling-only
                        <a href="../docs/integrations.html#select2-compatibility-theme" class="link-body-emphasis">Select2 compatibility theme</a>
                        that makes it match Bootstrap 5.3 &mdash; including dark mode and dropdowns inside modals. No jQuery is added to AdminLTE itself; you bring
                        the plugin, we style it.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
