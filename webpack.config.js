const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const isDev = process.env.MODE === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
        minimize: true,
    }

    if (isProd) {
        config.minimizer = [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminMinify,
                  options: {
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      ["jpegtran", { progressive: true }],
                      ["optipng", { optimizationLevel: 5 }],
                      [
                        "svgo",
                        {
                          plugins: [
                            {
                              name: "preset-default",
                              params: {
                                overrides: {
                                  removeViewBox: false,
                                  addAttributesToSVGElement: {
                                    params: {
                                      attributes: [
                                        { xmlns: "http://www.w3.org/2000/svg" },
                                      ],
                                    },
                                  },
                                },
                              },
                            },
                          ],
                        },
                      ],
                    ],
                  },
                },
            }),
        ]
    }
    return config;
  }

const buildPlugins = () => {
    const basePlugins = [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname, 'src', 'index.html'),
          minify: {
              collapseWhitespace: isProd
          },
          chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
          filename: 'google.html',
          template: path.resolve(__dirname, 'src', 'pages', 'google', 'index.html'),
          minify: {
              collapseWhitespace: isProd
          },
          chunks: ['google'],
        }),
        new HtmlWebpackPlugin({
          filename: 'product-card.html',
          template: path.resolve(__dirname, 'src', 'pages', 'product-preview-card', 'index.html'),
          minify: {
              collapseWhitespace: isProd
          },
          chunks: ['product-card'],
        }),
        new HtmlWebpackPlugin({
          filename: 'results-summary.html',
          template: path.resolve(__dirname, 'src', 'pages', 'results-summary', 'index.html'),
          minify: {
              collapseWhitespace: isProd
          },
          chunks: ['results-summary'],
        }),
        new HtmlWebpackPlugin({
          filename: 'space-tourism.html',
          template: path.resolve(__dirname, 'src', 'pages', 'space-tourism', 'index.html'),
          minify: {
              collapseWhitespace: isProd
          },
          chunks: ['space-tourism'],
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].[contenthash:8].css',
            chunkFilename: './css/[name].[contenthash:8].css',
        }),
        new CopyPlugin({
            patterns: [
              { 
                from: path.resolve(__dirname, 'src', 'assets'), 
                to: path.join(__dirname, 'dist') },
            ],
        })
    ]

    if (isProd) {
    // some code
    }
    return basePlugins;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: isDev ? 'development' : 'production',
    entry: {
      index: './js/index.js',
      google: './js/google.js',
      'product-card': './js/product-card.js',
      'results-summary': './js/results-summary.js',
      'space-tourism': './js/space-tourism.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[name].[contenthash][ext]',
        publicPath: '',
        clean: true
    },
    devServer: {
        historyApiFallback: true,
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        open: true,
        hot: true,
        compress: true,
        port: 9000,
    },
    optimization: optimization(),
    plugins: buildPlugins(),
    devtool: isDev ? 'source-map' : undefined,
    module: {
      rules: [
        {
            test: /\.html$/i,
            loader: "html-loader"
        },
        {
            test:  /\.css$/i,
            use: [
              {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                      publicPath: (resourcePath, context) => {
                        const newPath = path.relative(path.dirname(resourcePath), context) + '/';
                        return newPath.replace(/\\/g, "/");
                      },
                  }
              },
               "css-loader",
              ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: (resourcePath, context) => {
                      const newPath = path.relative(path.dirname(resourcePath), context) + '/';
                      return newPath.replace(/\\/g, "/");
                    },
                }
            },
             "css-loader",
             "sass-loader"
            ]
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.svg$/,
            type: 'asset/resource',
            generator: {
                filename: path.join('icons/[name].[contenthash][ext]').replace(/\\/g, "/"),
            },
        },
        {
            test: /\.(woff2|woff)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[hash][ext][query]'
            }
        },
        
      ],
    },
}