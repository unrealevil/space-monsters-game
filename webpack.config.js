const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV ?? 'development';

// noinspection WebpackConfigHighlighting
module.exports = {
  mode: NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: NODE_ENV === 'development',
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.[tj]sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: [/\.svg$/, /\.png$/, /\.jpe?g$/, /\.gif$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/sounds',
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new HTMLWebPackPlugin({
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
  devServer: {
    port: 3001,
    overlay: false,
    open: false,
    hot: true,
    historyApiFallback: true,
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : false,
};
