const webpack = require('webpack')
const merge = require('webpack-merge')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const webpackConfig = require('../webpack.config')

// 移除现在已经存在的文件夹
// 也可以使用clean-webpack-plugin插件
// rm(path.join(config.build.assetsRoot), err => {
//     console.log(err)
//     if (err) throw err
//     spinner.stop()
// })
const spinner = ora('building for production...')
spinner.start()

webpack(merge(webpackConfig, {
    mode: "development",
    plugins: [
        new CleanWebpackPlugin(),
        // new webpack.DllPlugin({
        //     context: __dirname,
        //     path: path.join(__dirname, '..', '/dist/[name]-manifest.json'),
        //     name: '[name]',
        // }),
        // new webpack.DllReferencePlugin({
        //     // 描述 react 动态链接库的文件内容
        //     manifest: require('../dist/main-manifest.json'),
        // }),
        // 以前的版本
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false, //删除无用代码时不输出警告
        //         drop_console: true, //删除所有console语句，可以兼容IE
        //         collapse_vars: true, //内嵌已定义但只使用一次的变量
        //         reduce_vars: true, //提取使用多次但没定义的静态值到变量
        //     },
        //     output: {
        //         beautify: false, // 最紧凑的输出，不保留空格和制表符
        //         comments: false, // 删除所有注释
        //     }
        // })
    ],
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true, // Must be set to true if using source-maps in production
    //             terserOptions: {
    //                 // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    //             }
    //         }),
    //     ],
    //     splitChunks: {
    //         chunks: 'all',
    //         minSize: 30000,
    //         maxSize: 0,
    //         minChunks: 1,
    //         maxAsyncRequests: 6,
    //         maxInitialRequests: 4,
    //         automaticNameDelimiter: '~',
    //         cacheGroups: {
    //             defaultVendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     }
    // },
}), (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
    }
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ))
})
