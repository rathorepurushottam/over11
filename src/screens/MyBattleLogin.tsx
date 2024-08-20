import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {AppSafeAreaView} from '../common/AppSafeAreaView';
import {KeyBoardAware} from '../common/KeyboardAware';
import {
  AgeIcon,
  MyBattleIcon,
  MyBattleScreen,
  Over11logo,
  Referboxicon,
  callIcon,
} from '../helper/image';
import {
  AppText,
  BROWNYELLOW,
  ELEVEN,
  NORMAL,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  REDTEXT,
  TWELVE,
} from '../common/AppText';
import InputBox from '../common/InputBox';
import {NLCColor, NewColor, colors} from '../theme/color';
import {fontFamilyPoppins} from '../theme/typography';
import {useDispatch, useSelector} from 'react-redux';
import PrimaryButton from '../common/primaryButton';
import {universalPaddingHorizontal} from '../theme/dimens';
import FastImage from 'react-native-fast-image';
import {toastAlert, validateMobile} from '../helper/utility';
import {userSignup} from '../actions/authActions';
import {TouchableOpacityView} from '../common/TouchableOpacityView';
import Checkbox from '../common/CheckBox/CheckBox';
import NavigationService from '../navigation/NavigationService';
import { MYBATTLEPOLICY, MYBATTLETERM } from '../navigation/routes';
import { Over11icon } from '../helper/image';

const MyBattleLogin = () => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [code, setCode] = useState('');
  const [referral, setReferral] = useState(false);
  const onSubmit = () => {
    Keyboard.dismiss();
    if (!number) {
      toastAlert.showToastError('Please enter Mobile Number');
    } else if (!validateMobile(number)) {
      toastAlert.showToastError('Please provide a valid Mobile Number');
    } /*  else if (!isSelected) {
      toastAlert.showToastError('Please check this box before proceed');
    }  */ else {
      let data = {
        refercode: code,
        mobile_number: number,
        resend: true,
      };

      dispatch(userSignup(data));
    }
  };
  return (
    <AppSafeAreaView
      statusColor={true}
      // style={{backgroundColor: NewColor.linerWhitefifty}}
      hidden={false}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      {/* <ImageBackground
        source={MyBattleScreen}
        resizeMode="cover"
        style={styles.MyBattleScreen}> */}
        
      {/* <FastImage resizeMode="stretch" style={styles.logo} source={Over11logo} /> */}
      <View style={styles.logo}>
        <FastImage source={Over11icon} resizeMode='contain' style={{width: "60%", height: '70%', marginTop: 20}}/>
      </View>
      <View
        style={{
          paddingHorizontal: universalPaddingHorizontal,
          marginTop: 20,
        }}>
        <InputBox
          label={'Login / Register'}
          value={number}
          keyboardType="numeric"
          placeholder={'Enter you number'}
          onChange={(value: any) => {
            setNumber(value);
          }}
          textInputBox={styles.textInputBox}
          labelStyle={styles.label}
          image={callIcon}
        />
        {referral && (
          <InputBox
            placeholderTextColor={NLCColor.textColor}
            value={code}
            keyboardType="default"
            placeholder={'Enter referral code (Optional)'}
            onChange={(value: any) => {
              setCode(value);
            }}
            textInputBox={styles.textInputBox}
            labelStyle={styles.label}
            image={Referboxicon}
            top={true}
          />
        )}
        <TouchableOpacityView
          onPress={() => setReferral(true)}
          style={styles.textview}>
          <AppText
            type={TWELVE}
            weight={NORMAL}
            color={REDTEXT}
            style={{
              alignSelf: 'flex-end',
              textDecorationLine: 'underline',
              marginTop: 5,
            }}>
            Have a referral code?
          </AppText>
        </TouchableOpacityView>
        <TouchableOpacityView
          onPress={() => setIsSelected(!isSelected)}
          style={styles.checkbox}>
          <Checkbox
            onPress={() => setIsSelected(!isSelected)}
            value={isSelected}
          />
          <AppText
            type={TWELVE}
            weight={POPPINS_MEDIUM}
            style={{marginLeft: 10}}>
            I confirm that I am 18+ years in age
          </AppText>
        </TouchableOpacityView>

        <View>
          <PrimaryButton
            onPress={onSubmit}
            title="Continue"
            buttonStyle={styles.button}
          />
        </View>
        {/* <View style={styles.ageiconview}>
          <FastImage
            source={AgeIcon}
            resizeMode="contain"
            style={styles.AgeIcon}
          />
          <AppText type={ELEVEN} style={{marginLeft: 10}}>
            I have read and agree to Over11 Fantasy{' '}
            <AppText style={{textDecorationLine: 'underline'}}>
              Terms of Service
            </AppText>
            {'\n'}and{' '}
            <AppText style={{textDecorationLine: 'underline'}}>
              Privacy Policy.
            </AppText>
          </AppText>
        </View> */}

        <View style={styles.ageiconview}>
          <FastImage
            source={AgeIcon}
            resizeMode="contain"
            style={styles.AgeIcon}
          />
          <AppText type={ELEVEN} style={{marginLeft: 10}}>
            I have read and agree to Over11 Fantasy{' '}
            <AppText type={ELEVEN} onPress={()=>{
              NavigationService.navigate(MYBATTLETERM)
            }} style={{textDecorationLine: 'underline'}}>
              Terms of Service
            </AppText>
            <AppText type={ELEVEN}> and </AppText>
            <AppText onPress={()=>{
              NavigationService.navigate(MYBATTLEPOLICY)
            }}  type={ELEVEN} style={{textDecorationLine: 'underline'}}>
              Privacy Policy
            </AppText>
          </AppText>
        </View>
      </View>
      {/* </ImageBackground> */}
    </AppSafeAreaView>
  );
};

export default MyBattleLogin;

const styles = StyleSheet.create({
  MyBattleScreen: {
    height: '100%',
    width: '100%',
  },
  main: {
    flex: 0.1,
    top: '10%',
  },
  label: {
    marginBottom: 10,
    alignSelf :"center"
  },
  textInputBox: {
    fontFamily: fontFamilyPoppins,
    fontSize: 12,
    flex: 1,
    color: NLCColor.black,
    fontWeight: '600',
  },
  textview: {
    marginTop: 10,
    paddingHorizontal: 10,
    alignContent: 'flex-end',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  button: {
    marginTop: 40,
  },
  AgeIcon: {
    height: 19,
    width: 19,
  },
  ageiconview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  referline: {
    height: 1,
  },
  logo: {
    width: '100%',
    height: 278,
    justifyContent: "center",
    alignItems: "center"

  },
});
