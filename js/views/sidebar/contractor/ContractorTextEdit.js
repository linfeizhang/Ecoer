/**
 * Created by ZhouTing on 2018-06-12 15:06.
 */
import React, {Component} from "react";
import {Alert} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Input, Item, Left, Right, Title, Toast} from "native-base";
import {connect} from 'react-redux'
import {createAction} from '../../../utils'
import CommonConst from "../../../constant/CommonConst";

@connect(({contractorInfo}) => ({...contractorInfo}))
export default class ContractorTextEdit extends Component {
    constructor(props) {
        super(props);
        this.isEnable = true;//控制提交按钮不能连续点击.
    }

    isPhoneNum(num) {
        const regular1 = /^\d{10}$/;
        const regular2 = /^\d{3}-\d{3}-\d{4}$/;
        return regular1.test(num) || regular2.test(num);
    }

    clickRightButton() {
        if (this.isEnable) {    //为了避免快速连续点击出现多次发请求
            if (this.editValue !== '' && this.editValue !== undefined) {
                let editValue = this.editValue;

                let editParam = this.props.navigation.state.params && this.props.navigation.state.params.editParam;

                switch (editParam) {
                    case CommonConst.company.name :
                    case CommonConst.company.address :
                        if (!(/^[\w&,-.\s]{1,64}$/.test(editValue))) {
                            Toast.show({
                                type: 'danger',
                                text: "长度为64个字母，数字，空格，逗号，句号 ‘-’",
                                duration: 3000,
                                buttonText: "关闭"
                            });
                            return;
                        }
                        break;
                    case CommonConst.company.ein:
                        if (!(/^[a-zA-Z0-9-]+$/.test(editValue))) {
                            Toast.show({
                                type: 'danger',
                                text: "只允许大小写字母，数字，连字符 ‘-’",
                                duration: 3000,
                                buttonText: "关闭"
                            });
                            return
                        }
                        break;
                    case CommonConst.company.zip :
                        if (!(/^[a-zA-Z0-9]{5,6}$/.test(editValue))) {
                            Toast.show({
                                type: 'danger',
                                text: "5~6位数字和字母组合，可以是纯数字或者纯字母",
                                duration: 3000,
                                buttonText: "关闭"
                            });
                            return;
                        }
                        break;
                    case CommonConst.company.telephone :
                        if (!this.isPhoneNum(editValue)) {
                            Toast.show({
                                type: 'danger',
                                text: "请输入正确的电话号码",
                                duration: 3000,
                                buttonText: "关闭"
                            });
                            return;
                        }
                        break;
                    case CommonConst.company.fax :
                        if (!this.isPhoneNum(editValue)) {
                            Toast.show({
                                type: 'danger',
                                text: "请输入正确的传真",
                                duration: 3000,
                                buttonText: "关闭"
                            });
                            return;
                        }
                        break;
                }
                this.isEnable = false;
                this.props.dispatch(createAction('contractorInfo/updateCompanyInfo')({
                    type: editParam,
                    value: editValue,
                    nav: this.props.navigation
                }))
            } else {
                Alert.alert('', "The input box can not be empty", [{text: "ok"}]);
            }
        }
    }

    render() {
        let editParam = this.props.navigation.state.params && this.props.navigation.state.params.editParam;
        let editValue = this.props.navigation.state.params && this.props.navigation.state.params.editValue;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>{editParam}</Title></Body>
                    <Right>
                        <Button transparent onPress={() => this.clickRightButton()}>
                            <Icon type="MaterialIcons" name='check' style={{color: '#8fb721'}}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Item style={{marginTop: 20}}>
                        <Input value={editValue}
                               autoCapitalize='none'
                               style={{backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20}}
                               onChangeText={(editValue) => this.editValue = editValue}
                            // placeholder={}
                        />
                    </Item>
                </Content>
            </Container>
        );
    }
}