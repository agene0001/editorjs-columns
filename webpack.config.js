// webpack.config.mjs
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const config = {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/editorjs-columns.js', // This should be correct

  output: {
    path: join(__dirname, 'dist'),
    filename: 'editorjs-columns.bundle.js',
    library: {
      type: 'module', // <<< KEY CHANGE: Output as an ES Module
    },
    clean: true, // Optional: cleans the dist folder before each build
  },

  experiments: {
    outputModule: true, // <<< KEY CHANGE: Enable ESM output experiment
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'], // style-loader might not be ideal for library ESM, consider mini-css-extract-plugin
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader','css-loader','sass-loader'], // same as above
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'svg-inline-loader',
          options: { removeSVGTagAttrs: false }
        }],
      },
    ],
  },
};

export default config;