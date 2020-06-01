// ./rollup.config.js
import json from '@rollup/plugin-json'
import commonPlugin from '@rollup/plugin-commonjs'

const formats = ['es', 'amd', 'cjs', 'iife', 'umd', 'system']
// export default formats.map(format => ({
//     input: 'rollupsrc/index.js',
//     output: {
//         // file: `rollupdist/bundle.${format}.js`,
//         dir: 'rollupmuiltdist',
//         format
//     },
//     plugins: [
//         json(),
//         commonPlugin(),
//     ]
// }))

export default {
    input: 'rollupsrc/index.js',
    output: {
        dir: 'rollupmuiltdist',
        format: 'amd',
    },
    plugins: [
        json(),
        commonPlugin(),
    ]
}