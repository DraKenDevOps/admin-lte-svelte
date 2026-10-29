export interface NavEntry {
    header?: string;
    label: string;
    icon?: string;
    href?: string;
    small?: string;
    badge?: { text: string; class: string };
    iconClass?: string;
    children?: NavEntry[];
    soon?: true;
}

const circle = "nav-icon bi bi-circle";

export const NAV_ITEMS: NavEntry[] = [
    {
        label: "Dashboard",
        icon: "nav-icon bi bi-house",
        children: [
            { label: "Dashboard v1", icon: circle, href: "/" },
            { label: "Dashboard v2", icon: circle, href: "/dashboards/v2" },
            { label: "Dashboard v3", icon: circle, href: "/dashboards/v3" }
        ]
    },
    { label: "Settings", icon: "nav-icon bi bi-gear", href: "/settings" },
    {
        label: "Forms",
        icon: "nav-icon bi bi-pencil-square",
        children: [
            { label: "Elements", icon: circle, href: "/forms/elements" },
            { label: "Layout", icon: circle, href: "/forms/layout" },
            { label: "Validation", icon: circle, href: "/forms/validation" },
            { label: "Wizard", icon: circle, href: "/forms/wizard" },
            { label: "Advanced Elements", icon: circle, href: "/forms/advanced" },
            { label: "Editors", icon: circle, href: "/forms/editors" }
        ]
    },
    {
        label: "Charts",
        icon: "nav-icon bi bi-graph-up",
        children: [{ label: "ApexCharts", icon: circle, href: "/charts/apexcharts" }]
    },
    { header: "PAGES", label: "" },
    {
        label: "Pages",
        icon: "nav-icon bi bi-file-earmark-text",
        children: [
            { label: "Profile", icon: circle, href: "/pages/profile" },
            { label: "404", icon: circle, href: "/pages/404" },
            { label: "500", icon: circle, href: "/pages/500" },
            { label: "Maintenance", icon: circle, href: "/pages/maintenance" }
        ]
    },
    { header: "EXAMPLES", label: "" },
    {
        label: "Auth",
        icon: "nav-icon bi bi-box-arrow-in-right",
        children: [
            { label: "Login", icon: circle, href: "/examples/login" },
            { label: "Register", icon: circle, href: "/examples/register" },
            { label: "Forgot Password", icon: circle, href: "/examples/forgot-password" },
            { label: "Lockscreen", icon: circle, href: "/examples/lockscreen" }
        ]
    }
];

export interface NavTrail {
    entry: NavEntry;
    ancestors: string[];
}

/** First menu leaf whose `href` is `pathname`. Headers and `#` links are skipped. */
export function findNavTrail(pathname: string, list: NavEntry[] = NAV_ITEMS, ancestors: string[] = []): NavTrail | undefined {
    for (const item of list) {
        if (item.header) continue;
        if (item.href && item.href !== "#" && item.href === pathname) {
            return { entry: item, ancestors };
        }
        if (item.children?.length) {
            const next = item.label ? [...ancestors, item.label] : ancestors;
            const found = findNavTrail(pathname, item.children, next);
            if (found) return found;
        }
    }
    return undefined;
}

if (import.meta.env.DEV) {
    const sample: NavEntry[] = [{ label: "Section", children: [{ label: "Leaf", href: "/section/leaf" }] }];
    const hit = findNavTrail("/section/leaf", sample);
    if (hit?.entry.label !== "Leaf" || hit.ancestors.join("/") !== "Section" || findNavTrail("/missing", sample)) {
        throw new Error("findNavTrail broke");
    }
}
