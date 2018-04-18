const STRING_PLACEHOLDER = '%p';

export default function placeholder (text = '') {
	text = text || '';
	var args = Array.prototype.slice.call(arguments, 1);
	$.each(args, function (idx, value) {
		text = text.replace(STRING_PLACEHOLDER, value);
	});
	return text;
}