/**
 * Created by ZhouTing on 2018-05-31 22:37.
 */
import React, {Component} from "react";
import {ActivityIndicator} from "react-native";
import {Container} from "native-base";
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux'

import CommonConst from './constant/CommonConst';

let service = require('./utils/service');

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

@connect(({token}) => ({token}))
export default class Setup extends Component {
    constructor(props) {
        super(props);

        CommonConst.global.navigation = this.props.navigation;

        let create_time = props.create_token_time;
        let last_login = props.last_login;
        let expires_in = props.expires_in * 1000;
        let now = new Date().getTime();

        if (now - create_time < expires_in - 10000) {           //在token的有效期内,直接进入主界面
            this.props.navigation.dispatch(main);
        } else if (now - last_login < 1296000000) {     //超出token有效期,但是上次登录在15天内,刷新token再进入主界面
            service.getNewToken();
        } else {                                        //上次登录超过15天,进入登录界面
            this.props.navigation.dispatch(signin);
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