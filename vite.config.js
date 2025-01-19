import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    alias: {
      '@audio': path.resolve(__dirname, 'src/audio'),
      '@demos': path.resolve(__dirname, 'src/demos'),
    },
  },
  build: {
    target: 'esnext',
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/audio/*.ogg',
          dest: 'audio',
        },
        {
          src: 'src/audio/*.mid',
          dest: 'audio',
        },
      ],
    }),
  ],
});
