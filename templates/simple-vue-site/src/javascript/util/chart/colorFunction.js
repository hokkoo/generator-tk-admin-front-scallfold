import colors from '../../config/chartColors.json';

export default function colorFunction(param = {}) {
	return colors[param.dataIndex] || '';
}