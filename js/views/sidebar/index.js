import React, {Component} from 'react';
import {Platform, View, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import {Body, Button, Container, Header, List, ListItem, Content, Icon, Left, Right, Text, Title} from "native-base";

import styles from './styles/indexStyle';

const drawerCover = require("../../images/drawer-cover.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class App extends Component {

    render() {
        return (
            <Container>
                {/*<Header>*/}
                {/*<Left>*/}
                {/*<Button transparent onPress={() => this.props.navigation.openDrawer()}>*/}
                {/*<Icon name='menu'/>*/}
                {/*</Button>*/}
                {/*</Left>*/}
                {/*<Body><Title>Sidebar</Title></Body>*/}
                {/*<Right/>*/}
                {/*</Header>*/}

                <Content bounces={false} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                    <Image source={drawerCover} style={styles.drawerCover}/>

                    <List>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("Contact")}>
                            <Left>
                                <Icon active type="MaterialIcons" name='headset-mic'
                                      style={{color: "#ff19a5", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>Customer Service</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("Contractor")}>
                            <Left>
                                <Icon active type="MaterialIcons" name='supervisor-account'
                                      style={{color: "#0186ff", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>Contractor info</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("Account")}>
                            <Left>
                                <Icon active type="FontAwesome" name='user'
                                      style={{color: "#ff19a5", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>Account Setting</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("About")}>
                            <Left>
                                <Icon active name='help-circle'
                                      style={{color: "#dc7dff", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>About</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                    </List>
                </Content>

                {/*<Content>*/}
                {/*<View style={styles.part}>*/}
                {/*<View style={styles.item}>*/}
                {/*<View>*/}
                {/*<Text>Factory Support</Text>*/}
                {/*</View>*/}
                {/*<View>*/}
                {/*<Text>+1-(703)348-2538</Text>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*<View style={styles.item}>*/}
                {/*<View>*/}
                {/*<Text>Factory Support Email</Text>*/}
                {/*</View>*/}
                {/*<View>*/}
                {/*<Text>support@ecoer.com</Text>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*<View style={styles.item}>*/}
                {/*<View>*/}
                {/*<Text>Web</Text>*/}
                {/*</View>*/}
                {/*<View>*/}
                {/*<Text>www.ecoer.com</Text>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*</View>*/}

                {/*<View style={styles.part}>*/}
                {/*<TouchableOpacity style={styles.item}>*/}
                {/*<View>*/}
                {/*<Text>Contractor</Text>*/}
                {/*</View>*/}
                {/*<View style={{flexDirection: 'row'}}>*/}
                {/*<Text style={{marginRight: 10}}>Test</Text>*/}
                {/*<Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={styles.item}>*/}
                {/*<View>*/}
                {/*<Text>Personal Setting</Text>*/}
                {/*</View>*/}
                {/*<View>*/}
                {/*<Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={styles.item}>*/}
                {/*<View>*/}
                {/*<Text>Change Password</Text>*/}
                {/*</View>*/}
                {/*<View>*/}
                {/*<Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate("About")}>*/}
                {/*<View>*/}
                {/*<Text>About</Text>*/}
                {/*</View>*/}
                {/*<View>*/}
                {/*<Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}
                {/*</Content>*/}
            </Container>
        );
    }
}
