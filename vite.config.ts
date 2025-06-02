import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 8000,
    },
    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
        rollupOptions: {
            input: {
                main: './chatbot.html',
            },
            output: {
                // merge css and js into this file
                manualChunks: () => 'bundle.js',
            },
        },
    },
});
