/**
 * Created by ZhouTing on 2018-05-27 23:29.
 */
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux'
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    Left,
    Picker,
    Right,
    Text,
    Title,
    Toast
} from 'native-base';
// import I18n from '../utils/i18n';
import Images from '../constant/Images';
import CommonConst from '../constant/CommonConst';

import {createAction} from '../utils/index'

// let service = require('../utils/service');


const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
    ]
});

@connect(({signIn}) => ({...signIn}))
class SignIn extends Component {

    changeLanguage(value: string) {
        this.props.dispatch(createAction('signIn/updateState')({languageCode: value}))
    }

    login() {
        if (this.state.username && this.password) {
            // service.login(this, this.state.username, this.password)
        } else {
            Toast.show({type: 'danger', text: '用户名和密码不能为空！', duration: 3000, buttonText: "关闭"});
        }
    }

    setLoginState(data) {
        if (data.error === undefined) {
            this.props.navigation.dispatch(resetAction);
        } else {
            if (data.error_code) {
                switch (data.error_code) {
                    case 21304:
                        // this.userLocked();
                        break;
                    case 20003:
                        // this.setState({message: "user_not_exist"});
                        alert("user_not_exist");
                        break;
                    case 21302:
                        // this.setState({message: "user_pwd_error"});
                        alert("user_pwd_error");
                        break;
                    case 21323:
                        // this.setState({message: "user_format_error"});
                        alert("user_format_error");
                        break;
                    default:
                        break;
                }
            }
            else {
                // this.setState({message: "network_fail_login"});
                alert("network_fail_login");
            }
        }
    }

    render() {
        const {username, languageCode} = this.props;
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body><Title>登 录</Title></Body>
                    <Right/>
                </Header>
                <Content padder>
                    <Form style={{flexDirection: 'row-reverse'}}>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select your SIM"
                            headerBackButtonText="返回"
                            //iosIcon={<Icon name="ios-arrow-down-outline" />}
                            // style={{width: 120}}
                            textStyle={{color: CommonConst.color.themeColor}}
                            selectedValue={languageCode}
                            onValueChange={this.changeLanguage.bind(this)}
                        >
                            <Picker.Item label="请选择语言" value={CommonConst.languageCode.unselected}/>
                            <Picker.Item label="English" value={CommonConst.languageCode.English}/>
                            <Picker.Item label="简体中文" value={CommonConst.languageCode.Chinese}/>
                        </Picker>
                    </Form>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 40}}>
                        <Image source={Images.logoImg.logoImg} style={{width: 200, height: 70, resizeMode: 'stretch'}}/>
                    </View>
                    <Form style={{marginRight: 16}}>
                        <Item>
                            <Input placeholder="Username"
                                   autoCapitalize='none'
                                   value={username}
                                   onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item>
                            <Input placeholder="Password"
                                   secureTextEntry
                                   onChangeText={(text) => this.password = text}/>
                        </Item>
                    </Form>
                    <Button full style={{margin: 15, marginTop: 50}}
                            onPress={() => this.login()}>
                        <Text>Sign In</Text>
                    </Button>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button transparent onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                            <Text>忘记密码？</Text>
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate("SignUp")}>
                            <Text>新用户注册</Text>
                        </Button>
                    </View>
                    {/*<TouchableOpacity style={{alignItems: 'center', margin: 20}}*/}
                    {/*// onPress={() => this.props.navigation.navigate("ForgetPassword")}>*/}
                    {/*onPress={() => Toast.show({*/}
                    {/*type: 'warning',*/}
                    {/*text: '后台接口暂未实现！',*/}
                    {/*duration: 3000*/}
                    {/*})}>*/}
                    {/*<Text>忘记密码?</Text>*/}
                    {/*</TouchableOpacity>*/}
                </Content>
            </Container>
        );
    }
}

export default SignIn;
