import React from 'react';
import { ImageBackground, Linking, StyleSheet, View } from 'react-native';
import { AppSafeAreaView } from '../../common/AppSafeAreaView';
import { KeyBoardAware } from '../../common/KeyboardAware';
import {
  MyBattleReferBackground,
  ReferEarn,
  ReferIcon,
  chain,
  film,
  medal,
  refer_earn,
  whatsapp,
} from '../../helper/image';
import { Button, StatusBar } from 'native-base';
import FastImage from 'react-native-fast-image';
import { NewColor, colors } from '../../theme/color';
import LinearGradient from 'react-native-linear-gradient';
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  FIFTEEN,
  LIGHTWHITE,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  REDTEXT,
  TEN,
  TWENTY_FOUR,
  WHITE,
} from '../../common/AppText';
import { universalPaddingHorizontal } from '../../theme/dimens';
import { shareToAny } from '../../helper/utility';
import { SolidButton } from '../../common/SolidButton';
import PrimaryButton from '../../common/primaryButton';
import NavigationService from '../../navigation/NavigationService';
import { MY_BALANCE } from '../../navigation/routes';
import { useSelector } from 'react-redux';

const MyBattleReferEarn = () => {
  const userData = useSelector((state: any) => {
    return state.profile.userData;
  });
  console.log(userData?.refercode,'userData');
  
  const data = [
    {
      id: 1,
      image: chain,
      title: 'Invite your friends',
      about:
        'Share the link with you Friends over whatsapp or any other social platform.',
    },
    {
      id: 2,
      image: film,
      title: 'Get INR 50 when Signup',
      about: 'When your friend sign up on the app, you will receive 50.',
    },
    {
      id: 3,
      image: medal,
      title: 'Get INR 50 when they add money',
      about:
        'When your friend will add money in the wallet, you will receive 50.',
    },
  ];

  const openWhatsApp = () => {
    const whatsappURL =
      'whatsapp://send?text=ANNSKJJKsJKASJKAJSDJKASJKDASJKDJASJASK';
    Linking.openURL(whatsappURL)
      .then(supported => {
        if (!supported) {
          console.error('WhatsApp is not installed on your device.');
        }
      })
      .catch(error => {
        console.error('An error occurred while opening WhatsApp:', error);
      });
  };
  return (
    <AppSafeAreaView>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <KeyBoardAware style={{ backgroundColor: 'white' }}>
        <ImageBackground
          source={MyBattleReferBackground}
          resizeMode="cover"
          style={styles.MyBattleReferBackground}>


          <View style={styles.refrebox}>
            <LinearGradient
              colors={['#1F7596', '#10536D']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.refreboxtwo}>
              <AppText
                type={TWENTY_FOUR}
                weight={POPPINS_SEMI_BOLD}
                color={WHITE}>
                ₹500
              </AppText>
              <AppText
                style={{ marginTop: -5 }}
                weight={POPPINS_SEMI_BOLD}
                color={WHITE}>
                collected
              </AppText>
            </LinearGradient>
            <View style={{ flexDirection: 'row', marginLeft: 15 }}>
              <AppText
                type={FIFTEEN}
                weight={POPPINS_MEDIUM}
                color={BLACKOPACITY}>
                Invite accepted -
              </AppText>
              <AppText type={FIFTEEN} weight={POPPINS_SEMI_BOLD}>
                {' '}
                10
              </AppText>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            height: 14,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '19%',
          }}>
          <LinearGradient
            style={{
              width: 128,
              height: 1,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              colors.linerLineBlue,
              colors.linerLinePick,
            ]}></LinearGradient>
          <AppText weight={POPPINS_MEDIUM}>How it works! </AppText>
          <LinearGradient
            style={{
              width: 128,
              height: 1,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              colors.linerLineBlue,
              colors.linerLinePick,
            ]}></LinearGradient>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              height: 240,
            }}>
            {data?.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 39,
                      height: 39,
                      backgroundColor: colors.bottomBackgroundColor,
                      borderRadius: 20,
                      alignItems: 'center',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      resizeMode="contain"
                      style={{ width: 21, height: 21 }}
                      source={item?.image}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                      flex: 1,
                    }}>
                    <AppText type={POPPINS_MEDIUM}>{item?.title}</AppText>
                    <AppText numberOfLines={2} type={TEN} color={REDTEXT}>
                      {item?.about}
                    </AppText>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            paddingVertical: 10,
          }}>
          <PrimaryButton
            onPress={() => shareToAny(userData?.refercode)}
            buttonStyle={{
              marginHorizontal: universalPaddingHorizontal,
              width: '78%',
            }}
            titleStyle={{ color: colors.redText }}
            title="Invite"
          />
          <SolidButton
            onPress={openWhatsApp}
            size={TEN}
            color={WHITE}
            style={[
              styles.mediaBtn,
              { backgroundColor: colors.bottomBackgroundColor },
            ]}
            nogradient={true}
            ImageStyle={styles.commonBtn}
            Icon={whatsapp}></SolidButton>
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default MyBattleReferEarn;

const styles = StyleSheet.create({
  MyBattleReferBackground: {
    height: 315,
    width: '100%',
  },
  main: {
    alignSelf: 'center',
  },
  ReferEarn: {
    height: 51,
    width: 320,
    top: 35,
  },
  ReferIcon: {
    height: 180,
    width: 243,
  },
  refrebox: {
    flexDirection: 'row',
    width: '90%',
    height: 80,
    position: 'absolute',
    bottom: '-13%',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: colors.bottomBackgroundColor,
  },
  refreboxtwo: {
    height: 62,
    width: 117,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'column',
  },
  buttoncontainer: {
    marginHorizontal: universalPaddingHorizontal,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaBtn: {
    flexDirection: 'row',
    width: '15%',
    height: 48,
    position: 'absolute',
    bottom: '19%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-end',
    right: 14,
  },
  commonBtn: {
    width: 29,
    height: 29,
    marginRight: 2,
    resizeMode: 'contain',
  },
});
