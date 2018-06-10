/**
 * Created by ZhouTing on 2018-06-10 09:13.
 */
import React, {Component} from "react";
import {ActivityIndicator} from "react-native";
import {Container} from "native-base";
import {connect} from 'react-redux'

import Launch from './components/Launch';
import {createAction} from './utils/index'

@connect(({token}) => ({...token}))
export default class DataLoad extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(createAction('dataLoad/getAppInfo')());
    }

    render() {
        return (
            <Container style={{justifyContent: "center", alignItems: "center"}}>
                <Launch/>
            </Container>
        );
    }
}