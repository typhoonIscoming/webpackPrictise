>>> 前言
- 必须能够使用HTTP服务器运行而不是文件形式预览。一来更加接近生产环境状态，二来我们的项目可能需要ajax之类的API，以文件形式访问会产生很多问题
- 在我们修改文件之后，webpack要能够自动完成构建，然后浏览器能够及时显示最新的结果，这样就大大减少了开发过程中额外的重复操作，同时让我们更加专注，效率自然提升。
- 需要能提供source map的支持，这样一来，在开发过程中出现的错误就能很快地位到出错的地方，而不是打包后的位置

# webpack自动编译

- watch模式下：
   
- webpack完成初次构建后，项目中的文件会被监视，一旦发生改变，webpack会自动重新运行打包任务

## 具体用法：

- 启动webpack时，在命令行中添加--watch的cli参数，webpack就会以监视模式运行，在打包完成之后，cli不糊立即退出，会等待文件变化再次工作，直到手动结束他或出现不可控的异常

## webpack-dev-server

- 是webpack官方推出的开发工具
- 它提供了一个开发服务器，并且将自动编译和自动刷新等一系列对开发友好的功能集合在一起

- npm i webpack-dev-server --save-dev
- 运行：npx webpack-dev-server
```flow
st=>start: 开始
op1=>operation: 启动服务器
op2=>operation: webpack构建
op3=>operation: 监视文件变化
e=>end

st->op1->op2->op3(right)->op2
```

## proxy代理

- 在实际生产中能够直接访问API，但在开发中如果服务器没有做cors，就会产生跨域问题
- 解决跨域的问题，就是在开发服务器中配置一个后端API代理服务，也就是把后端服务代理到本地开发服务地址

- 用法：
```
devServer: {
    proxy: {
        '/api': {
            tagert: 'https://api.github.com', // 需要代理的地址
            changeOrigin: true, // 默认代理服务器会以实际在浏览器中请求的主机名(localhost:8080/***)作为代理的主机名，而服务器会根据主机名判断哪一个网站的请求，所以需要修改成目标地址的主机名去请求
            pathRewrite: {
                '^/api': '', // 替换调代理地址中的/api为空
            },
        },
    },
},
```

## 如何配置source map

- 映射转换过后的代码和源代码的关系
- map文件中保存的是json，主要的属性有:
```
// jquery-3.4.1.map
{
    "version": 3, // 当前map文件的版本
    "source": ["jquery-3.4.1.js"], // 记录的是打包的源代码；因为可能会多个文件打包，所以是一个数组
    "names": [ 
        "global",
        "factory",
        "module",
        "exports",
        "document",
        ...
    ], // 源代码中的成员名称。在压缩时，压缩工具会把代码中有意义的变量名称压缩成简短的字符，以此来增加压缩比例，这里记录的就是源代码中的名称
    "mapings": "", // 这也是最重要的属性，里面记录的是通过base64编码过后的字符和转换前字符的关系
}
```

- sourcemap 配置
```
// webpack.config.js
{
    module.exports = {
        devtool: "source-map",
    }
}
// 如果不设置devtool: "source-map",那么在页面上的报错会被定位到打包后的文件的报错的位置
// 设置之后，会被定位到具体的报错的文件的位置
```
- 不同的生成source-map的方式，速度是不一样的
![devtool取值不同,速度也是不一样的](./images/sourcemap.png)
- [官方devtool配置对比](https://webpack.docschina.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx)

### eval模式
- 指的是JS中的一个函数，可以用来运行字符串中的JS代码
`eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://%5Bname%5D/./src/index.scss?");`
- 每一个模块都被打包到了eval函数中，并且都通过//# sourceURL=webpack:/// ./src/**?声明是属于哪一个模块的
- 但是在打包过后的文件中，通过报错信息点击文件，看到的文件内容是打包过后的
- 综上：eval模式会将所有的模块打包到eval函数中执行，通过//# sourceURL声明文件路径，不会生成map文件，它只能知道是哪一个文件报错，不能知道报错信息在哪一行发生

### eval-source-map模式
- 不能用于生产环境

### cheap-eval-source-map模式
- 不能用于生产环境，只能定位到行，定位的代码是经过loader处理了的，将ES6转换过后的结果

### cheap-source-map模式
- 只能定位到行不能定位到列

### cheap-module-source-map模式
- 这种模式定位的源代码和我们编写的源代码一模一样。没有转换ES6的代码
- 这也就是要给js配置loader的原因，因为这种名字中带有module的模式，解析出来是没有经过loader加工的，名字中没有module的模式，解析出来的是经过loader加工的，也就是说我们想要还原一模一样的代码，就需要使用cheap-module-eval-source-map模式

### inline-source-map模式
- 跟普通source-map模式效果相同，只不过这种模式下source-map不是以物理文件形式存在，而是以data URLs的方式出现在代码中。eval-source-map也是这种inline方式

## 写在最后
- 我个人使用cheap-module-eval-source-map模式
- 我平时使用框架会比较多，React和Vue，无论是jsx还是vue单文件组件，loader转换后的差别都比较大，我需要调试转换前的代码
- 一般情况下，我在项目中设置的eslint规范，在html中不会超过200个字符，在js逻辑中也不会超过100个字符。如果报错，定位到行也能够满足需求，能排查出来错误的原因了，还可以提升构建速度。
- 虽然在启动打包时比较慢，但大多数时候是使用webpack-dev-server在监视模式下(--open)构建打包，它重新打包的速度很快，所以也能满足需求。