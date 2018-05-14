/**
 * Created by ZhouTing on 2018-05-06 14:37.
 */
import React, {Component} from 'react';
import {View,Image} from 'react-native';
import {Body, Button, Container, Content, Form, Item, Input, Header, Icon, Left,Right, Text, Title} from "native-base";

import CommonConst from '../constant/CommonConst';
import Images from '../constant/Images';


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            confirm: '',
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
                    <Body><Title>注册</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:40,marginBottom:40}}>
                        <Image source={Images.logoImg.logoImg} style={{width: 200, height: 70, resizeMode: 'stretch'}}/>
                    </View>
                    <Form style={{marginRight: 16}}>
                        <Item>
                            <Input placeholder="E-mail"
                                   autoCapitalize='none'
                                   value={this.state.email}
                                   onChangeText={(email) => this.setState({email: email})}
                            />
                        </Item>
                        <Item>
                            <Input placeholder="Confirm"
                                   autoCapitalize='none'
                                   value={this.state.confirm}
                                   onChangeText={(confirm) => this.setState({confirm: confirm})}
                            />
                        </Item>
                    </Form>
                    <Button full style={{margin: 15, marginTop: 50, backgroundColor: CommonConst.color.themeColor}}>
                        <Text>Sign Up</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

