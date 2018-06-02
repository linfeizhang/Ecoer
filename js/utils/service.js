import RNFetchBlob from 'react-native-fetch-blob';
import {NavigationActions, StackActions} from 'react-navigation';
import CommonConst from '../constant/CommonConst';

import {createAction} from './index'

let md5 = require('./md5');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

const signin = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'SignIn'})
    ]
});

const main = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
    ]
});

const HEADER_FORM = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
};

const HEADER_JSON = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

/**
 * 刷新token(自动检查token时用)
 * @param params
 */
function refreshToken(params) {
    const url = "http://" + CommonConst.global.server + "/oauth2/access_token?" +
        "client_id=" + CommonConst.global.client_id +
        "&client_secret=" + CommonConst.global.client_secret +
        "&grant_type=refresh_token" +
        "&refresh_token=" + CommonConst.global.refresh_token;

    return RNFetchBlob.config({timeout: 2000})
        .fetch(POST, url, HEADER_FORM, JSON.stringify(body))
        .then((response) => response.json())
        .then((data) => {
            try {
                if (data.error === undefined) {
                    let newData = {
                        access_token: data.access_token,
                        create_token_time: data.refresh_token,
                        expires_in: data.expires_in,
                        last_login: new Date().getTime()
                    };

                    CommonConst.global.access_token = newData.access_token;
                    CommonConst.global.create_token_time = newData.create_token_time;
                    CommonConst.global.expires_in = newData.expires_in;
                    CommonConst.global.last_login = newData.last_login;

                    CommonConst.global.dispatch(createAction('updateToken')(newData));
                    return request.apply(null, params);
                } else {
                    CommonConst.global.navigation.dispatch(signin);
                    return data;
                }
            } catch (e) {
                console.log(e);
            }
        })
        .catch((e) => {
            CommonConst.global.navigation.dispatch(signin);
            return {error: e};
        });
}

/**
 * 发网络请求
 * @param method
 * @param url
 * @param header
 * @param body
 * @param hasToken
 * @returns {Promise.<TResult>}
 */
function request(method, url, header, body, hasToken) {
    if (hasToken) {
        url.indexOf('?') === -1 ? url += '?' : url += '&';
        url += ('access_token=' + CommonConst.global.access_token);
    }
    url = "http://" + CommonConst.global.server + url;
    return RNFetchBlob.config({timeout: 2000})
        .fetch(method, url, header, JSON.stringify(body))
        .then((response) => response.json())
        .then((data) => {
            if (data.error_code === 21327 || data.error_code === 21336 || data.error_code === 21337 || data.error_code === 21338) {
                return refreshToken([url, header, body, hasToken]);
            } else {
                return data;
            }
        })
        .catch((err) => ({error: err}));
}

/**
 * 检查token并发起请求
 * @param method
 * @param url
 * @param header
 * @param body
 * @param hasToken
 */
function checkTokenAndRequest(method, url, header, body, hasToken) {
    let createTime = CommonConst.global.create_token_time;
    let expires_in = CommonConst.global.expires_in;
    let nowTime = new Date().getTime();

    if (hasToken && nowTime - createTime >= expires_in * 1000) {
        refreshToken([method, url, header, body, hasToken]);
    } else {
        return request(method, url, header, body, hasToken)
    }
}

/**
 * get请求
 * @param url api地址
 * @param body 请求体
 * @param hasToken 是否需要token
 * @param header 请求头
 */
exports.get = function (url, body, hasToken, header = HEADER_FORM) {
    return checkTokenAndRequest(GET, url, header, body, hasToken);
};

/**
 * post请求
 * @param url api地址
 * @param body 请求体
 * @param hasToken 是否需要token
 * @param header 请求头
 */
exports.post = function (url, body, hasToken, header = HEADER_JSON) {
    return checkTokenAndRequest(POST, url, header, body, hasToken);
};

/**
 * put请求
 * @param url api地址
 * @param body 请求体
 * @param hasToken 是否需要token
 * @param header 请求头
 */
exports.put = function (url, body, hasToken, header = HEADER_JSON) {
    return checkTokenAndRequest(PUT, url, header, body, hasToken);
};

/**
 * delete请求
 * @param url api地址
 * @param body 请求体
 * @param hasToken 是否需要token
 * @param header 请求头
 */
exports.delete = function (url, body, hasToken, header = HEADER_JSON) {
    return checkTokenAndRequest(DELETE, url, header, body, hasToken);
};

/**
 * 启动时刷新token用
 */
exports.getNewToken = function () {
    const url = "http://" + CommonConst.global.server + "/oauth2/access_token?" +
        "client_id=" + CommonConst.global.client_id +
        "&client_secret=" + CommonConst.global.client_secret +
        "&grant_type=refresh_token" +
        "&refresh_token=" + CommonConst.global.refresh_token;

    RNFetchBlob.config({timeout: 2000})
        .fetch(POST, url, HEADER_FORM)
        .then((response) => response.json())
        .then((data) => {
            try {
                if (data.error === undefined) {
                    let newData = {
                        access_token: data.access_token,
                        create_token_time: data.refresh_token,
                        expires_in: data.expires_in,
                        last_login: new Date().getTime()
                    };

                    CommonConst.global.access_token = newData.access_token;
                    CommonConst.global.create_token_time = newData.create_token_time;
                    CommonConst.global.expires_in = newData.expires_in;
                    CommonConst.global.last_login = newData.last_login;

                    CommonConst.global.dispatch(createAction('updateToken')(newData));
                    CommonConst.global.navigation.dispatch(main);
                } else {
                    CommonConst.global.navigation.dispatch(signin);
                }
            } catch (e) {
                console.log(e);
            }
        })
        .catch(function (e) {
            CommonConst.global.navigation.dispatch(signin);
        });
};

