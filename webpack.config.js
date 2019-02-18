const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        // app: ['@babel/polyfill','./src/index.js']
        app: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/'
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ],

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader'
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader' 
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: [
                        { loader: 'style-loader', options: { sourceMap: true } }
                    ],
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'resolve-url-loader', options: { sourceMap: true } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        { loader: 'sass-loader', options: { sourceMap: true } },
                    ]
                })
            }
        ]
    }
};

module.exports = config;