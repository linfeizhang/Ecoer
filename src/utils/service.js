let md5 = require('./md5');
let Global = require('./Global');
import RNFetchBlob from 'react-native-fetch-blob';

/**
 * fetch测试
 * @param context
 */
exports.testFetch = function (context) {
    let auth_url = "https://hklh8.com/index.html";

    RNFetchBlob.config({timeout: 2000}).fetch('GET', auth_url, {
        'Content-Type': 'application/json',
    }).then((res) => {
        let text = res.text();
        console.log(text)
    }).catch((errorMessage, statusCode) => {
        console.log(errorMessage);
    })
};

/**
 * 保存账号，密码以及token
 *
 * @param username
 * @param password
 * @param data
 */
function saveSetting(username, password, data) {
    Global.cfg.username = username;
    Global.cfg.password = password;
    Global.cfg.access_token = data.access_token;
    Global.cfg.refresh_token = data.refresh_token;
    Global.cfg.create_token_time = new Date().getTime();
    Global.cfg.expires_in = data.expires_in;

    Global.cfg.setRunningConfig();
}