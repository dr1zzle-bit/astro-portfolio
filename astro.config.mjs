import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import { sanityConfig } from './src/utils/sanity-client';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  image: {
      domains: ['cdn.sanity.io']
  },

  integrations: [sanity(sanityConfig), react()],

  vite: {
      envPrefix: ['PUBLIC_', 'SANITY_STUDIO_'],
      plugins: [tailwindcss()],
      server: {
          hmr: { path: '/vite-hmr/' },
          allowedHosts: ['.netlify.app']
      }
  },

  server: {
      port: 3000
  },

  prefetch: true,
  adapter: netlify()
});