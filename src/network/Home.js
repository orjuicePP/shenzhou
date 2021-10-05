import {
    request
} from './request.js';

// 批量获取文章信息（渲染）
export function getArticles(data) {
    return request({
        method: 'GET',
        url: '/public/getArticles',
        params: {
            page: data.page,
            province: data.province,
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

// 查看我发起的咨询
export function getOwnConsult(data) {
    return request({
        method: 'GET',
        url: '/getOwnConsult',
        headers: {
            token: data.token,
        },
    });
};
