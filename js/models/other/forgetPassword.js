/**
 * Created by ZhouTing on 2018-06-04 15:44.
 */
import {NavigationActions, StackActions} from 'react-navigation';
import CommonConst from '../../constant/CommonConst';

let service = require('../../utils/service');
let md5 = require('../../utils/md5');

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
            const url = "/api2/forgotten_password?" + "language=1" + "&access_token=null";
            const data = yield call(service.post, url, {"username": payload.email}, false, CommonConst.header.form);
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