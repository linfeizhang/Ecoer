/**
 * Created by ZhouTing on 2018-05-06 14:37.
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Item,
    Input,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Toast,
    Title
} from "native-base";

let service = require('../../utils/service');

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    test() {
        console.log(service.getLanguage())
    }

    isEmail(email) {    //校验邮箱的正则表达式
        // var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/;
        var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return reg.test(email);
    }

    submit(){   //点击提交按钮，请求忘记密码的接口
        if (this.isEmail(this.state.email)) {
            service.forgotPassword(this);
        } else {
            Toast.show({type: 'danger', text: '邮箱输入格式不正确', duration: 10000, buttonText: "关闭"});
        }
    }

    setForgotPassword(data) {
        console.log('aaa');
        console.log(data);
        console.log('aaa');
        if (data.error === undefined) {
            Toast.show({type: 'success', text: '新密码已经发送至您的邮箱', duration: 10000, buttonText: "关闭"});
        } else {
            if (data.error_code == 20006) {
                Toast.show({type: 'danger', text: '邮箱不存在', duration: 10000, buttonText: "关闭"});
            } else if (data.error_code == 20016) {
                Toast.show({type: 'danger', text: '重置密码失败。请重试', duration: 10000, buttonText: "关闭"});
            } else {
                Toast.show({type: 'danger', text: '网络不可用，请重试', duration: 10000, buttonText: "关闭"});
            }
        }
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body><Title>忘记密码</Title></Body>
                    <Right/>
                </Header>
                <Content padder>
                    <View style={{margin:16}}>
                        <Text>Registered Account:</Text>
                    </View>
                    <Form style={{marginRight: 16}}>
                        <Item>
                            <Input placeholder="E-mail"
                                   autoFocus={true}
                                   autoCapitalize='none'    //第一个字母是否大写
                                   value={this.state.email}
                                   onChangeText={(email) => this.setState({email: email.toLowerCase().trim()})}
                            />
                        </Item>
                    </Form>
                    <Button full style={{margin: 15, marginTop: 50}}
                            onPress={() => this.submit()}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

