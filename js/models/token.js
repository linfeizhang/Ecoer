/**
 * Created by ZhouTing on 2018-05-30 23:30.
 */
import {createAction} from '../utils'

import CommonConst from '../constant/CommonConst';

let api = require('../utils/api');

export default {
    namespace: 'token',
    state: {
        access_token: "",
        create_token_time: "",   //刷新token时间
        expires_in: 3600,        //token有效期
        refresh_token: "",
        last_login: ""
    },
    reducers: {
        updateToken(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * logout(action, {call, put}) {
            const defaultToken = {
                access_token: "",
                create_token_time: "",   //刷新token时间
                expires_in: 3600,        //token有效期
                refresh_token: "",
                last_login: ""
            };
            yield put(createAction('updateToken')(defaultToken));
        },
    },
    subscriptions: {
        setup({dispatch}) {
            CommonConst.global.dispatch = dispatch;
        }
    }
}