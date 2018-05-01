/**
 * Created by ZhouTing on 2018/5/1.
 */
import {AppRegistry,YellowBox} from 'react-native';
import Setup from './src/boot/setup';
AppRegistry.registerComponent('Ecoer', () => Setup);

//忽略react-navigation报 "isMounted(...) is deprecated"警告。
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);