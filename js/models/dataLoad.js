/**
 * Created by ZhouTing on 2018-06-10 09:28.
 */
import {Alert, Platform} from 'react-native';
import CommonConst from '../constant/CommonConst';
import {createAction} from '../utils'
let api = require('../utils/api');

export default {
    namespace: 'dataLoad',
    state: {
        // androidLatestVersion: "",
        // googleAnalyticsKey: ""
        // appInfo: {},

        tokenInfo: {}
    },
    reducers: {
        updateData(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {

        * getAppInfo({payload}, {call, put}) {
            const data = yield call(api.getAppInfo);

            if (data.error === undefined) {
                CommonConst.appInfo = data.result;
                if (CommonConst.appInfo.androidLatestVersion !== CommonConst.global.android_version) {//进入安卓版APP判断版本号是否需要升级
                    // Platform.OS !== 'ios' && Alert.alert('Is upgrade to the latest version?', '', [{text: 'Cancel'}, {text: 'Confirm'}]);
                    Platform.OS !== 'ios' && Alert.alert(
                        "notice",
                        "upgrade_version",
                        [{text: "confirm"}]);
                }
            } else {
                console.log("获取App运行参数失败");
            }
        },

        * getTokenInfo() {

        },

        * getUserInfo() {

        },

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

        }
    }
}