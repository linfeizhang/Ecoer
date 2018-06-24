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

        isShowCheckBox: false,
        isShowRemoveButton: false

    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * getMembers({payload}, {call, put}) {
            let Self = {};
            let MembersList = [];
            const data = yield call(api.getMembers, payload.companyId);
            console.log('成员');
            console.log(data);
            console.log('成员');
            if (data.error === undefined) {
                for (let i in data.result) {
                    console.log(data.result[i]);
                    if (data.result[i].email === CommonConst.userInfo.email) {
                        Self = data.result[i];
                    } else {
                        console.log(data.result[i]);
                        MembersList.push(data.result[i]);
                    }
                }
                yield put(createAction('updateState')({self: Self, membersList: MembersList}));
            } else {
                alert('请求成员列表失败');
            }
        },

        * deleteMembers({payload}, {call, put, select}) {
            let membersList = yield select(state => state.members.membersList);
            const data = yield call(api.deleteMembers, {"contractorIds": payload.contractorIds});
            console.log(data);
            if (data.error === undefined) {
                for (let i = membersList.length - 1; i > -1; i--) {
                    if (payload.contractorIds.indexOf(membersList[i]._id) !== -1) {
                        membersList.splice(i, 1);
                    }
                }
                payload.contractorIds = [];
                this.isShowRemoveButton = false;
                yield put(createAction('updateState')({membersList: membersList, isShowCheckBox: false}));
            } else {
                Alert.alert("failed", "del_member_fail", [{text: "ok"}])
            }
        }
    },
    subscriptions: {
        setup({dispatch}) {
        }
    }
}