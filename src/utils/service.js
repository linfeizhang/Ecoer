let md5 = require('./md5');
let Global = require('./Global');
import RNFetchBlob from 'react-native-fetch-blob';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

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
 * 获取用户选择语言
 */
exports.getLanguage = function () {
    return Global.cfg.user_language || Global.localLanguage;
};

/**
 * 注册
 * @param context
 * @param name
 * @param email
 * @param phone
 */
exports.register = function (context, email, token) {
    let setting = Global.cfg;
    let auth_url = "http://" + setting.server + "/api/contractor?access_token=" + token +
        "&org_email=" + setting.org_email;

    RNFetchBlob.config({timeout: 2000}).fetch('POST', auth_url, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }, JSON.stringify({"email": email})).then(function (response) {
        return response.json()
    }).then(function (data) {
        // context.setRegisterStatus(data);
        console.log(data)
    }).catch(function (e) {
        // context.setRegisterStatus({error: e});
        console.log(e)
    });
}

exports.getRegisterToken = function (context) {
    let setting = Global.cfg;
    //登陆之前使用的client_id和client_secret,此处写死,但后面如果还有其他登陆之前的接口也需要,则做成全局的
    let auth_url = "http://" + setting.server + "/oauth2/access_token?client_id=57d69a8fb1231bbf17a52e9b" +
        "&client_secret=B6811011A66D97A939A8F3B12E3B4385" + "&grant_type=client_credentials";
    RNFetchBlob.fetch('POST', auth_url, {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        // context.setGetRegisterToken(data);
        console.log(data)
    }).catch(function (e) {
        // context.setGetRegisterToken({error: e});
        console.log(e)
    });
}


/**
 * 登录
 * @param context
 * @param username
 * @param password
 */
exports.login = function (context, username, password) {
    let setting = Global.cfg;
    let that = context;
    let md5str = md5.hex_md5(password);//setting.password;
    let auth_url = "http://" + setting.server + "/oauth2/access_token?" +
        "client_id=" + setting.client_id +
        "&client_secret=" + setting.client_secret +
        "&grant_type=password" +
        "&username=" + username +
        "&password=" + md5str.toUpperCase() +
        "&password_type=2";

    RNFetchBlob.fetch(POST, auth_url, {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        if (data.error === undefined) {
            Global.cfg.last_login = new Date().getTime();
            saveSetting(username, password, data)
        }
        that.setLoginState(data);
    }).catch(function (e) {
        that.setLoginState({error: e});
    });
};

/**
 * 忘记密码
 * @param context
 */
exports.forgotPassword = function (context) {
    let setting = Global.cfg;

    let auth_url = "http://" + setting.server + "/api2/forgotten_password?language=1&access_token=null";

    RNFetchBlob.fetch(POST, auth_url, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, JSON.stringify({"username": context.state.textValue})
    ).then(function (response) {
        return response.json()
    }).then(function (data) {
        // context.setForgotPassword(data);
    }).catch(function (e) {
        // context.setForgotPassword({error: e});
    });
};


/**
 * 注销
 */
exports.logout = function (context) {  //如果app没有获取到推送token。退出登陆就调用此方法注释本地的一些存储
    Global.cfg.password = '';
    Global.cfg.last_login = '';
    Global.cfg.create_token_time = '';
    Global.cfg.access_token = '';
    Global.cfg.refresh_token = '';

    Global.cfg.setRunningConfig();

    context.toLoginPage();
};
exports.logout_clientToken = function (context) {   //如果app获取到了推送token。退出登陆就调用这个接口
    let setting = Global.cfg;
    let auth_url = "http://" + setting.server + "/api/push/token?access_token=" + setting.access_token;

    fetch(auth_url, {
        method: DELETE,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "clientToken": Global.pushTokenInfo.clientToken
        })
    }).then(function (response) {
        return response.json()
    }).then(function (data) {

    }).catch(function (e) {
        console.log(e);
    });

    Global.cfg.password = '';
    Global.cfg.last_login = '';
    Global.cfg.create_token_time = '';
    Global.cfg.access_token = '';
    Global.cfg.refresh_token = '';
    Global.cfg.setRunningConfig();
    context.toLoginPage();
};


/**
 * 用refresh_token 获取token
 * @param context
 */
exports.getNewToken = function (context) {
    let setting = Global.cfg;
    let auth_url = "http://" + setting.server + "/oauth2/access_token?" +
        "client_id=" + setting.client_id +
        "&client_secret=" + setting.client_secret +
        "&grant_type=refresh_token" +
        "&refresh_token=" + setting.refresh_token;

    RNFetchBlob.config({timeout: 2000}).fetch(POST, auth_url, {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        try {
            if (data.error === undefined) {
                saveSetting(setting.username, setting.password, data);
            }
            context.setRefreshState(data);
        } catch (e) {
            console.log(e);
        }
    }).catch(function (e) {
        console.log(e);
        context.setRefreshState({err: e});//网络链接失败,修复DSM-668
    });
};

/**
 * AcList请求的接口
 */
exports.getAllACList = function (context, startIndex) {
    let setting = Global.cfg;
    let that = context;
    let auth_url = "http://" + setting.server + "/api/sites?" + "cursor=" + startIndex +
        "&limit=30" + "&verbose=100" +
        "&access_token=" + setting.access_token;

    RNFetchBlob.fetch(GET, auth_url, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        that.setData(data);
    }).catch(function (e) {
        that.setData({error: e});
    });
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