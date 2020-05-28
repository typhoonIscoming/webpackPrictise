![webpack](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590646760726&di=fecc7a2c61e207405fe67d006b43608b&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-ea57e2d2c487d0af20c93c4be5f25b5f_1200x500.jpg, 'webpack')

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
`npm init`
- 下载webpack(核心模块)、webpack-cli(webpack的cli程序，用来在命令行调用webpack)
`npm i webpack webpack-cli --save-dev`

- 执行命令 npx webpack
- 在执行过程中，webpack默认自动从src/index.js开始打包，打包默认保存在dist/main.js中

- 但默认配置不能满足日常开发需求，可根据自己需求配置，在根目录下面建webpack.config.js
```
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
`npx webpack --mode 'development'`

