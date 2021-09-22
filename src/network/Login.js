import {
    request
} from './request.js';

// 登录
export function login(data) {
    return request({
        method: 'POST',
        url: '/login',
        params: {
            username: data.username,
            password: data.password,
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
