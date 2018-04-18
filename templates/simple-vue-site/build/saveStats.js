// 保存webpack编译信息
var fs = require('fs');
var path = require('path');
const template = '/* created: %p \n */';
module.exports = function saveStats (stats) {
	return new Promise((resolve, reject) => {
		let filename = path.resolve(__dirname, '../logs/webpack/' + 'log.' + new Date().getTime() + '.json');
		fs.writeFileSync(filename, template.replace('%p', new Date()));
		fs.appendFile(filename, stats, (err) => {
			if(err) {
				reject(err);
			} else {
				resolve(filename);
			}
		});

	})
}