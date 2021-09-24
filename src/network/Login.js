import {
    request
} from './request.js';

// 登录
export function login(data) {
    console.log(data);
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
