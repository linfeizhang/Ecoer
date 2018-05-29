/**
 * Created by ZhouTing on 2018-05-27 15:47.
 */
import {createAction} from '../utils'

export default {
    namespace: 'detail',
    state: {
        count: 0
    },
    reducers: {
        updateCount(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * increment({payload}, {call, put}) {
            console.log('increment');
            yield put(createAction('updateCount')({count: payload.count + 1}))
        },
        * decrement({payload}, {call, put}) {
            console.log('decrement');
            yield put(createAction('updateCount')({count: payload.count - 1}));
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            console.log('进入detail');
        },
    }
}