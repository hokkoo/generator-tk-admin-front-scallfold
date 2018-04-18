 Vue.filter("numberPad", function(value, padding = 2) {
	var _value = parseInt(value, 10);
	if(isNaN(_value)) {
		return '-';
	} else if(_value != value) {
		_value = parseFloat(value);
		return _value.toFixed(padding);
	} else {
		return numberFormat(_value);
	}

 });

function numberFormat (num) {
	return (num + '').replace(/(?=(?:\d{3})+(?!\d))/g, ',').replace(/^,/, '');
}