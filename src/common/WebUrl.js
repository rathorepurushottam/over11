import React from "react";
import { View, StyleSheet } from 'react-native';
import { AppSafeAreaView } from "./AppSafeAreaView";
import { KeyBoardAware } from "./KeyboardAware";
import WebView from "react-native-webview";
import Header from "./Header";
import CommonImageBackground from "./commonImageBackground";
import { StatusBar } from "native-base";


const WebUrl = ({ route }) => {
    let title = route?.params?.titleNames
    console.log('====================================')
    console.log(title,'====title>>>')
    console.log('====================================')
    let titleName = () => {
        if (title == 'Terms & Conditions') {
            return 'http://Over11.in/termsNConditionsmobile'
        } else if (title == 'About Us') {
            return 'http://over11.in/aboutmobile'
        } else if (title == 'How to Play') {
            return 'http://Over11.in/howToPlaymobile'
        } else if (title == 'Privacy Policy') {
            return 'http://Over11.in/policymobile'
        } else if (title == 'Points System') {
            return 'http://Over11.in/responsible_gaming'
        } else if (title == 'Responsible Gaming') {
            return 'http://Over11.in/responsible_gaming'
        } else if (title == 'Legalities') {
            return 'http://Over11.in/legalities'
        } else if (title == 'Fair Play Policy') {
            return 'http://Over11.in/fairPlay'
        }
    }
    return (
        <AppSafeAreaView light={true} hidden={false}>
            <StatusBar
                backgroundColor={'#282828'}
                translucent={true}
                networkActivityIndicatorVisible={true}
            />
            <CommonImageBackground common >
                <Header
                    title={title}
                    commonHeader
                />
                <KeyBoardAware>
                    <WebView
                        source={{ uri: titleName() }}
                    />
                </KeyBoardAware>
            </CommonImageBackground>
        </AppSafeAreaView>
    )
}
const styles = StyleSheet.create({

})
export default WebUrl
