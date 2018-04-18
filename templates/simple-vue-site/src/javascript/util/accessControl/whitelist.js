import whiteList from '../../config/whitelist.json';

// 白名单检测
export default function checkWhiteLIst (url) {
	if(!url) {
		url = location.hash || location.pathname;
	}
	return whiteList.some(function (v) {
		return url.indexOf(v) !== -1
	});
}
