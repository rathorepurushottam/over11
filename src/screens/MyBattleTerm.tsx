import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppSafeAreaView} from '../common/AppSafeAreaView';
import CommonImageBackground from '../common/commonImageBackground';
import Header from '../common/Header';
import {KeyBoardAware} from '../common/KeyboardAware';
import WebView from 'react-native-webview';

const MyBattleTerm = () => {
  return (
    <AppSafeAreaView hidden={false}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#282828'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <Header
          style={{
            height: 70,
          }}
          title={'Terms and Conditions'}
          commonHeader
        />
        <KeyBoardAware>
          <WebView
            source={{uri: 'https://nlgfantasy.com/termsNConditionsmobile'}}
          />
        </KeyBoardAware>
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

export default MyBattleTerm;

const styles = StyleSheet.create({});
