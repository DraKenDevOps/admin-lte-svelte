<script lang="ts">
    // Markup-only component; everything is attribute-driven.
</script>

<nav class="app-header navbar navbar-expand bg-body">
    <div class="container-fluid">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-lte-toggle="sidebar" href="#" role="button" aria-label="Toggle sidebar">
                    <i class="bi bi-list"></i>
                </a>
            </li>

            <li class="nav-item d-none d-md-block">
                <a href="/" class="nav-link">
                    <i class="bi bi-grid-1x2 me-1" aria-hidden="true"></i>
                    Dashboard
                </a>
            </li>
        </ul>

        <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
                <a
                    class="nav-link"
                    href="#"
                    id="language-menu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Change language, current language English"
                >
                    <i class="bi bi-translate" aria-hidden="true"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="language-menu">
                    <li>
                        <a class="dropdown-item active" href="#" hreflang="en" aria-current="true">
                            English
                            <i class="bi bi-check-lg ms-2" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li><a class="dropdown-item" href="#" hreflang="es">Español</a></li>
                    <li><a class="dropdown-item" href="#" hreflang="fr">Français</a></li>
                    <li><a class="dropdown-item" href="#" hreflang="de">Deutsch</a></li>
                </ul>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="#" data-lte-toggle="fullscreen" aria-label="Toggle fullscreen">
                    <i data-lte-icon="maximize" class="bi bi-arrows-fullscreen"></i>
                    <i data-lte-icon="minimize" class="bi bi-fullscreen-exit d-none"></i>
                </a>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link" href="#" id="bd-theme" aria-label="Toggle color scheme" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-sun-fill" data-lte-theme-icon="light"></i>
                    <i class="bi bi-moon-fill d-none" data-lte-theme-icon="dark"></i>
                    <i class="bi bi-circle-half d-none" data-lte-theme-icon="auto"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme" style="--bs-dropdown-min-width: 8rem">
                    <li>
                        <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
                            <i class="bi bi-sun-fill me-2"></i>
                            Light
                            <i class="bi bi-check-lg ms-auto d-none"></i>
                        </button>
                    </li>
                    <li>
                        <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                            <i class="bi bi-moon-fill me-2"></i>
                            Dark
                            <i class="bi bi-check-lg ms-auto d-none"></i>
                        </button>
                    </li>
                    <li>
                        <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
                            <i class="bi bi-circle-half me-2"></i>
                            Auto
                            <i class="bi bi-check-lg ms-auto d-none"></i>
                        </button>
                    </li>
                </ul>
            </li>

            <li class="nav-item dropdown user-menu">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <img src="/img/user2-160x160.jpg" class="user-image rounded-circle shadow" alt="" />
                </a>
                <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                    <li class="user-header text-bg-secondary">
                        <img src="/img/user2-160x160.jpg" class="rounded-circle shadow" alt="" />
                        <p>Alex - Web Developer</p>
                    </li>

                    <li class="user-footer">
                        <button class="btn btn-outline-danger float-end">Sign out</button>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
