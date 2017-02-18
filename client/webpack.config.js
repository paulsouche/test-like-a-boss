const path = require('path');
const webpack = require('webpack');

const autoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch' || ENV === 'e2e';
const isProd = ENV === 'build';
const isWatching = ENV === 'start';
const proxy = process.env.PROXY || 'http://localhost:3000';
const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT, 10) || 3001;

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

module.exports = (function makeWebpackConfig() {
  const fontsQuery = '&limit=65000&publicPath=../&name=fonts/[name].[hash].[ext]?';

  const webpackConfig = {
    entry: {
      'app': './src/main.ts',
    },
    output: {
      path: root('www'),
      filename: isProd ? '[name].[hash].js' : '[name].js',
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          include: root('src'),
          loader: 'tslint-loader',
        },
        {
          test: /\.ts$/,
          loader: isProd ? ['@ngtools/webpack'] : ['angular2-template-loader', 'ts-loader'],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
            customAttrAssign: [/\)?\]?=/],
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          include: root('src'),
          loader: 'file-loader?name=img/[name].[hash].[ext]?',
        },
        {
          test: /\.svg/,
          exclude: root('src'),
          loader: 'url-loader?mimetype=image/svg+xml'.concat(fontsQuery),
        },
        {
          test: /\.woff/,
          loader: 'url-loader?mimetype=application/font-woff'.concat(fontsQuery),
        },
        {
          test: /\.woff2/,
          loader: 'url-loader?mimetype=application/font-woff2'.concat(fontsQuery),
        },
        {
          test: /\.ttf/,
          loader: 'url-loader?mimetype=application/octet-stream'.concat(fontsQuery),
        },
        {
          test: /\.otf/,
          loader: 'url-loader?mimetype=application/octet-stream'.concat(fontsQuery),
        },
        {
          test: /\.eot/,
          loader: 'url-loader?mimetype=application/vnd.ms-fontobject'.concat(fontsQuery),
        },
        {
          test: /\.scss$/,
          include: root('src', 'app'),
          loader: ['raw-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.scss$/,
          exclude: root('src', 'app'),
          loader: isProd
            ? ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: ['css-loader', 'postcss-loader', 'sass-loader'],
            })
            : isTest
              ? 'null-loader'
              : ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.html', '.scss'],
    },
    plugins: [
      // see https://github.com/angular/angular/issues/11580
      new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, './src'),
      new webpack.DefinePlugin({
        // Environment helpers
        global: {
          env: JSON.stringify(isProd ? 'prod' : 'dev'),
        },
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            autoPrefixer({
              // taken from https://github.com/driftyco/ionic-app-scripts/blob/master/config/sass.config.js
              browsers: [
                'last 2 versions',
                'iOS >= 8',
                'Android >= 4.4',
                'Explorer >= 11',
                'ExplorerMobile >= 11',
              ],
              cascade: false,
            }),
          ],
        },
      }),
      new StyleLintPlugin({
        configFile: '.stylelintrc',
        context: 'src',
        syntax: 'scss',
        failOnError: false,
      }),
    ],
    devServer: {
      host,
      port,
      proxy: [
        {
          context: ['**/api/**'],
          target: proxy,
          secure: false,
        },
      ],
    },
  };

  if (isWatching) {
    webpackConfig.devtool = 'source-map';
  }

  if (isTest) {
    // instrument only testing sources with Istanbul, covers ts files
    webpackConfig.module.loaders.push({
      test: /\.ts$/,
      include: root('src'),
      loader: 'istanbul-instrumenter-loader',
      query: {
        esModules: true,
      },
      enforce: 'post',
      exclude: [/\.spec\.ts$/, /node_modules/],
    });
  } else {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        favicon: './src/public/favicon.ico',
        template: './src/public/index.html',
      }));
  }

  // Add build specific plugins
  if (isProd) {
    webpackConfig.plugins.push(
      new ngToolsWebpack.AotPlugin({
        tsConfigPath: root('tsconfig.json'),
        entryModule: path.resolve('src/app/app.module#AppModule'),
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].[hash].css',
    }));
  }

  return webpackConfig;
} ());
