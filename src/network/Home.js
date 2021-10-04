import {
    request
} from './request.js';

// 获取文章信息
export function getArticle(data) {
    return request({
        method: 'GET',
        url: '/getArticle',
        headers: {
            token: data.token,
        },
        params: {
           id: data.id,
        },
    });
};

// 发布文章
export function releaseArticle(data) {
    return request({
        method: 'POST',
        url: '/releaseArticle',
        headers: {
            token: data.token,
        },
        params: {
            title: data.title,
            placeName: data.placeName,
            province: data.province,
            content: data.content,
            pictureId: data.pictureId,
        },
    });
};
