/**
 * Created by ZhouTing on 2018-06-10 09:28.
 */
import {Alert, Platform} from 'react-native';
import CommonConst from '../constant/CommonConst';
import {createAction, isEmpty} from '../utils'
import {NavigationActions, StackActions} from 'react-navigation';

let api = require('../utils/api');

const MAIN_PAGE = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
    ]
});

export default {
    namespace: 'dataLoad',
    state: {},
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
            yield put(createAction('getTokenInfo')());
        },

        * getTokenInfo({payload}, {call, put}) {
            const data = yield call(api.getTokenInfo);
            if (data.error === undefined) {
                CommonConst.tokenInfo = data;//保存token信息到Global
            } else {
                console.log('获取用户权限信息失败');
            }
            yield put(createAction('getUserInfo')());
        },

        * getUserInfo({payload}, {call, put}) {
            const data = yield call(api.getUserInfo);
            if (data.error === undefined) {
                if (isEmpty(data.result.firstName) ||
                    isEmpty(data.result.lastName) ||
                    isEmpty(data.result.mobilePhone) ||
                    isEmpty(data.result.zipCode) ||
                    isEmpty(data.result.country) ||
                    isEmpty(data.result.state) ||
                    isEmpty(data.result.city)) {
                    // isEmpty(data.result.licenseId)) {
                    CommonConst.global.navigation.navigate("PersonalInfo", {from: 'launch'});
                } else {
                    CommonConst.global.navigation.dispatch(MAIN_PAGE);
                }
            } else {
                console.log('获取安装工用户信息失败');
                CommonConst.global.navigation.dispatch(MAIN_PAGE);
            }
        }
    },
    subscriptions: {
        setup({dispatch}) {

        }
    }
}