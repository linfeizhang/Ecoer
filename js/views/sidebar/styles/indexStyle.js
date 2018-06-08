/**
 * Created by ZhouTing on 2018-06-03 16:11.
 */

import {PixelRatio} from 'react-native';

const React = require("react-native");

const {StyleSheet, Platform, Dimensions} = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export default {
    iconStyle: {
        fontSize: 16,
        color: '#a9a9a9'
    },

    sidebar: {
        flex: 1,
        backgroundColor: "#fff"
    },
    drawerCover: {
        alignSelf: "stretch",
        // resizeMode: 'cover',
        height: deviceHeight / 3.5,
        width: null,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        marginBottom: 10
    },
    drawerImageView: {
        // position: "absolute",
        // left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
        // top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
        justifyContent: "center",
        alignItems: "center"
    },
    drawerImage: {
        width: deviceHeight / 10,
        height: deviceHeight / 10,
        tintColor: '#ccc',
        marginBottom: 20
    },
    drawerText: {
        color: '#ccc'
    },
    listItemContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    iconContainer: {
        width: 37,
        height: 37,
        borderRadius: 18,
        marginRight: 12,
        paddingTop: Platform.OS === "android" ? 7 : 5
    },
    sidebarIcon: {
        fontSize: 21,
        color: "#fff",
        lineHeight: Platform.OS === "android" ? 21 : 25,
        backgroundColor: "transparent",
        alignSelf: "center"
    },
    text: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 16,
        marginLeft: 20
    },
    badgeBox: {
        borderRadius: 3,
        height: 25,
        width: 72,
    },
    badgeText: {
        fontSize: Platform.OS === "ios" ? 13 : 11,
        fontWeight: "400",
        textAlign: "center",
        marginTop: Platform.OS === "android" ? -3 : undefined
    }
};