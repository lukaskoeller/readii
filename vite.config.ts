import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['@electric-sql/pglite']
	},
	worker: {
		format: 'es'
	},
	assetsInclude: ['**/*.xml'],
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('>= 0.25%')),
			drafts: {
				customMedia: true
			}
		}
	},
	build: {
		cssMinify: 'lightningcss'
	}
});
