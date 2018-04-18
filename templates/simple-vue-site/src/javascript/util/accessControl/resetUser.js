import storage from '../storage/localStorage.js';
export default function resetUser () {
	storage.remove('user');
}