/**
 * 关于
 * Created by ZhouTing on 2018/5/1.
 */
import React, {Component} from 'react';
import {View, Image, StyleSheet} from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Text,
    Left,
    Right,
    Body,
} from "native-base";

let Global = require('../../utils/Global');
import px2dp from '../../utils/px2dp';

export default class About extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={{backgroundColor: "#FFF"}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body><Title>关于</Title></Body>
                    <Right/>
                </Header>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../images/logo.png')} style={meStyle.logoImg}/>
                    <View style={meStyle.versionContent}>
                        <Text style={meStyle.versionText}>Ecoer Smart Service {Global.android_version}</Text>
                    </View>
                    <View style={meStyle.copyRightContent}>
                        <Text>Copyright © 2016-2018 Ecoer Inc.</Text>
                    </View>
                    <View style={meStyle.copyRightSecond}>
                        <Text>All Rights Reserved.</Text>
                    </View>
                </View>
            </Container>
        );
    }
}

let meStyle = StyleSheet.create({
    logoImg: {
        width: px2dp(140),
        height: px2dp(50),
        resizeMode: 'stretch'
    },
    versionContent: {
        alignItems: 'center',
        marginTop: px2dp(10),
        marginBottom: px2dp(10)
    },
    versionText: {
        fontSize: px2dp(18),
        fontFamily: 'Cochin',
        //fontWeight:'bold'
    },
    copyRightContent: {
        alignItems: 'center',
        marginTop: px2dp(10)
    },
    copyRightSecond: {
        alignItems: 'center',
        marginTop: px2dp(6)
    }
});