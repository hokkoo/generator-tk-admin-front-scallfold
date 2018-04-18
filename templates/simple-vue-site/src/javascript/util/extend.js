var arrPush = Array.prototype.push;
var slice = Array.prototype.slice;
var _has = function (obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}
function type (src) {
	var typeString = Object.prototype.toString.call(src);
	var match = typeString.match(/\s(\w+)(?:\])/);
	return match && match[1] || 'Undefined';
}

function isUndefined (src) {
	return type(src) === 'Undefined';
}

function isString (src) {
	return type(src) === 'String';
}

function isArray (src) {
	return type(src) === 'Array';
}

function isObject (src) {
	return type(src) === 'Object';
}

function extend (target) {
	var sources = slice.call(arguments, 1);
	sources.forEach(function (source) {
		_extend(target, source);
	});
	return target;
}

function _extend (target, source) {
	for(var key in source) {
		if(_has(source, key)) {
			var sourceValue = source[key];
			if(!_has(target, key)) {
				if(isArray(sourceValue)) {
					target[key] = [];
				} else if(isObject(sourceValue)) {
					target[key] = {};
				}
			}
			var targetValue = target[key];
			if(isArray(targetValue)) {
				_mergeArray(targetValue, sourceValue);
			} else if(isObject(targetValue)) {
				_extend(targetValue, sourceValue);
			} else {
				target[key] = sourceValue;
			}
		}
	}
}

function _mergeArray (target, source) {
	if(target === source) {
		return target;
	}
	target.splice(0, target.length);
	arrPush.apply(target, source);
}

export default extend;

export function mergeArray (target, source) {
	_mergeArray(target, source);
	return target;
}