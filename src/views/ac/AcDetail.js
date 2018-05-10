/**
 * Created by ZhouTing on 2018-05-10 14：46.
 */
import React, {Component} from "react";
import {Platform, StyleSheet,View} from 'react-native';
import {Body, Button, Container,Content, Header, Icon,Left, Right, Text, Title} from "native-base";
import { Accordion} from 'antd-mobile';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class AcDetail extends Component{
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
                    <View>
                        <Text>EG9101111111111</Text>
                    </View>


                    <View>
                        <Text>Model</Text>
                    </View>


                    <View style={{flex:1,flexDirection:'row'}}>
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


                    <View style={{flex:1,flexDirection:'row'}}>
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


                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Text>Refrence Capacity</Text>
                        </View>
                        <View style={{flexDirection:'row',marginLeft:84}}>
                            <Text>eee</Text>
                            <Text>Btu/h</Text>
                        </View>
                    </View>


                    <View style={{flexDirection:'row'}}>
                        <View style={{marginRight:50}}>
                            <Text>Update:</Text>
                        </View>
                        <View>
                            <Text>2018-05-10  15:53:00</Text>
                        </View>
                    </View>


                    <View style={{marginTop:10,marginBottom:10}}>
                        <Accordion style={{backgroundColor:'#fff'}}>
                            <Accordion.Panel header="Outdoor Unit">
                                <View style={{flex:1,backgroundColor:'red'}}>
                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>Outdoor Unit</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>F5229000011111111111</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>ODU State</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>ODU Stateeeeeee</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>Freq Limited</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>Freq Limiteddddddddd</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>Y Signal</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>0</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>O Signal</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>1</Text>
                                        </View>
                                    </View>
                                </View>

                            </Accordion.Panel>
                        </Accordion>
                    </View>


                    <View>
                        <Accordion style={{backgroundColor:'#fff'}}>
                            <Accordion.Panel header="Field Setting">
                                <View style={{flex:1,backgroundColor:'red'}}>
                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>Outdoor Unit</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>F5229000011111111111</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>ODU State</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>ODU Stateeeeeee</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>Freq Limited</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>Freq Limiteddddddddd</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>Y Signal</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>0</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row',flex:1}}>
                                        <View style={{flex:1}}>
                                            <Text>O Signal</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text>1</Text>
                                        </View>
                                    </View>
                                </View>

                            </Accordion.Panel>
                        </Accordion>
                    </View>
                </Content>
            </Container>
        );
    }
}
