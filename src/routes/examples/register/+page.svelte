<svelte:head>
    <title>AdminLTE v4 | Register Page</title>
    <meta name="description" content="AdminLTE 4 Register Page, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

<div class="register-page bg-body-secondary">
    <div class="register-box">
        <h1 class="register-logo">
            <a href="/"><b>Admin</b>LTE</a>
        </h1>
        <div class="card">
            <div class="card-body register-card-body">
                <p class="register-box-msg">Register a new membership</p>

                <form action="/" method="post">
                    <label class="visually-hidden" for="registerName">Full Name</label>
                    <div class="input-group mb-3">
                        <input id="registerName" type="text" class="form-control" placeholder="Full Name" />
                        <div class="input-group-text">
                            <span class="bi bi-person"></span>
                        </div>
                    </div>
                    <label class="visually-hidden" for="registerEmail">Email</label>
                    <div class="input-group mb-3">
                        <input id="registerEmail" type="email" class="form-control" placeholder="Email" />
                        <div class="input-group-text">
                            <span class="bi bi-envelope"></span>
                        </div>
                    </div>
                    <label class="visually-hidden" for="registerPassword">Password</label>
                    <div class="input-group mb-3">
                        <input id="registerPassword" type="password" class="form-control" placeholder="Password" />
                        <div class="input-group-text">
                            <span class="bi bi-lock-fill"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    I agree to the <a href="#">terms</a>
                                </label>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">Register</button>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="social-auth-links text-center mb-3 d-grid gap-2">
                    <p>- OR -</p>
                    <a href="#" class="btn btn-primary">
                        <i class="bi bi-facebook me-2"></i> Sign up using Facebook
                    </a>
                    <a href="#" class="btn btn-danger">
                        <i class="bi bi-google me-2"></i> Sign up using Google
                    </a>
                </div>

                <p class="mb-0">
                    <a href="/examples/login" class="text-center"> I already have a membership </a>
                </p>
            </div>
        </div>
    </div>
</div>
