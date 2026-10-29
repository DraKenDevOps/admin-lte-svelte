<!--
	Form wizard — port of forms/wizard.html, including the step indicator styles.
-->
<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        const form = document.getElementById("wizard-form") as HTMLFormElement;
        const steps = [...form.querySelectorAll<HTMLElement>(".wizard-step")];
        const indicators = [...document.querySelectorAll<HTMLElement>("#wizard-steps li")];
        const prevBtn = document.getElementById("wz-prev") as HTMLButtonElement;
        const nextBtn = document.getElementById("wz-next") as HTMLButtonElement;
        const submitBtn = document.getElementById("wz-submit") as HTMLButtonElement;
        let current = 0;

        const get = (id: string) => document.getElementById(id) as HTMLInputElement | HTMLSelectElement;

        const renderSummary = () => {
            const summary = document.getElementById("wz-summary");
            if (!summary) return;
            const rows: [string, string][] = [
                ["Email", get("wz-email").value],
                ["Username", get("wz-username").value],
                ["Name", `${get("wz-first").value} ${get("wz-last").value}`],
                ["Company", get("wz-company").value || "—"],
                ["Role", get("wz-role").value || "—"],
                ["Digest", get("wz-frequency").value]
            ];
            summary.innerHTML = rows
                .map(([k, v]) => `<dt class="col-sm-4 text-secondary fw-normal">${k}</dt><dd class="col-sm-8 fw-semibold">${v}</dd>`)
                .join("");
        };

        const show = (i: number) => {
            steps.forEach((step, idx) => step.classList.toggle("d-none", idx !== i));
            indicators.forEach((li, idx) => {
                li.classList.toggle("active", idx === i);
                li.classList.toggle("completed", idx < i);
            });
            prevBtn.disabled = i === 0;
            const last = i === steps.length - 1;
            nextBtn.classList.toggle("d-none", last);
            submitBtn.classList.toggle("d-none", !last);
            if (last) renderSummary();
        };

        const validateStep = (i: number) => {
            const fields = steps[i].querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");
            let valid = true;
            for (const field of fields) {
                field.classList.remove("is-invalid");
                if (!field.checkValidity()) {
                    field.classList.add("is-invalid");
                    valid = false;
                }
            }
            if (i === 0) {
                const p1 = get("wz-password") as HTMLInputElement;
                const p2 = get("wz-password2") as HTMLInputElement;
                if (p1.value !== p2.value) {
                    p2.classList.add("is-invalid");
                    valid = false;
                }
            }
            return valid;
        };

        const onNext = () => {
            if (!validateStep(current)) return;
            if (current < steps.length - 1) {
                current++;
                show(current);
            }
        };
        const onPrev = () => {
            if (current > 0) {
                current--;
                show(current);
            }
        };
        const onSubmit = (event: Event) => {
            event.preventDefault();
            if (!validateStep(current)) return;
            alert("Wizard complete! Form would submit here.");
        };

        nextBtn.addEventListener("click", onNext);
        prevBtn.addEventListener("click", onPrev);
        form.addEventListener("submit", onSubmit);
        show(0);

        return () => {
            nextBtn.removeEventListener("click", onNext);
            prevBtn.removeEventListener("click", onPrev);
            form.removeEventListener("submit", onSubmit);
        };
    });
</script>

<svelte:head>
    <title>AdminLTE v4 | Form Wizard</title>
    <meta name="description" content="AdminLTE 4 Form Wizard, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

<div class="app-content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="mb-0 fs-3">Form Wizard</h1>
            </div>
            <div class="col-sm-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb float-sm-end">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Forms</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Wizard</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>
<div class="app-content">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-lg-10 col-xl-8">
                <div class="card">
                    <div class="card-body p-4">
                        <!-- Step indicators -->
                        <ol class="wizard-steps mb-4" id="wizard-steps">
                            <li class="active" data-step="0">Account</li>
                            <li data-step="1">Profile</li>
                            <li data-step="2">Preferences</li>
                            <li data-step="3">Review</li>
                        </ol>

                        <!-- Form -->
                        <form id="wizard-form" novalidate>
                            <!-- Step 1 -->
                            <fieldset class="wizard-step" data-step="0">
                                <h2 class="h5 mb-3">Create your account</h2>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label" for="wz-email">Email</label>
                                        <input type="email" class="form-control" id="wz-email" required />
                                        <div class="invalid-feedback">Please enter a valid email.</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="wz-username"> Username </label>
                                        <input type="text" class="form-control" id="wz-username" required minlength="3" />
                                        <div class="invalid-feedback">Username must be at least 3 characters.</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="wz-password"> Password </label>
                                        <input type="password" class="form-control" id="wz-password" required minlength="8" />
                                        <div class="invalid-feedback">Password must be at least 8 characters.</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="wz-password2"> Confirm password </label>
                                        <input type="password" class="form-control" id="wz-password2" required />
                                        <div class="invalid-feedback">Passwords must match.</div>
                                    </div>
                                </div>
                            </fieldset>

                            <!-- Step 2 -->
                            <fieldset class="wizard-step d-none" data-step="1">
                                <h2 class="h5 mb-3">Tell us about yourself</h2>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label" for="wz-first"> First name </label>
                                        <input type="text" class="form-control" id="wz-first" required />
                                        <div class="invalid-feedback">First name is required.</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="wz-last"> Last name </label>
                                        <input type="text" class="form-control" id="wz-last" required />
                                        <div class="invalid-feedback">Last name is required.</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="wz-company"> Company </label>
                                        <input type="text" class="form-control" id="wz-company" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label" for="wz-role"> Role </label>
                                        <select class="form-select" id="wz-role" required>
                                            <option value="">Choose&hellip;</option>
                                            <option>Founder / CEO</option>
                                            <option>Engineering</option>
                                            <option>Design</option>
                                            <option>Marketing</option>
                                            <option>Other</option>
                                        </select>
                                        <div class="invalid-feedback">Please select a role.</div>
                                    </div>
                                </div>
                            </fieldset>

                            <!-- Step 3 -->
                            <fieldset class="wizard-step d-none" data-step="2">
                                <h2 class="h5 mb-3">Notification preferences</h2>
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="wz-notif-product" role="switch" checked />
                                    <label class="form-check-label" for="wz-notif-product"> Product updates &amp; releases </label>
                                </div>
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="wz-notif-security" role="switch" checked />
                                    <label class="form-check-label" for="wz-notif-security"> Security alerts </label>
                                </div>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="wz-notif-marketing" role="switch" />
                                    <label class="form-check-label" for="wz-notif-marketing"> Marketing &amp; tips </label>
                                </div>
                                <label class="form-label" for="wz-frequency"> Digest frequency </label>
                                <select class="form-select" id="wz-frequency">
                                    <option>Real time</option>
                                    <option selected>Daily</option>
                                    <option>Weekly</option>
                                    <option>Never</option>
                                </select>
                            </fieldset>

                            <!-- Step 4 -->
                            <fieldset class="wizard-step d-none" data-step="3">
                                <h2 class="h5 mb-3">Review &amp; confirm</h2>
                                <dl class="row mb-3" id="wz-summary"></dl>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="wz-terms" required />
                                    <label class="form-check-label" for="wz-terms">
                                        I agree to the <a href="#">terms of service</a>.
                                    </label>
                                    <div class="invalid-feedback">You must accept the terms to continue.</div>
                                </div>
                            </fieldset>

                            <!-- Navigation -->
                            <div class="d-flex justify-content-between mt-4">
                                <button type="button" class="btn btn-outline-secondary" id="wz-prev" disabled>
                                    <i class="bi bi-arrow-left me-1" aria-hidden="true"></i>
                                    Previous
                                </button>
                                <button type="button" class="btn btn-primary" id="wz-next">
                                    Next
                                    <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>
                                </button>
                                <button type="submit" class="btn btn-success d-none" id="wz-submit">
                                    <i class="bi bi-check-lg me-1" aria-hidden="true"></i>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .wizard-steps {
        counter-reset: step;
        list-style: none;
        padding: 0;
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .wizard-steps::before {
        content: "";
        position: absolute;
        top: 1rem;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--bs-border-color);
        z-index: 0;
    }
    .wizard-steps li {
        position: relative;
        z-index: 1;
        background: var(--bs-body-bg);
        padding: 0 0.75rem;
        text-align: center;
        color: var(--bs-secondary-color);
        font-size: 0.875rem;
    }
    .wizard-steps li::before {
        counter-increment: step;
        content: counter(step);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        margin: 0 auto 0.5rem;
        border-radius: 50%;
        background: var(--bs-body-tertiary-bg);
        border: 2px solid var(--bs-border-color);
        color: var(--bs-secondary-color);
        font-weight: 600;
    }
    .wizard-steps li.active {
        color: var(--bs-primary);
        font-weight: 600;
    }
    .wizard-steps li.active::before {
        background: var(--bs-primary);
        border-color: var(--bs-primary);
        color: #fff;
    }
    .wizard-steps li.completed::before {
        background: var(--bs-success);
        border-color: var(--bs-success);
        color: #fff;
        content: "\f633";
        font-family: "bootstrap-icons";
    }
</style>
