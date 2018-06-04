/**
 * Created by ZhouTing on 2018-05-27 01:20.
 */
import React, {Component} from "react";
import {autoRehydrate, persistStore} from 'redux-persist';
import {AsyncStorage, DeviceEventEmitter} from 'react-native'
import {reducer as formReducer} from 'redux-form'
import {Root, StyleProvider} from "native-base";
import CommonConst from './constant/CommonConst';
import Router from './Router';
import getTheme from "./theme/components";
import variables from "./theme/variables/commonColor";
import dva from './utils/dva';

import appModel from './models/app';
import token from './models/token';
import signIn from './models/signIn';
import signUp from './models/signUp';
import acList from './models/ac/acList';
import about from './models/me/about';
import forgetPassword from './models/other/forgetPassword';

const app = dva({
    initialState: {},
    models: [appModel, token, signIn, signUp, acList, about, forgetPassword],
    onAction: [],
    extraReducers: {
        form: formReducer,
    },
    extraEnhancers: [autoRehydrate()],
    onError(e) {
        console.log('onError', e)
    }
});

const persistConfig = {
    storage: AsyncStorage,
    blacklist: ['app', 'acList'],
    // whitelist: ['detail'],
};

const persistor = persistStore(app._store, persistConfig, () => {
    //发送"加载本地储存完成"事件
    DeviceEventEmitter.emit('loadStoreDone');
});

CommonConst.persistor = persistor;

const Entrance = app.start(
    <StyleProvider style={getTheme(variables)}>
        <Root>
            <Router/>
        </Root>
    </StyleProvider>
);

export default Entrance;