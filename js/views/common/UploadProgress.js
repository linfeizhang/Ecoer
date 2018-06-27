/**
 * Created by ZhouTing on 2017/10/15.
 * 上传进度遮罩层
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native'

import I18n from "react-native-i18n";

import {Bar, Circle, CircleSnail, Pie} from '../../components/progress';

const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');

export default class UploadProgress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            progress: 0,
            indeterminate: true
        };
    }

    changeStatus() {
        this.setState({isShow: !this.state.isShow});
    }

    show() {
        this.setState({isShow: true});
    }

    hide() {
        this.setState({isShow: false});
    }

    render() {
        return (
            this.state.isShow ?
                <View style={styles.container}>
                    <View style={{opacity: 1, backgroundColor: '#fff', width: 300, justifyContent: 'center', alignItems: 'center', padding: 20, marginBottom: 100}}>
                        <Circle
                            size={80}
                            progress={this.state.progress}
                            color={'#8fb721'}
                            showsText={true}
                            formatText={() => Math.round(this.state.progress * 100) + '%'}
                            indeterminate={this.state.indeterminate}
                        />
                        <Text style={{marginTop: 20}}>{I18n.t("uploading")}</Text>
                    </View>
                </View> :
                null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        opacity: 0.9,
        top: -30,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        width: deviceWidth,
        height: deviceHeight
    },
});