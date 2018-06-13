/**
 * Created by ZhouTing on 2018-06-11 15:56.
 */
import {Alert} from 'react-native';
import {createAction} from '../../../utils'
import CommonConst from "../../../constant/CommonConst";

let api = require('../../../utils/api');

export default {
    namespace: 'contractorInfo',
    state: {
        contractorNo: '',
        name: '',
        ein: '',
        telephone: '',
        fax: '',
        address: '',
        zip_code: '',
        country: '',
        State: '',   //州
        city: ''
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * getAdminCompanyInfo({payload}, {call, put}) {
            const data = yield call(api.getAdminCompanyInfo);
            console.log('获取公司信息');
            console.log(data);
            console.log('获取公司信息');
            if (data.error === undefined) {
                let newData = {
                    contractorNo: data.result.contractorNumber,
                    name: data.result.name,
                    ein: data.result.ein,
                    telephone: data.result.telephone,
                    fax: data.result.fax,
                    address: data.result.address,
                    zip_code: data.result.zipCode,
                    country: data.result.country,
                    State: data.result.state,
                    city: data.result.city,
                }
                yield put(createAction('updateState')(newData));
            }
            // if (data.error === undefined) {
            //     let newData = {
            //         contractorInfo: data.result,
            //         email: data.result.email,
            //         firstName: data.result.firstName,
            //         lastName: data.result.lastName,
            //         mobilePhone: data.result.mobilePhone,
            //         zipCode: data.result.zipCode,
            //         country: data.result.country,
            //         State: data.result.state,
            //         city: data.result.city,
            //         // licenseId: data.result.licenseId,
            //         companyId: data.result.companyId,
            //         licensePics: data.result.licensePics ? data.result.licensePics : []     //避免新账号没有licensePics字段。带到上传图片页面去length就会报错
            //     };
            //     yield put(createAction('updateState')(newData));
            // } else {
            //     console.log("获取App运行参数失败");
            // }
            // yield put(createAction('getTokenInfo')());
        },
    },
    subscriptions: {
        setup({dispatch}) {
            console.log('进入contractor页面');
        }
    }
}