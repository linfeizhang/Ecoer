/**
 * Created by ZhouTing on 2018-06-03 23:21.
 */
import {NavigationActions, StackActions} from 'react-navigation';
import CommonConst from '../constant/CommonConst';

let service = require('../utils/service');
let md5 = require('../utils/md5');

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
            let tokenUrl = "/oauth2/access_token?client_id=57d69a8fb1231bbf17a52e9b" +
                "&client_secret=B6811011A66D97A939A8F3B12E3B4385" + "&grant_type=client_credentials";

            const data = yield call(service.post, tokenUrl, null, false, CommonConst.header.form);

            if (data.error === undefined) {
                let url = "/api/contractor?access_token=" + data.access_token +
                    "&org_email=" + CommonConst.global.org_email;

                const regData = yield call(service.post, url, {"email": payload.email}, false);

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