import each from './lodash-es/each.js';
import map from './lodash-es/map.js';
import some from './lodash-es/some.js';

export default function log () {
	const args = map(arguments, (arg) => {
		return JSON.stringify(arg, null, 2);
	});
	console.log.apply(console, args);
}