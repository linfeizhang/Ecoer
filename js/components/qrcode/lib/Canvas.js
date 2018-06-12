import React, {Component} from 'react';
import {
    View,
    WebView,
    Platform
} from 'react-native';

export default class Canvas extends Component {
    render() {
        let contextString = JSON.stringify(this.props.context);
        let renderString = this.props.render.toString();
        return (
            <View style={this.props.style}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    scalesPageToFit={Platform.OS === 'android'}
                    contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                    source={{html: "<style>*{margin:0;padding:0;}canvas{transform:translateZ(0);}</style><canvas></canvas><script>var canvas = document.querySelector('canvas');(" + renderString + ").call(" + contextString + ", canvas);</script>"}}
                    opaque={false}
                    underlayColor={'transparent'}
                    style={this.props.style}
                    javaScriptEnabled={true}
                    scrollEnabled={false}
                />
            </View>
        );
    }
}
