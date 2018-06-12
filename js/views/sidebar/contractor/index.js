/**
 * Created by ZhouTing on 2018-06-06 17:32.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {View, TouchableOpacity} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import {connect} from 'react-redux';
import styles from '../styles/contractor/indexStyle';

import QRCode from '../../../components/qrcode';

@connect(({contractorInfo}) => ({...contractorInfo}))
export default class Contractor extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(createAction('contractorInfo/getAdminInfo')())
    }

    // toContractorTextEdit(editParam, editValue) {
    //     this.props.navigation.navigate("ContractorTextEdit", {editParam: editParam, editValue: editValue})
    // }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>Contractor Info</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{height: 100, backgroundColor: 'red'}}>
                        <QRCode
                            value={"dsfdsgfdgdfgdfgdfg"}
                            size={100}
                            // bgColor='#000'
                            // fgColor='white'
                            bgColor='purple'
                            fgColor='white'
                            level='L'
                        />
                    </View>


                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Contractor No.</Text>
                            </View>
                            <View>
                                <Text>{this.props.contractorNo}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}
                                          onPress={() => this.props.navigation.navigate('ContractorTextEdit')}>
                            <View>
                                <Text>Name</Text>
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
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>EIN</Text>
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
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Telephone</Text>
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
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>FAX</Text>
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
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Address</Text>
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
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Zip/Postal Code</Text>
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
                                <Text>Liability Insurance Coverage</Text>
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
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Members</Text>
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