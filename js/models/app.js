import {createAction} from '../utils'
import {NavigationActions, StackActions} from 'react-navigation'
import * as authService from '../services/auth'

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Main'})
    ]
});

export default {
    namespace: 'app',
    state: {
        login: false,
        loading: true,
        fetching: false,
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * launchCompletion(action, {call, put}) {
            // const login = yield call(Storage.get, 'login', false);
            yield put(createAction('updateState')({loading: false}))
        },
        * login({payload}, {call, put}) {
            yield put(createAction('updateState')({fetching: true}));
            const login = yield call(authService.login, payload);
            if (login) {
                yield payload.nav.dispatch(resetAction);
            }
            yield put(createAction('updateState')({login, fetching: false}));
        },
        * logout(action, {call, put}) {
            yield put(createAction('updateState')({login: false}));
        },
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'launchCompletion'})
        }
    }
}
