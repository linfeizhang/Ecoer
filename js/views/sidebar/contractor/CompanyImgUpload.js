/**
 * Created by ZhouTing on 2018-06-25 16:20.
 * 此页面是公司页面的上传图片部分
 */
import React, {Component} from "react";
import {View, TouchableOpacity, Image} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import {connect} from 'react-redux';
import CommonConst from '../../../constant/CommonConst';
import styles from '../styles/contractor/indexStyle';

@connect(({contractorInfo}) => ({...contractorInfo}))
export default class CompanyImgUpload extends Component {
    constructor(props) {
        super(props);
        this.companyId = this.props.navigation.state.params && this.props.navigation.state.params.companyId;
        this.props.dispatch(createAction('contractorInfo/getAdminCompanyInfo')({companyId: this.companyId}));
    }

    render() {
        console.log('打印');
        console.log(this.props.imgArr);
        console.log('打印');
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>CompanyImgUpload</Title></Body>
                    <Right/>
                </Header>
                <Content style={{margin: 10}}>
                    <View>
                        <Text>Ecoer为其产品提供了有限的部件和劳动保证。直接向承包商支付劳动补偿。对承包商的责任保险是由质保所要求的。上传图片来证明你有这样的责任保险</Text>
                    </View>

                    <View>
                        <Text>图片上传</Text>
                    </View>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 20}}>
                        <View>
                            <Image
                                source={{uri: "http://" + CommonConst.global.server + "/api/file/" + this.props.imgArr[0] + "?access_token=" + CommonConst.global.access_token}}
                                style={{width: 160, height: 160}}/>
                        </View>
                        <TouchableOpacity style={{
                            borderWidth: 2,
                            borderStyle: 'dashed',
                            borderColor: '#999',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'green',
                            width: 170,
                            height: 170
                        }}>
                            <Icon active style={{color: "#387ef5", backgroundColor: 'red', fontSize: 200}} name='add'/>
                        </TouchableOpacity>
                    </View>

                    <Button full success>
                        <Text>提交</Text>
                    </Button>

                    <View>
                        <Text>上传照片</Text>
                    </View>

                    <View style={{marginTop: 40}}>
                        <Text>aaaa</Text>
                    </View>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                        {
                            this.props.imgArr ?
                                this.props.imgArr.map((item, i) => {
                                    return (
                                        <View key={i} style={{marginRight: 10, marginBottom: 10}}>
                                            <TouchableOpacity>
                                                <Image
                                                    source={{uri: "http://" + CommonConst.global.server + "/api/file/" + item + "?access_token=" + CommonConst.global.access_token}}
                                                    style={{width: 166, height: 166}}/>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }) : null
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}