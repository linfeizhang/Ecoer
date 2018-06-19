/**
 * Created by ZhouTing on 2018-05-06 14:37.
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
    CheckBox,
    Toast
} from "native-base";
import {connect} from 'react-redux'
import {Field, reduxForm} from "redux-form";
import I18n from '../utils/i18n';
import CommonConst from '../constant/CommonConst';
import Images from '../constant/Images';
import {createAction} from '../utils/index'

class SignUp extends Component {

    renderInput({input, label, type, meta: {touched, error, warning}}) {

        let hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError}>
                {/*<Icon active name={input.name === "email" ? "person" : "unlock"}/>*/}
                <Input {...input}
                       style={{marginLeft: 15}}
                       autoCapitalize='none'
                       placeholder={input.name === "email" ? "E-mail" : "Confirm"}
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

    register = values => {
        if (values.email && values.confirm) {
            this.props.dispatch(createAction('signUp/register')({email: values.email, nav: this.props.navigation}))
        } else {
            Toast.show({type: 'danger', text: '输入框不能为空！', duration: 3000, buttonText: "关闭"});
        }
    }

    toggleSwitch(value: string) {
        this.props.dispatch(createAction('signUp/updateState')({isAgree: value}))
    }

    toWebView = (title, url) => {
        this.props.navigation.navigate("WebViewPage", {url: url, title: title})
    };

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
                    <Body><Title>{I18n.t('register.sign_up_title')}</Title></Body>
                    <Right/>
                </Header>
                <Content padder>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 40}}>
                        <Image source={Images.logoImg.logoImg} style={{width: 200, height: 70, resizeMode: 'stretch'}}/>
                    </View>

                    <Field name="email" component={this.renderInput}/>
                    <Field name="confirm" component={this.renderInput}/>

                    <View style={{marginTop:60,flexDirection:'row',marginRight:30}}>
                        <CheckBox checked={this.props.isAgree} style={{marginRight:20}}
                                  onPress={() => this.toggleSwitch(!this.props.isAgree)}/>
                        <View>
                            <Text>To use Ecoer Smart Service app, you must agree to the &nbsp;
                                <Text style={{color: 'blue', textDecorationLine: 'underline'}}
                                      onPress={() => this.toWebView('Terms of Services', 'https://inhanddsm.github.io/EcoerPrivacyStatement/2017/04/03/Terms-of-Service.html')}
                                >Terms of Services</Text>
                            </Text>
                        </View>
                    </View>

                    <Button full style={{marginTop: 20, backgroundColor: CommonConst.color.themeColor}}
                            onPress={handleSubmit(this.register)}>
                        <Text>{I18n.t('register.sign_up_title')}</Text>
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
        error.confirm = "两次输入不同";
    }
    if (!((/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/).test(ema)) && ema !== "") {
        error.email = "格式不正确"
    }
    return error;
};

const SignUpForm = reduxForm({form: "reg", validate})(SignUp);

export default connect(
    ({signUp}) => ({...signUp})
)(SignUpForm)
