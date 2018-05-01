/**
 * 滑出侧边栏
 * Created by ZhouTing on 2018/5/1.
 */
import React, {Component} from "react";
import {Image, Share, TouchableOpacity} from "react-native";
import {Body, Container, Content, Icon, Left, List, ListItem, Right, Text, Toast,Header,Button,Title} from "native-base";
import styles from "./style";

const drawerCover = require("../../images/drawer-cover.png");

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: '1.0.0'
        };
        SideBar.sideBarInstance = this;
    }

    static refresh() {
        this.sideBarInstance.setState({});
    }

    render() {
        return (
            <Container>
                <Content bounces={false} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                    <Image source={drawerCover} style={styles.drawerCover}/>
                    <List>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("Home")}>
                            <Left>
                                <Icon active name='home' style={{color: "#ff19a5", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>主页</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("UserHelp")}>
                            <Left>
                                <Icon active name='help-circle' style={{color: "#0186ff", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>使用说明</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        {
                            //<ListItem button noBorder onPress={() => this.props.navigation.navigate("test")}>
                            //    <Left>
                            //        <Icon active name='settings' style={{color: "#fd6b6e", fontSize: 26, width: 30}}/>
                            //        <Text style={styles.text}>设置</Text>
                            //    </Left>
                            //    <Right/>
                            //</ListItem>
                        }
                        <ListItem button noBorder onPress={() => this.checkUpdate()}>
                            <Left>
                                <Icon active name='sync' style={{color: "#fdc23a", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>版本更新</Text>
                            </Left>
                            <Body style={{alignItems: 'flex-end'}}>
                            <Text>{this.state.version}</Text>
                            </Body>
                        </ListItem>
                        {/*<ListItem button noBorder onPress={() => this.props.navigation.navigate("Share")}>*/}
                        <ListItem button noBorder onPress={() => this.shareApp()}>
                            <Left>
                                <Icon active name='share' style={{color: "#13ca8a", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>分享</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate("About")}>
                            <Left>
                                <Icon active name='information-circle'
                                      style={{color: "#dc7dff", fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>关于</Text>
                            </Left>
                            <Right/>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }

    checkUpdate() {
        this.setState({version: '检测更新中...'});
        let that = this;
        this.timer = setTimeout(function () {
            that.setState({version: '1.0.0'});
            Toast.show({type: 'success', text: '已是最新版本', duration: 3000});
        }, 2000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    /**
     * 分享App
     */
    shareApp() {
        Share.share({
            message: 'http://ota.quanwifi.com/other/ar3.apk',
            title: 'AR3'
        }, {
            dialogTitle: '分享到'
        }).catch((error) => console.log(error.message));
    }
}
