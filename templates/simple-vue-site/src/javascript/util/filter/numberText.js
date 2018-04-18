import numberText from '../number/numberText.js';
 Vue.filter("numberText", function(value, padding = 2) {
	return numberText(value, padding);
 });