/**
 * Created by ZhouTing on 2018/6/18.
 */
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right, Text, Title} from "native-base";

import {connect} from 'react-redux'
import {createAction} from '../../utils'
import CommonConst from "../../constant/CommonConst";

@connect(({personalInfo}) => ({...personalInfo}))
export default class SelectCountryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['USA', 'Canada']
        };
        this.isEnable = true;
    }

    pressButton(selectedCountry) {
        let from = this.props.navigation.state.params && this.props.navigation.state.params.from;
        if (this.isEnable) {
            this.isEnable = false;
            if (from === 'personalInfo') {
                this.props.dispatch(createAction('personalInfo/modifyUserInfo')({
                    type: CommonConst.info.country,
                    value: selectedCountry,
                    nav: this.props.navigation
                }))
            } else if (from === 'company') {
                this.props.dispatch(createAction('contractorInfo/updateCompanyInfo')({
                    type: CommonConst.company.country,
                    value: selectedCountry,
                    nav: this.props.navigation
                }))
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
                          style={{backgroundColor: '#fff'}}
                />
            </Container>
        );
    }
}

