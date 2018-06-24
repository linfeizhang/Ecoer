import React, {Component} from 'react';
import {Alert, FlatList, Image, TouchableHighlight, View} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right, Tab, Tabs, Text, Title} from "native-base";
import {connect} from 'react-redux'
import Images from '../../constant/Images';
import {createAction} from '../../utils/index'

// let service = require('../../utils/service');

@connect(({acList, token}) => ({...acList, ...token}))
export default class App extends Component {
    render() {
        const {changeText, changeTextA} = this.props;
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
                {/*<View style={{height: 50}}>*/}
                {/*<Button block success style={{marginBottom: 20, height: 45}}*/}
                {/*onPress={() => this.props.navigation.navigate("NewAc")}>*/}
                {/*<Text>NewAc</Text>*/}
                {/*</Button>*/}
                {/*</View>*/}
                <View style={{height: 110}}>
                    <Button full success style={{marginBottom: 10, height: 45}}
                            onPress={() => this.changeBtnText(changeTextA)}>
                        <Text>{changeText}</Text>
                    </Button>
                    <Button full success style={{marginBottom: 10, height: 45}}
                            onPress={() => this.props.navigation.navigate("ScanView")}>
                        <Text>{changeText}</Text>
                    </Button>
                </View>
            </Container>
        );
    }

    changeBtnText(value: string) {
        this.props.dispatch(createAction('acList/updateState')({changeText: value}))
    }
}

class ACListTab extends Component {

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
                    {/*<Text>{item.name}</Text>*/}
                    <Text>Test Test Test Test</Text>
                    {/*<Text>IoT SN:{item.sn}</Text>*/}
                    <Text>IoT SN: EG9101122334455</Text>
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
                    data={[{key: 'aaa'}, {key: 'bbb'}, {key: 'ccc'}, {key: 'ddd'}]}
                    // keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </Container>
        );
    }
}