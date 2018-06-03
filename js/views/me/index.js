import React, {Component} from 'react';
import {Platform, View,StyleSheet,TouchableOpacity} from 'react-native';
import {Body, Button, Container, Header,Content, Icon, Left, Right, Text, Title} from "native-base";

import styles from './styles/indexStyle';

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

                <Content>
                    <View style={styles.part}>
                        <View style={styles.item}>
                            <View>
                                <Text>Factory Support</Text>
                            </View>
                            <View>
                                <Text>+1-(703)348-2538</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>Factory Support Email</Text>
                            </View>
                            <View>
                                <Text>support@ecoer.com</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>Web</Text>
                            </View>
                            <View>
                                <Text>www.ecoer.com</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Contractor</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{marginRight: 10}}>Test</Text>
                                <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Personal Setting</Text>
                            </View>
                            <View>
                                <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Change Password</Text>
                            </View>
                            <View>
                                <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate("About")}>
                            <View>
                                <Text>About</Text>
                            </View>
                            <View>
                                <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}
