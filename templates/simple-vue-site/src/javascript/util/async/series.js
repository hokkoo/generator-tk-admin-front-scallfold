// 简易顺序执行方法
// 依次执行
export default function series (tasks) {
	return new Promise((resolve, reject) => {
		let i = 0, length = tasks.length;
		let task;
		function action () {
			if(i >= length) {
				return resolve();
			} else {
				task = tasks[i++];
				let result = task();
				if(result === false) {
					reject();
				} else {
					if(result.then) {
						result.then(() => {
							action();
						}, (name) => {
							reject(name);
						})
					} else {
						action();
					}
				}
			}

		}

		action();
	})
}