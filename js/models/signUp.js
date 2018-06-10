/**
 * Created by ZhouTing on 2018-06-03 23:21.
 */
import {NavigationActions, StackActions} from 'react-navigation';

let api = require('../utils/api');

const main = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
    ]
});

export default {
    namespace: 'signUp',
    state: {},
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * register({payload}, {call, put}) {

            const data = yield call(api.getRegisterToken);

            if (data.error === undefined) {
                const regData = yield call(api.register, data.access_token, {"email": payload.email});
                if (regData.error === undefined) {
                    alert('注册成功');
                } else {
                    if (regData.error_code === 90014) {
                        alert("用户存在")
                        // this.setState({message: I18n.t("user_existed") + ' !', email: '', confirm: ''});
                    } else {
                        alert("注册失败")
                        // this.setState({message: I18n.t("registration_failed") + ' !', email: '', confirm: ''});
                    }
                }
                yield payload.nav.goBack();
            } else {
                alert('网络失败');
            }
        },
    },
    subscriptions: {
        setup({dispatch}) {
            console.log('进入signIn');
        },
    }
}