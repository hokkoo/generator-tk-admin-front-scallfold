import keycodes from '../config/keycode.json';

export function isEnter (ev) {
	const code = ev.keyCode;
	return code === keycodes.enter;
}