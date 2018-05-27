import React, {Component} from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'
import {NavigationActions, StackActions} from 'react-navigation'
import {connect} from 'react-redux'
import {Body, Button, Container, Content, Header, Left, Right, Text, Title} from 'native-base';
import {createAction} from '../../utils/index'

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Main'})
    ]
});


@connect(({app}) => ({...app}))
class Login extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     // 登录完成,切成功登录
    //     if (nextProps.login && !nextProps.loading && !nextProps.fetching) {
    //         this.props.navigation.dispatch(resetAction);
    //         return false;
    //     }
    //     return true;
    // }

    onLogin = () => {
        this.props.dispatch(createAction('app/login')({nav: this.props.navigation}))
    }

    onClose = () => {
        // this.props.dispatch(NavigationActions.back())
        this.props.navigation.goBack();
    }

    render() {
        const {fetching} = this.props;
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body><Title>登录</Title></Body>
                    <Right/>
                </Header>
                <Content padder>
                    {fetching ? (
                        <ActivityIndicator/>
                    ) : (
                        <Button onPress={this.onLogin}>
                            <Text>Login</Text>
                        </Button>
                    )}
                    {!fetching && (
                        <Button style={styles.close} onPress={this.onClose}>
                            <Text>Close</Text>
                        </Button>
                    )}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    close: {
        position: 'absolute',
        right: 20,
        top: 40,
    },
})

export default Login
