/**
 * Created by ZhouTing on 2018-05-06 14:37.
 */
import React, {Component} from 'react';
import {View,Image} from 'react-native';
import {Body, Button, Container, Content, Form, Item, Input, Header, Icon, Left,Right, Text, Title,CheckBox} from "native-base";

import CommonConst from '../constant/CommonConst';
import Images from '../constant/Images';


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            confirm: '',
            checked:false
        }
    }

    changeCheckBox(){
        this.setState({checked:!this.state.checked});
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
                <Content padder>
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
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <CheckBox checked={this.state.checked} color={CommonConst.color.themeColor} onPress={()=>this.changeCheckBox()}/>
                        <View style={{marginLeft:20}}>
                            <Text>To use Eoer Smart Service app. You must agree to the &nbsp;
                                <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                                    Terms of Services
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <Button full style={{margin: 15, marginTop: 50, backgroundColor: CommonConst.color.themeColor}}>
                        <Text>Sign Up</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

