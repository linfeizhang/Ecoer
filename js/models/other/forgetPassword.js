/**
 * Created by ZhouTing on 2018-06-04 15:44.
 */
import {NavigationActions, StackActions} from 'react-navigation';
let api = require('../../utils/api');

const main = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
    ]
});

export default {
    namespace: 'forgetPassword',
    state: {},
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * submit({payload}, {call, put}) {
            const data = yield call(api.forgetPassword, {"username": payload.email});
            if (data.error === undefined) {
                alert("修改成功");
                yield payload.nav.goBack();
            } else {
                if (data.error_code === 20006) {
                    alert("用户不存在")
                } else {
                    alert("修改失败");
                }
            }
        },
    },
    subscriptions: {
        setup({dispatch}) {
            console.log('进入修改密码界面');
        },
    }
}