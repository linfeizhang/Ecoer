/**
 * Created by ZhouTing on 2018-05-27 23:29.
 */
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {connect} from 'react-redux'
import {Field, reduxForm} from "redux-form";
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Left,
    Picker,
    Right,
    Text,
    Title,
    Toast
} from 'native-base';
import I18n from '../utils/i18n';
import Images from '../constant/Images';
import CommonConst from '../constant/CommonConst';

import {createAction} from '../utils/index'

class SignIn extends Component {

    changeLanguage(value: string) {
        let data;
        if (value !== CommonConst.languageCode.unselected) {
            data = {languageCode: value, userLanguage: value};
            I18n.locale = value;
        } else {
            data = {languageCode: value, userLanguage: null};
            I18n.locale = this.props.systemLanguage;
        }

        this.props.dispatch(createAction('i18n/updateState')(data))
    }

    // login() {
    //     if (this.username && this.password) {
    //         this.props.dispatch(createAction('signIn/login')({
    //             username: this.username,
    //             password: this.password,
    //             nav: this.props.navigation
    //         }))
    //     } else {
    //         Toast.show({
    //             type: 'danger',
    //             text: I18n.t('login.user_and_pwd_not_empty'),
    //             duration: 3000,
    //             buttonText: I18n.t('login.close')
    //         });
    //     }
    // }

    submit = values => {
        if (values.email && values.password) {
            this.props.dispatch(createAction('signIn/login')({
                username: values.email.toLowerCase().trim(),
                password: values.password,
                nav: this.props.navigation
            }))
        } else {
            Toast.show({
                type: 'danger',
                text: I18n.t('login.user_and_pwd_not_empty'),
                duration: 3000,
                buttonText: I18n.t('login.close')
            });
        }
    }

    render() {
        const {languageCode, handleSubmit, reset} = this.props;

        return (
            <Container>
                <Header>
                    <Left/>
                    <Body><Title>{I18n.t('login.sign_in')}</Title></Body>
                    <Right/>
                </Header>
                <Content padder>
                    <Form>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select your SIM"
                            headerBackButtonText={I18n.t('login.back')}
                            //iosIcon={<Icon name="ios-arrow-down-outline" />}
                            // style={{width: 120}}
                            textStyle={{color: CommonConst.color.themeColor}}
                            selectedValue={languageCode}
                            onValueChange={this.changeLanguage.bind(this)}
                        >
                            <Picker.Item label={I18n.t('login.language')} value={CommonConst.languageCode.unselected}/>
                            <Picker.Item label="English" value={CommonConst.languageCode.English}/>
                            <Picker.Item label="简体中文" value={CommonConst.languageCode.Chinese}/>
                        </Picker>
                    </Form>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 40}}>
                        <Image source={Images.logoImg.logoImg} style={{width: 200, height: 70, resizeMode: 'stretch'}}/>
                    </View>

                    <Field name="email" component={this.renderInput}/>
                    <Field name="password" component={this.renderInput}/>
                    <Button block style={{marginTop: 20}} onPress={handleSubmit(this.submit)}>
                        <Text>{I18n.t('login.sign_in')}</Text>
                    </Button>

                    <Text>{this.props.message}</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button transparent onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                            <Text>{I18n.t('login.forget_password')}</Text>
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate("SignUp")}>
                            <Text>{I18n.t('login.sign_up')}</Text>
                        </Button>
                    </View>
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
            <Item error={hasError}>
                {/*<Icon active name={input.name === "email" ? "person" : "unlock"}/>*/}
                <Icon active type="FontAwesome" name={input.name === "email" ? "user" : "unlock-alt"}/>
                <Input {...input}
                       autoCapitalize='none'
                       placeholder={input.name === "email" ? I18n.t('login.email') : I18n.t('login.password')}
                       secureTextEntry={input.name === "password"}
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
    error.email = "";
    error.password = "";
    let ema = values.email;
    let pw = values.password;
    if (values.email === undefined) {
        ema = "";
    }
    if (values.password === undefined) {
        pw = "";
    }
    // if (ema.length < 8 && ema !== "") {
    //     error.email = "too short";
    // }
    if (!ema.includes("@") && ema !== "") {
        error.email = "@ not included";
    }
    // if (pw.length > 12) {
    //     error.password = "max 11 characters";
    // }
    // if (pw.length < 5 && pw.length > 0) {
    //     error.password = "Weak";
    // }
    return error;
};

const SignInForm = reduxForm({form: "login", validate})(SignIn);

export default connect(
    ({token, signIn, i18n}) => ({...token, ...signIn, ...i18n})
)(SignInForm)