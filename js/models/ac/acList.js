/**
 * Created by ZhouTing on 2018-05-28 15:00
 * 此页面时acList页面的model
 */
export default {
    namespace: 'acList',
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