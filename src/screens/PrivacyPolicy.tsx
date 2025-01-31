import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppSafeAreaView } from '../common/AppSafeAreaView'
import CommonImageBackground from '../common/commonImageBackground'
import Header from '../common/Header'
import { KeyBoardAware } from '../common/KeyboardAware'
import WebView from 'react-native-webview'

const PrivacyPolicy = () => {
  return (
    <AppSafeAreaView hidden={false}>
     <StatusBar
     barStyle={'light-content'}
                backgroundColor={'#282828'}
                translucent={true}
                networkActivityIndicatorVisible={true}
            />
    <CommonImageBackground common >
        <Header
            style={{
                height:70
            }}
            title={'Privacy Policy'}
            commonHeader
        />
        <KeyBoardAware>
            <WebView
                source={{ uri: 'https://Over11fantasy.com/policymobile' }}
            />
        </KeyBoardAware>
    </CommonImageBackground>
</AppSafeAreaView>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({})