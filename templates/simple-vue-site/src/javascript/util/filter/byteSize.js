import byteSize from '../number/byteSize.js';
 Vue.filter("byteSize", function(value, padding = 2) {
	return byteSize(value, padding);
 });