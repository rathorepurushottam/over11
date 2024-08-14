import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  StatusBar,
  Linking,
  Alert
} from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { shareToAny } from '../helper/utility';
import { AppSafeAreaView } from '../common/AppSafeAreaView';
import {
  AppText,
  ELEVEN,
  FIFTEEN,
  LATO_HEAVY,
  LATO_SEMI_BOLD,
  LIGHTGOLDEN,
  POPPINS_BOLD,
  POPPINS_EXTRA_BOLD_ITALIC,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  SEMI_BOLD,
  TEN,
  THIRTEEN,
  TWELVE,
  TWENTY,
  TWENTY_FIVE,
  TWENTY_FOUR,
  BLACK,
  WHITE,
} from '../common/AppText';
import Header from '../common/Header';
import {
  referbackground,
  Refer1,
  Refer2,
  Refer3,
  Refer4,
  whatsapp,
  chain,
  film,
  medal,
  WalletBox,
  iconbell,
  rightArrow,
} from '../helper/image';
import { Button } from '../common/Button';
import { SolidButton } from '../common/SolidButton';
import { KeyBoardAware } from '../common/KeyboardAware';
import { NLCColor, NewColor, colors } from '../theme/color';
import { universalPaddingHorizontal } from '../theme/dimens';
import FastImage from 'react-native-fast-image';
import { TouchableOpacityView } from '../common/TouchableOpacityView';
import NavigationService from '../navigation/NavigationService';
import MyBattleLogin from './MyBattleLogin';
import { ADD_MONEY_SCREEN, MYBATTLELOGIN, MYBATTLEOTP, MYBATTLEREFEREARN, MY_BALANCE, TRANSACTION_SCREEN } from '../navigation/routes';
import { HomeTopHeader } from '../common/HomeTopHeader';

const ReferAndEarn = () => {
  const data = [
    {
      id: 1,
      title: 'Total Balance',
      balance: '₹500',
      FastImage: WalletBox,
      titletwo: 'Deposits',
      deposit: '₹50',
      titlethree: 'Winnings',
      titlefour: 'Cashback',
      titlefive: 'Bonus',
    },
  ];

  // const openWhatsApp = () => {
  //   const whatsappURL = 'whatsapp://send?text=ANNSKJJKsJKASJKAJSDJKASJKDASJKDJASJASK';
  //   Linking.openURL(whatsappURL)
  //     .then((supported) => {
  //       if (!supported) {
  //         console.error('WhatsApp is not installed on your device.');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('An error occurred while opening WhatsApp:', error);
  //     });
  // }

  return (
    <>
      <AppSafeAreaView statusColor={'transparent'} hidden={false}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <KeyBoardAware style={styles.bottomContainer}>
          <HomeTopHeader
            walletIcon={true}
            personClick={() =>
              NavigationService.openDrawer()
              // Alert.alert('aaj')
            }
          />
          <View>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[NLCColor.shadeSkuBlue, NLCColor.lightSkyBlue]}
              style={styles.mainbox}>
              {data?.map(item => {
                return (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',

                      }}>
                      <View style={{ marginTop: 10 }}>
                        <AppText type={THIRTEEN} weight={POPPINS_MEDIUM}>
                          {item.title}
                        </AppText>
                        <AppText type={TWENTY_FIVE} weight={POPPINS_SEMI_BOLD}>
                          {item.balance}
                        </AppText>
                      </View>

                      <FastImage
                        source={item?.FastImage}
                        resizeMode="contain"
                        style={{ height: 87, width: 78, right: 30 }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 1,
                        marginTop: -15,
                      }}>
                      <LinearGradient
                        colors={[
                          NLCColor.Red,NLCColor.LightRed
                        ]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.box}>
                        <AppText
                          type={TWELVE}
                          weight={POPPINS_LIGHT}
                          color={WHITE}>
                          {item.titletwo}
                        </AppText>
                        <AppText
                          style={{ marginTop: 3 }}
                          type={FIFTEEN}
                          weight={SEMI_BOLD}
                          color={WHITE}>
                          {item.deposit}
                        </AppText>
                        <TouchableOpacityView style={styles.depositbutton} onPress={() => NavigationService.navigate(ADD_MONEY_SCREEN)}>
                          <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AppText type={ELEVEN} color={WHITE} weight={POPPINS_LIGHT}>
                              Deposit
                            </AppText>
                            <FastImage
                              source={rightArrow}
                              resizeMode="contain"
                              style={{ height: 10, width: 10, left: 25 }}
                            />
                          </View>
                        </TouchableOpacityView>
                      </LinearGradient>
                      <View style={styles.boxtwo}>
                        <AppText
                          type={TWELVE}
                          weight={POPPINS_LIGHT}
                          color={BLACK}>
                          {item.titlethree}
                        </AppText>
                        <AppText
                          style={{ marginTop: 3 }}
                          type={FIFTEEN}
                          weight={SEMI_BOLD}
                          color={BLACK}>
                          {item.deposit}
                        </AppText>
                        <TouchableOpacityView
                          style={[
                            styles.depositbutton,
                            {
                              backgroundColor: NLCColor.shineRed,
                            },
                          ]} onPress={() => NavigationService.navigate(MY_BALANCE)}>
                          <View
                            style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <AppText type={ELEVEN} color={WHITE} weight={POPPINS_LIGHT}>
                              Withdraw
                            </AppText>
                            <FastImage
                              source={rightArrow}
                              resizeMode="contain"
                              style={{ height: 10, width: 10, left: 25 }}
                            />
                          </View>
                        </TouchableOpacityView>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={[
                          styles.box,
                          {
                            backgroundColor: colors.bottomBackgroundColor,
                            marginTop: 1,
                          },
                        ]}>
                        <AppText
                          type={TWELVE}
                          weight={POPPINS_LIGHT}
                          color={BLACK}
                          style={{ marginTop: 6 }}>
                          {item.titlefour}
                        </AppText>
                        <AppText
                          style={{ marginTop: 10 }}
                          type={FIFTEEN}
                          weight={SEMI_BOLD}
                          color={BLACK}>
                          {item.deposit}
                        </AppText>
                      </View>
                      <View
                        style={[
                          styles.boxtwo,
                          {
                            bottom: 9,
                          },
                        ]}>
                        <AppText
                          type={TWELVE}
                          weight={POPPINS_LIGHT}
                          color={BLACK}
                          style={{ marginTop: 6 }}>
                          {item.titlefive}
                        </AppText>
                        <AppText
                          style={{ marginTop: 10 }}
                          type={FIFTEEN}
                          weight={SEMI_BOLD}
                          color={BLACK}>
                          {item.deposit}
                        </AppText>
                      </View>
                    </View>
                  </>
                );
              })}
            </LinearGradient>
            <View style={{ paddingHorizontal: 17 }}>
              <TouchableOpacityView style={styles.histroymainbox} onPress={() => NavigationService.navigate(TRANSACTION_SCREEN)}>
                <AppText type={THIRTEEN} weight={POPPINS_MEDIUM}>
                  Transaction History
                </AppText>
                <FastImage
                  source={rightArrow}
                  resizeMode="contain"
                  tintColor={colors.black}
                  style={{ height: 15, width: 20 }}
                />
              </TouchableOpacityView>
            </View>
          </View>
          {/* <TouchableOpacityView style={{
            height: 40,
            with: "100%", backgroundColor: "orange",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
          }}
            onPress={() => NavigationService.navigate(MYBATTLELOGIN)}
          >
            <AppText>
              login
            </AppText>
          </TouchableOpacityView>
          <TouchableOpacityView style={{
            height: 40,
            with: "100%", backgroundColor: "orange",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
          }}
            onPress={() => NavigationService.navigate(MYBATTLEOTP)}
          >
            <AppText>
              otp
            </AppText>
          </TouchableOpacityView>
          <TouchableOpacityView style={{
            height: 40,
            with: "100%", backgroundColor: "orange",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
          }} onPress={() => NavigationService.navigate(MYBATTLEREFEREARN)}>
            <AppText>
              refer and earn
            </AppText>
          </TouchableOpacityView> */}
        </KeyBoardAware>
      </AppSafeAreaView>
    </>
  );
}
export default ReferAndEarn;

const styles = StyleSheet.create({
  mainview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: universalPaddingHorizontal,
    marginTop: "10%"
  },
  iconbell: {
    height: 28,
    width: 28,
    right: -1,
    position: "absolute",
  },
  iconbellview: {
    height: 5,
    width: 5,
    backgroundColor: colors.brownish,
    borderRadius: 10,
    alignContent: "flex-end",

    marginBottom: 15,


  },
  mainbox: {
    paddingHorizontal: 20,
    marginHorizontal: universalPaddingHorizontal,
    paddingVertical: 10,
    marginTop: 25,

    borderRadius: 35,
  },
  box: {
    height: 96,
    width: '48%',
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  depositbutton: {
    height: 23,
    width: 120,
    backgroundColor: NLCColor.buttonColor,
    borderRadius: 20,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: NLCColor.buttonWidthColor
  },
  boxtwo: {
    height: 96,
    width: '48%',
    backgroundColor: colors.bottomBackgroundColor,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  histroymainbox: {
    height: 50,
    width: '100%',
    backgroundColor: NLCColor.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: universalPaddingHorizontal,
    borderRadius: 10,
    // borderWidth:1,
    // borderColor:colors.rbBackground,
    shadowColor: NLCColor.white,
    shadowOpacity: 0.5,
    elevation: 1
  },
  bottomContainer: {
    backgroundColor: "#F8F8F8"
  }
});
