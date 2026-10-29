export const ssr = false;
export const csr = true;
// SPA mode (MIGRATION-PLAN §2): adapter-static serves every route from the
// shared `index.html` fallback, so nothing is prerendered.
export const prerender = false;
