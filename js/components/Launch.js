/**
 * Created by ZhouTing on 2018-06-10 17:19.
 */
import React, {Component} from "react";
import {Image, StyleSheet, View} from 'react-native';

import Images from '../constant/Images';

export default class Launch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Image source={Images.launchImage} style={styles.backgroundImage}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        resizeMode:Image.resizeMode.contain
    }
});