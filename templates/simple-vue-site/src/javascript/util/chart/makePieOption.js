import colorFunction from './colorFunction.js';
import each from '../lodash-es/each.js';
import some from '../lodash-es/some.js';
import reduce from '../lodash-es/reduce.js';
import extend from '../extend.js';
import tooltipOption from './tooltipOption.json';
import textStyleOption from './textStyleOption.json';

let defaultOption = {
	title: {
		text: '',
		show: true,
		textStyle: textStyleOption
	},
	tooltip: tooltipOption,
	legend: {
		show: true
	},
	calculable: false,
	series: []
};

export default function makePieOption(title, option) {
	option = extend({}, defaultOption, option);
	option.title.text = title;
	return option;
}