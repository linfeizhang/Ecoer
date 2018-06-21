/**
 * Created by ZhouTing on 2018-06-10 08:18.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {View, TouchableOpacity} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Item,
    Input,
    Icon,
    Left,
    Right,
    Text,
    Title,
    Toast
} from "native-base";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux'
import {createAction} from '../../../utils/index'
import I18n from '../../../utils/i18n';
import CommonConst from '../../../constant/CommonConst';
import styles from '../styles/account/changePassword';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
    }

    submit = values => {
        if (values.oldPassword && values.newPassword) {
            this.props.dispatch(createAction('changePassword/submit')({
                oldPassword: values.oldPassword.trim(),
                newPassword: values.newPassword.trim(),
                nav: this.props.navigation
            }))
        } else {
            Toast.show({
                type: 'danger',
                text: I18n.t('changePwd.input_not_empty'),
                duration: 3000,
                buttonText: I18n.t('changePwd.close')
            });
        }
    }

    render() {
        const {handleSubmit, reset} = this.props;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}
                                  onPress={() => this.props.navigation.goBack()}/>
                        </Button>
                    </Left>
                    <Body><Title>{I18n.t('changePwd.change_pwd_title')}</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
                        <View>
                            <Text>{I18n.t('changePwd.email')}</Text>
                        </View>
                        <View>
                            <Text>test@qq.com</Text>
                        </View>
                    </View>
                    <Field name="oldPassword" component={this.renderInput}/>
                    <Field name="newPassword" component={this.renderInput}/>
                    <Field name="confirm" component={this.renderInput}/>
                    <Button block style={{marginTop: 20, backgroundColor: CommonConst.color.themeColor}}
                            onPress={handleSubmit(this.submit)}>
                        <Text>{I18n.t('changePwd.submit')}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }


    renderInput({input, label, type, meta: {touched, error, warning}}) {

        let hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError} style={{backgroundColor: '#fff', marginTop: 20}}>
                <Input {...input}
                       autoCapitalize='none'
                       style={{paddingLeft: 20, paddingRight: 20}}
                       placeholder={input.name === "oldPassword" ? "Old Password" : input.name === "newPassword" ? "New Password" : "Confirm"}
                       secureTextEntry={true}
                />
                {
                    hasError ?
                        <Item style={{borderColor: "transparent"}}>
                            <Icon active style={{color: "red", marginTop: 5}} name="close"/>
                            <Text style={{fontSize: 15, color: "red"}}>{error}</Text>
                        </Item> : <Text/>
                }
            </Item>
        )
    }

}

const validate = values => {
    const error = {};
    error.oldPassword = "";
    error.newPassword = "";
    error.confirm = "";
    let oldPass = values.oldPassword;
    let newPass = values.newPassword;
    let confirm = values.confirm;
    if (values.oldPassword === undefined) {
        oldPass = "";
    }
    if (values.newPassword === undefined) {
        newPass = "";
    }
    if (values.confirm === undefined) {
        confirm = "";
    }
    if ((newPass.length < 4 || newPass.length >= 12) && newPass !== '' && newPass.length !== 0) {
        // error.newPassword = "请输入4-12位字符"
        error.newPassword = I18n.t('changePwd.character_length')
    }
    if (confirm.length !== 0 && confirm !== newPass) {
        error.confirm = I18n.t('changePwd.not_same');
    }
    return error;
};

const ChangePasswordForm = reduxForm({form: "changePassword", validate})(ChangePassword);
export default connect(
    ({changePassword}) => ({...changePassword})
)(ChangePasswordForm)