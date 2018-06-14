/**
 * Created by ZhouTing on 2018-06-10 22:11.
 */
import {Alert} from 'react-native';
import {createAction} from '../../../utils'
import CommonConst from "../../../constant/CommonConst";

let api = require('../../../utils/api');

export default {
    namespace: 'personalInfo',
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
        regCompanyId: '',        //获取到的安装工个人信息接口中的_id,注册公司的时候使用的这个id
        //companyInfoId:'',       //注册公司成功之后返回值中的_id，作为跳转到获取公司信息页面接口的需要的id

        companyVisible: false,
        selectedValue: 'nothing',

        contractorInfo: {},
        licensePics: '',     //获取个人信息中的许可证照片id
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        * getInformation({payload}, {call, put}) {      //获取安装工个人信息接口
            const data = yield call(api.getUserInfo);
            //注：获取安装工个人信息接口可拿到companyId和_id
            //companyId有这个字段说明已经加入或者注册成为一家公司。若没有，则表示还没有加入或者注册成为一家公司
            //如果这个账号是注册成为一家公司的。则这个账号的_id就是就获取公司信息接口的所需要的那个id,companyId就是获取公司信息接口返回的_id
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
                    regCompanyId: data.result._id,
                    licensePics: data.result.licensePics ? data.result.licensePics : [],     //避免新账号没有licensePics字段。带到上传图片页面去length就会报错
                    companyVisible: false
                };
                yield put(createAction('updateState')(newData));
            } else {
                console.log("获取App运行参数失败");
            }
            yield put(createAction('getTokenInfo')());
        },

        * modifyUserInfo({payload}, {call, put}) {      //修改个人信息接口
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
        },

        * regCompany({payload}, {call, put, select}) {      //注册公司接口
            const adminId = yield select(state => state.personalInfo.regCompanyId);
            console.log('contractorInfo的_id');
            console.log(adminId);
            console.log('contractorInfo的_id');
            const data = yield call(api.regCompany, {"adminId": adminId});
            console.log('注册公司');
            console.log(data);
            console.log('注册公司');

            yield put(createAction('updateState')({companyVisible: false}));
            if (data.error === undefined) {
                CommonConst.userInfo.companyId = data.result._id;
                alert('注册公司成功');
                //返回值中的_id就是获取公司信息接口所需要的那个id
                //yield put(createAction('updateState')({companyInfoId:data.result._id}));
                yield payload.nav.navigate("ContractorInfo");
                //注意：此处有问题。注册成功之后跳转到contractor页面。立即开始获取信息。但是会失败，提示id非法
            } else {
                alert("注册公司失败");
            }
        },
    },
    subscriptions: {
        setup({dispatch}) {

        }
    }
}