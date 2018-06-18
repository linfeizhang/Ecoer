import {createAction} from '../utils'

export default {
    namespace: 'app',
    state: {
        loading: true,
        userLanguage: '',
        systemLanguage: ''
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * launchCompletion(action, {call, put}) {
            yield put(createAction('updateState')({loading: false}))
        }
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'launchCompletion'})
        }
    }
}
