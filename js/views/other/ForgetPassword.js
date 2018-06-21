/**
 * Created by ZhouTing on 2018-06-04 15:41.
 */
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Input,
    Item,
    Left,
    Right,
    Text,
    Title,
    Toast
} from "native-base";
import {connect} from 'react-redux'
import {Field, reduxForm} from "redux-form";
import CommonConst from '../../constant/CommonConst';
import {createAction} from '../../utils/index'
import I18n from '../../utils/i18n';

class ForgetPassword extends Component {
    renderInput({input, label, type, meta: {touched, error, warning}}) {

        let hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError} style={{backgroundColor: '#fff'}}>
                <Input {...input}
                       style={{paddingLeft: 20}}
                       autoCapitalize='none'
                       placeholder={"E-mail"}
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

    submit = values => {
        if (values.email) {
            this.props.dispatch(createAction('forgetPassword/submit')({
                email: values.email,
                nav: this.props.navigation
            }))
        } else {
            Toast.show({
                type: 'danger',
                text: I18n.t('forgotPwd.input_not_empty'),
                duration: 3000,
                buttonText: I18n.t('forgotPwd.close')
            });
        }
    }

    render() {
        const {handleSubmit, reset} = this.props;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body><Title>{I18n.t('forgotPwd.title')}</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{marginTop: 20, marginLeft: 20, marginBottom: 20}}>
                        <Text>{I18n.t('forgotPwd.tip')}</Text>
                    </View>
                    <Field name="email" component={this.renderInput}/>
                    <Button full style={{margin: 15, marginTop: 50, backgroundColor: CommonConst.color.themeColor}}
                            onPress={handleSubmit(this.submit)}>
                        <Text>{I18n.t('forgotPwd.submit')}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const validate = values => {
    const error = {};
    error.email = "";
    error.confirm = "";
    let ema = values.email;
    let confirm = values.confirm;
    if (values.email === undefined) {
        ema = "";
    }
    if (values.confirm === undefined) {
        confirm = "";
    }
    // if (ema.length < 8 && ema !== "") {
    //     error.email = "too short";
    // }
    // if (!ema.includes("@") && ema !== "") {
    //     error.email = "@ not included";
    // }
    if (confirm.length !== 0 && confirm !== ema) {
        error.confirm = I18n.t('forgotPwd.not_same');
    }
    if (!((/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/).test(ema)) && ema !== "") {
        error.email = I18n.t('forgotPwd.incorrect_format')
    }
    return error;
};

const ForgetPasswordForm = reduxForm({form: "reg", validate})(ForgetPassword);

export default connect(
    ({forgetPassword}) => ({...forgetPassword})
)(ForgetPasswordForm)
