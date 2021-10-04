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
};

// 获取所有未兑换礼品
export function getAllGift(data) {
	return request({
		method: 'GET',
		url: '/getAllGift',
		headers: {
			token: data.token,
		},
	});
};

// 兑换礼品
export function addExchangeGift(data) {
	return request({
		method: 'POST',
		url: '/addExchangeGift',
		headers: {
			token: data.token,
		},
		params: {
			gid: data.gid,
			address: data.address,
		}
	});
};

// 添加礼品
export function addGift(data) {
	return request({
		method: 'POST',
		url: '/admin/addGift',
		headers: {
			token: data.token,
		},
		params: {
			name: data.name,
			describe: data.describe,
			price: data.price,
			pictureId: data.pictureId,
		}
	});
};

// 删除礼品
export function removeGift(data) {
	return request({
		method: 'GET',
		url: '/admin/removeGift',
		headers: {
			token: data.token,
		},
		params: {
			id: data.id,
		}
	});
};