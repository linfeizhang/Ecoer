/**
 * Created by ZhouTing on 2018-06-07 18:33.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {Alert, Modal, PixelRatio, TouchableOpacity, View} from 'react-native';
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

    goBack() {
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
                alert('先注册公司');
                // this._setModelCompany(true);
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
                        <TouchableOpacity style={styles.item}>
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
                        <TouchableOpacity style={styles.item}>
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
                        <TouchableOpacity style={styles.item}>
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
                            <View style={{backgroundColor: 'white', width: 300,}}>
                                <View style={{
                                    width: 300,
                                    marginTop: 20,
                                    marginBottom: 40,
                                    paddingLeft: 20,
                                    paddingRight: 20
                                }}>
                                    <Text>{"ecoer_promise"}</Text>
                                </View>
                                <View style={{marginLeft: 20, marginBottom: -10}}>
                                    <Text style={{fontSize: 20}}>{"want_to"}</Text>
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
                                        <Text value="join">{"join_company"}</Text>
                                        <Text value="reg">{"register_company"}</Text>
                                        <Text value="nothing">{"do_later"}</Text>
                                    </Radio>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    margin: 20,
                                    justifyContent: 'space-between'
                                }}>
                                    {/*<TouchableOpacity style={meStyle.modalButton}*/}
                                    {/*onPress={this.clickCancel.bind(this)}>*/}
                                    {/*<Text style={meStyle.modalButtonText}>Cancel</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                    <TouchableOpacity style={{
                                        backgroundColor: '#8fb721',
                                        marginBottom: 20,
                                        width: 260,
                                        height: 40,
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        borderRadius: 4 / PixelRatio.get()
                                    }}
                                                      onPress={this.chooseCompany.bind(this)}>
                                        <Text
                                            style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{"confirm"}</Text>
                                    </TouchableOpacity>
                                </View>
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
        if (this.state.selectedValue === 'reg') {
            // service.regCompany(this, this.state.contractorInfo._id);
        } else if (this.state.selectedValue === 'join') {
            // const {navigator} = this.props;
            // if (navigator) {
            //     this.props.navigator.push({
            //         title: 'QRScan',
            //         component: QRScan,
            //     });
            // }
        } else {
            this._setModelCompany.bind(this, false);
            this.goBack();
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
            Alert.alert(I18n.t("error"), I18n.t("registration_failed"), [{text: I18n.t("ok")}]);
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