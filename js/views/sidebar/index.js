import React, {Component} from 'react';
import {Dimensions, Image} from 'react-native';
import {Container, Content, Icon, Left, List, ListItem, Right, Text} from "native-base";
import {connect} from 'react-redux';
import styles from './styles/indexStyle';
import I18n from '../../utils/i18n';
import CommonConst from '../../constant/CommonConst';
import RegOrJoinCompanyModal from '../common/RegOrJoinCompanyModal';
import {createAction} from '../../utils'

const drawerCover = require("../../images/drawer-cover.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

@connect(({personalInfo}) => ({...personalInfo}))
export default class App extends Component {

    constructor(props) {
        super(props);
        this.defaultSelectedValue = 'join';
    }

    render() {
        return (
            <Container>
                <Content bounces={false} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                    <Image source={drawerCover} style={styles.drawerCover}/>

                    <List>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("Contact")}>
                            <Left>
                                <Icon active type="MaterialIcons" name='headset-mic'
                                      style={{color: "#ff19a5", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>{I18n.t('drawer.customer_service')}</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.clickCompanyInfo()}>
                            <Left>
                                <Icon active type="MaterialIcons" name='supervisor-account'
                                      style={{color: "#0186ff", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>{I18n.t('drawer.contractor_info')}</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("Account")}>
                            <Left>
                                <Icon active type="FontAwesome" name='user'
                                      style={{color: "#ff19a5", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>{I18n.t('drawer.account_setting')}</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("About")}>
                            <Left>
                                <Icon active name='help-circle'
                                      style={{color: "#dc7dff", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>{I18n.t('drawer.about')}</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                    </List>
                </Content>
                <RegOrJoinCompanyModal ref={modal => this.modal = modal}
                                       defaultSelectedValue={this.defaultSelectedValue}
                                       onRadioValueChange={this.onRadioValueChange.bind(this)}
                                       chooseCompany={this.chooseCompany.bind(this)}/>
            </Container>
        );
    }

    /**
     * 点击看出公司信息
     */
    clickCompanyInfo() {
        if (CommonConst.userInfo && CommonConst.userInfo.companyId) {
            if (CommonConst.companyInfo.adminId === CommonConst.userInfo._id) {
                this.props.navigation.navigate("ContractorInfo", {companyId: CommonConst.userInfo.companyId})
            } else {
                this.props.navigation.navigate("CompanyInfo", {companyId: CommonConst.userInfo.companyId})
            }
        } else {
            this.modal.setModelStatus(true)
        }
    }

    chooseCompany() {
        this.modal.setModelStatus(false);
        if (this.defaultSelectedValue === 'reg') {
            this.props.dispatch(createAction('personalInfo/regCompany')({
                adminId: CommonConst.userInfo._id,
                nav: this.props.navigation
            }))
        } else if (this.defaultSelectedValue === 'join') {
            // const {navigator} = this.props;
            // if (navigator) {
            //     this.props.navigator.push({
            //         title: 'QRScan',
            //         component: QRScan,
            //     });
            // }
        } else {
            this.modal.setModelStatus(false);
        }
    }

    onRadioValueChange(value) {
        this.defaultSelectedValue = value;
    }
}
