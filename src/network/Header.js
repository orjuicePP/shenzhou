import {
    request
} from './request.js';

// 获取自己信息
export function getOwnInfo(data) {
    return request({
        method: 'GET',
        url: '/getOwnInfo',
        headers: {
            token: data.token,
        },
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

// 上传头像
export function uploadHeadPortrait(data) {
    let formData = new FormData();
    formData.append('file', data.file);
    return request({
        method: 'POST',
        url: '/uploadHeadPortrait',
        headers: {
            token: data.token,
        },
        data: formData,
    });
}
