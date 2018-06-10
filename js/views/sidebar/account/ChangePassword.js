/**
 * Created by ZhouTing on 2018-06-10 08:18.
 * Contractor：包含Contractor相关的内容
 */
import React, {Component} from "react";
import {View, TouchableOpacity} from 'react-native';
import {Body, Button, Container, Content, Header, Item, Input, Icon, Left, Right, Text, Title} from "native-base";
import {Field, reduxForm} from "redux-form";
import {createAction} from '../../../utils/index'
import styles from '../styles/account/changePassword';

export default class ChangePassword extends Component {
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
                    <Body><Title>Change Password</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text>E-mail</Text>
                        </View>
                        <View>
                            <Text>test@qq.com</Text>
                        </View>
                    </View>

                    <View>
                        <View>
                            <Text>Old Password</Text>
                        </View>
                        <View>
                            {/*<Field name="oldPass" component={this.renderInput}/>*/}
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text>New Password</Text>
                        </View>
                        <View>
                            {/*//<Field name="newPass" component={this.renderInput}/>*/}
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text>Confirm</Text>
                        </View>
                        <View>
                            {/*<Field name="confirmPass" component={this.renderInput}/>*/}
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }

}