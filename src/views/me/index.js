import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right, Text, Title} from "native-base";
import {NavigationActions} from 'react-navigation'

let service = require('../../utils/service');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    logout() {
        service.logout(this);
    }

    toLoginPage() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'SignIn'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body><Title>Me</Title></Body>
                    <Right/>
                </Header>
                <Text style={styles.welcome}>
                    me 页面!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <Button block success style={{marginBottom: 20, height: 45}} onPress={() => this.logout()}>
                    <Text>退出</Text>
                </Button>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
