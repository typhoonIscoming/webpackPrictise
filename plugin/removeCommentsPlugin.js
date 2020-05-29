
function RemoveCommentsPlugin(options) {
    console.log('removeCommentsPlugin options', options)
}

RemoveCommentsPlugin.prototype.apply = function(compiler) {
    // 指定一个挂载到 webpack 自身的事件钩子。
    // compilation是处理 webpack 内部实例的特定数据。
    compiler.plugin('done', function(compilation, callback) {
        console.log("This is an example plugin!!!");
        // 功能完成后调用 webpack 提供的回调。
        // console.log('compilation', compilation)
        callback();
    });
}

module.exports = RemoveCommentsPlugin
