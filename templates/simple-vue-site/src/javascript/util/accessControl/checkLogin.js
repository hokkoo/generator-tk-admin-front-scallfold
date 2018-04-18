// 检测用户
import storage from '../storage/localStorage.js';
export default function checkLogin () {
	let user = storage.get('user');
	if(!user) {
		return false;
	}
	if(!user.id) {
		return false;
	}
	if(!user.logined) {
		return false;
	}
	return true;
}
