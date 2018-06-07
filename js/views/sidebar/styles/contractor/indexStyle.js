/**
 * Created by ZhouTing on 2018-06-07 17:51.
 */

import {PixelRatio} from 'react-native';

const React = require("react-native");

export default {
    part: {
        marginTop: 20,
        backgroundColor: '#fff'
    },
    item: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 14,
        paddingBottom: 14,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#e5e5e5',
        justifyContent: 'space-between'
    },
    iconStyle: {
        fontSize: 16,
        color: '#a9a9a9',
        marginLeft: 10,
        marginTop: 2
    },
};