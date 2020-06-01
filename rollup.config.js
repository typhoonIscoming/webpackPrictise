// ./rollup.config.js
const formats = ['es', 'amd', 'cjs', 'iife', 'umd', 'system']
export default formats.map(format => ({
    input: 'rollupsrc/index.js',
    output: {
        file: `rollupdist/bundle.${format}.js`,
        format
    }
}))