import har from './event/har.js';
import {script as scriptEvent} from '../config/event.json';
import isString from './lodash-es/isString.js';
import isFunction from './lodash-es/isFunction.js';

export default function insertScript (url, loaded, error, id) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = url;
		const sid = isString(id) ? id : (isString(loaded) ? loaded : url);
		script.onload = () => {
			if(isFunction(loaded)) {
				loaded();
			}
			resolve();
			har.trigger(scriptEvent.success, sid);
		}
		script.onerror = () => {
			if(isFunction(error)) {
				error();
			}
			reject();
			har.trigger(scriptEvent.error, sid);
		}
		// script.defer = true;
		document.body.appendChild(script);
	})
}