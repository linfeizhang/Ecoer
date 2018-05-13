/**
 * 本地储存相关
 * Created by ZhouTing on 2018/5/1.
 */
let Platform = require('react-native').Platform;

let Global = require('./Global');
let storage = require('./Storage');

class Settings {

    constructor() {
        this._key = "inhand.settings";

        if (Platform.OS === 'ios') {
            this.client_secret = "54B6857F80E67D512A199404DB167EC1";//ios端的secret
            this.client_id = "57d69a8fb1231bbf17a52e9a";//ios端的id
        } else {
            this.client_secret = "797A3A6779B87C3A26D0E414D2D86BDE";//Android端的secret
            this.client_id = "57d69a86b1231bbf17a52e99";//Android端的id
        }

        this.server = Global.server;
        this.org_email = Global.org_email;
        this.username = "";
        this.password = "";
        this.last_login = "";
        this.access_token = "";
        this.create_token_time = '';   //刷新token时间
        this.expires_in = 3600;        //token有效期
        this.refresh_token = "";
        this.user_language = null;

        //移除本地存储
        // storage.remove({
        //    key: this._key
        // });
    }

    /**
     * 本地储存存数据
     */
    setRunningConfig() {
        let that = this;
        storage.save({
            key: that._key,  // 注意:请不要在key中使用_下划线符号!
            data: this
        });
    }

    /**
     * 获取本地储存
     * @param context
     * @param callback
     */
    getRunningConfig(context, callback) {
        let that = this;
        storage.load({
            key: that._key,
            autoSync: false
        }).then(cfg => {
            if (cfg.username !== undefined) {
                this.username = cfg.username;
                this.password = cfg.password;
                this.last_login = cfg.last_login;
                this.access_token = cfg.access_token;
                this.refresh_token = cfg.refresh_token;
                this.create_token_time = cfg.create_token_time;
                this.server = cfg.server;       //切换平台之后退出App重新进入就进入到切换之后的平台
                this.org_email = cfg.org_email; //切换平台之后退出App重新进入就进入到切换之后的平台

                this.user_language = cfg.user_language;   //国际化语言

                context.refresh(this);
            }
            return cfg;
        }).catch(err => {
            return err;
        }).done(callback)
    }
}

module.exports = Settings;
