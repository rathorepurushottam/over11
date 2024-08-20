import {View, StyleSheet, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {transactionIcon, managePayment, kycIcon} from '../../helper/image';
import PrimaryButton from '../../common/primaryButton';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import Header from '../../common/Header';
import {poppinsBoldItalic} from '../../theme/typography';
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  FORTEEN,
  POPPINS_LIGHT,
  POPPINS_SEMI_BOLD,
  THIRTEEN,
  TWENTY_FOUR,
} from '../../common/AppText';
import Listing from '../../common/Profile/listing';
import CommonContainer from '../../common/Profile/commonContainer';
import ListingItem from '../../common/Profile/listingItem';
import {useDispatch, useSelector} from 'react-redux';
import NavigationService from '../../navigation/NavigationService';
import {
  ADD_MONEY_SCREEN,
  KYC_SCREEN,
  TRANSACTION_SCREEN,
  TDS_REPORT,
} from '../../navigation/routes';
import {getKycDetails, getUserProfile} from '../../actions/profileAction';
import {fixedToTwo} from '../../helper/utility';
import CommonImageBackground from '../../common/commonImageBackground';
import {NLCColor, colors} from '../../theme/color';
import ProfileHeader from '../../common/ProfileHeader';
import SecondaryButton from '../../common/secondaryButton';

const MyBalance = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const kycDetails = useSelector(state => {
    return state.profile.kycDetails;
  });
  const {winning_amount, cash_bonus, total_balance} = userData ?? '';
  const sumOfTotal = total_balance + userData?.winning_amount + cash_bonus;
  const isUserVerified =
    kycDetails?.mobile_verified == 1 &&
    kycDetails?.email_verified == 1 &&
    kycDetails?.pan_verified == 1 &&
    kycDetails?.adahr_details == 1 &&
    kycDetails?.upi_verified == 1 &&
    kycDetails?.bank_verified == 1;
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    dispatch(getKycDetails());
  }, []);
  const onSubmit = () => {
    NavigationService.navigate(ADD_MONEY_SCREEN);
    dispatch(getUserProfile(false, false));
  };
  return (
    <AppSafeAreaView light={true} hidden={false}>
      <StatusBar
        backgroundColor={'#282828'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <ProfileHeader title="My Balance" commonHeader />
        <View style={{marginHorizontal: 20,borderWidth: 1,
              borderColor: colors.redText,
              height: "20%"}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              // alignItems: 'center',
              marginTop: 20,
              paddingLeft: 20
              
            }}>
            <View>
              <AppText type={FORTEEN} weight={POPPINS_LIGHT}>
                Your Total Balance
              </AppText>
              <AppText type={TWENTY_FOUR} weight={POPPINS_SEMI_BOLD}>
                INR {Math.round(sumOfTotal).toFixed(2)}
              </AppText>
            </View>
            <View>
              <SecondaryButton
                onPress={() => onSubmit()}
                title="ADD CASH"
                buttonStyle={styles.button}
                titleStyle={styles.addCashButtonTitle}
                smallBtn={styles.smallBtn}
              />
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, flex: 1}}>
          <View>
            <CommonContainer
              style={{
                width: '100%',
                height: 274,
                marginTop: 15,
                borderRadius: 5,
                paddingHorizontal: 0,
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.redText,
              }}>
              <ListingItem
                title={'Cash Deposit'}
                info={`INR ${Math.round(total_balance).toFixed(2)}`}
              />
              <ListingItem
                title={'Winnings'}
                info={`INR ${fixedToTwo(winning_amount)}`}
                button
              />
              <ListingItem
                title={'Cash Bonus'}
                border
                info={`INR ${fixedToTwo(cash_bonus)}`}
              />
            </CommonContainer>
          </View>
          <CommonContainer
            style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              backgroundColor: colors.white,
            }}>
            <Listing
              onPressMain={() => NavigationService.navigate(TRANSACTION_SCREEN)}
              Icon={transactionIcon}
              Name={'Transaction History'}
              next
            />
          </CommonContainer>
          {isUserVerified && (
            <CommonContainer
              style={{
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                backgroundColor: colors.white,
              }}>
              <Listing
                onPressMain={() => NavigationService.navigate(KYC_SCREEN)}
                Icon={kycIcon}
                Name={'KYC Details'}
                next
              />
            </CommonContainer>
          )}
          {/* <CommonContainer
            style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Listing
              onPressMain={() =>
                NavigationService.navigate(MANAGE_PAYMENTS_SCREEN)
              }
              Icon={managePayment}
              Name={'Manage Payments'}
              next
            />
          </CommonContainer> */}
          <CommonContainer
            style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: colors.white,
            }}>
            <Listing
              onPressMain={() => NavigationService.navigate(TDS_REPORT)}
              Icon={managePayment}
              Name={'TDS Report'}
              next
            />
          </CommonContainer>
        </View>
        {kycDetails?.adahr_details == 2 ? (
          <View
            style={{
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: colors.borderLightBlue,
              paddingVertical: 5,
              marginBottom: '5%',
            }}>
            <AppText
              type={THIRTEEN}
              weight={POPPINS_SEMI_BOLD}
              color={BLACKOPACITY}>
              Your Addhar verification pending
            </AppText>
          </View>
        ) : (
          <></>
        )}
      </CommonImageBackground>
    </AppSafeAreaView>
  );
  60;
};

export default MyBalance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0E0F',
  },
  ImageBackground: {
    height: 185,
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  addCashButtonTitle: {
    fontFamily: poppinsBoldItalic,
    fontSize: 12,
    fontWeight: '700',
  },
  button: {
    marginTop: 20,
    width: "45%"
  },
  smallBtn: {
    width: 97,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
