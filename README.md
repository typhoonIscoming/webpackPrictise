![webpack](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590646760726&di=fecc7a2c61e207405fe67d006b43608b&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-ea57e2d2c487d0af20c93c4be5f25b5f_1200x500.jpg 'webpack')

## 本文基于webpack4.43.0 & webpack-cli3.3.11

- 主要用于了解webpack4的语法及各种插件的配置
- 欢迎大家一起学习，感受webpack的强大

# loader管道
- any source -> loader1 -> loader2 -> js core

# 编写一个Markdown的loader
- 实现逻辑
- 需要安装一个能将Markdown解析为HTML的模块————marked
- 安装完成后，在markdown-loader.js中导入这个模块
- 然后使用这个模块去解析source

## 快速上手

- 初始化一个node项目，使用package.json管理模块
---
`npm init`
- 下载webpack(核心模块)、webpack-cli(webpack的cli程序，用来在命令行调用webpack)
---
`npm i webpack webpack-cli --save-dev`

- 执行命令 npx webpack
- 在执行过程中，webpack默认自动从src/index.js开始打包，打包默认保存在dist/main.js中

- 但默认配置不能满足日常开发需求，可根据自己需求配置，在根目录下面建webpack.config.js
```javascript
const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist),
    },
    mode: 'none', // 'production' | 'development'
}
```
- 在配置webpack的工作模式时，可以通过配置文件设置mode,也可以通过命令行配置
---
`npx webpack --mode 'development'`

# 探索webpack运行机制与核心工作原理
   
- webpack-cli启动打包流程
- 载入webpack核心工作模块，创建compiler
- 使用compiler对象编译整个项目
- 从入口文件开始，解析模块依赖，形成依赖关系树
- 递归依赖树，将每个模块交给对应的loader处理
- 合并loader处理完的结果，将打包结果输出到dist目录

- webpack-cli的作用就是将cli参数和webpack配置文件中的参数整合得到一个完整的配置对象
- webpack-cli会通过yargs模块解析cli参数(运行webpack命令时，通过命令传入的参数)


## 添加sass-loader,必须安装node-sass，因为sass-loader依赖于node-sass
---
`npm i node-sass sass-loader --save-dev`
   
- 通常，生产环境下比较推荐的做法是，使用 mini-css-extract-plugin 将样式表抽离成专门的单独文件。这样，样式表将不再依赖于 JavaScript
```javascript
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                // fallback to style-loader in development
                process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
```
[编写一个自己的插件](./static/MySelfPlugin.md)

[tree shaking](./static/TreeShaking.md)

[如何利用Dev Server提高本地开发效率](./static/DevServeConfig.md)

[CodeSplitting分包](./static/CodeSplitting.md)

[webpack优化打包速度和打包结果](./static/packagingOptimization.md)

[Rollup介绍和webpack打包工具的对比](./static/chooseAPackaging.md)


