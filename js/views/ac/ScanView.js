/**
 * Created by ZhouTing on 2017/10/24.
 */
import React, {Component} from 'react'
import {Alert, Dimensions} from 'react-native'
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title} from 'native-base';
import Barcode from 'react-native-smart-barcode'
// import px2dp from '../../utils/px2dp';

// import I18n from '../../utils/i18n';

/**
 * 属性
 *
 * Prop                     类型       可选的   默认         描述
 * barCodeTypes             array      Yes                 支持的条码类型
 * scannerRectWidth         number     Yes     255         扫描区域的宽度
 * scannerRectHeight        number     Yes     255         扫描区域的高度
 * scannerRectTop           number     Yes     0           扫描区域下移
 * scannerRectLeft          number     Yes     0           扫描区域左移
 * scannerLineInterval      number     Yes     3000        扫描线移动的频率
 * scannerRectCornerColor   string     Yes     #09BB0D     边线的颜色
 */
// let {width: deviceWidth} = Dimensions.get('window');

export default class ScanView extends Component {
    // 构造
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Container style={{backgroundColor: 'black'}}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}
                                  onPress={() => this.props.navigation.goBack()}/>
                        </Button>
                    </Left>
                    <Body><Title>QR Scan</Title></Body>
                    <Right/>
                </Header>
                <Content padder>
                    <Barcode style={{flex: 1, position: 'relative'}}
                             ref={component => this._barCode = component}
                             scannerLineInterval={1500}
                             scannerRectWidth={200}
                             scannerRectHeight={200}
                             scannerRectCornerColor="#0186ff"
                             scannerRectTop={-60}
                             onBarCodeRead={this._onBarCodeRead}/>

                </Content>
            </Container>
        )
    }

    _onBarCodeRead = (e) => {
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan();

        let data = e.nativeEvent.data.code;
        let that = this;
        this.timer = setTimeout(function () {
            Alert.alert("error", data, [{
                text: "ok",
                onPress: () => that._startScan()
            }])
        }, 1000);
    };

    _startScan = () => {
        this._barCode.startScan()
    };

    _stopScan = () => {
        this._barCode.stopScan()
    };
}
