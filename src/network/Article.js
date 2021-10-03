import {
	request
} from './request.js';

// 获取文章信息
export function getArticleInfo(data) {
	return request({
		method: 'GET',
		url: '/getArticle',
		headers: {
			token: data.token,
		},
		params: {
			id: data.id
		}
	});
};

// 获取随机文章
export function getRandomArticle(data) {
	return request({
		method: 'GET',
		url: '/getRandomArticles',
		headers: {
			token: data.token,
		},
	});
};

// 点赞
export function thumbArticle(data) {
	return request({
		method: 'GET',
		url: '/thumbArticle',
		headers: {
			token: data.token,
		},
		params: {
			articleId: data.id,
			type: data.type,
		}
	});
}