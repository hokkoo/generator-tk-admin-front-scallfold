import numberFormat from './numberFormat.js';
import some from '../lodash-es/some.js';
import each from '../lodash-es/each.js';
import map from '../lodash-es/map.js';


export default function byteSize (value, padding = 2) {
	let _value = parseFloat(value);
	if(isNaN(_value)) {
		return '-';
	}
	const {unitName, size} = convertToUnit(_value);
	if(size && unitName) {
		_value = parseInt(size);
		if(_value === size) {
			return numberFormat(_value) + unitName;
		} else {
			return size.toFixed(padding) + unitName;
		}
	} else {
		return '-';
	}
	// 超过万再简写
	if(value > max) {
		return Math.floor(value / max) + '万+'
	} else if(_value != value) {
		return _value.toFixed(padding);
	} else {
		return ;
	}
}
const b = 1;
const kb = Math.pow(2, 10);
const mb = Math.pow(2, 20);
const gb = Math.pow(2, 30);
const tb = Math.pow(2, 40);
const pb = Math.pow(2, 50);
const gap = kb;

const unit = [b, kb, mb, gb, tb, pb];
const unitNames = ['b', 'KB', 'M', 'G', 'T', 'P'];

function convertToUnit (value) {
	let unitName = unitNames[0], size = value;
	some(unit, (u, idx) => {
		if(size < gap) {
			return true;
		} else {
			size = value / u;
			unitName = unitNames[idx];
		}
		size = value / u;
	});
	return {unitName, size};
}
// 