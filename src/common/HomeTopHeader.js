import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacityView } from './TouchableOpacityView';
import NavigationService from '../navigation/NavigationService';
import {
  MY_BALANCE,
} from '../navigation/routes';
import {
  MyBattleLogo,
  Nlgicon,
  ThreeIcon,
  UserIcon,
  WalletIcon,
} from '../helper/image';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../helper/utility';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar } from 'native-base';
import {
  AppText,
  POPPINS_SEMI_BOLD,
  TWELVE,
  WHITE,
} from './AppText';
import { NLCColor } from '../theme/color';

const HomeTopHeader = ({ personClick, walletIcon }) => {
  const [random, setRandom] = useState('')
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const { total_balance, cash_bonus, winning_amount } = userData ?? '';
  let totalbalance = winning_amount + cash_bonus + total_balance
  useEffect(() => {
    setRandom(Math.random())
  }, [total_balance])
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
        barStyle={"light-content"}
      />
      <LinearGradient
        colors={[NLCColor.LightRed,NLCColor.shadeRed]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.topContainer}>
        <TouchableOpacityView
          style={{ height: 28, width: 28, marginTop: "5%" }}
          onPress={personClick}>
          <FastImage
            resizeMode="contain"
            source={
              userData?.logo
                ? { uri: `${IMAGE_BASE_URL}${userData?.logo}` }
                : UserIcon
            }
            style={styles.personImage}
          />
          <View style={styles.userfilter}>
            <FastImage
              source={ThreeIcon}
              resizeMode='contain'
              style={{ height: 10, width: 10 }} />
          </View>
        </TouchableOpacityView>
        <FastImage
          source={Nlgicon}
          style={styles.combineIcon}
          resizeMode="contain"
        />
        <TouchableOpacityView
          style={{ marginTop: "6%" }}
          onPress={() => NavigationService.navigate(MY_BALANCE)}>
          <LinearGradient
            colors={[ "#FFFFFF33","#FFFFFF26"]}
            start={{ x:1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.walletView}>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
              <View style={styles.walletbox}>
                <FastImage
                  style={{ height: 12, width: 14, }}
                  resizeMode="contain"
                  source={WalletIcon}
                  tintColor={NLCColor.textInputcolor}
                />
              </View>
              <View>
                <AppText
                  style={{  marginLeft: 7 }}
                  type={TWELVE}
                  weight={POPPINS_SEMI_BOLD}
                  color={WHITE}>
                  ₹ {Math.round(totalbalance).toFixed(0)}
                </AppText>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacityView>
        {/* <TouchableOpacityView
          style={styles.notifiView}
          onPress={() => NavigationService.navigate(Notification__SCREEN)}>
          <FastImage
            source={iconbell}
            resizeMode="contain"
            style={styles.notificationIcon}
          />
        </TouchableOpacityView> */}
      </LinearGradient>
    </>
  );
};
export { HomeTopHeader };

const styles = StyleSheet.create({
  topContainer: {
    height: 90,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between"
  },
  personImage: {
    height: 28,
    width: 28,
    borderRadius: 100,
  },
  combineIcon: {
    height: 28,
    width: 53,
    marginLeft: 85,
    marginTop: "8%"
  },
  notificationIcon: {
    height: 28,
    width: 28,
    right: 25
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  walletView: {
    borderRadius: 59,
    flexDirection: 'row',
    marginTop: 2,
    height: 30,
    width: 80,
    borderWidth: 1,
    borderColor:NLCColor.lightPink,
    marginLeft: 30,

  },
  userfilter: {
    position: "absolute", alignSelf: "flex-end", top: 18
  },
  walletbox: {
    height: 28,
    width: 28,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor:NLCColor.lightPink,
    backgroundColor: NLCColor.Red
  },
  logoview: {
    //  justifyContent:"space-between"
  },
  belldot: {
    height: 4,
    width: 4,
    backgroundColor: "#EC536A",
    position: "absolute",
    borderRadius: 10,
  },
  notifiView: {
    height: 28,
    with: 28,
    marginTop: 3,
    marginRight: -5,
    backgroundColor: 'black',
    borderWidth: 1
  }
});
