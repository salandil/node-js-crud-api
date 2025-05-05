import path from 'path';
import { fileURLToPath } from 'url';

export default {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node20',
  mode: 'production',
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist'),
    libraryTarget: 'module',
    module: true, 
  },
};