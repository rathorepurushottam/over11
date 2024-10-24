import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../common/Header';
import { AppSafeAreaView } from '../../common/AppSafeAreaView';
import { KeyBoardAware } from '../../common/KeyboardAware';
import CommonImageBackground from '../../common/commonImageBackground';
import { AppText, BLACKOPACITY, FORTEEN, POPPINS_MEDIUM, POPPINS_SEMI_BOLD } from '../../common/AppText';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import InputBox from '../../common/InputBox';
import PrimaryButton from '../../common/primaryButton';
import DropdownComponent from '../../common/Dropdown';
import { universalPaddingHorizontal } from '../../theme/dimens';
import { RootState } from '../../libs/rootReducer';
import { ifsclNumber, toastAlert } from '../../helper/utility';
import { updateKyc } from '../../actions/profileAction';
import { StatusBar } from 'native-base';
import FastImage from 'react-native-fast-image';
import { bank } from '../../helper/image';
import { TouchableOpacityView } from '../../common/TouchableOpacityView';
import ImagePicker from 'react-native-image-crop-picker';
import { appOperation } from '../../appOperation';
import { bankVerifiy, ifscVerifiy } from '../../slices/matchSlice';
import { colors } from '../../theme/color';

const VerifyBank = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state?.profile?.isLoading);
  const ifscDetails = useSelector(state => state?.match?.ifscDetails);
  const { bank: bankName, branch: branchName } = ifscDetails ?? "";
  const [accountNo, setAccountNo] = useState('');
  const [accountNoRe, setAccountNoRe] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [isbank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [state, setState] = useState('Rajasthan');
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    setBank(bankName ? bankName : '');
    setBranch(branchName ? branchName : '');
  }, [ifscDetails])
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const data = [
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Jaipur', label: 'Jaipur' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Punjab', label: 'Punjab' },
  ];
  const onChangeValue = value => {
    setState(value?.value);
  };

  // const colors = useSelector((state) => {
  //   return state.theme.colors;
  // });
  const onSubmit = () => {
    if (!accountNo) {
      toastAlert.showToastError('Please enter your account number')
    } else if (accountNoRe != accountNo) {
      toastAlert.showToastError('Please check confirm account number')
    } else if (!ifsclNumber(ifsc)) {
      toastAlert.showToastError('Please enter vaild ifsc code')
    } else if (!isbank) {
      toastAlert.showToastError('Please enter bank name')
    } else if (!branch) {
      toastAlert.showToastError('Please enter branch name')
    } else {
      let data = {
        bank_image: imageUrl,
        account_number: accountNo,
        ifsc_code: ifsc,
        bank_name: isbank,
        branch_name: branch,
      }
      dispatch(bankVerifiy(data));
    }
  };
  const formatUserName = (textValue) => {
    setIfsc(textValue);
    let data = {
      ifsc: textValue
    }
    dispatch(ifscVerifiy(data));
  }
  const openPicker = async () => {
    console.log('Helloooo');
    ImagePicker.openCamera({
      width: 485,
      height: 485,
      cropping: true,
    }).then(image => {
      const data = {
        uri: image.path,
        name: image.modificationDate + '.' + image.mime.split('/')[1],
        type: image.mime,
      };

      setImageData(data);
    });
  };
  const uploadImage = async () => {
    try {
      const uploadData = new FormData();
      uploadData.append('file', imageData);
      const res = await appOperation.customer.uploadImg(uploadData);
      if (res?.code == 200) {
        setImageUrl(res?.data);
      }
    } catch (e) {
      console.log('error in upload', e);
    }
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 485,
      height: 485,
      cropping: true,
    }).then(image => {
      const data = {
        uri: image.path,
        name: image.modificationDate + '.' + image.mime.split('/')[1],
        type: image.mime,
      };
      setImageData(data);
    });
  };
  useEffect(() => {
    if (imageData) {
      uploadImage();
    }
  }, [imageData]);
  return (
    <AppSafeAreaView hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <Header
          commonHeader
          title="Verify Bank Account"
          style={{ padding: universalPaddingHorizontal, marginTop: '10%' }}
        />
        <KeyBoardAware style={styles.bottomContainer}>
          <AppText type={FORTEEN} style={[styles.withdraw, { marginLeft: 2 }]}>
            Enter Your Bank Details
          </AppText>
          {/* <View
            style={[styles.box, { alignItems: "center", justifyContent: 'center' }]}>
            <AppText weight={POPPINS_SEMI_BOLD}>
              VERIFY YOUR BANK ACCOUNT
            </AppText>
            <AppText style={{ textAlign: 'center', marginTop: 10 }} weight={POPPINS_SEMI_BOLD} color={BLACKOPACITY}>
              {`Transfer your Winnings to your Bank Account. For withdrawing money from FantasyScore11, please verify your Bank account by following below steps.`}
            </AppText>

            <TouchableOpacityView onPress={openGallery} style={styles.containeImage}>
              <FastImage source={imageData?.uri ? { uri: imageData?.uri } : bank}
                resizeMode='contain' style={styles.bankLogo} />
              <AppText style={{ marginTop: 10 }} color={BLACKOPACITY} weight={POPPINS_MEDIUM}>
                UPLOAD BANK ACCOUNT PROOF
              </AppText>
              <AppText style={{ textAlign: "center", marginTop: 5 }} color={BLACKOPACITY} weight={POPPINS_MEDIUM}>
                (We accept Passbook front page image, Online Bank account statement screenshot, Cancelled Cheque Image)
              </AppText>
            </TouchableOpacityView>
          </View> */}
          <View style={styles.box}>
            <InputBox
              placeholder="Enter your account number"
              value={accountNo}
              placeholderTextColor={colors.black}
              labelStyle={styles.label}
              label="Account Number"
              returnKeyType="next"
              onChange={value => setAccountNo(value)}
              textInputBox={styles.textInputBox}
              keyboardType={'decimal-pad'}
              maxLength={17}
            />
            <InputBox
              placeholder="Confirm account number"
              value={accountNoRe}
              placeholderTextColor={colors.black}
              labelStyle={styles.label}
              label="Confirm Account Number"
              returnKeyType="next"
              onChange={value => setAccountNoRe(value)}
              textInputBox={styles.textInputBox}
              keyboardType={'decimal-pad'}
              maxLength={17}
            />
            <InputBox
              placeholder="Enter 11 digit IFSC code"
              value={ifsc}
              placeholderTextColor={colors.black}
              labelStyle={[styles.label, { marginTop: 15 }]}
              label="IFSC Code"
              returnKeyType="next"
              onChange={value => formatUserName(value)}
              textInputBox={styles.textInputBox}
              maxLength={11}
            />

            <InputBox
              placeholder="Enter your bank name"
              value={isbank}
              placeholderTextColor={colors.black}
              labelStyle={[styles.label, { marginTop: 15 }]}
              label="Bank Name"
              returnKeyType="next"
              onChange={value => setBank(value)}
              textInputBox={styles.textInputBox}
            />
            <InputBox
              placeholder="Your branch name"
              value={branch}
              placeholderTextColor={colors.black}
              labelStyle={[styles.label, { marginTop: 15 }]}
              label="Branch Name"
              returnKeyType="next"
              onChange={value => setBranch(value)}
              textInputBox={styles.textInputBox}
            />
            <DropdownComponent
              label={'State'}
              value={state}
              placeholder="Rajasthan"
              items={data}
              onChangeValue={onChangeValue}
              style={{ marginBottom: 10 }}
            />
          </View>
        </KeyBoardAware>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            marginBottom: 10
          }}>
          <PrimaryButton
            onPress={onSubmit}
            buttonStyle={styles.button}
            title="SUBMIT"
          />
        </View>
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

export default VerifyBank;
