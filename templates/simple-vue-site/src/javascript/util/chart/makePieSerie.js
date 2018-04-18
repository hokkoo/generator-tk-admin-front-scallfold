import colorFunction from './colorFunction.js';
import each from '../lodash-es/each.js';
import some from '../lodash-es/some.js';
import reduce from '../lodash-es/reduce.js';
import extend from '../extend.js';

let defaultSerie = {
	name: '',
	type: 'pie',
	legendHoverLink: false,
	radius: ['50%', '70%'],
	itemStyle: {
		normal: {
			color: colorFunction,
			borderColor: '#fff',
			borderWidth: 2,
			label: {
				show: true
			},
			labelLine: {
				show: true
			}
		}
	},

	data: []
};

export default function makePieSerie(name, list, option) {
	const serie = extend({}, defaultSerie, {
		name
	}, option);
	each(list, (v) => {
		const item = {
			value: v[1],
			name: v[0]
		};
		if(v[2]) {
			item.itemStyle = {
				normal: {
					color: v[2]
				}
			}
		}
		serie.data.push(item);
	});
	return serie;

}