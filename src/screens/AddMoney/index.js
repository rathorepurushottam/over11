import { View, StatusBar, Linking, ScrollView, BackHandler, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../../common/Header';
import { AppSafeAreaView } from '../../common/AppSafeAreaView';
import { KeyBoardAware } from '../../common/KeyboardAware';
import CommonImageBackground from '../../common/commonImageBackground';
import {
  AppText,
  BLACK,
  BOLD,
  FORTEEN,
  LATO_BOLD,
  LIGHTBLUE,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  REDTEXT,
  SEMI_BOLD,
  TWELVE,
  WHITE,
} from '../../common/AppText';
import styles from './styles';
import InputBox from '../../common/InputBox';
import FastImage from 'react-native-fast-image';
import { horizontalLine, cross, BannerLoop, UPILogo, CLOSE_WHITE_ICON } from '../../helper/image';
import { TouchableOpacityView } from '../../common/TouchableOpacityView';
import BannerSlider from '../../common/BannerSilder';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../common/primaryButton';
import { Screen, universalPaddingHorizontal } from '../../theme/dimens';
import { paymentGetwayPhonepe, paymentGetwayPhonepeText } from '../../slices/matchSlice';
import { fixedToTwo, toastAlert } from '../../helper/utility';
import RBSheet from 'react-native-raw-bottom-sheet';
import { WebViewComponent } from '../../components/WebView';
import { getUserProfile } from '../../actions/profileAction';
import { colors } from '../../theme/color';
import RNUpiPayment from 'react-native-upi-payment'
import NavigationService from '../../navigation/NavigationService';
import { ADDCASH_VERIFICATION } from '../../navigation/routes';
import { color } from 'native-base/lib/typescript/theme/styled-system';
const AddMoney = () => {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(Number);
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const kycDetails = useSelector(state => {
    return state.profile.kycDetails;
  });
  const { total_balance } = userData ?? '';
  const sheet = useRef();
  const sheetTwo = useRef();
  const sheetTwoText = useRef();

  const data = [
    { id: '1', rupay: '50' },
    { id: '2', rupay: '100' },
    { id: '3', rupay: '200' },
    { id: '4', rupay: '500' },
  ];

  const bannerData = [
    {
      id: '1',
      image: BannerLoop,
    },
    {
      id: '2',
      image: BannerLoop,
    },
    {
      id: '3',
      image: BannerLoop,
    },
  ];
  const isUserVerified = kycDetails?.dl_verified == 1 || kycDetails?.voter_verified == 1 || kycDetails?.adhar_verified == 1
  const AddMoney = () => {
    // toastAlert.showToastError('Payment getway is not implemented')
    if (!isUserVerified) {
      NavigationService.navigate(ADDCASH_VERIFICATION)
    }
    // else if (amount == '') {
    //   toastAlert.showToastError('Please enter amount')
    // } else if (amount.charAt(0) === '0') {
    //   toastAlert.showToastError('Please enter vaild amount')
    // } else {
    //   let data = {
    //     amount: amount
    //   }
    //   dispatch(paymentGetwayPhonepe(data))
    //   sheetTwo?.current.open()
    // }
  }

  const paywith = (title) => {
    if (title == 'PAY_PAGE') {
      let data = {
        amount: amount,
        type: 'PAY_PAGE'
      }
      dispatch(paymentGetwayPhonepe(data, title, sheet))
      sheetTwo.current.close();
    } else {
      let data = {
        amount: amount,
        type: 'UPI_INTENT'
      }
      dispatch(paymentGetwayPhonepe(data, title, null))
    }
  }

  let tdsamount = parseFloat((amount / 128) * 28).toFixed(2);
  let amounttoadd = amount - tdsamount;
  let dividTwo = tdsamount / 2
  return (
    <AppSafeAreaView light={true} hidden={false}>
      <StatusBar
        backgroundColor={'#282828'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <KeyBoardAware>
        <CommonImageBackground common>
          <Header
           
            commonHeader
            title="Add Money"
          />
          <View style={styles.bottomContainer}>
            <View style={styles.box}>
              <View style={styles.mobileContainer}>
                <View>
                  <AppText type={TWELVE}>
                    Available Balance
                  </AppText>
                </View>

                <View>
                  <AppText type={TWELVE} color={REDTEXT} weight={POPPINS_SEMI_BOLD}>
                    INR {fixedToTwo(total_balance)}
                  </AppText>
                </View>
              </View>
              <FastImage
                style={styles.horizontalLine}
                source={horizontalLine} tintColor={"#BEBEBE"}
              />
            </View>
            {/* <BannerSlider bannerData={bannerData} /> */}
            <View style={[styles.box,]}>
              <AppText  type={TWELVE}>
                Add cash to your account
              </AppText>
              <View style={{ flexDirection: 'row' }}>
                <InputBox
                  placeholder="Enter amount"
                  style={{ flex: 1, marginTop: 10 }}
                  textInputBox={styles.textInputBox}
                  onChange={value => setAmount(value)}
                  closeImage={true}
                  value={amount}
                  onPressClose={() => setAmount('')}
                  keyboardType={'number-pad'}
                  // textInputStyle={styles.text}
                  placeholderTextColor={colors.black}

                />
                <FastImage
                  style={{
                    height: 8,
                    width: 8,
                    alignSelf: 'center',
                    right: 20,
                    top: 4,
                  }}
                  resizeMode="contain"
                  source={cross}
                  tintColor={colors.black}
                />
              </View>
              <View style={styles.buttonContainer}>
                {data?.map(item => {
                  return (
                    <TouchableOpacityView
                      onPress={() => setAmount(item.rupay)}
                      style={styles.rsContainer}>
                      <AppText
                        color={WHITE}
                        weight={POPPINS_MEDIUM}
                        type={TWELVE}
                        style={styles.rs}>
                        + INR {item.rupay}
                      </AppText>
                    </TouchableOpacityView>
                  );
                })}
              </View>
              {amount ?
                <>
                  <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center", justifyContent: "space-between" }} >
                    <AppText type={TWELVE} color={REDTEXT}>
                      Amount to be added in wallet
                    </AppText>
                    <AppText>
                      +INR {parseFloat(amounttoadd)?.toFixed(2)}
                    </AppText>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, justifyContent: "space-between" }} >
                    <AppText type={TWELVE} color={REDTEXT}>
                      SGST[14%]
                    </AppText>
                    <AppText>
                      INR {parseFloat(dividTwo)?.toFixed(2)}
                    </AppText>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, justifyContent: "space-between" }} >
                    <AppText type={TWELVE} color={REDTEXT}>
                      CGST[14%]
                    </AppText>
                    <AppText>
                      INR {parseFloat(dividTwo)?.toFixed(2)}
                    </AppText>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, justifyContent: "space-between" }} >
                    <AppText type={TWELVE} color={REDTEXT}>
                      Total GST[28%]
                    </AppText>
                    <AppText>
                      -INR {parseFloat(tdsamount)?.toFixed(2)}
                    </AppText>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, justifyContent: "space-between" }} >
                    <AppText type={TWELVE} color={REDTEXT}>
                      Deposit Bonus
                    </AppText>
                    <AppText>
                      +INR {parseFloat(tdsamount)?.toFixed(2)}
                    </AppText>
                  </View>
                  <View style={{
                     borderWidth: StyleSheet.hairlineWidth,
                    borderColor: "#BEBEBE",
                    marginTop: 5,
                  }} />
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, justifyContent: "space-between" }} >
                    <AppText type={TWELVE} color={REDTEXT}>
                      Total Amount
                    </AppText>
                    <AppText>
                      +INR {parseFloat(amount)?.toFixed(2)}
                    </AppText>
                  </View>
                </>
                : <></>}
            </View>
          </View>
          <View style={{ paddingHorizontal: universalPaddingHorizontal, marginBottom: 15 }}>
            <PrimaryButton
              buttonStyle={styles.buttonStyle}
              onPress={AddMoney}
              title="Add Money"
            />
            {/* <PrimaryButton
              buttonStyle={styles.buttonStyle}
              onPress={AddMoneyText}
              title="Add Money Text"
            /> */}
          </View>
        </CommonImageBackground>

      </KeyBoardAware>
      <RBSheet
        ref={sheetTwo}
        closeOnDragDown={true}
        closeOnPressBack={true}
        height={220}
        customStyles={{
          container: {
            height: Screen.Height / 4.5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 18,
            backgroundColor: colors.bottomBackgroundColor
          },
          draggableIcon: {
            backgroundColor: 'transparent',
            display: 'none',
          },
        }}>
        <TouchableOpacityView
          onPress={() => {
            sheetTwo.current.close(),
              dispatch(getUserProfile(false, false));
          }}
          style={{ marginTop: '3%', alignItems: 'flex-end', padding: 10 }} >
          <FastImage
            tintColor={'white'}
            style={{
              width: 16,
              height: 16
            }}
            resizeMode='contain'
            source={CLOSE_WHITE_ICON} />
        </TouchableOpacityView>
        <TouchableOpacityView
          // onPress={PayWithUpi}
          onPress={() => paywith('UPI_INTENT')}
          style={{
            height: 45,
            width: '100%',
            backgroundColor: "#606060",
            marginTop: '3%',
            borderRadius: 10,
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center'
          }}>
          <FastImage
            source={UPILogo}
            resizeMode='contain'
            style={{
              height: 40,
              width: 40
            }}
            tintColor={colors.white}
          />
          <AppText style={{
            marginTop: -3,
            flex: 1,
            textAlign: 'center'
          }} type={FORTEEN} weight={LATO_BOLD}>
            PAY WITH UPI
          </AppText>
          <View style={{
            height: 40,
            width: 40
          }} />
        </TouchableOpacityView>
        <TouchableOpacityView
          // onPress={() => {
          //   sheetTwo.current.close();
          //   sheet.current.open()
          // }}
          onPress={() => paywith('PAY_PAGE')}
          style={{
            height: 45,
            width: '100%',
            backgroundColor: "#606060",
            marginTop: '3%',
            borderRadius: 10,
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <AppText style={{ marginTop: -3, marginLeft: 25 }} type={FORTEEN} weight={LATO_BOLD}>
            PAY WITH OTHER METHODS
          </AppText>
        </TouchableOpacityView>
      </RBSheet>

      <RBSheet
        ref={sheet}
        closeOnDragDown={true}
        height={201}
        customStyles={{
          container: {
            height: Screen.Height
          },
          draggableIcon: {
            backgroundColor: 'transparent',
            display: 'none',
          },
        }}>
        <WebViewComponent />
      </RBSheet>
    </AppSafeAreaView>
  );
};

export default AddMoney;
