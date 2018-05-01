/**
 * 使用说明
 * Created by ZhouTing on 2018/5/1.
 */
import React, {Component} from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Text,
    Left,
    Right,
    Body,
    Card,
    CardItem
} from "native-base";

export default class UserHelp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={{backgroundColor: "#FFF"}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body><Title>使用说明</Title></Body>
                    <Right/>
                </Header>
                <Card>
                    <CardItem header>
                        <Text>使用说明：</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>    　1.此APP工具类App。</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>    　2.联网使用。</Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text>映翰通</Text>
                    </CardItem>
                </Card>
            </Container>
        );
    }
}