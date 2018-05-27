import React, {Component} from 'react';
import {Alert, FlatList, Image, TouchableHighlight, View} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right, Tab, Tabs, Text, Title} from "native-base";

import Images from '../../constant/Images';

// let service = require('../../utils/service');

export default class App extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body><Title>AC</Title></Body>
                    <Right/>
                </Header>

                <Tabs>
                    <Tab heading="All">
                        <ACListTab {...this.props} tab="All"/>
                    </Tab>
                    <Tab heading="Online">
                        <ACListTab {...this.props} tab="Online"/>
                    </Tab>
                    <Tab heading="Offline">
                        <ACListTab {...this.props} tab="Offline"/>
                    </Tab>
                </Tabs>
                <View style={{height: 50, backgroundColor: 'pink'}}>
                    {/*<Button block success style={{marginBottom: 20, height: 45}}*/}
                    {/*onPress={() => this.props.navigation.navigate("NewAc")}>*/}
                    {/*<Text>NewAc</Text>*/}
                    {/*</Button>*/}
                </View>
            </Container>
        );
    }
}

class ACListTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabLabel: this.props.tab,
            dataResult: [],
        };

        // service.getAllACList(this, 0);
    }

    setData(data) {
        if (data.error === undefined) {
            this.setState({dataResult: data.result});
        } else {
            Alert.alert('接口出错了');
        }
    }

    _renderItem = ({item, separators}) => (
        <TouchableHighlight
            onPress={() => this.props.navigation.navigate("AcDetail")}
            style={{margin: 20}}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View style={{flexDirection: 'row', flex: 1}}>
                <View style={{flex: 1}}>
                    <Image source={Images.acState.stateFocus} style={{width: 40, height: 40, resizeMode: 'stretch'}}/>
                </View>
                <View style={{flex: 5}}>
                    <Text>{item.name}</Text>
                    <Text>IoT SN:{item.sn}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    _keyExtractor = (item, index) => item._id;

    render() {
        return (
            <Container>
                <FlatList
                    // data={[{key: 'a'}, {key: 'b'}]}
                    style={{backgroundColor: 'white'}}
                    data={this.state.dataResult}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </Container>
        );
    }
}