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
    reducers: {},
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
            console.log('user用户信息');
            console.log(data);
            console.log('user用户信息');
            if (data.error === undefined) {
                CommonConst.userInfo = data.result;     //获取个人信息接口得到的返回值，存到CommonConst.userInfo上
                CommonConst.userInfo.companyId = data.result.companyId;
                if (data.result.companyId) {
                    //获取到的个人信息中有CompanyId，说明已经注册或者加入一家公司。
                    //利用companyId获取到公司信息，把返回值存到CommonConst.companyInfo上
                    const companyData = yield call(api.getAdminCompanyInfo);
                    console.log('获取公司信息');
                    console.log(companyData);
                    console.log('获取公司信息');
                    if (companyData.error === undefined) {
                        CommonConst.companyInfo = companyData.result;
                    }
                }
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