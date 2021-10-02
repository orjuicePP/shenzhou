import {
	request
} from './request.js';

// 获取礼品信息
export function getGiftInfo(data) {
	return request({
		method: 'GET',
		url: '/getGiftInfo',
		headers: {
			token: data.token,
		},
		params: {
			id: data.id
		}
	});
}