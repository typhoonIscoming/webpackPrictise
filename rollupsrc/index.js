import message from './message'
import { trim } from './utils.js'

import { name } from '../package.json'

const username = '  xie  tse  rollup '

console.log('message', message)
console.log('name trimed', trim(username))

console.log('package.json name', name)