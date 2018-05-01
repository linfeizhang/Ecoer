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

const acIcon = require("./images/tabs/ac_focus.png");

// const MyTab = TabNavigator({
//     ShiTu: {
//         screen: Home,
//         navigationOptions:{
//             tabBarLabel: '识兔',
//             tabBarIcon: ({tintColor}) => (
//                 <Image
//                     source={{uri : '识兔'}}
//                     style={[tabBarIcon, {tintColor: tintColor}]}
//                 />
//             ),
//         },
//     }, {
//     tabBarPosition: 'bottom',
//         swipeEnabled:false,
//         animationEnabled:false,
//         tabBarOptions: {
//         style: {
//             height:49
//         },
//         activeBackgroundColor:'white',
//             activeTintColor:'#4ECBFC',
//             inactiveBackgroundColor:'white',
//             inactiveTintColor:'#aaa',
//             showLabel:false,
//     }
// });

const MyTab = TabNavigator(
    {
        AC: {
            screen: AC, navigationOptions: {
                tabBarLabel: '设备',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={acIcon}
                        style={{tintColor: tintColor}}
                    />
                ),
            },
        },
        Events: {screen: Events},
        Files: {screen: Files},
        Me: {screen: Me},
    }, {
        tabBarOptions: {
            activeTintColor: '#8fb721',
            inactiveTintColor: 'gray',
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

        AC: {screen: AC},
        Events: {screen: Events},
        Files: {screen: Files},
        Me: {screen: Me},

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
