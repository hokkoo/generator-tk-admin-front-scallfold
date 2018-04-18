import numberFormat from './numberFormat.js';
const max = Math.pow(10, 4);
export default function numberText (value, padding) {
	var _value = parseInt(value, 10);
	if(isNaN(_value)) {
		return '-';
	}
	// 超过万再简写
	if(value > max) {
		return Math.floor(value / max) + '万+'
	} else if(_value != value) {
		return _value.toFixed(padding);
	} else {
		return numberFormat(_value);
	}
}