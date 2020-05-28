# 测试copy-webpack-plugin的用法

- 当前版本使用的是6.0.1
`
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, './static'),
                to: config.build.assetsSubDirectory,
            },
        ],
    })

`