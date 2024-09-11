import React from 'react';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AUTHSTACK,
  BOTTOM_NAVIGATION_STACK,
  BOTTOM_TAB_CONTEST_SCREEN,
  BOTTOM_TAB_HOMESCREEN,
  MANAGE_PAYMENTS_SCREEN,
  KYC_SCREEN,
  ADD_CARD_SCREEN,
  Top_Slider_FlatList,
  SELECT_PLAYER,
  NFC,
  PROFILE_EDIT,
  REFER_EARN,
  HOME_SCREEN_MAIN,
  CONTEST_SCREEN_MAIN,
  MORE_SCREEN_MAIN,
  MY_BALANCE,
  VERIFY_EMAIL_SCREEN,
  VERIFY_EMAIL_OTP_SCREEN,
  VERIFY_PAN_SCREEN,
  VERIFY_BANK_SCREEN,
  ADD_MONEY_SCREEN,
  Single_Ipl_Card,
  PRACTISE_SCREEN,
  PLAYER_PREVIEW,
  CREATE_CONTEST,
  Filter_Sheet,
  Common_Tabs,
  Match_Remainder,
  Notification__SCREEN,
  SELECT_CAPTAIN,
  ALL_CONTEST_LIST,
  LEADERBOARD,
  MY_CONTEST,
  AUTH_LOADING_SCREEN,
  TRANSACTION_SCREEN,
  WITHDRAW_SCREEN,
  CONTEST_LEADERBORD,
  VERIFY_ADHAAR_SCREEN,
  VERIFY_UPI,
  PLAYER_PREVIEW_TWO,
  OTHER_USER_PROFILE,
  WEB_URL,
  TDS_REPORT,
  DESK_HELP,
  MATCH_CARD_MYCONTEST,
  SELECT_SUBSTITUTE,
  SHARE_TEAM,
  CONTESTSHARE,
  PRIVATECONTESTLEADER,
  VERIFY_DL,
  VERIFY_VOTER_ID,
  ADDCASH_VERIFICATION,
  UPLOAD_AADHAR,
  BALANCE,
  MYBATTLELOGIN,
  MYBATTLEOTP,
  MYBATTLEREFEREARN,
  PROFILE,
  USER_CONTEST,
  MYBATTLETERM,
  MYBATTLEPOLICY,
  WELCOME_SCREEN,
} from './routes';
import NavigationService from './NavigationService';
import PlayerPreview from '../screens/playerPreview/PlayerPreview';
import More from '../screens/More';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  balance,
  bottomtapHed,
  contestLinerIcon,
  contest_icon,
  homeLinerIcon,
  home_icon,
  refer_earn,
} from '../helper/image';
import FastImage from 'react-native-fast-image';
import ReferAndEarn from '../screens';
import EditProfile from '../screens/EditProfile/editProfile';
import Nfc from '../screens/NFC/Nfc';
import ManagePayment from '../screens/ManagePayment';
import KYC from '../screens/KYC';
import Home from '../screens/Home/Home';
import AuthLoading from '../screens/AuthLoading';
import AddCard from '../screens/AddCard';
import AddMoney from '../screens/AddMoney';
import PractiseScreen from '../screens/practiseScreen/PractiseScreen';
import TopSliderFlatList from '../common/TopSliderFlatList/TopSliderFlatList';
import SelectPlayer from '../screens/selectPlayer/SelectPlayer';
import CreateContest from '../screens/CreateContest';
import FilterSheet from '../components/filterSheet/FilterSheet';
import MatchRemainder from '../components/matchCard/matchRemainder/MatchRemainder';
import selectCaptain from '../screens/selectCaptain/SelectCaptain';
import MyMatches from '../screens/myMatches/MyMatches';
import LeaderBoard from '../screens/leaderBoard/LeaderBoard';
import Withdraw from '../screens/Withdraw';
import AllContestList from '../screens/allContestList/AllContestList';
import ContestLeaderbord from '../screens/myMatches/ContestLeaderbord';
import {
  AppText,
  BROWNYELLOW,
  GRY,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  RED,
  TABCOLOR,
  TEN,
} from '../common/AppText';
import {NLCColor, NewColor, colors} from '../theme/color';
import LinearGradient from 'react-native-linear-gradient';
import PlayerPreviewTwo from '../screens/playerPreviewTwo/PlayerPreviewTwo';
import WebUrl from '../common/WebUrl';
import HelpDesk from '../screens/HelpDesk';
import ContestShare from '../screens/ContestShare';
import PrivateLeaderBoard from '../PrivateLeaderBoard';
import {Platform, View} from 'react-native';
import VerifyVoterID from '../screens/VerifyVoterID';
import AddCashVerification from '../screens/AddCashVerification';
import UploadAadhar from '../screens/uploadAadhar';
import MyBattleReferEarn from '../screens/ReferAndEarn/MyBattleReferEarn';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../screens/CustomDrawer';
import VerifyEmailOTP from '../screens/VerifyEmailOTP';
import VerifyPAN from '../screens/VerifyPAN';
import VerifyEmail from '../screens/VerifyEmail';
import VerifyBank from '../screens/VerifyBank';
import MyBalance from '../screens/MyBalance';
import SingleIplCard from '../common/SingleIplCard/SingleIplCard';
import CommonTabs from '../components/matchCard/commonTabs/CommonTabs';
import Notification from '../screens/Notification';
import MyTransaction from '../screens/MyTransaction';
import VerifyAdhaarcard from '../screens/VerifyAddhar';
import OtherUserProfile from '../screens/OtherProfile';
import TDSReport from '../screens/TDSReport';
import MatchCardContest from '../components/matchCard/MatchCardContest';
import SelectSubstitute from '../screens/Selectsubstitute.js/SelectSubstitute';
import ShareTeam from '../screens/ShareTeam';
import VerifyUPI from '../screens/VerifyUPI';
import VerifyDL from '../screens/VerifyDL';
import MyBattleLogin from '../screens/MyBattleLogin';
import MyBattleOtp from '../screens/MyBattleOtp';
import MyContest from '../screens/MyContest';
import UserContest from '../screens/MyContest/UserContest';
import MyBattleTerm from '../screens/MyBattleTerm';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Welcome from '../screens/Welcome';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Navigator = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;

const RootStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={AUTH_LOADING_SCREEN}
      component={AuthLoading}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={AUTHSTACK}
      component={AuthStack}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={BOTTOM_NAVIGATION_STACK}
      component={BottomMainTab}
      options={{headerShown: false}}
    />
    <Stack.Screen name={PROFILE_EDIT} component={EditProfile} />
    <Stack.Screen name={MY_BALANCE} component={MyBalance} />
    <Stack.Screen name={REFER_EARN} component={ReferAndEarn} />
    <Stack.Screen name={NFC} component={Nfc} />
    <Stack.Screen name={KYC_SCREEN} component={KYC} />
    <Stack.Screen name={VERIFY_EMAIL_SCREEN} component={VerifyEmail} />
    <Stack.Screen name={VERIFY_EMAIL_OTP_SCREEN} component={VerifyEmailOTP} />
    <Stack.Screen name={VERIFY_PAN_SCREEN} component={VerifyPAN} />
    <Stack.Screen name={VERIFY_BANK_SCREEN} component={VerifyBank} />
    <Stack.Screen name={MANAGE_PAYMENTS_SCREEN} component={ManagePayment} />
    <Stack.Screen name={ADD_CARD_SCREEN} component={AddCard} />
    <Stack.Screen name={ADD_MONEY_SCREEN} component={AddMoney} />
    <Stack.Screen name={Single_Ipl_Card} component={SingleIplCard} />
    <Stack.Screen name={PRACTISE_SCREEN} component={PractiseScreen} />
    <Stack.Screen name={Top_Slider_FlatList} component={TopSliderFlatList} />
    <Stack.Screen name={PLAYER_PREVIEW} component={PlayerPreview} />
    <Stack.Screen name={PLAYER_PREVIEW_TWO} component={PlayerPreviewTwo} />
    <Stack.Screen name={SELECT_PLAYER} component={SelectPlayer} />
    <Stack.Screen name={CREATE_CONTEST} component={CreateContest} />
    <Stack.Screen name={Filter_Sheet} component={FilterSheet} />
    <Stack.Screen name={Common_Tabs} component={CommonTabs} />
    <Stack.Screen name={Match_Remainder} component={MatchRemainder} />
    <Stack.Screen name={CONTEST_LEADERBORD} component={ContestLeaderbord} />
    <Stack.Screen name={ALL_CONTEST_LIST} component={AllContestList} />
    <Stack.Screen name={Notification__SCREEN} component={Notification} />
    <Stack.Screen name={SELECT_CAPTAIN} component={selectCaptain} />
    <Stack.Screen name={MY_CONTEST} component={MyContest} />
    <Stack.Screen name={USER_CONTEST} component={UserContest} />
    <Stack.Screen name={LEADERBOARD} component={LeaderBoard} />
    <Stack.Screen name={TRANSACTION_SCREEN} component={MyTransaction} />
    <Stack.Screen name={WITHDRAW_SCREEN} component={Withdraw} />
    <Stack.Screen name={VERIFY_ADHAAR_SCREEN} component={VerifyAdhaarcard} />
    <Stack.Screen name={VERIFY_UPI} component={VerifyUPI} />
    <Stack.Screen name={VERIFY_DL} component={VerifyDL} />
    <Stack.Screen name={VERIFY_VOTER_ID} component={VerifyVoterID} />
    <Stack.Screen name={OTHER_USER_PROFILE} component={OtherUserProfile} />
    <Stack.Screen name={WEB_URL} component={WebUrl} />
    <Stack.Screen name={TDS_REPORT} component={TDSReport} />
    <Stack.Screen name={DESK_HELP} component={HelpDesk} />
    <Stack.Screen name={MATCH_CARD_MYCONTEST} component={MatchCardContest} />
    <Stack.Screen name={SELECT_SUBSTITUTE} component={SelectSubstitute} />
    <Stack.Screen name={SHARE_TEAM} component={ShareTeam} />
    <Stack.Screen name={CONTESTSHARE} component={ContestShare} />
    <Stack.Screen name={PRIVATECONTESTLEADER} component={PrivateLeaderBoard} />
    <Stack.Screen name={ADDCASH_VERIFICATION} component={AddCashVerification} />
    <Stack.Screen name={UPLOAD_AADHAR} component={UploadAadhar} />
    <Stack.Screen name={MYBATTLELOGIN} component={MyBattleLogin} />
    <Stack.Screen name={MYBATTLEOTP} component={MyBattleOtp} />
    <Stack.Screen name={MYBATTLEREFEREARN} component={MyBattleReferEarn} />
  </Stack.Navigator>
);

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      
      <Stack.Screen name={WELCOME_SCREEN} component={Welcome} />
      <Stack.Screen name={MYBATTLELOGIN} component={MyBattleLogin} />
      <Stack.Screen name={MYBATTLEOTP} component={MyBattleOtp} />
      <Stack.Screen name={MYBATTLETERM} component={MyBattleTerm} />
      <Stack.Screen name={MYBATTLEPOLICY} component={PrivacyPolicy} />

      {/* <Stack.Screen name={'Home'} component={BottomMainTab} /> */}
    </Stack.Navigator>
  );
};

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={HOME_SCREEN_MAIN}
      component={Home}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const ContestStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={CONTEST_SCREEN_MAIN}
      component={MyMatches}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const WalletStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={REFER_EARN}
      component={ReferAndEarn}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={MYBATTLEREFEREARN}
      component={MyBattleReferEarn}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const BottomMainTab = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      backBehavior="initialRoute"
      initialRouteName={HOME_SCREEN_MAIN}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: Platform.OS === 'ios' ? 80 : 60,
          borderTopWidth: 0,
          paddingVertical: 10,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        tabBarAllowFontScaling: false,
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name={BOTTOM_TAB_HOMESCREEN}
        component={HomeDrawer}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <FastImage
                  resizeMode="contain"
                  style={{width: 33, height: 12, marginTop: -12}}
                  source={bottomtapHed}
                  tintColor={NLCColor.Red}
                />
              ) : (
                <View style={{width: 33, height: 12, marginTop: -12}}></View>
              )}
              <FastImage
                source={focused ? homeLinerIcon : home_icon}
                tintColor={focused ? NLCColor.Red : NLCColor.tabColor}
                style={{
                  width: 25,
                  height: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{marginTop: 4}}
                color={focused ? RED : TABCOLOR}
                weight={POPPINS_SEMI_BOLD}
                type={TEN}>
                Home
              </AppText>
            </>
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_CONTEST_SCREEN}
        component={ContestDrawer}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <FastImage
                  resizeMode="contain"
                  style={{width: 33, height: 12, marginTop: -12}}
                  source={bottomtapHed}
                  tintColor={NLCColor.Red}
                />
              ) : (
                <View style={{width: 33, height: 12, marginTop: -12}}></View>
              )}
              <FastImage
                source={focused ? contestLinerIcon : contest_icon}
                tintColor={focused ? NLCColor.Red : NLCColor.tabColor}
                style={{
                  width: 25,
                  height: 25,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{marginTop: 4}}
                color={focused ? RED : TABCOLOR}
                weight={POPPINS_SEMI_BOLD}
                type={TEN}>
                Contest
              </AppText>
            </>
          ),
        }}
      />

      <BottomTab.Screen
        name={REFER_EARN}
        component={WalletDrawer}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <FastImage
                  resizeMode="contain"
                  style={{width: 33, height: 12, marginTop: -15, marginLeft: 6}}
                  source={bottomtapHed}
                  tintColor={NLCColor.Red}
                />
              ) : (
                <View
                  style={{
                    width: 33,
                    height: 12,
                    marginTop: -15,
                    marginLeft: 6,
                  }}></View>
              )}
              <FastImage
                tintColor={focused ? NLCColor.Red : NLCColor.tabColor}
                source={focused ? balance : balance}
                style={{
                  width: 23,
                  height: 23,
                  marginLeft: 10,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{marginTop: 3, marginLeft: 10}}
                color={focused ? RED : TABCOLOR}
                weight={POPPINS_SEMI_BOLD}
                type={TEN}>
                Wallet
              </AppText>
            </>
          ),
        }}
      />

      <BottomTab.Screen
        name={PROFILE}
        component={ProfileDrawer}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <FastImage
                  resizeMode="contain"
                  style={{width: 33, height: 12, marginTop: -14}}
                  source={bottomtapHed}
                  tintColor={NLCColor.Red}
                />
              ) : (
                <View style={{width: 33, height: 12, marginTop: -14}}></View>
              )}
              <FastImage
                tintColor={focused ? NLCColor.Red : NLCColor.tabColor}
                source={focused ? refer_earn : refer_earn}
                style={{
                  width: 23,
                  height: 23,
                }}
                resizeMode="contain"
              />
              <AppText
                style={{marginTop: 4}}
                color={focused ? RED : TABCOLOR}
                weight={POPPINS_SEMI_BOLD}
                type={TEN}>
                Refer & Earn
              </AppText>
            </>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
const HomeDrawer = ({navigation}) => {
  const isFocused = useIsFocused();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{width: '75%'}}
      drawerContent={props => (
        <CustomDrawer
          {...props}
          navigation={navigation}
          isFocused={isFocused}
        />
      )}
      screenOptions={{
        drawerActiveBackgroundColor: '#EBF4FF',
        drawerActiveTintColor: 'black',
        drawerInactiveBackgroundColor: 'blue',
        headerShown: false,
      }}
      drawerPosition={'left'}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
        drawerStyle={{borderWidth: 1}}
      />
    </Drawer.Navigator>
  );
};

const ContestDrawer = ({navigation}) => {
  const isFocused = useIsFocused();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{width: '75%'}}
      drawerContent={props => (
        <CustomDrawer
          {...props}
          navigation={navigation}
          isFocused={isFocused}
        />
      )}
      screenOptions={{
        drawerActiveBackgroundColor: '#EBF4FF',
        drawerActiveTintColor: 'black',
        drawerInactiveBackgroundColor: 'blue',
        headerShown: false,
      }}
      drawerPosition={'left'}>
      <Drawer.Screen
        name="Contest"
        component={ContestStack}
        options={{
          headerShown: false,
        }}
        drawerStyle={{borderWidth: 1}}
      />
    </Drawer.Navigator>
  );
};

const WalletDrawer = ({navigation}) => {
  const isFocused = useIsFocused();
  return (
    <Drawer.Navigator
      drawerStyle={{width: '75%'}}
      drawerContent={props => (
        <CustomDrawer
          {...props}
          navigation={navigation}
          isFocused={isFocused}
        />
      )}
      screenOptions={{
        drawerActiveBackgroundColor: '#EBF4FF',
        drawerActiveTintColor: 'black',
        drawerInactiveBackgroundColor: 'blue',
        headerShown: false,
      }}
      drawerPosition={'left'}>
      <Drawer.Screen
        name="Wallet"
        component={WalletStack}
        options={{
          headerShown: false,
        }}
        drawerStyle={{borderWidth: 1}}
      />
    </Drawer.Navigator>
  );
};

const ProfileDrawer = ({navigation}) => {
  const isFocused = useIsFocused();
  return (
    <Drawer.Navigator
      drawerStyle={{width: '75%'}}
      drawerContent={props => (
        <CustomDrawer
          {...props}
          navigation={navigation}
          isFocused={isFocused}
        />
      )}
      screenOptions={{
        drawerActiveBackgroundColor: '#EBF4FF',
        drawerActiveTintColor: 'black',
        drawerInactiveBackgroundColor: 'blue',
        headerShown: false,
      }}
      drawerPosition={'left'}>
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
        drawerStyle={{borderWidth: 1}}
      />
    </Drawer.Navigator>
  );
};
