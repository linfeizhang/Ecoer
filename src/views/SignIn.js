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
    Right,
    Text,
    Title,
    Toast
} from 'native-base';
import Images from '../constant/Images';

let Global = require('../utils/Global');
let service = require('../utils/service');

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: Global.cfg.username
        }
    }

    login() {
        if (this.state.username && this.password) {
            service.login(this, this.state.username, this.password)
        } else {
            Toast.show({type: 'danger', text: '用户名和密码不能为空！', duration: 3000, buttonText: "关闭"});
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
                <Content>
                    <Image source={Images.logoImg.logoImg} style={{width: 160, height: 60, resizeMode: 'stretch'}}/>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                        <View>
                            <Form>
                                <Item floatingLabel>
                                    <Label>帐号</Label>
                                    <Input value={this.state.username}
                                           onChangeText={(text) => this.setState({username: text})}/>
                                </Item>
                                <Item floatingLabel last>
                                    <Label>密码</Label>
                                    <Input secureTextEntry={true} onChangeText={(text) => this.password = text}/>
                                </Item>
                            </Form>
                            <Button block style={{margin: 15, marginTop: 50}} onPress={() => this.login()}>
                                <Text>登录</Text>
                            </Button>
                        </View>

                        <TouchableOpacity style={{alignItems: 'center', margin: 20}}
                            // onPress={() => this.props.navigation.navigate("ForgetPassword")}>
                                          onPress={() => Toast.show({
                                              type: 'warning',
                                              text: '后台接口暂未实现！',
                                              duration: 3000
                                          })}>
                            <Text>忘记密码?</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}

