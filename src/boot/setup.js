/**
 * Created by ZhouTing on 2018/5/1.
 */
import React, {Component} from 'react';
import {Container, StyleProvider, Text} from "native-base";
import {getLanguages} from 'react-native-i18n';
import I18n from '../utils/i18n';
import Entrance from "../Entrance";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

let Global = require('../utils/Global');
let setting = require('../utils/setting');
let service = require('../utils/service');

export default class Setup extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        //获取手机系统语言
        getLanguages().then(languages => {
            Global.localLanguage = languages[0];
        });

        let cfg = new setting();
        if (Global.cfg === undefined) {
            Global.cfg = cfg;
        }
        let that = this;
        Global.cfg.getRunningConfig(this, function () {
            //设置国际化语言
            let language = Global.cfg.user_language;
            if (language) {
                I18n.locale = language;
            }

            //数字和字符串相减,字符串可以自动转为数字,数字减空字符串相当于数字减0。
            // 如:123 - '' = 123 - 0 = 123。
            let create_time = Global.cfg.create_token_time;
            let last_login = Global.cfg.last_login;
            let expires_in = Global.cfg.expires_in * 1000;

            let now = new Date().getTime();

            if (now - create_time < expires_in - 10000) {           //在token的有效期内,直接进入主界面
                that.setState({isLogin: true});
            } else if (now - last_login < 1296000000) {     //超出token有效期,但是上次登录在15天内,刷新token再进入主界面
                service.getNewToken(that);
            } else {                                        //上次登录超过15天,进入登录界面
                that.setState({isLogin: false});
            }
        });
    }

    setRefreshState(data) {
        console.log(data);
        if (data.error === undefined) {
            this.setState({isLogin: true});
        } else {
            this.setState({isLogin: false});
        }
    }

    render() {
        if (this.state.isLogin !== undefined) {
            return (
                <StyleProvider style={getTheme(variables)}>
                    <Entrance isLogin={this.state.isLogin}/>
                </StyleProvider>
            );
        } else {
            return (
                <Container style={{justifyContent: "center", alignItems: "center"}}>
                    <Text>加载中...</Text>
                </Container>
            );
        }
    }
}
