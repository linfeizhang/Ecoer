/**
 * Created by ZhouTing on 2018-06-07 18:33.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {TouchableOpacity, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';
import I18n from '../../../utils/i18n';
import RegOrJoinCompanyModal from '../../common/RegOrJoinCompanyModal';

import CommonConst from '../../../constant/CommonConst';
import {createAction, isEmpty} from '../../../utils'
import styles from '../styles/account/personalStyle';

const HOME_PAGE = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
    ]
});

@connect(({personalInfo}) => ({...personalInfo}))
export default class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.defaultSelectedValue = 'join';
        this.props.dispatch(createAction('personalInfo/getInformation')())
    }

    goBack() {      //左上角退出这个页面的时候，调用的方法
        if (isEmpty(this.props.firstName) ||
            isEmpty(this.props.lastName) ||
            isEmpty(this.props.mobilePhone) ||
            isEmpty(this.props.zipCode) ||
            isEmpty(this.props.country) ||
            isEmpty(this.props.State) ||
            isEmpty(this.props.city)) {
            alert('输入框不能为空！');
        } else {
            if (this.props.companyId) {
                this.pageJump();
            } else {
                //alert('先注册公司');
                this.modal.setModelStatus(true)
            }
        }
    }

    pageJump() {
        let from = this.props.navigation.state.params && this.props.navigation.state.params.from;
        if (from === 'launch') {
            this.props.navigation.dispatch(HOME_PAGE);
        } else {
            this.props.navigation.goBack();
        }
    }

    toTextEdit(editParam, editValue) {
        this.props.navigation.navigate("TextEdit", {editParam: editParam, editValue: editValue})
    }

    toSelectCountry() {
        this.props.navigation.navigate("SelectCountryView", {from: 'personalInfo'})
    }

    toSelectState() {
        this.props.navigation.navigate("SelectStateView", {from: 'personalInfo', selectedCountry: this.props.country})
    }

    toSelectCity() {
        this.props.navigation.navigate("SelectCityView", {
            from: 'personalInfo',
            selectedCountry: this.props.country,
            selectedState: this.props.State
        })
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}
                                  onPress={() => this.goBack()}/>
                        </Button>
                    </Left>
                    <Body><Title>{I18n.t('personalInfo.title')}</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>{I18n.t('personalInfo.email')}</Text>
                            </View>
                            <View>
                                <Text>{this.props.email}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toTextEdit(CommonConst.info.first_name, this.props.firstName)}>
                            <View>
                                <Text>{I18n.t('personalInfo.first_name')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.firstName}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toTextEdit(CommonConst.info.last_name, this.props.lastName)}>
                            <View>
                                <Text>{I18n.t('personalInfo.last_name')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.lastName}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toTextEdit(CommonConst.info.mobile_phone, this.props.mobilePhone)}>
                            <View>
                                <Text>{I18n.t('personalInfo.mobile_phone')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.mobilePhone}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toTextEdit(CommonConst.info.zip_code, this.props.zipCode)}>
                            <View>
                                <Text>{I18n.t('personalInfo.zip_code')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.zipCode}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => this.toSelectCountry()}>
                            <View>
                                <Text>{I18n.t('personalInfo.country')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.country}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => this.toSelectState()}>
                            <View>
                                <Text>{I18n.t('personalInfo.state')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.State}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => this.toSelectCity()}>
                            <View>
                                <Text>{I18n.t('personalInfo.city')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.city}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>{I18n.t('personalInfo.contractor_license')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text/>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <RegOrJoinCompanyModal ref={modal => this.modal = modal}
                                           defaultSelectedValue={this.defaultSelectedValue}
                                           onRadioValueChange={this.onRadioValueChange.bind(this)}
                                           chooseCompany={this.chooseCompany.bind(this)}/>
                </Content>
            </Container>
        );
    }

    /**
     * 选择注册/加入公司
     */
    chooseCompany() {
        this.modal.setModelStatus(false);
        if (this.defaultSelectedValue === 'reg') {
            this.props.dispatch(createAction('personalInfo/regCompany')({nav: this.props.navigation}))
        } else if (this.defaultSelectedValue === 'join') {
            this.props.navigation.navigate("QRScan");
        } else {
            this.pageJump();
        }
    }

    onRadioValueChange(value) {
        this.defaultSelectedValue = value;
    }
}