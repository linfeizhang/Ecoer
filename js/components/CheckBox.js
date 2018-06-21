/**
 * Created by ZhouTing on 2018-06-21 22:49.
 *
 * 复选框组件，实现组件内UI刷新(避免整个页面刷新).参数详情如下:
 * onValueChange(可选):参数类型function,点击复选框时回调此function，并传入当前复选框状态值；
 * defaultChecked(可选):复选框默认是否选中,默认false。
 */
import React, {Component} from "react";
import {CheckBox as CheckBoxNB} from "native-base";

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.defaultChecked || false,
        }
    }

    click() {
        this.props.onValueChange && this.props.onValueChange(!this.state.isChecked);
        this.setState({isChecked: !this.state.isChecked});
    }

    render() {
        return (
            <CheckBoxNB {...this.props} checked={this.state.isChecked} onPress={this.click.bind(this)}/>
        );
    }
}