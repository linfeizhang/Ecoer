import React, {Component} from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'

import {Button, Text} from 'native-base';

import {createAction} from '../../utils/index'

@connect(({app}) => ({...app}))
class Account extends Component {
    static navigationOptions = {
        title: 'Account',
        tabBarLabel: 'Account',
        tabBarIcon: ({focused, tintColor}) => (
            <Image
                style={[styles.icon, {tintColor: focused ? tintColor : 'gray'}]}
                source={require('../../images/demo/person.png')}
            />
        ),
    }

    gotoLogin = () => {
        // this.props.dispatch(NavigationActions.navigate({routeName: 'Login'}))
        this.props.navigation.navigate('Login');
    }

    logout = () => {
        this.props.dispatch(createAction('app/logout')())
    }

    render() {
        const {login} = this.props;
        return (
            <View style={styles.container}>
                {login ? (
                    <Button onPress={this.logout}>
                        <Text>Logout</Text>
                    </Button>
                ) : (
                    <Button onPress={this.gotoLogin}>
                        <Text>Goto Login</Text>
                    </Button>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 32,
        height: 32,
    },
})

export default Account
