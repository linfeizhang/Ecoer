/**
 * Created by ZhouTing on 2018-05-27 23:29.
 * 此页面是登陆界面的model
 */
import {NavigationActions, StackActions} from 'react-navigation';
import CommonConst from '../constant/CommonConst';
import {createAction} from '../utils'

let service = require('../utils/service');
let md5 = require('../utils/md5');

const main = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
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

            const url = "/oauth2/access_token?" +
                "client_id=" + CommonConst.global.client_id +
                "&client_secret=" + CommonConst.global.client_secret +
                "&grant_type=password" +
                "&username=" + payload.username +
                "&password=" + md5.hex_md5(payload.password).toUpperCase() +
                "&password_type=2";

            const data = yield call(service.post, url, null, false, CommonConst.header.form);
            if (data.error === undefined) {
                let curr_time = new Date().getTime();
                let newData = {
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    expires_in: data.expires_in,
                    create_token_time: curr_time,
                    last_login: curr_time
                };
                yield put(createAction('token/updateToken')(newData));
                yield payload.nav.dispatch(main);
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
        setup({dispatch}) {
            console.log('进入signIn');
        },
    }
}