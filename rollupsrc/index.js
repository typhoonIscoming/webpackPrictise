import message from './message'
import { trim } from './utils.js'

import { name } from '../package.json'

import cjs from './cjs-module'

const username = '  xie  tse  rollup '

console.log('message', message)
console.log('name trimed', trim(username))

console.log('package.json name', name)

console.log('cjs-module', cjs)

import('./logger').then(({ log }) => {
    log('this is code splitting in rollup')
})