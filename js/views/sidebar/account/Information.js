/**
 * Created by ZhouTing on 2018-06-07 18:33.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {TouchableOpacity, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon,Item, Left, Right, Text, Title} from "native-base";
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';

import CommonConst from '../../../constant/CommonConst';
import {createAction} from '../../../utils'
import styles from '../styles/account/personalStyle';

const HOME_PAGE = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
    ]
});

@connect(({information}) => ({...information}))
export default class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(createAction('information/getInformation')())
    }

    goBack() {
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
                </Content>
            </Container>
        );
    }
}