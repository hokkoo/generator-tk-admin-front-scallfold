import colorFunction from './colorFunction.js';
import each from '../lodash-es/each.js';
import some from '../lodash-es/some.js';
import reduce from '../lodash-es/reduce.js';
import extend from '../extend.js';
import tooltipOption from './tooltipOption.json';
import textStyleOption from './textStyleOption.json';

let defaultOption = {
	title: {
		show: false,
		text: '',
		textStyle: textStyleOption
	},
	tooltip: tooltipOption,
	legend: {
		show: false
	},
	xAxis: [{
		type: 'category',
		boundaryGap: false,
		data: []
	}],
	yAxis: [{
		type: 'value'
	}],
	calculable: false,
	series: []
};

export default function makeLineOption(title, option) {
	option = extend({}, defaultOption, option);
	if(title) {
		option.title.text = title;
		option.title.show = true;
	}
	return option;
}