/**
 * Created by ZhouTing on 2018-06-07 17:39.
 * 客服中心，包含：Factory Support,Factory Support Email,Web
 */
import React, {Component} from "react";
import {View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import styles from '../styles/contact/indexStyle';

export default class Contact extends Component {
    constructor(props) {
        super(props);
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
                    <Body><Title>Customer Service</Title></Body>
                    <Right/>
                </Header>
                <Content>
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
                            <Text style={{color: 'blue', textDecorationLine: 'underline'}}>www.ecoer.com</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}