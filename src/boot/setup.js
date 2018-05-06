/**
 * Created by ZhouTing on 2018/5/1.
 */
import React, {Component} from 'react';
import {StyleProvider} from "native-base";
import Entrance from "../Entrance";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

let Global = require('../utils/Global');
let setting = require('../utils/setting');

export default class Setup extends Component {

    constructor(props) {
        super(props);

        let cfg = new setting();
        if (Global.cfg === undefined) {
            Global.cfg = cfg;
        }

        Global.cfg.getRunningConfig(this, function () {

            //数字和字符串相减,字符串可以自动转为数字,数字减空字符串相当于数字减0。
            // 如:123 - '' = 123 - 0 = 123。
            let create_time = Global.cfg.create_token_time;
            let last_login = Global.cfg.last_login;

            let now = new Date().getTime();

            if (now - create_time < 1800000) {               //上次刷新token在半小时内,直接进入主界面
                Global.isLogin = true;
            } else if (now - last_login < 1296000000) {     //上次刷新token超过半小时,但是上次登录在15天内,刷新token再进入主界面
                // service.getNewToken(that);
            } else {                                        //上次登录超过15天,进入登录界面
                Global.isLogin = false;
            }
        });
    }

    render() {
        return (
            <StyleProvider style={getTheme(variables)}>
                <Entrance/>
            </StyleProvider>
        );
    }
}
