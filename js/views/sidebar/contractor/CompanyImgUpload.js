/**
 * Created by ZhouTing on 2018-06-25 16:20.
 * 此页面是公司页面的上传图片部分
 */
import React, {Component} from "react";
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";
import {createAction} from '../../../utils/index'
import {connect} from 'react-redux';
import CommonConst from '../../../constant/CommonConst';
import ActionSheet from '../../../components/ActionSheet/ActionSheet';
import UploadProgress from '../../common/UploadProgress';
import Permissions from 'react-native-permissions'
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

let api = require('../../../utils/api');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;

let options = [];
let title = "";

@connect(({contractorInfo}) => ({...contractorInfo}))
export default class CompanyImgUpload extends Component {
    constructor(props) {
        super(props);
        options = ["cancel", "take_photo", "choose_library"];
        title = "select_avatar";

        this.state = {
            isPhotoPermission: false,
            isCameraPermission: false,
            progress: 0,
            imgArr: props.imgArr,
            selectedImgArr: [],
            isDeleteState: false,
            //isWhichRightImg: DELETE_IMG
        };

        this.isCurrPage = true;
        this.resizedImages = [];
        this.companyId = this.props.navigation.state.params && this.props.navigation.state.params.companyId;
        this.props.dispatch(createAction('contractorInfo/getAdminCompanyInfo')({companyId: this.companyId}));
    }

    componentWillMount() {
        Permissions.check('photo')
            .then(response => {
                //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                if (response === 'authorized' || response === 'undetermined') {
                    this.setState({isPhotoPermission: true});
                }
                console.log(response)
            });
        Permissions.check('camera')
            .then(response => {
                //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                if (response === 'authorized' || response === 'undetermined') {
                    this.setState({isCameraPermission: true});
                }
                console.log(response)
            });
    }

    componentWillUnmount() {
        this.isCurrPage = false;
    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    handlePress(i) {
        switch (i) {
            case 1:
                this.camera();
                break;
            case 2:
                this.multiple();
                break;
        }
    }

    multiple() {
        let paths = [];
        let that = this;
        if (this.state.isPhotoPermission) {
            ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo'
            }).then(images => {
                for (let i in images) {
                    paths.push(images[i].path);
                }
                that.resizeImages(paths);
            }).catch(e => {
                console.log(e)
            });
        } else {
            Alert.alert('', "allow_camera", [{text: "ok"}]);
        }
    }

    camera() {
        let paths = [];
        let that = this;
        if (this.state.isCameraPermission) {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                // cropping: true
            }).then(image => {
                paths.push(image.path);
                that.resizeImages(paths);
                // that.setState({selectedImgArr: paths});
            }).catch(e => {
                console.log(e)
            })
        } else {
            Alert.alert('', "allow_camera", [{text: "ok"}]);
        }
    }

    /**
     * 压缩图片
     * @param paths
     */
    resizeImages(paths) {
        console.log('paths');
        console.log(paths);
        console.log('paths');
        if (paths.length > 0) {
            ImageResizer.createResizedImage(paths[0], 1920, 1080, 'JPEG', 80, 0, null).then((resizedImagePath) => {
                this.resizedImages.push(resizedImagePath)
                paths.shift();
                this.resizeImages(paths);//递归调用...
            }).catch((err) => {
                console.log(err)
            });
        } else {
            let imgArr = this.state.selectedImgArr;
            for (let i in this.resizedImages) {
                imgArr.push(this.resizedImages[i])
            }
            this.setState({selectedImgArr: imgArr});
            this.resizedImages = [];
            console.log('打印selectedImgArr');
            console.log(this.state.selectedImgArr);
            console.log('打印selectedImgArr');
        }
    }

    submitImage() {
        debugger;
        if (this.state.selectedImgArr.length !== 0) {
            // this.uploadProgress.show();
            api.updateImage(this, this.state.selectedImgArr);
        } else {
            Alert.alert("", "select_pictures", [{text: "ok"}]);
        }
    }

    //更新上传进度...
    setUploadProgress(written, total) {
        if (this.isCurrPage) {
            this.uploadProgress.setState({progress: Math.floor(100 * written / total) / 100, indeterminate: false});
        }
    }

    setUpdateImage(data) {//上传图片接口的回调
        if (this.isCurrPage) {
            // this.uploadProgress.setState({isShow: false});//隐藏上传进度遮罩层...
            if (data.error === undefined) {
                this.setState({imgArr: data.result.proofOfLiabilityInsuranceCoverage, selectedImgArr: []});//上传图片成功，上面图片转移到下面...
                // this.uploadProgress.setState({progress: 1});//使上传进度变成100%...
                // this.props.context.setState({proofOfLiabilityInsuranceCoverage: data.result.proofOfLiabilityInsuranceCoverage});
                // this.uploadProgress.setState({progress: 0});    //为了使进入这个页面第二次上传后，进度条显示100%，再从1%开始显示
            } else {
                if (data.error_code === 90024) {
                    Alert.alert("", "not_change", [{text: "ok"}]);
                } else {
                    Alert.alert("", "network_try_again", [{text: "ok"}]);
                }
            }
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: '#8fb721'}}/>
                        </Button>
                    </Left>
                    <Body><Title>CompanyImgUpload</Title></Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{margin: 10}}>
                        <Text>Ecoer为其产品提供了有限的部件和劳动保证。直接向承包商支付劳动补偿。对承包商的责任保险是由质保所要求的。上传图片来证明你有这样的责任保险</Text>
                    </View>

                    <View style={{margin: 10}}>
                        <Text>图片上传</Text>
                    </View>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 20}}>
                        <View style={{marginLeft: 10}}>
                            {
                                this.state.selectedImgArr.length !== 0 ?
                                    this.state.selectedImgArr.map((item, i) => {
                                        return (
                                            <TouchableOpacity key={item.uri}>
                                                <Image source={{uri: item.uri}}
                                                       style={{width: 170, height: 170}}/>
                                            </TouchableOpacity>
                                        )
                                    }) : null
                            }
                        </View>
                        {/*<Image source={{uri: "file:///Users/zhouting/Library/Developer/CoreSimulator/Devices/16C770CE-C350-4245-A4A5-30AD4320789D/data/Containers/Data/Application/5123204E-DE2D-459B-BE9B-9804931B6024/tmp/react-native-image-crop-picker/A0CD92D8-7652-403A-938A-0DE7D5CE6130.jpg"}}*/}
                        {/*style={{width: 170, height: 170}}/>*/}
                        <TouchableOpacity style={{
                            borderWidth: 2,
                            borderStyle: 'dashed',
                            borderColor: '#999',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'green',
                            width: 170,
                            height: 170,
                            marginLeft: 10
                        }} onPress={this.showActionSheet.bind(this)}>
                            <Icon active style={{color: "#387ef5", backgroundColor: 'red', fontSize: 200}} name='add'/>
                        </TouchableOpacity>
                    </View>

                    <Button full success style={{margin: 10}} onPress={this.submitImage.bind(this)}>
                        <Text>提交</Text>
                    </Button>

                    <View style={{margin: 10, marginTop: 40}}>
                        <Text>上传照片</Text>
                    </View>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                        {
                            this.state.imgArr ?
                                this.state.imgArr.map((item, i) => {
                                    return (
                                        <View key={i} style={{marginLeft: 10, marginBottom: 10}}>
                                            <TouchableOpacity>
                                                <Image
                                                    source={{uri: "http://" + CommonConst.global.server + "/api/file/" + item + "?access_token=" + CommonConst.global.access_token}}
                                                    style={{width: 170, height: 170}}/>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }) : null
                        }
                    </View>

                    <UploadProgress ref={o => this.uploadProgress = o}/>

                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={title}
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={this.handlePress.bind(this)}
                    />
                </Content>
            </Container>
        );
    }
}