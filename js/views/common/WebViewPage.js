/**
 * Created by ZhouTing on 2018/6/18.
 */
import React, {Component} from 'react';
import {WebView} from 'react-native'

import {Body, Button, Container, Header, Icon, Left, Right, Title} from 'native-base';

export default class WebViewPage extends Component {
    render() {
        let title = this.props.navigation.state.params && this.props.navigation.state.params.title;
        let url = this.props.navigation.state.params && this.props.navigation.state.params.url;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>{title}</Title></Body>
                    <Right/>
                </Header>
                <WebView source={{uri: url}}
                         javaScriptEnabled={true}
                         startInLoadingState={true}
                         scalesPageToFit={true} //设置是否要把网页缩放到适应视图的大小，以及是否允许用户改变缩放比例。
                />
            </Container>
        );
    }
}