/**
 * Created by ZhouTing on 2018-05-27 23:29.
 * 此页面是登陆界面的model
 */
import CommonConst from '../constant/CommonConst';
import {createAction} from '../utils'

export default {
    namespace: 'signIn',
    state: {
        username: '',
        languageCode: CommonConst.languageCode.unselected
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * changeLanguage({payload}, {call, put}) {
            yield put(createAction('updateState')({languageCode: payload.languageCode}))
        },
        * decrement({payload}, {call, put}) {
            yield put(createAction('updateState')({count: payload.count - 1}));
        },
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'test'})
        },
    }
}