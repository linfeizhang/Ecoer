/**
 * Created by ZhouTing on 2018-06-10 10:15.
 */

let request = require('./request');
let md5 = require('./md5');

import CommonConst from '../constant/CommonConst';

const HEADER_FORM = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
};

const HEADER_JSON = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

/**
 * 登陆接口
 * @param username
 * @param password
 */
exports.login = function (username, password) {
    const url = "/oauth2/access_token?" +
        "client_id=" + CommonConst.global.client_id +
        "&client_secret=" + CommonConst.global.client_secret +
        "&grant_type=password" +
        "&username=" + username +
        "&password=" + md5.hex_md5(password).toUpperCase() +
        "&password_type=2";
    return request.post(url, null, false, HEADER_FORM);
};

/**
 * 忘记密码
 * @param body
 */
exports.forgetPassword = function (body) {
    const url = "/api2/forgotten_password?language=1&access_token=null";
    return request.post(url, body, false);
};

/**
 * 获取AppInfo
 */
exports.getAppInfo = function () {
    const url = "/api/app/info";
    return request.post(url, null, true, HEADER_FORM);
};

/**
 * 获取注册Token
 */
exports.getRegisterToken = function () {
    const url = "/oauth2/access_token?client_id=57d69a8fb1231bbf17a52e9b" +
        "&client_secret=B6811011A66D97A939A8F3B12E3B4385&grant_type=client_credentials";
    return request.post(url, null, false, HEADER_FORM);
};

/**
 * 注册
 * @param registerToken
 * @param body
 */
exports.register = function (registerToken, body) {
    const url = "/api/contractor?access_token=" + registerToken + "&org_email=" + CommonConst.global.org_email;
    return request.post(url, body, false);
};
