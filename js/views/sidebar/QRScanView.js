/**
 * Created by ZhouTing on 2018-06-24 18:43.
 */
import React, {Component} from 'react';
import {Alert, Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Body, Button, Header, Icon, Left, Right, Text, Title} from "native-base";
import {NavigationActions, StackActions} from 'react-navigation';
import px2dp from '../../utils/px2dp';
import Barcode from 'react-native-smart-barcode'
import I18n from "react-native-i18n";
import CommonConst from '../../constant/CommonConst';
import Permissions from 'react-native-permissions'

let api = require('../../utils/api');

let {width: deviceWidth} = Dimensions.get('window');

export default class QRScanView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCameraPermission: false,
            isEnableFlashlight: false        //闪光灯是否开启
        };
    }

    componentWillMount() {
        Permissions.check('camera').then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            if (response === 'authorized' || response === 'undetermined') {
                this.setState({isCameraPermission: true});
            }
            console.log(response)
        });
    }

    flashlightButton() {    //点击闪光灯方法
        if (this.state.isEnableFlashlight) {
            this._barCode.closeTorch();
            this.setState({isEnableFlashlight: false});
        } else {
            this._barCode.openTorch();
            this.setState({isEnableFlashlight: true});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>{"QR_code"}</Title></Body>
                    <Right/>
                </Header>
                {
                    this.state.isCameraPermission ?
                        <View style={{flex: 1}}>
                            <Barcode style={{flex: 1, position: 'relative'}}
                                     ref={component => this._barCode = component}
                                     scannerLineInterval={1500}
                                     scannerRectWidth={200}
                                     scannerRectHeight={200}
                                     scannerRectCornerColor="#0186ff"
                                     scannerRectTop={-60}
                                     onBarCodeRead={this.onBarCodeRead}/>
                            <View style={{
                                width: deviceWidth, position: 'absolute', left: 0, bottom: px2dp(160),
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{color: '#fff'}}>{I18n.t("align_code_scan")}</Text>
                            </View>
                            {
                                Platform.OS === 'ios' ? null :
                                    <TouchableOpacity onPress={this.flashlightButton.bind(this)}
                                                      style={{
                                                          width: deviceWidth,
                                                          position: 'absolute',
                                                          left: 0,
                                                          bottom: px2dp(20),
                                                          justifyContent: 'center',
                                                          alignItems: 'center'
                                                      }}>
                                        <Image
                                            source={this.state.isEnableFlashlight ? require('../../images/flashlight_on.png') : require('../../images/flashlight_off.png')}
                                            style={{width: px2dp(30), height: px2dp(30), resizeMode: 'contain'}}/>
                                        <View style={{marginTop: px2dp(6)}}>
                                            <Text
                                                style={{color: '#fff'}}>{this.state.isEnableFlashlight ? "turn_off_light" : "turn_on_light"}</Text>
                                        </View>
                                    </TouchableOpacity>
                            }
                        </View> :
                        <View style={{
                            flex: 1,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: px2dp(20),
                            paddingRight: px2dp(20)
                        }}>
                            <Text style={{fontSize: px2dp(18)}}>{"allow_camera"}</Text>
                        </View>
                }
            </View>
        );
    }

    onBarCodeRead = (e) => {
        this._stopScan();

        let data = e.nativeEvent.data.code;
        let that = this;
        this.timer = setTimeout(function () {
            //Vibration.vibrate();//震动
            try {
                // if (/^{"[a-zA-Z0-9]+":"[a-zA-Z0-9-]+","[a-zA-Z0-9]+":"[a-zA-Z0-9-]+"}$/.test(data)) {
                let companyId = JSON.parse(data).companyId;
                let validateCode = JSON.parse(data).validateCode;

                if (companyId && validateCode) {
                    let promise = api.joinCompany({"companyId": companyId, "validateCode": validateCode})
                    promise.then((data) => {
                        if (data.error === undefined) {
                            that.setJoinCompany(data);
                        } else {
                            Alert.alert("error", "fail_join_company", [{text: "ok", onPress: () => this._startScan()}]);
                        }
                    })
                } else {
                    Alert.alert(I18n.t("error"), I18n.t("wrong_format"), [{
                        text: I18n.t("ok"),
                        onPress: () => that._startScan()
                    }])
                }
            } catch (e) {
                Alert.alert(I18n.t("error"), I18n.t("wrong_format"), [{
                    text: I18n.t("ok"),
                    onPress: () => that._startScan()
                }])
            }
        }, 1000);
    };

    setJoinCompany(companyData) {
        CommonConst.companyInfo = companyData.result;
        const HOME_PAGE = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'Drawer'}),
                NavigationActions.navigate({routeName: 'CompanyInfo', params: {companyId: companyData.result._id}})
            ]
        });
        this.props.navigation.dispatch(HOME_PAGE);
        // this.props.navigation.navigate("CompanyInfo", {companyId: companyData.result._id});
    }

    _startScan = () => {
        this._barCode.startScan()
    };

    _stopScan = () => {
        this._barCode.stopScan()
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        height: Dimensions.get('window').height,
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: px2dp(80),
        //justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rectangle: {
        height: px2dp(250),
        width: px2dp(250)
        //borderWidth: 2,
        //borderColor: '#00FF00',
        //backgroundColor: 'transparent',
    },
    modal: {
        flex: 1,
        width: Dimensions.get('window').width,
        marginBottom: px2dp(64)
    },
    shade: {
        flex: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.65)',
    },
    content: {
        alignItems: 'center',
        padding: px2dp(20)
    },
    qrcode: {
        width: px2dp(250),
        height: px2dp(250),
        alignItems: 'center'
    }
});