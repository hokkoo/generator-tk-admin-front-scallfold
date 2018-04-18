import blacklist from '../../config/blacklist.json';

// 黑名单检测
export default function checkBlacklist (url) {
	return blacklist.some(function (v) {
		return url.indexOf(v) !== -1
	});
}
