// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     headers: {
//       "Cross-Origin-Embedder-Policy": "require-corp",
//       "Cross-Origin-Opener-Policy": "same-origin",
//     },
//   },
//   publicDir: 'public',
//   // assetsInclude: ['**/*.pck'],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
    server: {
        // fs: {
        //     allow: ['.'],
        // },
        headers: {
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
              },
    },
    publicDir: 'public',
});
