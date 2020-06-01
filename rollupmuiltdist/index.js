'use strict';

const hello = 'hi I am Tse';

const trim = str => (str ? str.replace(/(^\s*)|(\s*$)/g, '') : '');

var name = "webpackprictise";

var cjsModule = {
    foo: 'bar'
};

const username = '  xie  tse  rollup ';

console.log('message', hello);
console.log('name trimed', trim(username));

console.log('package.json name', name);

console.log('cjs-module', cjsModule);

Promise.resolve().then(function () { return require('./logger-3f14a01f.js'); }).then(({ log }) => {
    log('this is code splitting in rollup');
});
