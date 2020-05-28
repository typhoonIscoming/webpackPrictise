const rm = require('rimraf')
const path = require('path')
const ora = require('ora')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('./config')

const spinner = ora('building for production...')
spinner.start()

// 移除现在已经存在的文件夹
rm(path.join(config.build.assetsRoot), err => {
    console.log(err)
    if (err) throw err
    spinner.stop()
})
module.exports = {
    mode: 'none', // production | development
    entry: './src/index.js',
    output: {
        filename: '[name].[hash:4].js',
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,

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
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './static'),
                    to: config.build.assetsSubDirectory,
                },
            ],
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: 'css-loader',
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
}