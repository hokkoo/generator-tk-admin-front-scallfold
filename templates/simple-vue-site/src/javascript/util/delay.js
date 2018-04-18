export default function delay (fn, duration, context) {
	let ticker = setTimeout(fn.bind(context || null), duration * 1000 || 1000);
	return function deDelay () {
		clearTimeout(ticker);
	}
}