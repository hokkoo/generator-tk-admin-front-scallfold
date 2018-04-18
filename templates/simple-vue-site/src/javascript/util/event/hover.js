import throttle from '../lodash-es/throttle.js';

// 悬浮事件处理
export default function hover (selector = 'body', trigger = 'mousemove click', check, delay = 600, hide, show) {
	let tickers = [];
	function handle (ev) {
		let status = check && check(ev);
		if(status === false) {
			_hide();
		} else if(status === true) {
			_show();
		}
	}
	$(selector).on(trigger, throttle(handle, 100));

	function _show () {
		show && show();
		clearTicker();
	}

	function clearTicker () {
		let ticker;
		while(ticker = tickers.pop()) {
			clearTimeout(ticker);
		}
	}

	function _hide () {
		tickers.push(setTimeout(() => {
			hide && hide();
			clearTicker();
		}, delay));
	}
}