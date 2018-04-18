// 检测用户
import storage from '../storage/localStorage.js';
import {audit as auditUrl} from '../../../javascript/config/api.json';
import vueResourceParam from '../../config/vueResourceParam.json';
import {login as loginCode, error as errorCode, wechatauthorized as wechatauthorizedCode} from '../../config/responseCode.json';

const app = new Vue({});
const $http = app.$http;

export default function checkLogisticsStatus () {
	return new Promise((resolve, reject) => {
		$http.post(auditUrl.loadAuditStatus, null, vueResourceParam).then((rtn) => {
			rtn = rtn && rtn.data || {};
			const code = rtn && rtn.code;
			if(code == loginCode || code == errorCode || code == wechatauthorizedCode) {
				resolve();
			}else {
				if(rtn && rtn.results) {
					var auditStatus = parseInt(rtn.results.auditStatus, 10);
					if(auditStatus !== 1) {
						redirect();
					} else {
						resolve();
					}
				} else {
					reject();
				}
			}
		}).catch((rtn) => {
			reject();
		});

	});
}
