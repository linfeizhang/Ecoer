/**
 * Created by ZhouTing on 2018-06-11 15:56.
 */
import {Alert} from 'react-native';
import {createAction} from '../../../utils'
import CommonConst from "../../../constant/CommonConst";

let api = require('../../../utils/api');

export default {
    namespace: 'contractorInfo',
    state: {},
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {},
    subscriptions: {
        setup({dispatch}) {
            console.log('进入contractor页面');
        }
    }
}