/**
 * Created by ZhouTing on 2018-06-03 17:38.
 */
export default {
    namespace: 'about',
    state: {
        changeText: 'Test',
        changeTextA: 'AAAAAAAA'
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {},
    subscriptions: {
        setup({dispatch}) {
            console.log('进入acList');
        },
    }
}