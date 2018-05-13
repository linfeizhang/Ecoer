/**
 * Created by ZhouTing on 2018-05-06 14:37.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
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
    Radio,
    Right,
    Text,
    Title
} from "native-base";

let service = require('../../utils/service');
import CommonConst from '../../constant/CommonConst';
import Images from '../../constant/Images';

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
                <Content>
                    <Form style={{marginRight: 16}}>
                        <Item>
                            <Input placeholder="Confirm"
                                   autoCapitalize='none'
                                   value={this.state.email}
                                   onChangeText={(email) => this.setState({email: email})}
                            />
                        </Item>
                    </Form>
                    <Button full style={{margin: 15, marginTop: 50, backgroundColor: CommonConst.color.themeColor}}
                            onPress={() => this.test()}
                    >
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

