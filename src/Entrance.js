/**
 * Created by ZhouTing on 2018/5/1.
 */
import React from "react";
import {Image} from "react-native";
import {Root} from "native-base";
import {DrawerNavigator, StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";

import SideBar from './views/sidebar';
import UserHelp from './views/sidebar/UserHelp';
import About from './views/sidebar/About';

import AC from './views/ac';
import Events from './views/events';
import Files from './views/files';
import Me from './views/me';

const AC_NORMAL = require('./images/tabs/ac_normal.png');
const AC_FOCUS = require('./images/tabs/ac_focus.png');
const EVENTS_NORMAL = require('./images/tabs/events_normal.png');
const EVENTS_FOCUS = require('./images/tabs/events_focus.png');
const FILES_NORMAL = require('./images/tabs/Files_normal.png');
const FILES_FOCUS = require('./images/tabs/Files_focus.png');
const ME_NORMAL = require('./images/tabs/me_normal.png');
const ME_FOCUS = require('./images/tabs/me_focus.png');


import NewAc from './views/ac/NewAc';

const MyTab = TabNavigator(
    {
        AC: {
            screen: AC, navigationOptions: {
                tabBarLabel: '设备',
                tabBarIcon: ({focused, tintColor}) => {
                    let img = focused ? AC_FOCUS : AC_NORMAL;
                    return <Image
                        source={img}
                        style={{tintColor: tintColor, width: 43, height: 40}}
                    />;
                },
            },
        },
        Events: {screen: Events},
        Files: {screen: Files},
        Me: {screen: Me},
    }, {
        tabBarOptions: {
            activeTintColor: '#8fb721',
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
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

const AppNavigator = StackNavigator(
    {
        Drawer: {screen: Drawer},
        NewAc: {screen: NewAc}
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
    }
);

export default () =>
    <Root>
        <AppNavigator/>
    </Root>;
