/**
 * Created by ZhouTing on 2018-06-07 18:33.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {Alert, Modal, TouchableOpacity, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';

import Radio from '../../../components/radio';

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
                this._setModelCompany(true);
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
        this.props.navigation.navigate("SelectStateView", {from: 'personalInfo'})
    }

    toSelectCity() {
        this.props.navigation.navigate("SelectCityView", {from: 'personalInfo'})
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
                    <Body><Title>Information</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>E-mail</Text>
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
                                <Text>First Name</Text>
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
                                <Text>Last Name</Text>
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
                                <Text>Mobile Phone</Text>
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
                                <Text>Zip/Postal Code</Text>
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
                                <Text>Country</Text>
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
                                <Text>State</Text>
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
                                <Text>City</Text>
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
                                <Text>Contractor's License</Text>
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

                    <Modal animationType={"fade"}
                           transparent={true}
                           visible={this.props.companyVisible}
                           onRequestClose={() => this._setModelCompany(false)}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 20,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)'
                        }}>
                            <View style={{backgroundColor: 'white', width: 300}}>
                                <View style={{
                                    width: 300,
                                    marginTop: 20,
                                    marginBottom: 40,
                                    paddingLeft: 20,
                                    paddingRight: 20
                                }}>
                                    <Text>{"Register company information if you are the owner or leader of your company. Otherwise, scan the company's QR Code on the leader's app to join your company that has been registered."}</Text>
                                </View>
                                <View style={{marginLeft: 20, marginBottom: -10}}>
                                    <Text style={{fontSize: 20}}>{"I want to"}</Text>
                                </View>
                                <View>
                                    <Radio
                                        selectedValue={this.props.selectedValue}
                                        onValueChange={(value) => this.props.dispatch(createAction('personalInfo/updateState')({selectedValue: value}))}
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            backgroundColor: '#fff',
                                            paddingLeft: 20,
                                            paddingBottom: 10,
                                            marginTop: 10
                                        }}
                                    >
                                        <Text value="join">{"Join a registered company"}</Text>
                                        <Text value="reg">{"Register my company"}</Text>
                                        <Text value="nothing">{"Do it later"}</Text>
                                    </Radio>
                                </View>
                                <Button full style={{
                                    backgroundColor: CommonConst.color.themeColor,
                                    margin: 20,
                                    alignItems: 'center',
                                    justifyContent: "center"
                                }}
                                        onPress={this.chooseCompany.bind(this)}
                                >
                                    <Text
                                        style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{"Confirm"}</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>
        );
    }

    /**
     * 选择注册/加入公司
     */
    chooseCompany() {
        this._setModelCompany(false);
        if (this.props.selectedValue === 'reg') {
            // service.regCompany(this, this.state.contractorInfo._id);
            this.props.dispatch(createAction('personalInfo/regCompany')({nav: this.props.navigation}))
        } else if (this.props.selectedValue === 'join') {
            // const {navigator} = this.props;
            // if (navigator) {
            //     this.props.navigator.push({
            //         title: 'QRScan',
            //         component: QRScan,
            //     });
            // }
        } else {
            this._setModelCompany.bind(this, false);
            this.pageJump();
        }
    }

    /**
     * 注册公司返回结果
     * @param data
     */
    setRegCompany(data) {
        this._setModelCompany(false);//模态框消失。
        if (data.error === undefined) {
            // const {navigator} = this.props;
            // if (navigator) {
            //     this.props.navigator.push({
            //         title: 'AdminCompanyInfo',
            //         component: AdminCompanyInfo,
            //         params: {
            //             companyInfo: {contractorNumber: data.result.contractorNumber, _id: data.result._id}
            //         }
            //     });
            // }
        } else {
            Alert.alert("error", "registration_failed", [{text: "ok"}]);
        }
    }

    /**
     * 设置选择(注册/加入公司)模态框显示或隐藏
     * @param visible
     * @private
     */
    _setModelCompany(visible) {
        this.props.dispatch(createAction('personalInfo/updateState')({companyVisible: visible}));
    }
}