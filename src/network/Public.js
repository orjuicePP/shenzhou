import {
	request
} from './request.js';

// 获取用户信息
export function getUserInfo(data) {
	return request({
		method: 'GET',
		url: '/public/getUserInfo',
		params: {
			account: data.account,
		}
	});
}

// 获取经验等级对照表
export function getExperienceTable(data) {
	return request({
		method: 'GET',
		url: '/getExperienceTable',
		headers: {
			token: data.token,
		},
	});
}
