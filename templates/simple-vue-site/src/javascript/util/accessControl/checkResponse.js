// 统一接口验证
import codes from '../../config/responseCode.json'
import log from '../log.js';
// 目前只处理未登录状态，其他状态暂时不考虑
export default function checkResponse (data) {
	const code = data && data.code;
	if(!code) {
		return true;
	}
	if(code === codes.login) {
		return false;
	}
	// 微信未授权
	if(code === codes.wechatauthorized) {
		return codes.wechatauthorized;
	}

	if(code === code.error) {
		log.warn('服务端错误');
	}
	return codes.message[code];
}

export function getResonseMessage (code) {
	return codes.message[code] || '服务端异常，请稍后重试';
}