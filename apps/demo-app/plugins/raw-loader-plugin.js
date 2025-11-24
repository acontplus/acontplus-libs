import fs from 'fs';
import path from 'path';

/**
 * Esbuild plugin para manejar importaciones de archivos .html y .scss con ?raw
 * Ejemplo: import template from './app.html?raw';
 */
export const rawLoaderPlugin = {
  name: 'raw-loader-plugin',
  setup(build) {
    // Intercepta importaciones que terminen en .html?raw o .scss?raw
    build.onResolve({ filter: /\.(html|scss)\?raw$/ }, args => {
      const filePath = path.resolve(args.resolveDir, args.path.replace(/\?raw$/, ''));
      return { path: filePath, namespace: 'raw-file' };
    });

    // Carga el contenido de esos archivos como texto plano
    build.onLoad({ filter: /.*/, namespace: 'raw-file' }, args => {
      const content = fs.readFileSync(args.path, 'utf8');
      return {
        contents: `export default ${JSON.stringify(content)};`,
        loader: 'js',
      };
    });
  },
};
