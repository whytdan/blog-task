const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

console.log(isDev);

const optimization = () => {
  const config = {
    // ?this code makes split chunks, if two or more js files use tha same js library, webpack takes mutual code into seperate files
    splitChunks: {
      chunks: 'all',
    },
  };

  // add minimizer to js and css files
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

// ?we should use hash, to prevent cash problems on user's browsers, so that after each update filenames would change
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: filename('js'),
  },
  optimization: optimization(),
  devServer: {
    hot: true,
    port: 3000,
  },
  // ?if true, than source code(not transpiled one) will be shown in chrome's dev tool section
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    // ?css-loader - this loader enables ability to import css into js files
    // ?style-loader - this loader pastes style tags with required css into head of a html page

    rules: [
      {
        test: /\.css$/,
        use: [
          {
            // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      { test: /\.png|jpg|svg|gif$/, use: ['file-loader'] },
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          'eslint-loader',
        ],
      },
    ],
  },
};
