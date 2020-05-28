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

