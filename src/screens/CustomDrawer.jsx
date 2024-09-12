import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {AppSafeAreaView} from '../common/AppSafeAreaView';
import {KeyBoardAware} from '../common/KeyboardAware';
import FastImage from 'react-native-fast-image';
import {
  BattleIcon,
  Over11icon,
  FairIcon,
  LegalIcon,
  Over11profilebox,
  PlayIcon,
  PointsIcon,
  PrivacyIcon,
  ReferEarnIcon,
  SettingIcon,
  TermsIcon,
  UserIcon,
  rightArrow,
  right_arrow,
} from '../helper/image';
import {TouchableOpacityView} from '../common/TouchableOpacityView';
import {NLCColor, NewColor, colors} from '../theme/color';
import {
  AppText,
  BLACK,
  FIFTEEN,
  NORMAL,
  POPPINS_BOLD,
  POPPINS_SEMI_BOLD,
  TEXTCOLOR,
  THIRTEEN,
  TWELVE,
  TWENTY,
  WHITE,
} from '../common/AppText';
import Modal from 'react-native-modal';
import NavigationService from '../navigation/NavigationService';
import {
  DESK_HELP,
  MYBATTLEREFEREARN,
  MY_BALANCE,
  PROFILE_EDIT,
  WEB_URL,
} from '../navigation/routes';
import PrimaryButton from '../common/primaryButton';
import SecondaryButton from '../common/secondaryButton';
import {userLogout} from '../actions/authActions';
import {useDispatch, useSelector} from 'react-redux';

import {getUserProfile} from '../actions/profileAction';
import {IMAGE_BASE_URL} from '../helper/utility';
export const datatwo = [
  {
    id: 1,
    FastImage: ReferEarnIcon,
    title: 'Refer & Earn',
    source: rightArrow,
  },
  {
    id: 3,
    FastImage: ReferEarnIcon,
    title: 'Help Desk',
    source: rightArrow,
  },
  {
    id: 4,
    FastImage: TermsIcon,
    title: 'Terms & Conditions',
    source: rightArrow,
  },
  {
    id: 5,
    FastImage: Over11icon,
    title: 'About Us',
    source: rightArrow,
  },
  {
    id: 6,
    FastImage: PrivacyIcon,
    title: 'Privacy Policy',
    source: rightArrow,
  },
];
export const datathree = [
  {
    id: 7,
    FastImage: PlayIcon,
    title: 'How to Play',
    source: rightArrow,
  },
  // {
  //   id: 8,
  //   FastImage: PointsIcon,
  //   title: 'Points System',
  //   source: rightArrow,
  // },
  {
    id: 9,
    FastImage: Over11icon,
    title: 'Responsible Gaming',
    source: rightArrow,
  },

  {
    id: 10,
    FastImage: LegalIcon,
    title: 'Legalities',
    source: rightArrow,
  },
  {
    id: 11,
    FastImage: FairIcon,
    title: 'Fair Play Policy',
    source: rightArrow,
  },
];
const CustomDrawer = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state.profile.userData;
  });
  const [select, setSelect] = useState('1 ');
  const [random, setRandom] = useState(0);
  const [mdlVisibile, setMdlVisible] = useState(false);
  const onSubmit = (id, title) => {
    setSelect(id);
    if (id == '1') return NavigationService.navigate(MYBATTLEREFEREARN);
    if (id == '3') return NavigationService.navigate(DESK_HELP);
    if (id >= '4' || id == '11')
      return NavigationService.navigate(WEB_URL, {titleNames: title});
  };

  // const { mobile_number, full_name, total_balance, cash_bonus, winning_amount } =
  //   userData ?? '';
  useEffect(() => {
    dispatch(getUserProfile(false, false));
  }, []);
  const renderData = ({item, index}) => {
    const color = {
      backgroundColor: select == item.id ? NLCColor.Red : NLCColor.white,
    };
    const tintColor = select == item.id ? colors.white : colors.textColor;
    const textColor = select == item.id ? WHITE : TEXTCOLOR;
    return (
      <>
        <TouchableOpacityView
          onPress={() => onSubmit(item.id, item.title)}
          style={[styles.tabsview, color]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FastImage
              source={item?.FastImage}
              resizeMode="contain"
              style={styles.imageicon}
              tintColor={tintColor}
            />
            <AppText type={TWELVE} weight={POPPINS_SEMI_BOLD} color={textColor}>
              {item.title}
            </AppText>
          </View>
          <FastImage
            source={item?.source}
            resizeMode="contain"
            style={styles.arrowicon}
            tintColor={tintColor}
          />
        </TouchableOpacityView>
        <View style={styles.line} />
      </>
    );
  };

  return (
    <AppSafeAreaView>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <ImageBackground
        source={Over11profilebox}
        resizeMode="cover"
        // tintColor={NLCColor.Red}
        style={styles.MyBattleProfileBox}>
        <View style={{paddingHorizontal: 15}}>
          <TouchableOpacityView style={styles.imageview}>
            <FastImage
              source={
                userData?.logo
                  ? {uri: `${IMAGE_BASE_URL}${userData?.logo}`}
                  : UserIcon
              }
              resizeMode="contain"
              style={styles.usericon}
            />
          </TouchableOpacityView>
          <TouchableOpacityView
            onPress={() => {
              dispatch(getUserProfile(false, false));
              NavigationService.navigate(PROFILE_EDIT);
            }}
            style={styles.nameview}>
            <View>
              <AppText type={FIFTEEN} weight={POPPINS_SEMI_BOLD} color={WHITE}>
                {userData?.full_name}
              </AppText>

              <AppText type={TWELVE} weight={NORMAL} color={WHITE}>
                +91 {userData?.mobile_number}
              </AppText>
            </View>
            <TouchableOpacityView>
              <FastImage
                source={rightArrow}
                resizeMode="contain"
                style={styles.rightArrow}
                tintColor={colors.white}
              />
            </TouchableOpacityView>
          </TouchableOpacityView>
        </View>
      </ImageBackground>
      <KeyBoardAware style={{backgroundColor: '#F8F8F8'}}>
        <View style={styles.topviewicons}>
          <FlatList
            data={datatwo}
            renderItem={item => renderData(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.topviewicons}>
          <FlatList
            data={datathree}
            renderItem={item => renderData(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <PrimaryButton
            onPress={() => setMdlVisible(true)}
            buttonStyle={styles.button}
            title="LOG OUT"
          />
        </View>
      </KeyBoardAware>
      <Modal
        isVisible={mdlVisibile}
        style={{margin: 0}}
        animationIn="fadeIn"
        animationOut={'fadeOut'}
        hasBackdrop={true}
        onBackdropPress={() => setMdlVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: NewColor.linerBlacklightEight,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.modalBox}>
            <AppText
              style={styles.modalText}
              type={TWENTY}
              weight={POPPINS_SEMI_BOLD}>
              Are you sure you want to {'\n'} logout?
            </AppText>
            <PrimaryButton
              onPress={() => dispatch(userLogout())}
              title="LOGOUT"
            />
            <SecondaryButton
              onPress={() => setMdlVisible(false)}
              title="CANCEL"
              WHITE={WHITE}
            />
          </View>
        </View>
      </Modal>
    </AppSafeAreaView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  MyBattleProfileBox: {
    height: 160,
    width: '100%',
  },
  profiletopview: {
    paddingHorizontal: 10,
  },
  imageview: {
    height: 50,
    width: 52,
    marginTop: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usericon: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  nameview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightArrow: {
    height: 15,
    width: 20,
  },
  topviewicons: {
    backgroundColor: colors.white,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  tabsview: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  imageicon: {
    height: 25,
    width: 25,
    marginRight: 10,
    marginTop: -3,
  },
  arrowicon: {
    height: 15,
    width: 15,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
  },
  modalBox: {
    height: 240,
    width: '100%',
    padding: 30,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    width: '100%',
    borderColor: NLCColor.Red,
  },
});
