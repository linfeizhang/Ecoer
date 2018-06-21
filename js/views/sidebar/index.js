import React, {Component} from 'react';
import {Platform, View, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import {Body, Button, Container, Header, List, ListItem, Content, Icon, Left, Right, Text, Title} from "native-base";

import styles from './styles/indexStyle';
import CommonConst from "../../constant/CommonConst";
import I18n from '../../utils/i18n';

const drawerCover = require("../../images/drawer-cover.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class App extends Component {

    render() {
        return (
            <Container>
                <Content bounces={false} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                    <Image source={drawerCover} style={styles.drawerCover}/>

                    <List>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("Contact")}>
                            <Left>
                                <Icon active type="MaterialIcons" name='headset-mic'
                                      style={{color: "#ff19a5", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>{I18n.t('drawer.customer_service')}</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder
                                  onPress={() => this.props.navigation.navigate("ContractorInfo", {companyId: CommonConst.userInfo.companyId})}>
                            <Left>
                                <Icon active type="MaterialIcons" name='supervisor-account'
                                      style={{color: "#0186ff", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>{I18n.t('drawer.contractor_info')}</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("Account")}>
                            <Left>
                                <Icon active type="FontAwesome" name='user'
                                      style={{color: "#ff19a5", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>{I18n.t('drawer.account_setting')}</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("About")}>
                            <Left>
                                <Icon active name='help-circle'
                                      style={{color: "#dc7dff", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>{I18n.t('drawer.about')}</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}
