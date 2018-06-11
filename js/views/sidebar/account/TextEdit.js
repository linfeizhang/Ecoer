/**
 * Created by ZhouTing on 2018-06-10 22:01.
 */
import React, {Component} from "react";
import {Alert} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Input, Item, Left, Right, Title} from "native-base";
import {connect} from 'react-redux'
import {createAction} from '../../../utils'
import CommonConst from "../../../constant/CommonConst";

@connect(({personalInfo}) => ({...personalInfo}))
export default class TextEdit extends Component {
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
                    case CommonConst.info.first_name :
                    case CommonConst.info.last_name :
                        if (!(/^[\sa-zA-Z0-9_-]+$/.test(editValue))) {
                            alert("allowed_letters_number_spaces");
                            return;
                        }
                        break;
                    // case 'address':
                    //     if (!(/^[\w&,.\s]{1,128}$/.test(this.state.editParam))) {
                    //         this.setState({regMessage: 'Please enter the Address'});
                    //         return
                    //     }
                    //     break;
                    case CommonConst.info.zip_code :
                        if (!(/^[a-zA-Z0-9]{5,6}$/.test(editValue))) {
                            alert("only_5_numbers");
                            return;
                        }
                        break;
                    case CommonConst.info.mobile_phone :
                        if (!this.isPhoneNum(editValue)) {
                            alert("telephone_regular");
                            return;
                        }
                        // editParam = this.state.phoneCode + '-' + this.state.editParam;
                        break;
                    // case 'licenseId' :
                    //
                    //     break;
                }
                this.isEnable = false;
                this.props.dispatch(createAction('personalInfo/modifyUserInfo')({
                    type: editParam,
                    value: editValue,
                    nav: this.props.navigation
                }))
            } else {
                Alert.alert('', "input_not_empty", [{text: "ok"}]);
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
                    <Item>
                        <Input value={editValue}
                               autoCapitalize='none'
                               onChangeText={(editValue) => this.editValue = editValue}
                            // placeholder={}
                        />
                    </Item>
                </Content>
            </Container>
        );
    }
}