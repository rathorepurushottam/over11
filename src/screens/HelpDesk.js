import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { AppSafeAreaView } from '../common/AppSafeAreaView';
import { StatusBar } from 'native-base';
import CommonImageBackground from '../common/commonImageBackground';
import Header from '../common/Header';
import { AppText, BLACK, BLACKOPACITY, POPPINS_MEDIUM, POPPINS_SEMI_BOLD, THIRTEEN, TWELVE, WHITE } from '../common/AppText';
import { TouchableOpacityView } from '../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import { NewColor, colors } from '../theme/color';
import { universalPaddingHorizontal } from '../theme/dimens';
import { callIcon, emailIcon, right_arrow } from '../helper/image';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';



const HelpDesk = () => {
    const renderItem = ({ item }) => {

    }
    return (
        <AppSafeAreaView light={true} hidden={false}>
            <StatusBar
                backgroundColor={'#282828'}
                translucent={true}
                networkActivityIndicatorVisible={true}
            />
            <CommonImageBackground common>
                <Header
                    style={{
                    }}
                    title="HelpDesk"
                    commonHeader
                />
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    backgroundColor: "#0000000D",
                    marginTop: 10,
                }}>
                    <AppText type={THIRTEEN} weight={POPPINS_SEMI_BOLD} color={BLACK} >
                        Hello, Need Help?
                    </AppText>
                    <AppText style={{ textAlign: 'center' }} type={TWELVE} weight={POPPINS_SEMI_BOLD} color={BLACK} >
                        We are Fantasy Score 11 Help Desk team. We are available for 24x7 you have two option to contact us.
                    </AppText>
                </View>
                <View style={{ paddingHorizontal: universalPaddingHorizontal, marginTop: "2%" }} >
                    <TouchableOpacityView
                        onPress={() => Linking.openURL(`tel:${1234567890}`)}
                        style={styles.box}>
                        <View style={styles.boxContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.phoneContainer}>
                                    <FastImage
                                        source={callIcon}
                                        tintColor={colors.backgroundupload}
                                        resizeMode="contain"
                                        style={{ height: 20, width: 20 }}
                                        
                                    />
                                </View>
                                <View style={styles.mobileContainer}>
                                    <AppText weight={POPPINS_SEMI_BOLD} type={TWELVE} style={styles.mobile}>
                                        Call Us{'\n'}<AppText  type={TWELVE} weight={POPPINS_SEMI_BOLD} >(10:00 AM to 08:00PM)</AppText>
                                    </AppText>
                                </View>
                            </View>
                            <View style={styles.arrow}>
                                <FastImage
                                    source={right_arrow}
                                    resizeMode="contain"
                                    style={{ width: 6, height: 12, marginRight: 10 }}
                                    tintColor={colors.black}
                                />
                            </View>
                        </View>
                    </TouchableOpacityView>
                    <TouchableOpacityView
                        onPress={() => Linking.openURL("mailto:?to=support@nextlevelgaming.com")}
                        style={styles.box}>
                        <View style={styles.boxContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.phoneContainer}>
                                    <FastImage
                                        source={emailIcon}
                                        tintColor={colors.backgroundupload}
                                        resizeMode="contain"
                                        style={{ height: 20, width: 20 }}
                                    />
                                </View>
                                <View style={styles.mobileContainer}>
                                    <AppText weight={POPPINS_SEMI_BOLD} type={TWELVE} style={styles.mobile}>
                                        Email Us{'\n'}<AppText  type={TWELVE} weight={POPPINS_SEMI_BOLD}>support@nextlevelgaming.com</AppText>
                                    </AppText>
                                </View>
                            </View>
                            <View style={styles.arrow}>
                                <FastImage
                                    source={right_arrow}
                                    resizeMode="contain"
                                    style={{ width: 6, height: 12, marginRight: 10 }}
                                    tintColor={colors.black}
                                />
                            </View>
                        </View>
                    </TouchableOpacityView>
                </View>
            </CommonImageBackground>
        </AppSafeAreaView>
    )
}
export default HelpDesk
const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        borderColor: colors.borderLightBlue,
        borderRadius: 16,
        marginTop: 10,
        backgroundColor:colors.bottomBackgroundColor
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    phoneContainer: {
        height: 45,
        width: 45,
        marginHorizontal: 3,
        marginVertical: 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: NewColor.linerLightBlueTwinty,

    },
    mobileContainer: {
        alignSelf: 'center',
        marginLeft: 10
    },
    arrow: {
        alignSelf: 'center',
        marginRight: 10,
    },
})