/**
 * Created by ZhouTing on 2018-05-06 14:36.
 */
import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    Label,
    Left,
    Picker,
    Icon,
    Right,
    Text,
    Title,
    Toast
} from 'native-base';
import Images from '../constant/Images';
import CommonConst from '../constant/CommonConst';

let Global = require('../utils/Global');
let service = require('../utils/service');

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: Global.cfg.username,

            selected:'key0',
            //selected:'key1',
            //selected:'key2',
        }
    }

    onValueChange(value:string){
        this.setState({selected:value})
    }

    login() {
        if (this.state.username && this.password) {
            service.login(this, this.state.username, this.password)
        } else {
            Toast.show({type: 'danger', text: '用户名和密码不能为空！', duration: 3000, buttonText: "关闭"});
        }
    }

    setLoginState(data) {
        if (data.error === undefined) {
            this.props.navigation.navigate("Drawer");
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
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body><Title>登录</Title></Body>
                    <Right/>
                </Header>
                <Content padder>
                    <Form style={{flexDirection:'row-reverse'}}>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select your SIM"
                            headerBackButtonText="返回"
                            //iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: 120}}
                            textStyle={{ color:CommonConst.color.themeColor}}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="请选择语言" value="key0" />
                            <Picker.Item label="English" value="key1" />
                            <Picker.Item label="汉语" value="key2" />
                        </Picker>
                    </Form>
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:40,marginBottom:40}}>
                        <Image source={Images.logoImg.logoImg} style={{width: 200, height: 70, resizeMode: 'stretch'}}/>
                    </View>
                    <Form style={{marginRight:16}}>
                        <Item>
                            <Input placeholder="Username"
                                   autoCapitalize='none'
                                   value={this.state.username}
                                   onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item>
                            <Input placeholder="Password"
                                   secureTextEntry
                                   onChangeText={(text) => this.password = text}/>
                        </Item>
                    </Form>
                    <Button full style={{margin: 15, marginTop: 50,backgroundColor:CommonConst.color.themeColor}} onPress={() => this.login()}>
                        <Text>Sign In</Text>
                    </Button>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Button transparent onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
                            <Text style={{color:CommonConst.color.themeColor}}>忘记密码？</Text>
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate("SignUp")}>
                            <Text style={{color:CommonConst.color.themeColor}}>新用户注册</Text>
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

