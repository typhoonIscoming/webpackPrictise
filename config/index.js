const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    dev: {
        assetsPublicPath: './',
    },
    build: {
        assetsRoot: resolve('dist'),
        assetsPublicPath: './',
        assetsSubDirectory: 'static',
    },
}