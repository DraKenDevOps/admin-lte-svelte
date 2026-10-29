import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// SPA mode (admin tool, no SSR needs — MIGRATION-PLAN §2): the shell
			// markup depends on `document`/`localStorage`, so every page is
			// client-rendered from a shared `index.html` fallback.
			adapter: adapter({ fallback: 'index.html' })
		})
	],
	server: {
		port: 3000
	}
});
