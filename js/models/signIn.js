/**
 * Created by ZhouTing on 2018-05-27 23:29.
 * 此页面是登陆界面的model
 */
import {NavigationActions, StackActions} from 'react-navigation';
import CommonConst from '../constant/CommonConst';
import {createAction} from '../utils'
import I18n from '../utils/i18n';

let api = require('../utils/api');

const DATA_LOAD = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'DataLoad'})
    ]
});

export default {
    namespace: 'signIn',
    state: {
        username: '',
        message: ''
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {

        * login({payload}, {call, put}) {
            // yield put(createAction('updateState')({count: payload.count - 1}));
            const data = yield call(api.login, payload.username, payload.password);
            if (data.error === undefined) {
                let curr_time = new Date().getTime();
                let newData = {
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    expires_in: data.expires_in,
                    create_token_time: curr_time,
                    last_login: curr_time
                };

                CommonConst.global.access_token = newData.access_token;
                CommonConst.global.create_token_time = newData.create_token_time;
                CommonConst.global.expires_in = newData.expires_in;
                CommonConst.global.refresh_token = newData.refresh_token;
                CommonConst.global.last_login = newData.last_login;

                yield put(createAction('token/updateToken')(newData));
                yield payload.nav.dispatch(DATA_LOAD);
            } else {
                if (data.error_code) {
                    switch (data.error_code) {
                        case 21304:
                            // this.userLocked();
                            break;
                        case 20003:
                            alert(I18n.t('login.user_not_exist'));
                            break;
                        case 21302:
                            alert(I18n.t('login.user_and_pwd_err'));
                            break;
                        case 21323:
                            alert(I18n.t('login.user_format_err'));
                            break;
                        default:
                            break;
                    }
                }
                else {
                    alert(I18n.t('login.network_exception'));
                }
            }
        },
    },
    subscriptions: {
        setup({dispatch}) {
        }
    }
}