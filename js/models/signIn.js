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
        languageCode: CommonConst.languageCode.unselected
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
            console.log(data);
            if (data.error === undefined) {
                yield payload.nav.dispatch(main);
            } else {
                alert('登录失败！')
            }
        },
    },
    subscriptions: {
        setup({dispatch}) {
            console.log('进入signIn');
        },
    }
}