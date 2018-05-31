/**
 * Created by ZhouTing on 2018-05-30 23:30.
 */
import {createAction} from '../utils'

import CommonConst from '../constant/CommonConst';

let service = require('../utils/service');

export default {
    namespace: 'token',
    state: {
        access_token: "",
        create_token_time: '',   //刷新token时间
        expires_in: 3600,        //token有效期
        refresh_token: "",
        last_login: ""
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        },

        updateToken(state, {payload}) {
            return {...state, ...payload}
        },

        loadToken(state) {
            CommonConst.global.access_token = state.access_token;
            CommonConst.global.create_token_time = state.create_token_time;
            CommonConst.global.expires_in = state.expires_in;
            CommonConst.global.refresh_token = state.refresh_token;
            CommonConst.global.last_login = state.last_login;
            return {...state}
        }
    },
    effects: {
        * login({payload}, {call, put}) {
            service.login(put, payload.username, payload.password);

            if (login) {
                yield payload.nav.dispatch(resetAction);
            }
            yield put(createAction('updateState')({login, fetching: false}));
        },
        * logout(action, {call, put}) {
            yield put(createAction('updateState')({login: false}));
        },
    },
    subscriptions: {
        setup({dispatch}) {
            CommonConst.global.dispatch = dispatch;
            dispatch({type: 'loadToken'});
        },
    }
}