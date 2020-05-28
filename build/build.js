const webpack = require('webpack')
const merge = require('webpack-merge')
const ora = require('ora')
const chalk = require('chalk')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
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
    plugins: [
        new CleanWebpackPlugin()
    ],
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
