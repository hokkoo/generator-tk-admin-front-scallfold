import copy from 'recursive-copy';
import extend from 'extend';
/*
	复制
		* 将文件复制到目标目录
		* 将文件夹里面的内容复制到目标目录
*/
const defaultOptions = {
	dot: true
};
export default function copyTemplates (src, target, options) {
	return new Promise((resolve, reject) => {
		options = extend({}, defaultOptions, options);
		const errors = [], successes = [];
		copy(src, target, options)
			.on(copy.events.COPY_FILE_COMPLETE, (rtn) => {
				successes.push(rtn.dest);
			})
			.on(copy.events.ERROR, (rtn) => {
				errors.push(rtn.dest);
			})
			.then((rtn) => {
				if(errors.length) {
					reject(errors, successes);
				} else {
					resolve(successes, errors);
				}
			})
			.catch((error) => {
				reject(errors, successes, error);
			})
		
	})
}