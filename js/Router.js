import React, {PureComponent} from "react";
import {Image} from "react-native";
import {createBottomTabNavigator, createDrawerNavigator, createStackNavigator} from "react-navigation";
import {Container} from "native-base";
import {connect} from 'react-redux'

import Launch from './components/Launch';
import Images from './constant/Images';
import CommonConst from './constant/CommonConst';
import ClientParam from './constant/ClientParam';

import SideBar from './views/sidebar';
import Contact from './views/sidebar/contact';
import Account from './views/sidebar/account';
import Contractor from './views/sidebar/contractor';
import About from './views/sidebar/about/About';
import PersonalInfo from './views/sidebar/account/Information';
import ChangePassword from './views/sidebar/account/ChangePassword';

import Setup from './Setup';
import DataLoad from './DataLoad';

import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ForgetPassword from './views/other/ForgetPassword';

import AC from './views/ac';
import NewAc from './views/ac/NewAc';
import AcDetail from './views/ac/AcDetail';

import Events from './views/events';
import Files from './views/files';
import Test from './views/test';


/**
 * tabBar 图标生成方法
 */
let tabBarIcon = function (focused, tintColor, imgNormal, imgFocus) {
    let IconImg = focused ? imgFocus : imgNormal;
    return <Image source={IconImg} style={{tintColor: tintColor, width: 43, height: 40}}/>;
};

const MyTab = createBottomTabNavigator(
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
        Test: {
            screen: Test, navigationOptions: {
                tabBarLabel: '待定页面',
                tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, Images.tabBarIcon.ME_NORMAL, Images.tabBarIcon.ME_FOCUS)
            }
        },
        // Me: {
        //     screen: Me, navigationOptions: {
        //         tabBarLabel: '我',
        //         tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, Images.tabBarIcon.ME_NORMAL, Images.tabBarIcon.ME_FOCUS)
        //     }
        // },
    }, {
        tabBarOptions: {
            activeTintColor: CommonConst.color.themeColor,
            inactiveTintColor: 'gray',
            style: {
                height: 62
            }
        },
        // tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);

const Drawer = createDrawerNavigator(
    {
        Home: {screen: MyTab}
    },
    {
        initialRouteName: "Home",
        contentOptions: {
            activeTintColor: CommonConst.color.themeColor
        },
        contentComponent: props => <SideBar {...props} />
    }
);

const AppNavigator = createStackNavigator(
    {
        Setup: {screen: Setup},
        DataLoad: {screen: DataLoad},
        Drawer: {screen: Drawer},

        Contact: {screen: Contact},
        Contractor: {screen: Contractor},
        Account: {screen: Account},
        About: {screen: About},

        SignIn: {screen: SignIn},
        SignUp: {screen: SignUp},
        ForgetPassword: {screen: ForgetPassword},
        NewAc: {screen: NewAc},
        AcDetail: {screen: AcDetail},
        PersonalInfo: {screen: PersonalInfo},
        ChangePassword: {screen: ChangePassword},
    },
    {
        initialRouteName: "Setup",
        headerMode: "none",
        // mode: 'modal'
    }
);

@connect(({app}) => ({...app}))
class Router extends PureComponent {

    constructor(props) {
        super(props);
        let param = new ClientParam();
        CommonConst.global.client_secret = param.client_secret;
        CommonConst.global.client_id = param.client_id;
    }

    render() {
        const {loading} = this.props;
        if (loading) {
            return (
                <Container style={{justifyContent: "center", alignItems: "center"}}>
                    <Launch/>
                </Container>
            )
        }
        return <AppNavigator/>
    }
}

export default Router
