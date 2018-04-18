import delay from './delay.js';
export default function redirect (url, duration) {
	delay(() => {
		location.href = url;
	}, duration, window)
}