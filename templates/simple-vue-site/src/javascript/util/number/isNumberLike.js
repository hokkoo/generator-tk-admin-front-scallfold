import isNumber from '../lodash-es/isNumber.js'

export default function isNumberLike (num) {
	if(isNumber(num)) {
		return true;
	}
	const _num = parseFloat(num);
	return isNumber(_num);
}