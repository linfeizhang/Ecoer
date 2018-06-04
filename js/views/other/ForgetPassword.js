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
            Toast.show({type: 'danger', text: '输入框不能为空！', duration: 3000, buttonText: "关闭"});
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
                    <Body><Title>忘记密码</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{marginTop: 20, marginLeft: 20, marginBottom: 20}}>
                        <Text>Email:</Text>
                    </View>
                    <Field name="email" component={this.renderInput}/>
                    <Button full style={{margin: 15, marginTop: 50, backgroundColor: CommonConst.color.themeColor}}
                            onPress={handleSubmit(this.submit)}>
                        <Text>Submit</Text>
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

const ForgetPasswordForm = reduxForm({form: "reg", validate})(ForgetPassword);

export default connect(
    ({forgetPassword}) => ({...forgetPassword})
)(ForgetPasswordForm)
