<svelte:head>
    <title>AdminLTE v4 | Forgot Password</title>
    <meta name="description" content="AdminLTE 4 Forgot Password Page, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

<div class="login-page bg-body-secondary">
    <div class="login-box">
        <h1 class="login-logo">
            <a href="/"><b>Admin</b>LTE</a>
        </h1>
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

                <form action="/examples/login" method="post">
                    <label class="visually-hidden" for="forgotEmail">Email</label>
                    <div class="input-group mb-3">
                        <input id="forgotEmail" type="email" class="form-control" placeholder="Email" />
                        <div class="input-group-text">
                            <span class="bi bi-envelope"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">Request new password</button>
                            </div>
                        </div>
                    </div>
                </form>

                <p class="mt-3 mb-1">
                    <a href="/examples/login">Login</a>
                </p>
                <p class="mb-0">
                    <a href="/examples/register" class="text-center"> Register a new membership </a>
                </p>
            </div>
        </div>
    </div>
</div>
