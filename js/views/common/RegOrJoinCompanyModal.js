/**
 * Created by ZhouTing on 2018-06-24 16:33.
 */
import React, {Component} from "react";

import {Modal, View} from 'react-native';
import {Button, Text} from "native-base";
import Radio from '../../components/radio';
import px2dp from '../../utils/px2dp';
import I18n from '../../utils/i18n';
import CommonConst from '../../constant/CommonConst';

export default class RegOrJoinCompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyVisible: this.props.modalVisible || false,
            selectedValue: this.props.defaultSelectedValue || 'join'
        };
    }

    /**
     * 设置选择(注册/加入公司)模态框显示或隐藏
     * @param visible
     * @private
     */
    setModelStatus(visible) {
        this.setState({companyVisible: visible});
    }

    render() {
        return (
            <Modal animationType={"fade"}
                   transparent={true}
                   visible={this.state.companyVisible}
                   onRequestClose={() => this.setState({companyVisible: false})}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }}>
                    <View style={{backgroundColor: 'white', width: px2dp(300)}}>
                        <View style={{
                            width: px2dp(300),
                            marginTop: px2dp(20),
                            marginBottom: px2dp(40),
                            paddingLeft: px2dp(20),
                            paddingRight: px2dp(20)
                        }}>
                            <Text>{"Register company information if you are the owner or leader of your company. Otherwise, scan the company's QR Code on the leader's app to join your company that has been registered."}</Text>
                        </View>
                        <View style={{marginLeft: px2dp(20), marginBottom: px2dp(-10)}}>
                            <Text style={{fontSize: px2dp(20)}}>{I18n.t('personalInfo.i_want_to')}</Text>
                        </View>
                        <View>
                            <Radio
                                selectedValue={this.state.selectedValue}
                                onValueChange={(value) => this.props.onRadioValueChange(value)}
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    backgroundColor: '#fff',
                                    paddingLeft: px2dp(20),
                                    paddingBottom: px2dp(10),
                                    marginTop: px2dp(10)
                                }}>
                                <Text value="join">{I18n.t('personalInfo.join_company')}</Text>
                                <Text value="reg">{I18n.t('personalInfo.reg_company')}</Text>
                                <Text value="nothing">{I18n.t('personalInfo.nothing')}</Text>
                            </Radio>
                        </View>
                        <Button full onPress={this.props.chooseCompany}
                                style={{
                                    backgroundColor: CommonConst.color.themeColor,
                                    margin: px2dp(20),
                                    alignItems: 'center',
                                    justifyContent: "center"
                                }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: px2dp(16),
                                    fontWeight: 'bold'
                                }}>{I18n.t('personalInfo.confirm')}</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    }
}