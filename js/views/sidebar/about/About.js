/**
 * Created by ZhouTing on 2018-06-03 17:15.
 */
import React, {Component} from "react";
import {Image, TouchableOpacity, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux'
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import Images from '../../../constant/Images';
import {createAction} from '../../../utils/index'

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'SignIn'})
    ]
});

@connect(({token}) => ({...token}))
export default class About extends Component {
    constructor(props) {
        super(props);
    }

    logout() {
        this.props.dispatch(createAction('token/logout')());
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>About</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
                        <Image source={Images.logoImg.logoImg} style={{width: 200, height: 70, resizeMode: 'stretch'}}/>
                    </View>

                    <View style={{alignItems: 'center', marginTop: 20, marginBottom: 160}}>
                        <Text style={{fontSize: 20, fontFamily: 'Cochin',}}>Ecoer Smart Service 1.4.1</Text>
                    </View>

                    <Button full onPress={() => this.logout()}
                            style={{backgroundColor: '#9bb538', paddingTop: 12, paddingBottom: 12}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>Log Out</Text>
                    </Button>

                    <View style={{alignItems: 'center', marginTop: 60}}>
                        <Text>copyright © 2016-2018 Ecoer Inc.</Text>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 6}}>
                        <Text>All Rights Reserved.</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}