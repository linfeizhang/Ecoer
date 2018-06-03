/**
 * Created by ZhouTing on 2018-06-03 16:11.
 */

import {PixelRatio} from 'react-native';



export default {
    part:{
        flex:1,
        backgroundColor:'#fff',
        paddingLeft:20,
        marginTop:20
    },
    item:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth:1 / PixelRatio.get(),
        borderBottomColor: '#a9a9a9',
        paddingTop: 10,
        paddingBottom:10,
        paddingRight:20,
        justifyContent: 'space-between'
    },
    iconStyle:{
        fontSize:16,
        color:'#a9a9a9'
    }
};