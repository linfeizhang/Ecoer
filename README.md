# Ecoer

####调试说明：


1. clone出本项目

	```
	git clone git@github.com:zhou-ting/Ecoer.git
	```
2. 在ContractorApp目录下运行以下命令下载相关依赖库

	```
	npm install
	```

3. 	修改RNFetchBlob组件代码,`node_modules/react-native-fetch-blob/ios/RNFetchBlob/RNFetchBlob.m`文件,在37行下添加如下代码：

    ```c
    + (BOOL)requiresMainQueueSetup {
        return YES;
    }
    ```


4. 	修改安卓签名配置,`android/app/build.gradle`里面

    ```
    ...
    /** 签名内容开始 **/
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    /** 签名内容结束 **/
    ...
    ```

    ```
    ...
    /** 签名内容开始 **/
    signingConfig signingConfigs.release
    /** 签名内容结束 **/
    ...
    ```
    这两部分内容根据自己的签名配置修改或者删除(自己没有配置签名的情况).

- - -
