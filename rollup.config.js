// ./rollup.config.js
import json from '@rollup/plugin-json'

const formats = ['es', 'amd', 'cjs', 'iife', 'umd', 'system']
export default formats.map(format => ({
    input: 'rollupsrc/index.js',
    output: {
        file: `rollupdist/bundle.${format}.js`,
        format
    },
    plugins: [
        json()
    ]
}))