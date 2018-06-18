/**
 * Created by ZhouTing on 2018-05-27 23:29.
 * 此页面是登陆界面的model
 */
import {NavigationActions, StackActions} from 'react-navigation';
import CommonConst from '../constant/CommonConst';
import {createAction} from '../utils'

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
        languageCode: CommonConst.languageCode.unselected,
        message: ''
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * changeLanguage({payload}, {call, put}) {
            yield put(createAction('updateState')({languageCode: payload.languageCode}))
        },
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
                //yield put(createAction('updateState')({message: '登陆失败！'}))
                if (data.error_code) {
                    switch (data.error_code) {
                        case 21304:
                            // this.userLocked();
                            break;
                        case 20003:
                            // this.setState({message: "user_not_exist"});
                            alert("用户不存在");
                            break;
                        case 21302:
                            // this.setState({message: "user_pwd_error"});
                            alert("用户名或密码错误");
                            break;
                        case 21323:
                            // this.setState({message: "user_format_error"});
                            alert("用户名格式错误");
                            break;
                        default:
                            break;
                    }
                }
                else {
                    // this.setState({message: "network_fail_login"});
                    alert("network_fail_login");
                }
            }
        },
    },
    subscriptions: {
        setup({dispatch}) {}
    }
}