define(function () { 'use strict';

	const hello = 'hi I am Tse';

	const trim = str => (str ? str.replace(/(^\s*)|(\s*$)/g, '') : '');

	const name = '  xie  tse  rollup ';

	console.log('message', hello);
	console.log('name trimed', trim(name));

});
