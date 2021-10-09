import {
	request
} from './request.js';

// 获取所有咨询
export function getConsults(data) {
	return request({
		method: 'GET',
		url: '/guide/getConsults',
		headers: {
			token: data.token,
		},
	});
};

// 导游答复咨询
export function replyConsult(data) {
	return request({
		method: 'POST',
		url: '/guide/replyConsult',
		headers: {
			token: data.token,
		},
		params: {
			id: data.id,
			reply: data.reply,
		},
	});
};

// 获取自己的导游信息
export function getOwnGuideInfo(data) {
	return request({
		method: 'GET',
		url: '/guide/getOwnGuideInfo',
		headers: {
			token: data.token,
		},
	});
};