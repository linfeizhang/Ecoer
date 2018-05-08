import React, {Component} from 'react';
import {FlatList, Platform, Alert,Image,StyleSheet, TouchableHighlight, View} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right, Tab, Tabs, Text, Title} from "native-base";

import Images from '../../constant/Images';

let service = require('../../utils/service');

export default class App extends Component{
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
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
                <View style={{height:50,backgroundColor:'pink'}}>
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
            dataResult:[],
        };

        service.getAllACList(this,0);
    }

    setData(data){
        console.log('aaa');
        console.log(data);
        console.log('aaa');
        let aaa=[]
        if(data.error===undefined){
            for(var key in data.result){
                console.log('bbb');
                console.log(data.result[key]);
                console.log('bbb');
                aaa.push(data.result[key]);
            }
            this.setState({dataResult:aaa});
        }else{
            Alert.alert('接口出错了');
        }
    }


    // _renderRow(rowData) {
    //     var state = 0;
    //     if (rowData.acInfo && rowData.acInfo.acState) {
    //         state = rowData.acInfo.acState;
    //     }
    //     return (
    //         <TouchableHighlight onPress={this._pressButton.bind(this, AcDetail, 'AcDetail', rowData)}>
    //             <View style={acStyle.row}>
    //                 <View style={acStyle.rowLeft}>
    //                     <Image source={this.chooseStateImg(state)} style={acStyle.rowLeft_img}/>
    //                 </View>
    //                 <View style={acStyle.rowRight}>
    //                     <Text style={[{marginBottom: 4}, acStyle.rowRightText]}>{rowData.name}</Text>
    //                     <Text style={acStyle.rowRightText}>{I18n.t("iot_sn")} : {rowData.sn}</Text>
    //                 </View>
    //             </View>
    //         </TouchableHighlight>
    //     );
    // }

    _renderItem = ({item, separators}) => (
        <TouchableHighlight
            onPress={() => this._onPress(item)}
            style={{margin:20}}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View style={{flexDirection:'row',flex:1}}>
                <View style={{flex:1}}>
                    <Image source={Images.acState.stateFocus} style={{width: 40, height: 40, resizeMode: 'stretch'}}/>
                </View>
                <View style={{backgroundColor: 'white',flex:5}}>
                    <Text>{item.name}</Text>
                    <Text>IoT SN:{item.sn}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <Container>
                <FlatList
                    // data={[{key: 'a'}, {key: 'b'}]}
                    data={this.state.dataResult}
                    renderItem={this._renderItem}
                />
            </Container>
        );
    }
}