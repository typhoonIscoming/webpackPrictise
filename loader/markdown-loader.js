const marked = require('marked')

module.exports = function(source) {
    const html = marked(source)
    const code = `module.exports = ${JSON.stringify(html)}`
    return code
}