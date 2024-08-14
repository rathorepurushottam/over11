import { View, Text, StatusBar, Image, StyleSheet, Dimensions, Modal, Platform } from 'react-native';
import React, { useState } from 'react';
import Header from '../../common/Header';
import { AppSafeAreaView } from '../../common/AppSafeAreaView';
import { KeyBoardAware } from '../../common/KeyboardAware';
import CommonImageBackground from '../../common/commonImageBackground';
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  ELEVEN,
  FORTEEN,
  LIGHTBLUE,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  RUSSO,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  THIRTEEN,
  THIRTY,
  TWELVE,
  WHITE,
} from '../../common/AppText';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import InputBox from '../../common/InputBox';
import SecondaryButton from '../../common/secondaryButton';
import { PrivateValueStore } from '@react-navigation/native';
import PrimaryButton from '../../common/primaryButton';
import DropdownComponent from '../../common/Dropdown';
import { bankIcon, deleteIcon, icici, upiIcon } from '../../helper/image';
import FastImage from 'react-native-fast-image';
import { IMAGE_BASE_URL, toastAlert } from '../../helper/utility';
import { NLCColor, NewColor, colors } from '../../theme/color';
import { TouchableOpacityView } from '../../common/TouchableOpacityView';
import NavigationService from '../../navigation/NavigationService';
import { CREATE_CONTEST, MY_BALANCE, VERIFY_BANK_SCREEN, VERIFY_UPI } from '../../navigation/routes';
import { deleteAccount, deleteupi, payoutWithdraw } from '../../slices/matchSlice';
import { SpinnerSecond } from '../../common/SpinnerSecond';

const Withdraw = () => {
  const dispatch = useDispatch();

  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const kycDetails = useSelector(state => {
    return state.profile.kycDetails;
  });
  const loadingKyc = useSelector(state => state?.match?.isLoading);

  const { winning_amount } = userData ?? '';
  const { bank_details } = kycDetails ?? '';
  const { upi_details } = kycDetails ?? '';
  const { account_number, bank_name, Bankimagepath } = bank_details ?? '';
  const [amount, setAmount] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [select, setSelect] = useState('');
  const onSubmit = () => {
    toastAlert.showToastError('Payment get way is not implemented')
    // if (winning_amount <= amount) {
    //   toastAlert.showToastError('Please enter vaild amount')
    // } else if (!select) {
    //   toastAlert.showToastError('Please select Withdraw account')
    // } else {
    //   const data = {
    //     bankmethod: select == 1 ? true : false,
    //     amountowithdraw: amount
    //   }
    //   dispatch(payoutWithdraw(data))
    // }
  }
  const tdsAmount = amount > 1000 ? amount - 1000 : 0.00
  let tdsamountTwo = parseFloat((tdsAmount / 100) * 30).toFixed(2);

  const onDelete = () => {
    if (bank_details !== null) {
      setIsModalVisible(false)
      dispatch(deleteAccount())
      NavigationService.navigate(MY_BALANCE)
    } else {
      setIsModalVisible(false)
      dispatch(deleteupi())
      NavigationService.navigate(MY_BALANCE)
    }
  }
  return (
    <AppSafeAreaView light={true}>
      <StatusBar
        backgroundColor={'#282828'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <KeyBoardAware>
        <CommonImageBackground common>
          <Header style={{
          }} commonHeader title="Withdrawl" />
          <View style={styles.bottomContainer}>
            <View style={styles.topContainer}>
              <AppText type={THIRTEEN} weight={POPPINS_SEMI_BOLD} style={{ marginTop: 20 }}>
                Your winnings
              </AppText>
              <AppText type={TWELVE} weight={POPPINS_SEMI_BOLD} style={{ marginTop: 20 }}>
                INR {winning_amount}
              </AppText>
            </View>
            <View style={styles.box}>
              <View style={styles.bottomBoxContainer}>
                <AppText type={ELEVEN}
                  weight={POPPINS_SEMI_BOLD}>
                  Amount
                </AppText>
                <InputBox
                  textInputBox={styles.textInputBox}
                  placeholder="Enter your amount"
                  placeholderTextColor={'black'}
                  value={amount}
                  onChange={(value) => setAmount(value)}
                  keyboardType={'numeric'}
                />

                <AppText
                  type={TEN}
                  weight={POPPINS_SEMI_BOLD}
                  color={BLACK}>
                  Min. INR 50 & Max. INR 1,00,000 allowed per day.
                </AppText>
              </View>
            </View>
            <AppText style={{ marginTop: 20 }} type={FORTEEN} weight={POPPINS_MEDIUM}>
              Choose withdrawal option
            </AppText>
            <TouchableOpacityView
              onPress={() => {
                bank_details ?
                  setSelect(1) :
                  NavigationService.navigate(VERIFY_BANK_SCREEN)
              }}
              style={styles.boxTwo}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>

                <View style={stylesTwo.bankContainer}>
                  <FastImage source={bankIcon} resizeMode='contain' style={{ height: 20, width: 20 }} tintColor={NLCColor.black} />
                </View>
                {bank_details ?
                  <View style={{ marginLeft: 10 }}>
                    <AppText weight={POPPINS_MEDIUM}>
                      {bank_name}
                    </AppText>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                      <AppText weight={POPPINS_MEDIUM}
                        type={TWELVE} style={styles.rightText(colors)}>
                        A/C:{'  '}
                      </AppText>
                      <AppText
                        weight={POPPINS_SEMI_BOLD}
                        type={TWELVE} style={styles.rightText(colors)}>
                        {account_number}
                      </AppText>
                    </View>
                  </View>
                  : <AppText style={{ marginLeft: 10 }} weight={POPPINS_MEDIUM}>
                    Add Bank Account
                  </AppText>}
              </View>
              {bank_details ?
                <View style={styles.tickContainer}>
                  {select == 1 ?
                    <View style={styles.tick} /> : <></>}
                </View>
                : <></>}
            </TouchableOpacityView>
            <TouchableOpacityView
              onPress={() => {
                kycDetails?.upi_details ?
                  setSelect(2) :
                  NavigationService.navigate(VERIFY_UPI)
              }}
              style={styles.boxTwo}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>

                <View style={stylesTwo.bankContainer}>
                  <FastImage source={upiIcon} resizeMode='contain' style={{ height: 20, width: 20 }} tintColor={NLCColor.black} />
                </View>
                <View style={{ marginLeft: 10 }}>
                  {kycDetails?.upi_details ?
                    <AppText weight={POPPINS_MEDIUM}>
                      {kycDetails?.upi_details?.upi_number}
                    </AppText>
                    : <AppText weight={POPPINS_MEDIUM}>
                      Add UPI ID
                    </AppText>}
                </View>
              </View>
              {kycDetails?.upi_details ?
                <View style={styles.tickContainer}>
                  {select == 2 ?
                    <View style={styles.tick} /> : <></>}
                </View>
                : <></>}
            </TouchableOpacityView>
          </View>
          <View style={{
            paddingHorizontal: 20,
            paddingVertical: 15
          }} >
            <PrimaryButton onPress={onSubmit} title="WITHDRAWL" />
          </View>
        </CommonImageBackground>

      </KeyBoardAware>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={stylesTwo.centeredView}>
          <View style={stylesTwo.modalContainer}>
            <AppText style={{ marginTop: 10 }} type={SIXTEEN} weight={POPPINS_SEMI_BOLD}>
              FantasyScore11
            </AppText>
            <AppText style={{ marginTop: 10 }} type={FORTEEN} weight={POPPINS_SEMI_BOLD} color={BLACKOPACITY}>
              Are sure you want to delete your account details?
            </AppText>
            <View style={[stylesTwo.buttonContainer, { marginVertical: Platform.OS == 'ios' ? 20 : 0 }]}>
              <SecondaryButton
                onPress={onDelete}
                buttonStyle={[stylesTwo.buttonStyle, { marginTop: Platform.OS == 'ios' ? -5 : 0 }]}
                title={'YES'}
                titleStyle={{ color: colors.black, marginTop: -5 }}
                btnStyle={{
                  backgroundColor: NewColor.linerWhite,
                  borderWidth: 2,
                  height: 45,
                  borderRadius: 10,
                }}
              />
              <PrimaryButton
                buttonStyle={[stylesTwo.buttonStyle, { marginTop: Platform.OS == 'ios' ? -5 : 0 }]}
                onPress={() => setIsModalVisible(false)}
                title="NO"
              />
            </View>
          </View>
        </View>
      </Modal>
      <SpinnerSecond loading={loadingKyc} />

    </AppSafeAreaView >
  );
};

export default Withdraw;
const stylesTwo = StyleSheet.create({
  minnerContainer: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5
  },
  deleteAccountContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 10,
    borderColor: colors.borderLightBlue,
  },
  deleteicon: {
    height: 15,
    width: 15,
    marginLeft: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: NewColor.linerBlacklight,
  },
  modalContainer: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: NewColor.linerWhite,
    borderRadius: 16,
    overflow: 'hidden',
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    marginTop: 20
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 5,
  },
  bankContainer: {
    height: 42,
    width: 42,
    borderRadius: 10,
    backgroundColor: '#1E94F110',
    alignItems: "center",
    justifyContent: "center",
  }
})
