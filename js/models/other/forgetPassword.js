/**
 * Created by ZhouTing on 2018-06-04 15:44.
 */
import {NavigationActions, StackActions} from 'react-navigation';

let api = require('../../utils/api');
import I18n from '../../utils/i18n';

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
                alert(I18n.t('forgotPwd.success'));
                yield payload.nav.goBack();
            } else {
                if (data.error_code === 20006) {
                    alert(I18n.t('forgotPwd.user_not_exist'))
                } else {
                    alert(I18n.t('forgotPwd.failed'));
                }
            }
        },
    },
    subscriptions: {
        setup({dispatch}) {
        }
    }
}