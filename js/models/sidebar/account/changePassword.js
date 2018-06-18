/**
 * Created by ZhouTing on 2018-06-11 11:44.
 */
let api = require('../../../utils/api');
let md5 = require('../../../utils/md5');

export default {
    namespace: 'changePassword',
    state: {

    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * submit({payload}, {call, put}){
            let md5OldPassword = md5.hex_md5(payload.oldPassword).toUpperCase();
            let md5NewPassword = md5.hex_md5(payload.newPassword).toUpperCase();
            const data = yield call(api.changePassword, {"oldPassword":md5OldPassword,"newPassword":md5NewPassword});
            if(data.error === undefined){
                alert('修改密码成功');
            }else{
                if (data.error_code === 10017) {
                    alert('旧密码错误');
                }
            }
        }
    },
    subscriptions: {
        setup({dispatch}) {}
    }
}