/**
 * Created by ZhouTing on 2018-06-14 17:42.
 * 此页面admin下的members页面
 */
import React, {Component} from "react";
import {View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import {connect} from 'react-redux';
import CheckBox from '../../../components/CheckBox';

@connect(({members, contractorInfo}) => ({...members, ...contractorInfo}))
export default class Members extends Component {
    constructor(props) {
        super(props);
        //this.companyId = this.props.navigation.state.params && this.props.navigation.state.params.companyId;

        this.props.dispatch(createAction('members/getMembers')({companyId: this.props.companyId}));
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
                            {/*<CheckBox/>*/}
                        </View>
                        <View style={{flex: 2}}>
                            <Text>{this.props.self.firstName + ' ' + this.props.self.lastName}</Text>
                        </View>
                        <View style={{flex: 3}}>
                            <Text>{this.props.self.email}</Text>
                        </View>
                    </View>


                    {
                        this.props.membersList.map((item, i) => {
                            let memberName = item.firstName + ' ' + item.lastName;
                            return (
                                <View key={i} style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    padding: 10,
                                    marginTop: 20
                                }}>
                                    <View style={{flex: 1}}>
                                        <CheckBox/>
                                    </View>
                                    <View style={{flex: 2}}>
                                        <Text>{memberName}</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <Text>{item.email}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }


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