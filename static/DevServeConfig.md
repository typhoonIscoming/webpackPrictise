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
