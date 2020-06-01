define(['require'], function (require) { 'use strict';

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

    new Promise(function (resolve, reject) { require(['./logger-ee134003'], resolve, reject) }).then(({ log }) => {
        log('this is code splitting in rollup');
    });

});
