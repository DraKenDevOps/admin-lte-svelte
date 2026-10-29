<svelte:head>
    <title>AdminLTE v4 | Lockscreen</title>
    <meta name="description" content="AdminLTE 4 Lockscreen, migrated to Svelte 5 + SvelteKit." />
</svelte:head>

<div class="lockscreen bg-body-secondary min-vh-100 py-5">
    <div class="lockscreen-wrapper">
        <h1 class="lockscreen-logo">
            <a href="/"><b>Admin</b>LTE</a>
        </h1>

        <div class="lockscreen-name">John Doe</div>

        <div class="lockscreen-item">
            <div class="lockscreen-image">
                <img src="/img/user1-128x128.jpg" alt="John Doe" />
            </div>

            <form class="lockscreen-credentials">
                <label class="visually-hidden" for="lockscreenPassword">Password</label>
                <div class="input-group">
                    <input id="lockscreenPassword" type="password" class="form-control shadow-none" placeholder="password" />
                    <div class="input-group-text border-0 bg-transparent px-1">
                        <button type="button" class="btn shadow-none" aria-label="Sign in">
                            <i class="bi bi-box-arrow-right text-body-secondary"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div class="help-block text-center">Enter your password to retrieve your session</div>
        <div class="text-center">
            <a href="/examples/login" class="text-decoration-none">Or sign in as a different user</a>
        </div>
        <div class="lockscreen-footer text-center">
            Copyright © 2014-2026 &nbsp;
            <b>
                <a href="https://adminlte.io" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">AdminLTE.io</a>
            </b>
            <br />
            All rights reserved
        </div>
    </div>
</div>
