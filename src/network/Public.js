import {
	request, status
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

// 获取打赏价格表
export function getRewardTable(data) {
	return request({
		method: 'GET',
		url: '/getRewardPriceTable',
		headers: {
			token: data.token,
		},
	});
}

// 获取背景图URL
export function getPhotoUrl(url) {
	if (url != null) {
		let pre = '/file?url=';
		if (status == 'build') {
			pre = '/api' + pre;
		}
		return 'url(' + pre + url + '&random=' + parseInt(Math.random() * 100000000) + ')';
	} else {
		return null;
	}
}