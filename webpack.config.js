const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const RemoveCommentsPlugin = require('./src/plugin/remove-comments-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: '[name]-[contenthash].bundle.js',
      path: path.join(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [          
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(jpg|png)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
            }
          },
        },
        {
          test: /\.md$/, 
          use: './src/loader/markdown-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack Plugin Sample',
        meta: {
          viewport: 'width=device-width'
        },
        template: './src/index.html'
      }),
      new HtmlWebpackPlugin({
        filename: 'about.html'
      }),
      new RemoveCommentsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      proxy: {
        '/api': {
          // http://localhost:8080/api/users  -> https://api.github.com/api/users
          target: 'https://api.github.com',
  
          // http://localhost:8080/api/users  -> https://api.github.com/users
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      },
      // hot: true,
      hotOnly: true,
    },
    devtool: 'source-map',
    optimization: {
      usedExports: true,
      minimize: true,
      concatenateModules: true
    }
  }

  if(env && env.production) {

    config.mode = 'production';
    config.devtool = false;

    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: path.resolve(__dirname, './public'), 
            to: path.resolve(__dirname, './dist') 
          }
        ]
      })
    ]
  }

  return config;
}