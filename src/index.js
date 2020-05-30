import { add, reduce } from './lib'
import './index.css'
import './index.scss'
import '../static/test.md'

import createEditor from './editor'

const result = add(3, 4)

console.log(result)

const maxNum = reduce(98, 67)

console.log('maxNum', maxNum)
// module的hot对象是要开启热更新的时候，会加载的API，如果不设置hot: ture,那么就会报module.hot=undefined
if(module.hot) {
    module.hot.accept('./lib', () => {
        console.log('lib update')
    })
}
