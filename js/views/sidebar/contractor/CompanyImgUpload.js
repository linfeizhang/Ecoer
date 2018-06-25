/**
 * Created by ZhouTing on 2018-06-25 16:20.
 * 此页面是公司页面的上传图片部分
 */
import React, {Component} from "react";
import {View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import {connect} from 'react-redux';
import styles from '../styles/contractor/indexStyle';

@connect(({contractorInfo}) => ({...contractorInfo}))
export default class CompanyImgUpload extends Component {
    constructor(props) {
        super(props);
        // this.companyId = this.props.navigation.state.params && this.props.navigation.state.params.companyId;
        // this.props.dispatch(createAction('contractorInfo/getAdminCompanyInfo')({companyId: this.companyId}))
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
                    <Body><Title>CompanyImgUpload</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View>
                        <Text>公司图片上传页面</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}