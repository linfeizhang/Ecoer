/**
 * Created by ZhouTing on 2018-06-14 17:42.
 * 此页面admin下的members页面
 */
import React, {Component} from "react";
import {Alert, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import {connect} from 'react-redux';
import CheckBox from '../../../components/CheckBox';

@connect(({members, contractorInfo}) => ({...members, ...contractorInfo}))
export default class Members extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(createAction('members/updateState')({isShowCheckBox: false, isShowRemoveButton: false}));
        this.props.dispatch(createAction('members/getMembers')({companyId: this.props.companyId}));
        this.contractorIds = [];
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
                        <View style={{flex: 1}}/>
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
                            if (memberName.length > 12) {
                                memberName = memberName.substr(0, 10) + '...';
                            }
                            return (
                                <View key={i} style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    padding: 10,
                                    marginTop: 20
                                }}>
                                    <View style={{flex: 1}}>
                                        {this.props.isShowCheckBox ?
                                            <CheckBox
                                                onValueChange={(isChecked) => this.changeCheckBox(isChecked, item._id)}/> : null
                                        }
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
                        {
                            this.props.isShowRemoveButton ?
                                <Button warning onPress={this.clickRemove.bind(this)}>
                                    <Text style={{color: '#fff', fontSize: 16}}>{"remove"}</Text>
                                </Button> :
                                <Button success onPress={this.clickEdit.bind(this)}>
                                    <Text style={{color: '#fff', fontSize: 16}}>{"Edit"}</Text>
                                </Button>
                        }
                    </View>
                </Content>
            </Container>
        );
    }

    clickEdit() {
        this.props.dispatch(createAction('members/updateState')({isShowCheckBox: true, isShowRemoveButton: true}));
    }

    clickRemove() {
        if (this.contractorIds.length === 0) {
            this.props.dispatch(createAction('members/updateState')({
                isShowCheckBox: false,
                isShowRemoveButton: false
            }));
        } else {
            Alert.alert("remove", "are_you_sure",
                [
                    {text: "cancel", style: 'cancel'},
                    {text: "ok", onPress: () => this.removeMembers()},
                ],
                {cancelable: false}
            )
        }
    }

    removeMembers() {
        this.props.dispatch(createAction('members/deleteMembers')({contractorIds: this.contractorIds}));
    }

    changeCheckBox(isChecked, contractorId) {
        if (isChecked) {
            this.contractorIds.push(contractorId);
        } else {
            this.contractorIds.splice(this.contractorIds.indexOf(contractorId), 1)
        }
    }
}