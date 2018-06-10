/**
 * Created by ZhouTing on 2018-06-07 18:33.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {View, TouchableOpacity} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import styles from '../styles/account/personalStyle';

export default class PersonalInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}
                                  onPress={() => this.props.navigation.goBack()}/>
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
                                <Text>test@qq.com</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.part}>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>First Name</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>Zhou</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Last Name</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>Ting</Text>
                                </View>
                                <View>
                                    <Icon type="SimpleLineIcons" name="arrow-right" style={styles.iconStyle}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>Mobile Phone</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>1112223333</Text>
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
                                <Text>Zip/Postal Code</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text>6102222</Text>
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
                                    <Text>China</Text>
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
                                    <Text>SiChuan</Text>
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
                                    <Text>Chengdu</Text>
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
                                    <Text>Test</Text>
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