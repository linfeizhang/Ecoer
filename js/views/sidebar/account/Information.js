/**
 * Created by ZhouTing on 2018-06-07 18:33.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {View, TouchableOpacity} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import styles from '../styles/account/indexStyle';

export default class PersonalInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>Information</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View>
                        <Text>Personal Information</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}