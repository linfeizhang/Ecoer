/**
 * Created by ZhouTing on 2018-06-18 18:01.
 */
import {createAction} from '../utils'
import {getLanguages} from 'react-native-i18n';
import CommonConst from '../constant/CommonConst';

export default {
    namespace: 'i18n',
    state: {
        userLanguage: null,
        systemLanguage: null,
        languageCode: CommonConst.languageCode.unselected,
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {},
    subscriptions: {
        setup({dispatch}) {
            getLanguages().then(languages => {
                dispatch(createAction('updateState')({systemLanguage: languages[0]}));
            });
        }
    }
}
