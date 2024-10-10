import { defineConfig } from 'electron-vite';
import { defineConfig as defineViteConfig } from 'vite';
import { resolve } from 'path';

const SRC_DIR = resolve(__dirname, './src');
const OUTPUT_DIR = resolve(__dirname, './dist');

const BaseConfig = defineViteConfig({
    root: __dirname,
    resolve: {
        alias: {
            '@': SRC_DIR,
        },
    },
});

const ConfigBuilder = (type: 'main' | 'preload') => defineViteConfig({
    ...BaseConfig,
    plugins: [
    ],
    build: {
        minify: true,
        outDir: resolve(OUTPUT_DIR),
        emptyOutDir: false,
        lib: {
            entry: resolve(SRC_DIR, `${type}.ts`),
            formats: ['cjs'],
            fileName: () => `${type}.js`,
        }
    },
});

const init = defineViteConfig({
    build: {
        emptyOutDir: true
    }
})

export default defineConfig({
    ...init,
    main: ConfigBuilder('main'),
    preload: ConfigBuilder('preload'),
    renderer: defineViteConfig({
        ...BaseConfig,
        plugins: [
        ],
        build: {
            minify: 'esbuild',
            outDir: resolve(OUTPUT_DIR),
            lib: {
                entry: resolve(SRC_DIR, 'renderer.ts'),
                formats: ['es'],
                fileName: () => 'renderer.js',
            },
            emptyOutDir: false,
            rollupOptions: {
                input: resolve(SRC_DIR, 'renderer.ts'),
            },
        },
    }),
});