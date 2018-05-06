/**
 * Created by ZhouTing on 2018/5/1.
 */
import {AppRegistry,Text,YellowBox} from 'react-native';
import Setup from './src/boot/setup';

AppRegistry.registerComponent('Ecoer', () => Setup);

//控制ios不受系统设置字体的大小的变化而变化
Text.defaultProps.allowFontScaling = false;

//忽略react-navigation报 "isMounted(...) is deprecated"警告。
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader','Module RNFetchBlob']);