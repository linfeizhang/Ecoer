/**
 * Created by ZhouTing on 2018-06-10 22:11.
 */
import {Alert} from 'react-native';
import {createAction} from '../../../utils'
import CommonConst from "../../../constant/CommonConst";

let api = require('../../../utils/api');

export default {
    namespace: 'information',
    state: {
        email: '',
        firstName: '',
        lastName: '',
        mobilePhone: '',
        zipCode: '',
        country: '',
        State: '',  //州
        city: '',   //城市

        companyId: '',

        companyVisible: false,
        selectedValue: 'join',

        contractorInfo: {},
        licensePics: '',     //获取个人信息中的许可证照片id
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * getInformation({payload}, {call, put}) {
            const data = yield call(api.getUserInfo);
            if (data.error === undefined) {
                let newData = {
                    contractorInfo: data.result,
                    email: data.result.email,
                    firstName: data.result.firstName,
                    lastName: data.result.lastName,
                    mobilePhone: data.result.mobilePhone,
                    zipCode: data.result.zipCode,
                    country: data.result.country,
                    State: data.result.state,
                    city: data.result.city,
                    // licenseId: data.result.licenseId,
                    companyId: data.result.companyId,
                    licensePics: data.result.licensePics ? data.result.licensePics : []     //避免新账号没有licensePics字段。带到上传图片页面去length就会报错
                };
                yield put(createAction('updateState')(newData));
            } else {
                console.log("获取App运行参数失败");
            }
            yield put(createAction('getTokenInfo')());
        },

        * modifyUserInfo({payload}, {call, put}) {
            const data = yield call(api.modifyUserInfo, payload.type, payload.value);
            if (data.error === undefined) {
                switch (payload.type) {
                    case CommonConst.info.first_name :
                        yield put(createAction('updateState')({firstName: payload.value}));
                        break;
                    case CommonConst.info.last_name:
                        yield put(createAction('updateState')({lastName: payload.value}));
                        break;
                    case CommonConst.info.mobile_phone :
                        yield put(createAction('updateState')({mobilePhone: payload.value}));
                        break;
                    case CommonConst.info.zip_code :
                        yield put(createAction('updateState')({zipCode: payload.value}));
                        break;
                    case CommonConst.info.country :
                        yield put(createAction('updateState')({country: payload.value}));
                        break;
                    // case 'License ID' :
                    //     yield put(createAction('updateState')({licenseId: payload.value}));
                    //     break;
                }
                payload.nav.goBack();
            } else {
                if (data.error_code === 90024) {
                    Alert.alert("", "not_change", [{text: "ok"}]);
                } else {
                    Alert.alert("", "network_unavailable", [{text: "ok"}]);
                }
            }
        }
    },
    subscriptions: {
        setup({dispatch}) {

        }
    }
}