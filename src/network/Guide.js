import {
    request
} from './request.js';

// 登录
export function getConsults(data) {
    return request({
        method: 'POST',
        url: '/login',
        params: {
            account: data.name,
            password: data.pass,
        },
    });
};

