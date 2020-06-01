define(function () { 'use strict';

    const hello = 'hi I am Tse';

    const trim = str => (str ? str.replace(/(^\s*)|(\s*$)/g, '') : '');

    var name = "webpackprictise";

    const username = '  xie  tse  rollup ';

    console.log('message', hello);
    console.log('name trimed', trim(username));

    console.log('package.json name', name);

});
