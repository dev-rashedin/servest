import { build } from 'esbuild';

async function main() {
  try {
    await build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node18',
      outfile: 'dist/index.js',
      minify: true,
      sourcemap: false,
      external: [],
    });
    console.log('Build completed successfully.');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

main();
