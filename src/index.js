import { add, reduce } from './lib'
import './index.css'
import './index.scss'
import '../static/test.md'

import { Button } from './components'

import createEditor from './editor'

const result = add(3, 4)

console.log(result)

const maxNum = reduce(98, 67)

const editor = createEditor()
document.body.appendChild(editor)

console.log('maxNum', maxNum)
// module的hot对象是要开启热更新的时候，会加载的API，如果不设置hot: ture,那么就会报module.hot=undefined
let lastEditor = editor
if (module.hot) {
    module.hot.accept('./editor', () => {
        // 当 editor.js 更新，自动执行此函数
        // 临时记录更新前编辑器内容
        const value = lastEditor.innerHTML
        // 移除更新前的元素
        document.body.removeChild(lastEditor)
        // 创建新的编辑器
        // 此时 createEditor 已经是更新过后的函数了
        lastEditor = createEditor()
        // 还原编辑器内容
        lastEditor.innerHTML = value
        // 追加到页面
        document.body.appendChild(lastEditor)
    })
}

