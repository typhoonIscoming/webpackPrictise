## 如何选择打包工具 Rollup和webpack

> 前言
Rollup是一款ES Module打包器，它可以将项目中散落的细小模块打包成整块代码，从而可以这些模块可以更好的运行在浏览器端或NodeJS环境，它的作用于webpack非常类似，但是小巧很多。<br>
它诞生的目的是提供一个高效的ES Module模块打包器，充分利用ES Modules的各项特性构建结构扁平，性能出众的类库。<br>

- 这里我准备了一个简单的示例，具体结构如下：
## 快速上手
```
├── rollupsrc
│   ├── index.js
│   ├── utils.js
│   └── messages.js
└── package.json
```
- 在这个示例的源代码中我准备了三个文件，并且使用 ES Modules 组织的代码模块化。部分代码如下：
```
// ./rollupsrc/messages.js
const hello = 'hi I am Tse'
export default hello

// ./rollupsrc/utils.js
export const checker = value => !!value
export const trim = str => (str ? str.replace(/(^\s*)|(\s*$)/g, '') : '');

// ./rollupsrc/index.js
import message from './message'
import { trim } from './utils.js'

const name = '  xie  tse rollup '
console.log('message', message)
console.log('name trimed', trim(name))
```
- 安装Rollup  npm i rollup --save-dev
- 安装完成过后，rollup 这个模块同样会在 node_modules/.bin 目录中为我们提供一个 CLI 程序，我们就可以通过这个 CLI 去使用 Rollup 打包。具体命令如下：
- `npx rollup`
> P.S. 对于 node_modules/.bin 目录下的 CLI，我们可以使用 npx 命令或者 yarn 命令直接启动。
- 当然，正常情况下我们还是需要将打包结果输出到一个文件中。具体就是通过 CLI 的 --file 参数指定输出文件路径，具体命令如下：
- `npx rollup ./rollupsrc/index.js --file ./drollupdist/bundle.js`
- 完成以后，我们找到 Rollup 打包输出的文件，具体结果如下：
![rollup打包结果](./rollupImages/rollup-bundle.png)










