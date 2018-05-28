/**
 * Created by ZhouTing on 2018-05-28 23:15.
 */
import {Platform} from 'react-native';

export default class ClientParam {
    constructor() {
        if (Platform.OS === 'ios') {
            this.client_secret = "54B6857F80E67D512A199404DB167EC1";//ios端的secret
            this.client_id = "57d69a8fb1231bbf17a52e9a";//ios端的id
        } else {
            this.client_secret = "797A3A6779B87C3A26D0E414D2D86BDE";//Android端的secret
            this.client_id = "57d69a86b1231bbf17a52e99";//Android端的id
        }
    }
}

