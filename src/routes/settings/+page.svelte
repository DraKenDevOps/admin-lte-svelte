<script lang="ts">
    import { layout, layoutBodyClassesFull, resetLayout, setFlag, type LayoutFlags } from "#lib/layout/layout-state.svelte";

    let appliedClasses = $derived(layoutBodyClassesFull(layout).join(" "));
    function toggle(key: keyof LayoutFlags, event: Event): void {
        setFlag(key, (event.currentTarget as HTMLInputElement).checked);
    }
    function toggleHoverExpand(event: Event): void {
        setFlag("withoutHover", !(event.currentTarget as HTMLInputElement).checked);
    }
</script>

<svelte:head>
    <title>AdminLTE v4 | Settings</title>
    <meta name="description" content="AdminLTE 4 Settings, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

{#if layout.customArea}
    <!--begin::App Content Top Area-->
    <div class="app-content-top-area">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div>App Content Top Area</div>
                </div>
                <div class="col-md-6 text-end">
                    <span class="text-secondary">Shown from Layout settings (custom areas)</span>
                </div>
            </div>
        </div>
    </div>
    <!--end::App Content Top Area-->
{/if}

<!--begin::App Content Header-->
<div class="app-content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="mb-0 fs-3">Settings</h1>
            </div>
            <div class="col-sm-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb float-sm-end">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Settings</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>
<!--end::App Content Header-->

<!--begin::App Content-->
<!-- svelte-ignore a11y_invalid_attribute -->
<div class="app-content">
    <div class="container-fluid">
        <div class="row g-3">
            <!-- Left rail -->
            <div class="col-md-3">
                <div class="list-group list-group-flush nav nav-pills flex-column" id="settings-nav" role="tablist">
                    <a href="#account" class="list-group-item list-group-item-action active" data-bs-toggle="pill" role="tab" aria-selected="true">
                        <i class="bi bi-person me-2" aria-hidden="true"></i>Account
                    </a>
                    <a href="#notifications" class="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab">
                        <i class="bi bi-bell me-2" aria-hidden="true"></i>Notifications
                    </a>
                    <a href="#security" class="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab">
                        <i class="bi bi-shield-lock me-2" aria-hidden="true"></i>Security
                    </a>
                    <a href="#billing" class="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab">
                        <i class="bi bi-credit-card me-2" aria-hidden="true"></i>Billing
                    </a>
                    <a href="#layout" class="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab">
                        <i class="bi bi-columns-gap me-2" aria-hidden="true"></i>Layout
                    </a>
                    <a href="#danger" class="list-group-item list-group-item-action text-danger-emphasis" data-bs-toggle="pill" role="tab">
                        <i class="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
                        Danger zone
                    </a>
                </div>
            </div>

            <!-- Tab content -->
            <div class="col-md-9">
                <div class="tab-content">
                    <!-- Account -->
                    <div class="tab-pane fade show active" id="account" role="tabpanel">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Account</h3>
                            </div>
                            <div class="card-body">
                                <form class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label" for="settings-name"> Full name </label>
                                        <input type="text" class="form-control" id="settings-name" value="Jane Doe" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="settings-email"> Email </label>
                                        <input type="email" class="form-control" id="settings-email" value="jane@example.com" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="settings-tz"> Time zone </label>
                                        <select class="form-select" id="settings-tz">
                                            <option>UTC</option>
                                            <option selected>America/Los_Angeles</option>
                                            <option>Europe/London</option>
                                            <option>Asia/Tokyo</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="settings-lang"> Language </label>
                                        <select class="form-select" id="settings-lang">
                                            <option selected>English</option>
                                            <option>Español</option>
                                            <option>Français</option>
                                            <option>Deutsch</option>
                                        </select>
                                    </div>
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Notifications -->
                    <div class="tab-pane fade" id="notifications" role="tabpanel">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Notifications</h3>
                            </div>
                            <div class="card-body">
                                <p class="text-secondary">Choose what to be notified about.</p>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Product updates</p>
                                        <small class="text-secondary">Major releases and changelogs</small>
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input class="form-check-input" type="checkbox" role="switch" id="notif-0" checked />
                                        <label class="visually-hidden" for="notif-0"> Toggle Product updates </label>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Security alerts</p>
                                        <small class="text-secondary">Sign-in attempts and account changes</small>
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input class="form-check-input" type="checkbox" role="switch" id="notif-1" checked />
                                        <label class="visually-hidden" for="notif-1"> Toggle Security alerts </label>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Weekly digest</p>
                                        <small class="text-secondary">A summary of activity in your workspace</small>
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input class="form-check-input" type="checkbox" role="switch" id="notif-2" />
                                        <label class="visually-hidden" for="notif-2"> Toggle Weekly digest </label>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Mentions</p>
                                        <small class="text-secondary">When a teammate @mentions you</small>
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input class="form-check-input" type="checkbox" role="switch" id="notif-3" />
                                        <label class="visually-hidden" for="notif-3"> Toggle Mentions </label>
                                    </div>
                                </div>
                                <button class="btn btn-primary mt-3">Save preferences</button>
                            </div>
                        </div>
                    </div>

                    <!-- Security -->
                    <div class="tab-pane fade" id="security" role="tabpanel">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Password</h3>
                            </div>
                            <div class="card-body">
                                <form class="row g-3">
                                    <div class="col-md-12">
                                        <label class="form-label" for="pwd-current"> Current password </label>
                                        <input type="password" class="form-control" id="pwd-current" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="pwd-new"> New password </label>
                                        <input type="password" class="form-control" id="pwd-new" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="pwd-confirm"> Confirm new password </label>
                                        <input type="password" class="form-control" id="pwd-confirm" />
                                    </div>
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary">Update password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card mt-3">
                            <div class="card-header">
                                <h3 class="card-title">Two-factor authentication</h3>
                            </div>
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="mb-0 fw-semibold">Authenticator app</p>
                                    <small class="text-secondary"> Use an authenticator app such as 1Password or Authy. </small>
                                </div>
                                <button class="btn btn-outline-primary">Enable</button>
                            </div>
                        </div>
                    </div>

                    <!-- Billing -->
                    <div class="tab-pane fade" id="billing" role="tabpanel">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Current plan</h3>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <p class="mb-0 fw-semibold">Pro plan</p>
                                        <small class="text-secondary"> $29 / month &middot; Renews June 18, 2026 </small>
                                    </div>
                                    <a href="#" class="btn btn-outline-primary btn-sm"> Change plan </a>
                                </div>
                                <hr />
                                <p class="fw-semibold mb-2">Payment method</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <i class="bi bi-credit-card-2-front me-2" aria-hidden="true"></i>
                                        Visa ending in 4242
                                    </div>
                                    <a href="#" class="btn btn-link btn-sm">Update</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Layout -->
                    <div class="tab-pane fade" id="layout" role="tabpanel">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Layout</h3>
                            </div>
                            <div class="card-body">
                                <p class="text-secondary">
                                    The former <code>layout/*.html</code> pages, gathered as switches. Changes apply immediately on this page and persist in
                                    this browser via
                                    <code>localStorage</code>.
                                </p>

                                <p class="fw-semibold mb-2">Sidebar</p>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Fixed sidebar</p>
                                        <small class="text-secondary"
                                            >Sidebar scrolls with the page when off (<code>layout-fixed</code> on
                                            <code>&lt;body&gt;</code>)</small
                                        >
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="layout-sidebar-fixed"
                                            checked={layout.fixedSidebar}
                                            disabled={layout.topNav}
                                            onchange={(e) => toggle("fixedSidebar", e)}
                                        />
                                        <label class="visually-hidden" for="layout-sidebar-fixed">Toggle fixed sidebar</label>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Sidebar mini</p>
                                        <small class="text-secondary">Icon-only compact sidebar; the collapsed state below only applies with this on</small>
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="layout-sidebar-mini"
                                            checked={layout.sidebarMini}
                                            disabled={layout.topNav}
                                            onchange={(e) => toggle("sidebarMini", e)}
                                        />
                                        <label class="visually-hidden" for="layout-sidebar-mini">Toggle sidebar mini</label>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Sidebar collapsed on load</p>
                                        <small class="text-secondary">Starts every visit collapsed (<code>sidebar-collapse</code>); implies Sidebar Mini</small>
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="layout-sidebar-collapsed"
                                            checked={layout.collapsed}
                                            disabled={layout.topNav}
                                            onchange={(e) => toggle("collapsed", e)}
                                        />
                                        <label class="visually-hidden" for="layout-sidebar-collapsed">Toggle sidebar collapsed on load</label>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Hover expand</p>
                                        <small class="text-secondary"
                                            >Hovering expands the collapsed mini sidebar; turning this off recreates the “Sidebar Mini + Collapsed + No Hover”
                                            variant</small
                                        >
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="layout-hover-expand"
                                            checked={!layout.withoutHover}
                                            disabled={layout.topNav}
                                            onchange={toggleHoverExpand}
                                        />
                                        <label class="visually-hidden" for="layout-hover-expand">Toggle hover expand</label>
                                    </div>
                                </div>

                                <p class="fw-semibold mb-2 mt-3">Positioning</p>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Fixed header</p>
                                        <small class="text-secondary"
                                            >Sticky app header (<code>fixed-header</code>; “Fixed Complete” = this + fixed footer)</small
                                        >
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="layout-header-fixed"
                                            checked={layout.fixedHeader}
                                            onchange={(e) => toggle("fixedHeader", e)}
                                        />
                                        <label class="visually-hidden" for="layout-header-fixed">Toggle fixed header</label>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-start py-2">
                                    <div>
                                        <p class="mb-0 fw-semibold">Fixed footer</p>
                                        <small class="text-secondary">Sticky app footer (<code>fixed-footer</code>)</small>
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="layout-footer-fixed"
                                            checked={layout.fixedFooter}
                                            onchange={(e) => toggle("fixedFooter", e)}
                                        />
                                        <label class="visually-hidden" for="layout-footer-fixed">Toggle fixed footer</label>
                                    </div>
                                </div>

                                <p class="fw-semibold mb-2 mt-3">Header only &amp; brand</p>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Top navigation</p>
                                        <small class="text-secondary">Header-only layout without the sidebar; primary navigation lives in the app header</small>
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="layout-top-nav"
                                            checked={layout.topNav}
                                            onchange={(e) => toggle("topNav", e)}
                                        />
                                        <label class="visually-hidden" for="layout-top-nav">Toggle top navigation</label>
                                    </div>
                                </div>

                                <p class="fw-semibold mb-2 mt-3">Content areas</p>
                                <div class="d-flex justify-content-between align-items-start py-2 border-bottom">
                                    <div>
                                        <p class="mb-0 fw-semibold">Custom areas</p>
                                        <small class="text-secondary">Shows the top/bottom custom content areas (demo lives on this page)</small>
                                    </div>
                                    <div class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="layout-custom-areas"
                                            checked={layout.customArea}
                                            onchange={(e) => toggle("customArea", e)}
                                        />
                                        <label class="visually-hidden" for="layout-custom-areas">Toggle custom areas</label>
                                    </div>
                                </div>

                                <p class="fs-7 text-body-secondary mt-3 mb-2">
                                    Current body classes:
                                    <code>{appliedClasses}</code>
                                </p>

                                <button type="button" class="btn btn-outline-secondary btn-sm" id="layout-reset" onclick={resetLayout}>
                                    <i class="bi bi-arrow-counterclockwise me-1" aria-hidden="true"></i>
                                    Reset to defaults
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Danger zone -->
                    <div class="tab-pane fade" id="danger" role="tabpanel">
                        <div class="card border-danger">
                            <div class="card-header bg-danger-subtle">
                                <h3 class="card-title text-danger-emphasis">Danger zone</h3>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <p class="mb-0 fw-semibold">Export account data</p>
                                        <small class="text-secondary"> Download a copy of all your data as a ZIP archive. </small>
                                    </div>
                                    <button class="btn btn-outline-secondary">Export</button>
                                </div>
                                <hr />
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p class="mb-0 fw-semibold text-danger-emphasis">Delete account</p>
                                        <small class="text-secondary">
                                            This will permanently delete your account and all associated data. This cannot be undone.
                                        </small>
                                    </div>
                                    <button class="btn btn-danger">Delete account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--end::App Content-->
