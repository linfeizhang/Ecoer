/**
 * Created by ZhouTing on 2018-06-14 17:20.
 * 此页面是通过加入一家公司的账号进来看加入公司的公司信息的
 */
import React, {Component} from "react";
import {View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import {connect} from 'react-redux';
import styles from '../styles/contractor/indexStyle';

@connect(({contractorInfo}) => ({...contractorInfo}))
export default class CompanyInfo extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(createAction('contractorInfo/getAdminCompanyInfo')())
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
                    <Body><Title>Contractor Company</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={styles.part}>
                        <View style={styles.item}>
                            <View>
                                <Text>Contractor No.</Text>
                            </View>
                            <View>
                                <Text>{this.props.contractorNo}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>Name</Text>
                            </View>
                            <View>
                                <Text>{this.props.name}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>EIN</Text>
                            </View>
                            <View>
                                <Text>{this.props.ein}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>Telephone</Text>
                            </View>
                            <View>
                                <Text>{this.props.telephone}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>Fax</Text>
                            </View>
                            <View>
                                <Text>{this.props.fax}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.part}>
                        <View style={styles.item}>
                            <View>
                                <Text>Address</Text>
                            </View>
                            <View>
                                <Text>{this.props.address}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>Zip/Postal Code</Text>
                            </View>
                            <View>
                                <Text>{this.props.zip_code}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>Country</Text>
                            </View>
                            <View>
                                <Text>{this.props.country}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>State</Text>
                            </View>
                            <View>
                                <Text>{this.props.State}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text>City</Text>
                            </View>
                            <View>
                                <Text>{this.props.city}</Text>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}