// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';

import sitemap from '@astrojs/sitemap';

function remarkPurpleHighlight() {
  // @ts-ignore
  return (tree) => {
    // @ts-ignore
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (node.name !== 'purple') return;

        const data = node.data || (node.data = {});
        const attributes = node.attributes || {};

        data.hName = 'span';
        data.hProperties = {
          class: 'text-purple-600 dark:text-purple-400 font-medium',
          ...attributes,
        };
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://nik1t7n.work',
  integrations: [react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkDirective, remarkPurpleHighlight],
  },

  vite: {
    plugins: [tailwindcss()]
  }
});