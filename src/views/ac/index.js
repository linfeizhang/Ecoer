import React, {Component} from 'react';
import {FlatList, Platform, StyleSheet, TouchableHighlight, View} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right, Tab, Tabs, Text, Title} from "native-base";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
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
                <Button block success style={{marginBottom: 20, height: 45}}
                        onPress={() => this.props.navigation.navigate("NewAc")}>
                    <Text>NewAc</Text>
                </Button>
            </Container>
        );
    }
}

class ACListTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabLabel: this.props.tab,
        };
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
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View style={{backgroundColor: 'white'}}>
                <Text>{item.key}</Text>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <Container>
                <FlatList
                    data={[{key: 'a'}, {key: 'b'}]}
                    renderItem={this._renderItem}
                />
            </Container>
        );
    }
}