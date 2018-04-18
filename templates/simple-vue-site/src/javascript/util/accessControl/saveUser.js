import storage from '../storage/localStorage.js';
export default function saveUser(user) {
	storage.set('user', user);
}