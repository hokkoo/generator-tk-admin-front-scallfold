/**
 * 参考
 */

function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

import isUndefined from '../lodash-es/isUndefined.js';

export function Store (name) {
	this.name = name;
};

Store.prototype = {

	// Save the current state of the **Store** to *localStorage*.
	set: function(name, value) {
		this.localStorage().setItem(this.getName(name), JSON.stringify(value));
	},

	getAndRemore(name) {
		const value = this.get(name);
		this.remove(name);
		return value;
	},

	get: function (name) {
		var value = this.localStorage().getItem(this.getName(name));
		if(value === null) {
			return null
		}
		try{
			value = JSON.parse(value);
		} catch(e) {
			console.log('json parse error: ' + e);
			// value = null;
		}
		return value;
	},

	remove: function (name) {
		this.localStorage().removeItem(this.getName(name));
	},

	getName: function (name) {
		return this.name + '_' + name;
	},

	localStorage: function() {
		return localStorage;
	}
};

export default (new Store('ddt-wx'));