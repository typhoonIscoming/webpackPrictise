## 编写一个自己的插件
### 插件的组成
   - 一个 JavaScript 命名函数。
   - 在插件函数的 prototype 上定义一个 apply 方法。
   - 指定一个绑定到 webpack 自身的[事件钩子](https://www.webpackjs.com/api/compiler-hooks)。
   - 处理 webpack 内部实例的特定数据。
   - 功能完成后调用 webpack 提供的回调。

### 一个插件的基础架构
```
// 一个 JavaScript 命名函数。
function MyExampleWebpackPlugin() {

};

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
    // 指定一个挂载到 webpack 自身的事件钩子。
    // 处理 webpack 内部实例的特定数据。
    // 这是以前的写法
    // compiler.plugin('webpacksEventHook', function(compilation,callback) {
        // console.log("This is an example plugin!!!");
        // 功能完成后调用 webpack 提供的回调。
        // callback();
    // });
    // 新版本的webpack推荐
    compiler.hooks.webpackEventHook.tap()
};
```