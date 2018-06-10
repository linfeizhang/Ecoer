/**
 * Created by ZhouTing on 2018-06-10 09:13.
 */
import React, {Component} from "react";
import {ActivityIndicator, DeviceEventEmitter} from "react-native";
import {Container} from "native-base";
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux'

import CommonConst from './constant/CommonConst';

const main = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
    ]
});

@connect(({token}) => ({...token}))
export default class DataLoad extends Component {
    constructor(props) {
        super(props);

        this.props.navigation.dispatch(main);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    checkIsLogin() {
        this.isCheck = true;
        /////////////////将token信息存入全局常量////////////////
        CommonConst.global.access_token = this.props.access_token;
        CommonConst.global.create_token_time = this.props.create_token_time;
        CommonConst.global.expires_in = this.props.expires_in;
        CommonConst.global.refresh_token = this.props.refresh_token;
        CommonConst.global.last_login = this.props.last_login;

        ///////////////////判断登录情况////////////////////////
        let create_time = this.props.create_token_time;
        let last_login = this.props.last_login;
        let expires_in = this.props.expires_in * 1000;
        let now = new Date().getTime();

        if (now - create_time < expires_in - 10000) {           //在token的有效期内,直接进入主界面
            this.props.navigation.dispatch(main);
        }
    }

    render() {
        return (
            <Container style={{justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator/>
            </Container>
        );
    }
}