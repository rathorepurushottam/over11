import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { AppSafeAreaView } from "../../common/AppSafeAreaView";
import { KeyBoardAware } from "../../common/KeyboardAware";
import CommonImageBackground from "../../common/commonImageBackground";
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  EIGHT,
  ELEVEN,
  FORTEEN,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  RED,
  SIXTEEN,
  TEN,
  THIRTEEN,
  TWELVE,
  WHITE,
} from "../../common/AppText";
import { useSelector } from "react-redux";
import InputBox from "../../common/InputBox";
import { RootState } from "../../libs/rootReducer";
import {
  scan,
  copy,
  downArrow,
  done,
  kycLogo,
  panIcon,
  bankIcon,
  upiIcon,
  checkAdhaar,
} from "../../helper/image";
import FastImage from "react-native-fast-image";
import { phone, email, bank, panCard } from "../../helper/image";
import { universalPaddingHorizontal } from "../../theme/dimens";
import SecondaryButton from "../../common/secondaryButton";
import NavigationService from "../../navigation/NavigationService";
import {
  MY_BALANCE,
  VERIFY_ADHAAR_SCREEN,
  VERIFY_BANK_SCREEN,
  VERIFY_DL,
  VERIFY_EMAIL_SCREEN,
  VERIFY_PAN_SCREEN,
  VERIFY_UPI,
  VERIFY_VOTER_ID,
  WITHDRAW_SCREEN,
} from "../../navigation/routes";
import { TouchableOpacityView } from "../../common/TouchableOpacityView";
import PrimaryButton from "../../common/primaryButton";
import { toastAlert } from "../../helper/utility";
import { NewColor, colors } from "../../theme/color";
// import { Colors } from 'react-native/Libraries/NewAppScreen';

const KYC = () => {
  const [visible, setIsVisible] = useState("");
  const [topTrue, setTopTrue] = useState(false);
  const [bottomTrue, setBottomTrue] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [select, setSelect] = useState("");
  // const colors = useSelector((state: RootState) => {
  //   return state.theme.colors;
  // });
  const kycDetails = useSelector((state) => {
    return state.profile.kycDetails;
  });
  const data = [
    {
      id: 1,
      title: "Bank Account",
      image: bankIcon,
    },
    {
      id: 2,
      title: "UPI",
      image: upiIcon,
    },
  ];

  const isVerified = (id) => {
    if (id == "PAN") {
      return kycDetails?.pan_verified == 1;
    } else if (id == "EMAIL") {
      return kycDetails?.email_verified == 1;
    }
  };
  const newCheck =
    kycDetails?.pan_verified == 1 &&
    kycDetails?.email_verified == 1 &&
    (kycDetails?.upi_verified == 1 || kycDetails?.bank_verified == 1);

  useEffect(() => {
    if (newCheck) {
      setIsModalVisible(true);
    }
  }, [kycDetails]);

  const checkInProgress = (id) => {
    if (id == "PAN") {
      return kycDetails?.pan_verified == 2;
    } else if (id == "EMAIL") {
      return kycDetails?.email_verified == 2;
    }
  };
  const renderItemTwo = (item) => {
    return (
      <TouchableOpacityView
        onPress={() => setSelect(item.id)}
        style={styles.renderContainer}
      >
        <View style={[styles.underContainer, {}]}>
          <View style={styles.pancardlayerview}>
            <FastImage
              source={item.image}
              resizeMode="contain"
              style={styles.renderImage}
            />
          </View>
          <AppText
            type={FORTEEN}
            weight={POPPINS_SEMI_BOLD}
            style={{ marginLeft: 10 }}
          >
            {item.title}
          </AppText>
        </View>
        <View style={styles.tickContainer}>
          {select == item.id ? <View style={styles.tick} /> : <></>}
        </View>
      </TouchableOpacityView>
    );
  };
  const onSubmit = () => {
    if (select == 1) {
      NavigationService.navigate(VERIFY_BANK_SCREEN);
    } else {
      NavigationService.navigate(VERIFY_UPI);
    }
  };
  return (
    <AppSafeAreaView
      hidden={false}
      statusColor={true}
      light={true}
      style={{ backgroundColor: "#F8F8F8" }}
    >
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <Header
        commonHeader
        title="Verification"
        style={{ padding: universalPaddingHorizontal }}
      />
      <CommonImageBackground common>
        <KeyBoardAware style={styles.bottomContainer}>
          <FastImage
            source={kycLogo}
            resizeMode="contain"
            style={styles.kycLogoS}
          />
          {/* <AppText style={[styles.headerText, { marginTop: '10%' }]} type={SIXTEEN} weight={POPPINS_SEMI_BOLD}>
            Let’s verify KYC
          </AppText> */}
          <AppText
            style={styles.headerText}
            type={THIRTEEN}
            weight={POPPINS_SEMI_BOLD}
            color={BLACKOPACITY}
          >
            {
              "Please submit the following documents \nfor the verification process"
            }
          </AppText>
          <AppText
            weight={POPPINS_MEDIUM}
            type={FORTEEN}
            style={styles.getVerified}
          >
            Document Verification
          </AppText>
          <TouchableOpacityView
            onPress={() =>
              isVerified("PAN")
                ? toastAlert.showToastError("Your pan have been Verfied")
                : checkInProgress("PAN")
                ? toastAlert.showToastError("Your pan have been progress")
                : NavigationService.navigate(VERIFY_PAN_SCREEN)
            }
            style={styles.panContainer}
          >
            <View style={styles.underContainer}>
              <View style={styles.pancardlayerview}>
                <FastImage
                  source={panIcon}
                  resizeMode="contain"
                  style={styles.renderImage}
                />
              </View>
              <AppText
                type={THIRTEEN}
                weight={POPPINS_MEDIUM}
                style={{ marginLeft: 10 }}
              >
                Pan Card
              </AppText>
            </View>
            {isVerified("PAN") ? (
              <FastImage
                source={checkAdhaar}
                resizeMode="contain"
                style={styles.checkIcon}
              />
            ) : checkInProgress("PAN") ? (
              <AppText type={THIRTEEN} weight={POPPINS_SEMI_BOLD} color={RED}>
                In Progress
              </AppText>
            ) : (
              <SecondaryButton
                type={ELEVEN}
                title="Verify"
                buttonViewStyle={{backgroundColor: colors.redText, borderRadius: 10}}
                buttonStyle={[styles.buttonStyle]}
                onPress={() => NavigationService.navigate(VERIFY_PAN_SCREEN)}
              />
            )}
          </TouchableOpacityView>
          <AppText
            weight={POPPINS_MEDIUM}
            type={FORTEEN}
            style={styles.getVerified}
          >
            Email Verification
          </AppText>
          <TouchableOpacityView
            onPress={() =>
              isVerified("EMAIL")
                ? toastAlert.showToastError("Your email have been Verfied")
                : checkInProgress("EMAIL")
                ? toastAlert.showToastError("Your email have been progress")
                : NavigationService.navigate(VERIFY_EMAIL_SCREEN)
            }
            style={styles.panContainer}
          >
            <View style={styles.underContainer}>
              <View style={styles.pancardlayerview}>
                <FastImage
                  source={panIcon}
                  resizeMode="contain"
                  style={styles.renderImage}
                />
              </View>
              <AppText
                type={THIRTEEN}
                weight={POPPINS_MEDIUM}
                style={{ marginLeft: 10 }}
              >
                Email
              </AppText>
            </View>
            {isVerified("EMAIL") ? (
              <FastImage
                source={checkAdhaar}
                resizeMode="contain"
                style={styles.checkIcon}
              />
            ) : checkInProgress("EMAIL") ? (
              <AppText type={THIRTEEN} weight={POPPINS_SEMI_BOLD} color={RED}>
                In Progress
              </AppText>
            ) : (
              <SecondaryButton
              type={ELEVEN}
              title="Verify"
              buttonViewStyle={{backgroundColor: colors.redText, borderRadius: 10}}
              buttonStyle={[styles.buttonStyle]}
              onPress={() => NavigationService.navigate(VERIFY_EMAIL_SCREEN)}
            />
            )}
          </TouchableOpacityView>
          <AppText
            style={{ marginTop: 10, marginBottom: 10 }}
            weight={POPPINS_MEDIUM}
            type={FORTEEN}
          >
            Withdrawal Account verification
          </AppText>
          {data?.map((item) => {
            return renderItemTwo(item);
          })}
        </KeyBoardAware>
        {select ? (
          <View style={{ paddingHorizontal: universalPaddingHorizontal }}>
            <PrimaryButton
              buttonStyle={styles.buttonTwo}
              title={select == 1 ? "Add Bank" : "Add UPI"}
              onPress={onSubmit}
            />
          </View>
        ) : (
          <></>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTopSection}>
                <AppText type={SIXTEEN} weight={POPPINS_SEMI_BOLD}>
                  Your KYC Completed
                </AppText>
              </View>
              <FastImage
                source={done}
                resizeMode="contain"
                style={{ height: 60, width: 60, alignSelf: "center" }}
              />
              <PrimaryButton
                onPress={() => {
                  setIsModalVisible(false),
                    NavigationService.navigate(MY_BALANCE);
                }}
                buttonStyle={{
                  marginTop: 10,
                  alignSelf: "center",
                  width: "90%",
                }}
                title="WITHDRAWAL"
              />
            </View>
          </View>
        </Modal>
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

export default KYC;

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: universalPaddingHorizontal,
  },
  kycLogoS: {
    width: 223,
    height: 222,
    alignSelf: "center",
    marginTop: 20,
  },
  headerText: {
    textAlign: "center",
  },
  getVerified: {
    marginTop: 20,
    marginBottom: 10,
  },
  panContainer: {
    paddingHorizontal: 1,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: '#002E612B',
    backgroundColor: colors.bottomBackgroundColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 46,
  },
  underContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  renderImage: {
    height: 20,
    width: 20,
    // marginLeft:,
    left: -1,
  },
  checkIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  buttonStyle: {
    marginHorizontal: 5,
    width: 66,
    // height: 21
  },
  buttonTwo: {
    marginTop: 30,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: NewColor.linerBlacklight,
  },
  modalContainer: {
    width: Dimensions.get("window").width - 20,
    // height: 243,
    backgroundColor: colors.bottomBackgroundColor,
    borderRadius: 16,
    overflow: "hidden",
    // justifyContent: 'space-between',
    paddingBottom: 20,
  },
  modalTopSection: {
    height: 54,
    backgroundColor: NewColor.linerBlackFive,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },
  renderContainer: {
    // borderWidth: 1,
    backgroundColor: colors.bottomBackgroundColor,
    paddingHorizontal: 1,
    height: 46,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tickContainer: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.borderBackColor,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  tick: {
    height: 10,
    width: 10,
    backgroundColor: colors.borderPick,
    borderRadius: 50,
  },
  pancardlayerview: {
    height: 40,
    width: 40,
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // alignContent:"center",
    // alignSelf:"center",
    backgroundColor: NewColor.linerLightBlueTwinty,
    // right:2
  },
});
