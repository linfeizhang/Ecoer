import React, {Component} from 'react';
import {
    Dimensions,
    FlatList,
    Platform,
    SectionList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {Body, Button, Header, Icon, Left, Right, Text, Title} from "native-base";
import {connect} from 'react-redux'
import {createAction} from '../../utils'
import CommonConst from "../../constant/CommonConst";

import px2dp from '../../utils/px2dp';

const USA = require('./address/USA.json');
const Canada = require('./address/Canada.json');

const {width, height} = Dimensions.get('window');
const SECTION_HEIGHT = 30, ROW_HEIGHT = 44;     //最原始的ROW_HEIGHT=40
const AllLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

@connect(({personalInfo}) => ({...personalInfo}))
export default class SelectCityView extends Component {
    constructor(props) {
        super(props);
        this.isSearch = false;
        this.isEnable = true;
    }

    componentWillMount() {
        let country;
        if (this.props.selectedCountry === 'USA') {
            country = USA;
        } else if (this.props.selectedCountry === 'Canada') {
            country = Canada;
        }

        country = USA;//测试

        this.AllCity = [];
        for (let i in country) {
            // if (i === this.props.selectedState) {
            if (i === 'Alabama') {
                this.AllCity = country[i];
            }
        }

        this.letters = [];
        this.city = [];
        //把城市放到对应的字母中
        for (let j = 0; j < AllLetters.length; j++) {
            let flag = false;
            let each = [];
            for (let i = 0; i < this.AllCity.length; i++) {
                if (AllLetters[j] === this.AllCity[i].substr(0, 1)) {
                    each.push(this.AllCity[i]);
                    flag = true;
                }
            }

            if (flag) {
                this.letters.push(AllLetters[j]);
                let _city = {};
                _city.index = this.letters.length - 1;
                _city.key = AllLetters[j];
                _city.data = each;
                this.city.push(_city)
            }
        }

        this.setState({data: this.city});
    }


    pressButton(selectedCity) {
        let from = this.props.navigation.state.params && this.props.navigation.state.params.from;

        if (this.isEnable) {
            this.isEnable = false;
            if (from === 'personalInfo') {
                this.props.dispatch(createAction('personalInfo/modifyUserInfo')({
                    type: CommonConst.info.city,
                    value: selectedCity,
                    nav: this.props.navigation
                }))
            } else if (from === 'company') {
                // service.updateCompanyInfo(this, 'City', selectedCity, this.props.companyId);
            }
        }
    }

    renderRow = ({item}) => {
        return (
            <TouchableOpacity
                style={{height: ROW_HEIGHT, justifyContent: 'center', paddingLeft: 20, paddingRight: 30}}
                onPress={this.pressButton.bind(this, item)}>
                <View style={styles.rowData}><Text style={styles.rowDataText}>{item}</Text></View>
            </TouchableOpacity>
        )
    }

    renderSectionHeader = ({section}) => {
        return (
            <View
                style={{height: SECTION_HEIGHT, justifyContent: 'center', paddingLeft: 5, backgroundColor: '#f2f2f2'}}>
                <Text style={{color: 'rgb(40,169,185)', fontWeight: 'bold'}}>{section.key}</Text>
            </View>
        )
    };

    // 渲染右边索引
    renderLetters(letter, index) {
        return (
            <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => this.scrollTo(index)}>
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    //touch right indexLetters, scroll the left
    scrollTo = (index) => {
        this.sectionList.scrollToLocation({
            sectionIndex: index,
            itemIndex: 0,
            viewOffset: 30,
        })
    };

    searchContentChange(searchKeywords) {
        if (searchKeywords === '') {
            this.isSearch = false;
            this.setState({data: this.city})
        } else {
            this.isSearch = true;
            let arr = [];
            for (let i = 0; i < this.AllCity.length; i++) {
                if (this.AllCity[i].toUpperCase().startsWith(searchKeywords.toUpperCase())) {
                    arr.push(this.AllCity[i]);
                }
            }

            this.setState({data: arr});

            if (Platform.OS === 'android') {
                this.flatList.scrollToOffset({offset: 0, animated: true});
            }
        }
    }

    _keyExtractor = (item, index) => index + ',' + item;

    render() {
        return (
            <View style={{height: height, marginBottom: 10}}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}
                                  onPress={() => this.props.navigation.goBack()}/>
                        </Button>
                    </Left>
                    <Body><Title>city</Title></Body>
                    <Right/>
                </Header>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBox}>
                        <TextInput
                            keyboardType='web-search'   //决定弹出的何种软键盘的，譬如numeric（纯数字键盘）。
                            placeholder={"search"}
                            autoCapitalize='none'
                            style={styles.inputText}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(searchKeywords) => this.searchContentChange(searchKeywords)}
                        />
                    </View>
                </View>

                {
                    this.isSearch ?
                        <View style={styles.listView}>
                            <FlatList ref={list => this.flatList = list}
                                      style={{backgroundColor:'#fff'}}
                                      data={this.state.data}
                                      renderItem={this.renderRow}
                                      keyExtractor={this._keyExtractor}
                                      initialNumToRender={100}/>
                        </View> :
                        <View style={styles.listView}>
                            <SectionList
                                enableEmptySections
                                style={{backgroundColor:'#fff'}}
                                ref={list => this.sectionList = list}
                                renderItem={this.renderRow}
                                renderSectionHeader={this.renderSectionHeader}
                                showsVerticalScrollIndicator={false} //设置不显示垂直的滚动条
                                initialNumToRender={1000}
                                sections={this.state.data}
                                keyExtractor={this._keyExtractor}
                                // getItemLayout={this._getItemLayout}
                            />
                            <View style={styles.letters}>
                                {this.letters.map((letter, index) => this.renderLetters(letter, index))}
                            </View>
                        </View>
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    contentContainer: {
        width: width,
        backgroundColor: 'white',
    },
    letters: {
        position: 'absolute',
        height: Platform.OS === 'ios' ? height - 40 - px2dp(68) : height - 40 - 68,   // 处理状态栏
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        //height: height * 3.3 / 100,
        height: height * 3 / 100,
        width: width * 3 / 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterText: {
        textAlign: 'center',
        fontSize: height * 1.1 / 50,
        color: 'rgb(40,169,185)'
    },
    rowData: {
        borderBottomColor: '#faf0e6',
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },
    rowDataText: {
        color: 'gray',
    },
    listView: {
        height: Platform.OS === 'ios' ? height - 40 - px2dp(68) : height - 40 - 68   // 处理状态栏
    },
    searchContainer: {
        flexDirection: 'row',   // 水平排布
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        height: 40,
        backgroundColor: '#8fb722',     //处理头部的颜色
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },
    searchBox: {
        height: px2dp(30),
        flexDirection: 'row',
        flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        borderRadius: px2dp(5),  // 设置圆角边
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: px2dp(10)
    },
    inputText: {
        flex: 1,
        padding: 0,
        backgroundColor: 'transparent',
        fontSize: px2dp(14)
    }
});