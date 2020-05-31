const rm = require('rimraf')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const RemoveCommentsPlugin = require('./plugin/removeCommentsPlugin')

const config = require('./config')


module.exports = {
    mode: 'none', // production | development
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].[hash:4].js',
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
        library: '[name]'

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false
                // more options: https://github.com/kangax/html-minifier#options-quick-reference
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './static'),
                    to: config.build.assetsSubDirectory,
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        // new RemoveCommentsPlugin({ defined: 'xie' })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: process.env.NODE_ENV === 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: process.env.NODE_ENV === 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.md$/,
                // 直接使用相对路径
                use: './loader/markdown-loader.js'
            },
        ],
    },
    optimization: {
        // splitChunks: {
        //     // include all types of chunks
        //     chunks: 'all'
        // },
        usedExports: true,
        minimize: true,
    },
}