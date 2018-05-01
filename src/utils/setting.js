/**
 * 本地储存相关
 * Created by ZhouTing on 2018/5/1.
 */
let Global = require('./Global');
let storage = require('./Storage');

class Settings {

    constructor() {
        this._key = "ar3-app";

        this.username = "";
        this.password = "";
        this.token = "";
        this.createTokenTime = '';   //刷新token时间

        this.phone = "";//用户手机号码
        this.text = "";//用户备注信息

        // 移除本地存储
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
    getRunningConfig(callback) {
        let that = this;
        storage.load({
            key: that._key,
            autoSync: false
        }).then(cfg => {
            if (cfg.username !== undefined) {
                this.username = cfg.username;
                this.password = cfg.password;
                this.token = cfg.token;
                this.createTokenTime = cfg.createTokenTime;
                this.phone = cfg.phone;
                this.text = cfg.text;
                Global.cfg = this;
            }
            return cfg;
        }).catch(err => {
            return err;
        }).done(callback)
    }
}

module.exports = Settings;
