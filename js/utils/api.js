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

/**
 * 获取AppInfo
 */
exports.getAppInfo = function () {
    const url = "/api/app/info";
    return request.get(url, null, true);
};

/**
 * 获取用户权限信息接口
 */
exports.getTokenInfo = function () {
    const url = "/oauth2/get_token_info";
    return request.get(url, null, true);
};

/**
 * 获取安装工信息（安装工的个人信息）
 */
exports.getUserInfo = function () {
    const url = "/api/contractor";
    return request.get(url, null, true);
};

/**
 * 上传用户详细信息(用户编辑详细信息)接口(上传contractor个人信息的接口)
 */
exports.modifyUserInfo = function (type, param) {
    const url = "/api/contractor";
    let bodyData;
    switch (type) {
        case CommonConst.info.first_name:
            bodyData = {"firstName": param};
            break;
        case CommonConst.info.last_name:
            bodyData = {"lastName": param};
            break;
        case CommonConst.info.mobile_phone:
            bodyData = {"mobilePhone": param};
            break;
        case CommonConst.info.zip_code:
            bodyData = {"zipCode": param};
            break;
        case CommonConst.info.country:
            bodyData = {"country": param, "state": "", "city": ""};
            break;
        case CommonConst.info.state:   //调用接口那里传的type值
            bodyData = {"state": param, "city": ""};
            break;
        case CommonConst.info.city:    //调用接口那里传的type值
            bodyData = {"city": param};
            break;
        // case "licenseId":
        //     bodyData = {"licenseId": param};
        //     break;
    }
    return request.put(url, bodyData, true);
};

/**
 * 修改密码
 */
exports.changePassword = function (body) {
    const url = "/api2/users/this/password?language=2";
    return request.put(url, body, true);
};


/**
 * 获取admin(公司)的信息（admin为管理员。可以进入页面修改公司的各种信息,安装公司的信息）
 */
exports.getAdminCompanyInfo = function () {
    const url = "/api/contractor/company/" + CommonConst.userInfo.companyId;
    console.log('url');
    console.log(url);
    console.log('url');
    return request.get(url, null, true);
};


/**
 * 注册公司
 * @param body
 */
exports.regCompany = function (body) {
    const url = "/api/contractor/company";
    return request.post(url, body, true);
};




















