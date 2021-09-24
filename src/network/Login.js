import {
    request
} from './request.js';

// 登录
export function login(data) {
    return request({
        method: 'POST',
        url: '/login',
        params: {
            account: data.name,
            password: data.pass,
        },
    });
};

// 修改密码
export function changePwd(data) {
    return request({
        method: 'POST',
        url: '/changePwd',
        headers: {
            token: data.token,
        },
        params: {
            oldPassword: data.oldPwd,
            newPassword: data.newPwd,
        },
    });
};

// 注册
export function register(data) {
    return request({
        method: 'POST',
        url: '/register',
        params: {
            account: data.account,
            password: data.pass,
            username: data.name,
        },
    });
};
