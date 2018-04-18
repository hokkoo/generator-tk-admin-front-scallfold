// 取得url参数
//get Url Data
export function getUrlMap(href) {
	href = href || window.location.href;
	var hrefStr = href.split('?')[1],
		getArr = hrefStr && hrefStr.split('&'),
		urlData = {};
	var key, value, originKeyMap = {};
	if (getArr) {
		for (var i = 0, len = getArr.length; i < len; i++) {
			var str = getArr[i].split('=');
			key = str[0];
			if (str.length === 2 && key) {
				urlData[key.toLowerCase()] = str[1];
				originKeyMap[key.toLowerCase()] = key;
			}
		}
	}
	urlData.__originKeyMap = originKeyMap;
	return urlData;
};

export function getUrlData(key) {
	key = (key || '').toLowerCase();
	var urlData = getUrlMap();
	return urlData[key];
}

export function addUrlParam(url, param) {
	url = url || window.location.href;
	var urlData = getUrlMap(url);
	var originKeyMap = urlData.__originKeyMap;
	var ahead = url.indexOf('?') === -1;
	if (ahead) {
		url += '?';
	}
	var keys = Object.keys(param),
		value;
	keys.forEach(function(key) {
		value = param[key], key = key.toLowerCase();
		if (isUndefined(urlData[key])) {
			urlData[key] = value;
			url = _addUrlParam(url, key + '=' + value);
		} else {
			url = _replaceUrlParam(url, originKeyMap[key], urlData[key], value)
		}
	});
	return url;
}

function _replaceUrlParam(url, key, originValue, value) {
	originValue = originValue || '';
	var idx = url.indexOf(key + '=');
	if (idx !== -1) {
		return url.slice(0, idx + key.length + 1) + value + url.slice(idx + key.length + 1 + originValue.length, url.length);
	} else {
		return _addUrlParam(url, key + '=' + value);
	}
}

function _addUrlParam(url, str) {
	if (url[url.length - 1] === '?') {
		return url + str;
	} else {
		return url + '&' + str;
	}
}