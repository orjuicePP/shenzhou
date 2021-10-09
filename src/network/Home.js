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
            // province: data.province,
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

// 获取自己参与的拼团
export function getJoinCollage(data) {
    return request({
        method: 'GET',
        url: '/getJoinCollage',
        headers: {
            token: data.token,
        },
    });
};

// 获取自己发起的拼团
export function getLaunchCollage(data) {
    return request({
        method: 'GET',
        url: '/getLaunchCollage',
        headers: {
            token: data.token,
        },
    });
};

// 获取一些拼团
export function getSomeCollage() {
    return request({
        method: 'GET',
        url: '/public/getSomeCollage',
    });
};

// 加入拼团
export function joinCollage(data) {
    return request({
        method: 'POST',
        url: '/joinCollage',
        headers: {
            token: data.token,
        },
        params: {
            id: data.id,
        },
    });
};

// 完成拼团
// export function completeCollage(data) {
//     return request({
//         method: 'POST',
//         url: '/completeCollage',
//         headers: {
//             token: data.token,
//         },
//         params: {
//             id: data.id,
//         },
//     });
// };

// 发起拼团
export function addCollage(data) {
    return request({
        method: 'POST',
        url: '/addCollage',
        headers: {
            token: data.token,
        },
        params: {
            pNumber: data.pNumber,
            departure: data.departure,
            destination: data.destination,
            dTime: data.dTime,
            describe: data.describe,
        },
    });
};

// 申请成为导游
export function guideApply(data) {
    return request({
        method: 'POST',
        url: '/guideApply',
        headers: {
            token: data.token,
        },
        params: {
            introduction: data.introduction,
        },
    });
};