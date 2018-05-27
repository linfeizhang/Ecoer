import React, {Component} from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'

import {Button, Text} from 'native-base';

@connect()
class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        tabBarLabel: 'Home',
        tabBarIcon: ({focused, tintColor}) => (
            <Image
                style={[styles.icon, {tintColor: focused ? tintColor : 'gray'}]}
                source={require('../../images/demo/house.png')}
            />
        ),
    }

    gotoDetail = () => {
        // this.props.dispatch(NavigationActions.navigate({routeName: 'Detail'}))
        this.props.navigation.navigate('Detail');
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.gotoDetail}>
                    <Text>Goto Detail</Text>
                </Button>
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

export default Home
