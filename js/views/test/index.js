import React, {Component} from 'react';
import {Platform, View,StyleSheet,TouchableOpacity} from 'react-native';
import {Body, Button, Container, Header,Content, Icon, Left, Right, Text, Title} from "native-base";

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
                    <Body><Title>Test</Title></Body>
                    <Right/>
                </Header>

                <Content>
                    <View>
                        <Text>此页面待定</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}
