/**
 * Created by ZhouTing on 2018-06-03 23:21.
 */
import {NavigationActions, StackActions} from 'react-navigation';
import I18n from '../utils/i18n';
import CommonConst from "../constant/CommonConst";

let api = require('../utils/api');

const SIGN_IN = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'SignIn'})
    ]
});

export default {
    namespace: 'signUp',
    state: {},
    reducers: {},
    effects: {
        * register({payload}, {call}) {
            const data = yield call(api.getRegisterToken);
            if (data.error === undefined) {
                const regData = yield call(api.register, data.access_token, {"email": payload.email});
                console.log('注册');
                console.log(regData);
                console.log('注册');
                if (regData.error === undefined) {
                    alert(I18n.t("register.register_success"));
                } else {
                    if (regData.error_code === 90014) {
                        alert(I18n.t("register.user_existed"))
                    } else {
                        alert(I18n.t("register.register_failed"))
                    }
                }
                yield CommonConst.global.navigation.dispatch(SIGN_IN);
            } else {
                alert(I18n.t("register.network_err"));
            }
        },
    },
    subscriptions: {
        setup({dispatch}) {
        }
    }
}