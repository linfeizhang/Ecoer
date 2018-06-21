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
        qrCodeInfo: '',

        companyId: '',

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
            const data = yield call(api.getAdminCompanyInfo, payload.companyId);
            if (data.error === undefined) {
                let newData = {
                    companyId: payload.companyId,
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
                };
                yield put(createAction('updateState')(newData));
            }
        },

        * getQR({payload}, {call, put}) {
            const data = yield call(api.getQR);

            if (data.error === undefined) {
                let companyId = data.result.companyId;
                let validateCode = data.result.validateCode;
                let qrCodeInfo = '{"companyId":"' + companyId + '","validateCode":"' + validateCode + '"}';
                yield put(createAction('updateState')({qrCodeInfo: qrCodeInfo}));
            } else {
                Alert.alert('', I18n.t('contractor.network_try_again'), [{
                    text: I18n.t('contractor.ok'),
                    onPress: () => put(createAction('getQR')())
                }]);
            }
        },

        * updateCompanyInfo({payload}, {call, put, select}) {
            const companyId = yield select(state => state.contractorInfo.companyId);

            const data = yield call(api.updateCompanyInfo, companyId, payload.type, payload.value);
            if (data.error === undefined) {
                switch (payload.type) {
                    case CommonConst.company.name :
                        yield put(createAction('updateState')({name: payload.value}));
                        break;
                    case CommonConst.company.ein:
                        yield put(createAction('updateState')({ein: payload.value}));
                        break;
                    case CommonConst.company.address :
                        yield put(createAction('updateState')({address: payload.value}));
                        break;
                    case CommonConst.company.zip :
                        yield put(createAction('updateState')({zip_code: payload.value}));
                        break;
                    case CommonConst.company.country :
                        yield put(createAction('updateState')({country: payload.value, State: '', city: ''}));
                        break;
                    case CommonConst.company.state :
                        yield put(createAction('updateState')({State: payload.value, city: ''}));
                        break;
                    case CommonConst.company.city :
                        yield put(createAction('updateState')({city: payload.value}));
                        break;
                    case CommonConst.company.telephone :
                        yield put(createAction('updateState')({telephone: payload.value}));
                        break;
                    case CommonConst.company.fax :
                        yield put(createAction('updateState')({fax: payload.value}));
                        break;
                }
                payload.nav.goBack();
            } else {
                if (data.error_code === 90024) {
                    Alert.alert("", I18n.t('contractor.not_change'), [{text: I18n.t('contractor.ok')}]);
                } else {
                    Alert.alert("", I18n.t('contractor.network_unavailable'), [{text: I18n.t('contractor.ok')}]);
                }
            }
        }
    },
    subscriptions: {
        setup({dispatch}) {
        }
    }
}