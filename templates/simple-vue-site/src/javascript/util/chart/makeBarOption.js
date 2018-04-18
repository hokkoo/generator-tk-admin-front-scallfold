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
		textStyle: textStyleOption
	},
	tooltip: extend({}, tooltipOption, {
		formatter: '{a}: {b},{c}'
	}),
	legend: {
		data: []
	},
	calculable: true,
	xAxis: [{
		type: 'category',
		axisLine: {
			show: false
		},
		splitLine: {
			show: true
		},
		axisTick: {
			show: false
		},
		data: []
	}],
	yAxis: [{
		type: 'value',
		axisLine: {
			show: false
		},
		axisLabel: {
			show: true
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: '#eee',
				width: 1
			}
		},
		axisTick: {
			show: false
		}
	}],
	series: []
};

export default function makeBarOption(title, option) {
	option = extend({}, defaultOption, option);
	option.title.text = title;
	return option;
}