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

// 用户评分答复
export function scoreConsult(data) {
    return request({
        method: 'POST',
        url: '/scoreConsult',
        headers: {
            token: data.token,
        },
        params: {
            id: data.id,
            score: data.score,
        },
    });
};

// 获取一些导游信息
export function getSomeGuide() {
    return request({
        method: 'GET',
        url: '/public/getSomeGuide',
    });
};

// 发起咨询
export function initiateConsultation(data) {
    return request({
        method: 'POST',
        url: '/initiateConsultation',
        headers: {
            token: data.token,
        },
        params: {
            gid: data.gid,
            content: data.content,
        },
    });
};