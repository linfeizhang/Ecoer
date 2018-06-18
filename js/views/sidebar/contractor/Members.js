/**
 * Created by ZhouTing on 2018-06-14 17:42.
 * 此页面admin下的members页面
 */
import React, {Component} from "react";
import {View} from 'react-native';
import {Body, Button, Container, Content, Header, CheckBox, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import {connect} from 'react-redux';

@connect(({contractorInfo}) => ({...contractorInfo}))
export default class Members extends Component {
    constructor(props) {
        super(props);
        // this.props.dispatch(createAction('contractorInfo/getAdminCompanyInfo')())
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
                    <Body><Title>Members</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginTop: 20}}>
                        <View style={{flex: 1}}>
                            <CheckBox checked={true}/>
                        </View>
                        <View style={{flex: 2}}>
                            <Text>612a</Text>
                        </View>
                        <View style={{flex: 3}}>
                            <Text>test@612a.com</Text>
                        </View>
                    </View>
                    <View style={{margin: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Button success>
                            <Text>Edit</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}