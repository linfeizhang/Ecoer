/**
 * Created by ZhouTing on 2018-05-06 14:36.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Body, Button, Container, Header, Left, Right, Text, Title} from "native-base";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class SignIn extends Component<Props> {
    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body><Title>登录</Title></Body>
                    <Right/>
                </Header>
                <Text style={styles.welcome}>
                    登录 页面!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <Button block success style={{marginBottom: 20, height: 45}}
                        onPress={() => this.props.navigation.navigate("SignUp")}>
                    <Text>注册</Text>
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
