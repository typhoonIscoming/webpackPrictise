## tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性

- 新的 webpack 4 正式版本，扩展了这个检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分

- AST 对 JS 代码进行语法分析后得出的语法树 (Abstract Syntax Tree)。AST语法树可以把一段 JS 代码的每一个语句都转化为树中的一个节点。

- DCE Dead Code Elimination，在保持代码运行结果不变的前提下，去除无用的代码。这样的好处是:
   
   1. 减少程序体积
   2. 减少程序执行时间
   3. 便于将来对程序架构进行优化

- 而所谓 Dead Code 主要包括：
   
   1. 程序中没有执行的代码 (如不可能进入的分支，return 之后的语句等)
   2. 导致 dead variable 的代码(写入变量之后不再读取的代码)

- 基于 ES6 的静态引用，tree shaking 通过扫描所有 ES6 的 export，找出被 import 的内容并添加到最终代码中。 webpack 的实现是把所有 import 标记为有使用/无使用两种，在后续压缩时进行区别处理。

```
{
    "sideEffects": false
}
```

- 如果你的代码确实有一些副作用，那么可以改为提供一个数组：
```
{
    "sideEffects": [
        "./src/some-side-effectful-file.js",
        "*.css",
        "*.scss",
    ]
}
```

## 压缩输出
- 通过如上方式，我们已经可以通过 import 和 export 语法，找出那些需要删除的“未使用代码(dead code)”，然而，我们不只是要找出，还需要在 bundle 中删除它们。为此，我们将使用 -p(production) 这个 webpack 编译标记，来启用 uglifyjs 压缩插件。

- 所以在tree shaking时，环境需要是prodcution，在webpack4中，环境是production时，会内部调用 UglifyJsPlugin

- 新的 webpack 4 正式版本，扩展了这个检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。


## 通过以上我们知道在生产模式下，webpack会自动开启Tree Shaking，那么在其他环境下，怎么开启tree shaking呢？
先设置mode="none | development", devtool="source-map"方便查看打包之后的结构
- 在执行打包命令之后，可以看到如下图：
![未开启Tree-shaking打包结果](./images/none-Tree-shaking-mode.png)

在没有开启tree-shaking时，打包时，将lib.js中的所有方法都打包进来了

- 我们在配置文件中配置optimization: { usedExports: true },表示只导出外部使用了的方法。再次打包，结果如下图：
![开启了Tree-shaking打包结果](./images/used-tree-shaking-mode.png)
-我们可以看到，只引用了我们使用过的方法，未使用的方法没有被导出，如果是用vscode查看打包后的代码，可以看到未被使用的成员变量颜色变浅，结合压缩代码的插件，未被使用的变量不会被打包到最后的打包代码中。
- 我们再配置optimization: { minimize: true }, 表示开启代码压缩，最后的打包结果就不会看到未被使用的成员变量被打包进去。
![开启了Tree-shaking并压缩代码](./images/used-tree-shaking-minimizer.png)
- 可以看到开启tree-shaking并压缩代码之后，未被使用的成员变量没有被打包进去。

