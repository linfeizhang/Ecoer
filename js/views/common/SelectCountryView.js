/**
 * Created by ZhouTing on 2018/6/18.
 */
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right, Text, Title} from "native-base";

export default class SelectCountryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['USA', 'Canada']
        };
        this.isEnable = true;   //解决选择的时候点击两下的问题
    }

    pressButton(selectedCountry) {
        alert(selectedCountry);
        if (this.isEnable) {
            this.isEnable = false;
            this.selectedCountry = selectedCountry;
            if (this.props.from === 'contractor') {
                // service.modifyUserInfo(this, "country", selectedCountry);
            } else if (this.props.from === 'company') {
                // service.updateCompanyInfo(this, 'country', selectedCountry, this.props.companyId);
            }
        }
    }

    renderRow = ({item}) => {
        return (
            <TouchableOpacity onPress={this.pressButton.bind(this, item)}>
                <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#e5e5e5'}}>
                    <Text>{item}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    _keyExtractor = (item, index) => index + ',' + item;

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}
                                  onPress={() => this.props.navigation.goBack()}/>
                        </Button>
                    </Left>
                    <Body><Title>country</Title></Body>
                    <Right/>
                </Header>
                <FlatList enableEmptySections
                          ref={list => this.flatList = list}
                          data={this.state.data}
                          renderItem={this.renderRow}
                          keyExtractor={this._keyExtractor}
                          initialNumToRender={100}
                          style={{backgroundColor:'#fff'}}
                />
            </Container>
        );
    }
}

