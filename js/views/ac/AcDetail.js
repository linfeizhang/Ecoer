/**
 * Created by ZhouTing on 2018-05-10 14：46.
 */
import React, {Component} from "react";
import {Platform, StyleSheet,View} from 'react-native';
import {Body, Button, Container,Content, Header,Form,Item,Input, Icon,Left, Right, Text, Title} from "native-base";

import styles from './styles/detailStyle';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class AcDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color:'#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>Ac Details</Title></Body>
                    <Right/>
                </Header>

                <Content padder>
                    <View style={styles.row}>
                        <Text>EG9101111111111</Text>
                    </View>


                    <View style={styles.row}>
                        <Text>Model</Text>
                        <Text>EG9101201203251</Text>
                    </View>


                    <View style={styles.row}>
                        <View style={{marginRight:100,flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Text>LP</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text>aaa</Text>
                                <Text>psi</Text>
                            </View>
                        </View>
                        <View style={{marginRight:20,flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Text>HP</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text>bbb</Text>
                                <Text>psi</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.row}>
                        <View style={{marginRight:100,flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Text>Comp</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text>ccc</Text>
                                <Text>rps</Text>
                            </View>
                        </View>
                        <View style={{marginRight:20,flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Text>Fan</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text>ddd</Text>
                                <Text>rpm</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.row}>
                        <View>
                            <Text>Refrence Capacity</Text>
                        </View>
                        <View style={{flexDirection:'row',marginLeft:84}}>
                            <Text>eee</Text>
                            <Text>Btu/h</Text>
                        </View>
                    </View>


                    <View style={styles.row}>
                        <View style={{marginRight:50}}>
                            <Text>Update:</Text>
                        </View>
                        <View>
                            <Text>2018-05-10  15:53:00</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
