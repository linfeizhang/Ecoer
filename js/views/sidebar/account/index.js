/**
 * Created by ZhouTing on 2018-06-06 17:32.
 * 账户设置,包含Personal Setting和ChangePassword
 */
import React, {Component} from "react";
import {TouchableOpacity, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import styles from '../styles/account/indexStyle';


export default class Account extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Home")}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>Account Setting</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <TouchableOpacity style={styles.item}
                                      onPress={() => this.props.navigation.navigate("PersonalInfo", {from: 'account'})}>
                        <View>
                            <Text>Personal Setting</Text>
                        </View>
                        <View>
                            <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}
                                      onPress={() => this.props.navigation.navigate("ChangePassword")}>
                        <View>
                            <Text>Change Password</Text>
                        </View>
                        <View>
                            <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                        </View>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}