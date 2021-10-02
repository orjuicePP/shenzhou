import {
    request
} from './request.js';

// 获取所有咨询
export function getConsults(data) {
    return request({
        method: 'GET',
        url: '/guide/getConsults',
        headers: {
            token: data,
        },
    });
};