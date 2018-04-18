// 全局事件注册中心
// TODO：能否不依赖body元素（如何解决多文件引用问题）
import slice from '../lodash-es/slice.js';
const $body = $('body');
export default {
	on(event, cb, context) {
		$body.on(event, cb.bind(context || null))
	},
	off(event, cb, context) {
		$body.off(event, cb.bind(context || null))
	},
	once(event, cb, context) {
		$body.once(event, cb.bind(context || null))
	},
	trigger(event) {
		let args = slice(arguments, 1);
		$body.trigger(event, args)
	}
}

export function harFactory ($el) {
	$el = $($el);
	return {
		on(event, cb, context) {
			$el.on(event, cb.bind(context || null))
		},
		off(event, cb, context) {
			$el.off(event, cb.bind(context || null))
		},
		once(event, cb, context) {
			$el.once(event, cb.bind(context || null))
		},
		trigger(event) {
			let args = slice(arguments, 1);
			$el.trigger(event, args)
		}
	}
}