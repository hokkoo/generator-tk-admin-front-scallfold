'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = copyTemplates;

var _recursiveCopy = require('recursive-copy');

var _recursiveCopy2 = _interopRequireDefault(_recursiveCopy);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	复制
		* 将文件复制到目标目录
		* 将文件夹里面的内容复制到目标目录
*/
var defaultOptions = {
	dot: true
};
function copyTemplates(src, target, options) {
	return new Promise(function (resolve, reject) {
		options = (0, _extend2.default)({}, defaultOptions, options);
		var errors = [],
		    successes = [];
		(0, _recursiveCopy2.default)(src, target, options).on(_recursiveCopy2.default.events.COPY_FILE_COMPLETE, function (rtn) {
			successes.push(rtn.dest);
		}).on(_recursiveCopy2.default.events.ERROR, function (rtn) {
			errors.push(rtn.dest);
		}).then(function (rtn) {
			if (errors.length) {
				reject(errors, successes);
			} else {
				resolve(successes, errors);
			}
		}).catch(function (error) {
			reject(errors, successes, error);
		});
	});
}