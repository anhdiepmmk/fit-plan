import { resolve } from 'path'
import { fileURLToPath } from 'url'
import handlebars from 'vite-plugin-handlebars'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default {
  root: 'src/pages',
  base: './',  // Use relative paths for GitHub Pages / static servers
  publicDir: resolve(__dirname, 'src/assets'),
  plugins: [
    handlebars({ 
      partialDirectory: resolve(__dirname, 'src/partials') 
    }),
    ViteMinifyPlugin({})
  ],
  build: {
    outDir: resolve(__dirname, 'docs'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        bmi: resolve(__dirname, 'src/pages/bmi.html'),
      },
    },
  },
}

