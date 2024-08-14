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
            return 'https://nlgfantasy.com/termsNConditionsmobile'
        } else if (title == 'About Us') {
            return 'https://nlgfantasy.com/aboutmobile'
        } else if (title == 'How to Play') {
            return 'https://nlgfantasy.com/howToPlaymobile'
        } else if (title == 'Privacy Policy') {
            return 'https://nlgfantasy.com/policymobile'
        } else if (title == 'Points System') {
            return 'https://nlgfantasy.com/responsible_gaming'
        } else if (title == 'Responsible Gaming') {
            return 'https://nlgfantasy.com/responsible_gaming'
        } else if (title == 'Legalities') {
            return 'https://nlgfantasy.com/legalities'
        } else if (title == 'Fair Play Policy') {
            return 'https://nlgfantasy.com/fairPlay'
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
