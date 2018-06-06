/**
 * Created by ZhouTing on 2018-06-06 17:32.
 * 账户设置,包含Personal Setting和ChangePassword
 */
import React, {Component} from "react";
import {View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'

export default class Account extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Home")}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>Account Setting</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View>
                        <Text>Account Setting</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}