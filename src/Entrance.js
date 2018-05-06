/**
 * Created by ZhouTing on 2018/5/1.
 */
import React from "react";
import {Image} from "react-native";
import {Root} from "native-base";
import {DrawerNavigator, StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";
import Images from './constant/Images';
import CommonConst from './constant/CommonConst';

import SideBar from './views/sidebar';
import UserHelp from './views/sidebar/UserHelp';
import About from './views/sidebar/About';

import AC from './views/ac';
import Events from './views/events';
import Files from './views/files';
import Me from './views/me';
import NewAc from './views/ac/NewAc';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';

let Global = require('./utils/Global');

/**
 * tabBar 图标生成方法
 */
let tabBarIcon = function (focused, tintColor, imgNormal, imgFocus) {
    let IconImg = focused ? imgFocus : imgNormal;
    return <Image source={IconImg} style={{tintColor: tintColor, width: 43, height: 40}}/>;
};

const MyTab = TabNavigator(
    {
        AC: {
            screen: AC, navigationOptions: {
                tabBarLabel: '设备',
                tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, Images.tabBarIcon.AC_NORMAL, Images.tabBarIcon.AC_FOCUS)
            }
        },
        Events: {
            screen: Events, navigationOptions: {
                tabBarLabel: '事件',
                tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, Images.tabBarIcon.EVENTS_NORMAL, Images.tabBarIcon.EVENTS_FOCUS)
            }
        },
        Files: {
            screen: Files, navigationOptions: {
                tabBarLabel: '文件',
                tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, Images.tabBarIcon.FILES_NORMAL, Images.tabBarIcon.FILES_FOCUS)
            }
        },
        Me: {
            screen: Me, navigationOptions: {
                tabBarLabel: '我',
                tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, Images.tabBarIcon.ME_NORMAL, Images.tabBarIcon.ME_FOCUS)
            }
        },
    }, {
        tabBarOptions: {
            activeTintColor: CommonConst.color.themeColor,
            inactiveTintColor: 'gray',
            style: {
                height: 62
            }
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);

const Drawer = DrawerNavigator(
    {
        Home: {screen: MyTab},
        UserHelp: {screen: UserHelp},
        About: {screen: About}
    },
    {
        initialRouteName: "Home",
        contentOptions: {
            activeTintColor: CommonConst.color.themeColor
        },
        contentComponent: props => <SideBar {...props} />
    }
);

const AppNavigator = StackNavigator(
    {
        Drawer: {screen: Drawer},
        SignIn: {screen: SignIn},
        SignUp: {screen: SignUp},
        NewAc: {screen: NewAc}
    },
    {
        initialRouteName: Global.isLogin ? "Drawer" : "SignIn",
        headerMode: "none"
    }
);

export default () =>
    <Root>
        <AppNavigator/>
    </Root>;
