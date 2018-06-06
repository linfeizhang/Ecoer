/**
 * Created by ZhouTing on 2018-06-06 17:32.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'

export default class Contractor extends Component {
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
                    <Body><Title>Contractor Info</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View>
                        <Text>Contractor Info</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}