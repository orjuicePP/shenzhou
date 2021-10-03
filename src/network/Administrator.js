import {
	request
} from './request.js';

// 获取导游申请
export function getAllGuideApply(data) {
	return request({
		method: 'GET',
		url: '/admin/getGuideApplies',
		headers: {
			token: data.token,
		},
	});
};

// 处理导游申请
export function handleGuideApply(data) {
	return request({
		method: 'GET',
		url: '/admin/handleGuideApply',
		headers: {
			token: data.token,
		},
		params: {
			id: data.id,
			handle: data.handle
		}
	});
};

// 获取所有礼品兑换申请
export function getAllGiftApply(data) {
	return request({
		method: 'GET',
		url: '/admin/getAllExchangeGift',
		headers: {
			token: data.token,
		},
	});
}

// 处理礼品兑换申请
export function handleGiftApply(data) {
	return request({
		method: 'POST',
		url: '/admin/handleExchangeGift',
		headers: {
			token: data.token,
		},
		params: {
			id: data.id,
			status: data.status
		}
	});
};