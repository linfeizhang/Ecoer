/**
 * Created by ZhouTing on 2018-05-27 01:20.
 */
import React, {Component} from "react";
import {autoRehydrate, persistStore} from 'redux-persist';
import {AsyncStorage} from 'react-native'
import {reducer as formReducer} from 'redux-form'
import {Root, StyleProvider} from "native-base";
import Router from './Router';
import getTheme from "./theme/components";
import variables from "./theme/variables/commonColor";

import dva from './utils/dva';

import appModel from './models/app';
import token from './models/token';
import signIn from './models/signIn';
import acList from './models/ac/acList';

const app = dva({
    initialState: {},
    models: [appModel, token, signIn, acList],
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

persistStore(app._store, persistConfig);

const Entrance = app.start(
    <StyleProvider style={getTheme(variables)}>
        <Root>
            <Router/>
        </Root>
    </StyleProvider>
);

export default Entrance;