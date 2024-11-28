import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import browserslist from 'browserslist';
import {browserslistToTargets} from 'lightningcss';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
  ],
  build: {
    sourcemap: true, // @todo remove when on production
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')),
      drafts: {
        customMedia: true,
      }
    }
  },
});
