/**
 * Created by ZhouTing on 2018/5/1.
 */
import React, {Component} from 'react';
import {StyleProvider} from "native-base";

import Entrance from "../Entrance";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(variables)}>
                <Entrance/>
            </StyleProvider>
        );
    }
}
