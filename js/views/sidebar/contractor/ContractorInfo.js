/**
 * Created by ZhouTing on 2018-06-06 17:32.
 * 此页面为自己是admin的查看公司信息页面
 */
import React, {Component} from "react";
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import {connect} from 'react-redux';
import I18n from '../../../utils/i18n';
import styles from '../styles/contractor/indexStyle';

import CommonConst from '../../../constant/CommonConst';
import QRCode from '../../../components/qrcode';

import px2dp from '../../../utils/px2dp';

@connect(({contractorInfo}) => ({...contractorInfo}))
export default class ContractorInfo extends Component {
    constructor(props) {
        super(props);

        this.companyId = this.props.navigation.state.params && this.props.navigation.state.params.companyId;

        this.props.dispatch(createAction('contractorInfo/getAdminCompanyInfo')({companyId: this.companyId}));
        this.props.dispatch(createAction('contractorInfo/getQR')());
    }

    toContractorTextEdit(editParam, editValue) {
        this.props.navigation.navigate("ContractorTextEdit", {
            editParam: editParam,
            editValue: editValue
        })
    }

    toSelectCountry() {
        this.props.navigation.navigate("SelectCountryView", {from: 'company'})
    }

    toSelectState() {
        this.props.navigation.navigate("SelectStateView", {from: 'company', selectedCountry: this.props.country})
    }

    toSelectCity() {
        this.props.navigation.navigate("SelectCityView", {
            from: 'company',
            selectedCountry: this.props.country,
            selectedState: this.props.State
        })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>{I18n.t('contractor.contractor_title')}</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View
                        style={{height: px2dp(200), alignItems: 'center', padding: px2dp(10), marginBottom: px2dp(60)}}>
                        {
                            this.props.qrCodeInfo ? //避免网络比较慢的时候，会先出现一个比较稀疏的二维码的问题
                                <QRCode
                                    value={this.props.qrCodeInfo}
                                    size={px2dp(200)}
                                    // bgColor='#000'
                                    // fgColor='white'
                                    bgColor='#000'
                                    fgColor='white'
                                    level='L'
                                /> :
                                <View style={{height: px2dp(180), alignItems: 'center', justifyContent: 'center'}}>
                                    <ActivityIndicator/>
                                </View>
                        }
                        <View style={{marginTop: px2dp(30), alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: px2dp(16), color: '#9bb538'}}>{I18n.t('contractor.qr_code')}</Text>
                        </View>
                    </View>

                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>{I18n.t('contractor.contractor_no')}</Text>
                            </View>
                            <View>
                                <Text>{this.props.contractorNo}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toContractorTextEdit(CommonConst.company.name, this.props.name)}>
                            <View>
                                <Text>{I18n.t('contractor.name')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.name}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toContractorTextEdit(CommonConst.company.ein, this.props.ein)}>
                            <View>
                                <Text>{I18n.t('contractor.ein')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.ein}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toContractorTextEdit(CommonConst.company.telephone, this.props.telephone)}>
                            <View>
                                <Text>{I18n.t('contractor.telephone')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.telephone}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toContractorTextEdit(CommonConst.company.fax, this.props.fax)}>
                            <View>
                                <Text>{I18n.t('contractor.fax')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.fax}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toContractorTextEdit(CommonConst.company.address, this.props.address)}>
                            <View>
                                <Text>{I18n.t('contractor.address')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.address}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.toContractorTextEdit(CommonConst.company.zip, this.props.zip_code)}>
                            <View>
                                <Text>{I18n.t('contractor.zip_code')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>{this.props.zip_code}</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => this.toSelectCountry()}>
                            <View>
                                <Text>{I18n.t('contractor.country')}</Text>
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
                                <Text>{I18n.t('contractor.state')}</Text>
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
                                <Text>{I18n.t('contractor.city')}</Text>
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
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.props.navigation.navigate("CompanyImgUpload", {companyId: this.companyId})}>
                            <View>
                                <Text>{I18n.t('contractor.liability_insurance_coverage')}</Text>
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


                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate("Members")}>
                            <View>
                                <Text>{I18n.t('contractor.members')}</Text>
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
                </Content>
            </Container>
        );
    }
}