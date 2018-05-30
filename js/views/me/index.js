import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Body, Button, Container, Header,Content, Icon, Left, Right, Text, Title} from "native-base";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component{

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body><Title>Me</Title></Body>
                    <Right/>
                </Header>

                <Content padder>
                    <Text>Me Page</Text>
                </Content>
            </Container>
        );
    }
}
