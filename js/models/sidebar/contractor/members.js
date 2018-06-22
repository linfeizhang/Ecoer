/**
 * Created by ZhouTing on 2018-06-22 17:26.
 */
import {Alert} from 'react-native';
import {createAction} from '../../../utils'
import CommonConst from "../../../constant/CommonConst";

let api = require('../../../utils/api');

export default {
    namespace: 'members',
    state: {
        self: {},
        membersList: [],
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * getMembers({payload}, {call, put, select}) {
            let Self = yield select(state => state.self);
            let MembersList = yield select(state => state.membersList);
            const data = yield call(api.getMembers, payload.companyId);
            console.log('成员');
            console.log(data);
            console.log('成员');
            if (data.error === undefined) {
                for (let i in data.result) {
                    console.log(data.result[i]);
                    if (data.result[i].email === CommonConst.userInfo.username) {
                        Self = data.result[i];
                    } else {
                        console.log(data.result[i]);
                        MembersList.push(data.result[i]);
                    }
                }
                // let newData = {
                //     companyId: payload.companyId,
                //     contractorNo: data.result.contractorNumber,
                //     name: data.result.name,
                //     ein: data.result.ein,
                //     telephone: data.result.telephone,
                //     fax: data.result.fax,
                //     address: data.result.address,
                //     zip_code: data.result.zipCode,
                //     country: data.result.country,
                //     State: data.result.state,
                //     city: data.result.city,
                // };
                // yield put(createAction('updateState')(newData));
                yield put(createAction('updateState')({self: Self, membersList: MembersList}));
            } else {
                alert('请求成员列表失败');
            }
        }
    },
    subscriptions: {
        setup({dispatch}) {
        }
    }
}