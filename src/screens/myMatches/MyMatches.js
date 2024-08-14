import React, {useEffect, useState} from 'react';
import {FlatList, View, RefreshControl, Alert} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {Screen} from '../../theme/dimens';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import MatchCard from '../../components/matchCard/MatchCard';
import {personIcon, combine, notification} from '../../helper/image';
import {getMyMatches} from '../../slices/matchSlice';
import styles from './styles';
import {
  AppText,
  BROWNYELLOW,
  EIGHTEEN,
  FIRST,
  FORTEEN,
  LIGHTPINK,
  LIGHTWHITE,
  POPPINS_MEDIUM,
  RED,
  THIRTEEN,
  TWELVE,
  WHITE,
  BLACK,
} from '../../common/AppText';
import {flexOne, universalPaddingHorizontal} from '../../theme/dimens';
import {StatusBar} from 'native-base';
import CommonImageBackground from '../../common/commonImageBackground';
import {NLCColor, colors} from '../../theme/color';
import {
  BOTTOM_TAB_HOMESCREEN,
  BOTTOM_TAB_PROFILE_SCREEN,
  Notification__SCREEN,
} from '../../navigation/routes';
import PrimaryButton from '../../common/primaryButton';
import {HomeTopHeader} from '../../common/HomeTopHeader';
import MatchCardContest from '../../components/matchCard/MatchCardContest';
import NavigationService from '../../navigation/NavigationService';

export const RenderTabBar = props => {
  return (
    <TabBar
      {...props}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      renderLabel={({route, focused}) => (
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            height: 38,
            justifyContent: 'space-between',
            padding: 3,
            alignItems: 'center',
          }}>
          <AppText
            type={FORTEEN}
            color={focused ? RED : BLACK}
            weight={POPPINS_MEDIUM}>
            {route.title}
          </AppText>
          {focused ? (
            <LinearGradient
              style={{height: 2, width: 95}}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={[NLCColor.LightRed, NLCColor.shadeRed]}></LinearGradient>
          ) : (
            <View style={{width: 100, height: 2}}></View>
          )}
        </View>
      )}
      indicatorStyle={{backgroundColor: 'transparent'}}
      scrollEnabled={!props.scrollEnabled ? props.scrollEnabled : true}
      tabStyle={[{width: '100%'}, props.tabStyle]}
      pressColor={'transparent'}
      style={[styles.tabbar, props.style]}
    />
  );
};

export const ListEmptyComponent = ({title, activeTab}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {activeTab == 'Live' ? (
        <AppText
          style={{textAlign: 'center'}}
          type={FORTEEN}
          weight={POPPINS_MEDIUM}>
          {title
            ? title
            : `You haven't joined any that are live.\n Join contests for any of the upcoming matches`}
        </AppText>
      ) : (
        <></>
      )}
      {activeTab == 'Upcoming' ? (
        <AppText
          style={{textAlign: 'center'}}
          type={FORTEEN}
          weight={POPPINS_MEDIUM}>
          {title
            ? title
            : `You haven't joined any upcoming contests \n Join contests for any of the upcoming matches`}
        </AppText>
      ) : (
        <></>
      )}

      <PrimaryButton
        onPress={() => NavigationService.navigate(BOTTOM_TAB_HOMESCREEN)}
        smallBtn={styles.joinButtonMyContest}
        title="VIEW UPCOMING MATCHES"
        type={TWELVE}
      />
    </View>
  );
};

const MyMatches = () => {
  const dispatch = useDispatch();
  // const tabData = ['Upcoming', 'Live', 'Completed'];
  const [activeTab, setActiveTab] = useState('Upcoming');
  const data = useSelector(state => state?.match?.myMatchesData);
  const isLoading = useSelector(state => state?.match?.isLoading);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Upcoming'},
    {key: 'second', title: 'Live'},
    {key: 'third', title: 'Completed'},
  ]);

  useEffect(() => {
    setActiveTab(
      index === 0
        ? (title = 'Upcoming')
        : index === 1
        ? (title = 'Live')
        : index === 2
        ? (title = 'Completed')
        : '',
    );
    dispatch(getMyMatches(title == 'Upcoming' ? 'Scheduled' : title));
  }, [index]);

  const onRefresh = () => {
    if (activeTab == 'Upcoming') {
      dispatch(getMyMatches('Scheduled'));
    } else if (activeTab == 'Live') {
      dispatch(getMyMatches('Live'));
    } else {
      dispatch(getMyMatches('Completed'));
    }
  };
  const renderItem = ({item}) => {
    return (
      <MatchCardContest
        details={item}
        isFromMyMatch={true}
        tab={activeTab}
        myMatches={true}
      />
    );
  };

  // const changeTab = title => {
  //   setActiveTab(title);
  //   dispatch(getMyMatches(title == 'Upcoming' ? 'Scheduled' : title));
  // };
  const reversedData = [...data].reverse();

  const FirstRoute = () => (
    <FlatList
      data={reversedData}
      style={{flex: flexOne, marginTop: 10}}
      contentContainerStyle={{flexGrow: flexOne}}
      keyExtractor={(item, index) => index?.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        isLoading ? <></> : <ListEmptyComponent activeTab={activeTab} />
      }
      renderItem={renderItem}
    />
  );

  const SecondRoute = () => (
    <FlatList
      data={reversedData}
      style={{flex: flexOne, marginTop: 10}}
      contentContainerStyle={{flexGrow: flexOne}}
      keyExtractor={(item, index) => index?.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        isLoading ? <></> : <ListEmptyComponent activeTab={activeTab} />
      }
      renderItem={renderItem}
    />
  );

  const ThirdRoute = () => (
    <FlatList
      data={reversedData}
      style={{flex: flexOne, marginTop: 10}}
      contentContainerStyle={{flexGrow: flexOne}}
      keyExtractor={(item, index) => index?.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        isLoading ? <></> : <ListEmptyComponent activeTab={activeTab} />
      }
      renderItem={renderItem}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <AppSafeAreaView statusColor={true} hidden={false}>
      <CommonImageBackground common>
        <HomeTopHeader
          walletIcon={true}
          personClick={() =>
            NavigationService.openDrawer()
          }
        />
        {/* <View style={styles.tabContainer}>
          {tabData.map(title => {
            return title == activeTab ? (
              <View style={styles.renderConatainer}>
                <AppText
                  type={THIRTEEN}
                  weight={POPPINS_MEDIUM}
                  color={RED}>
                  {title}
                </AppText>
                <LinearGradient
                  style={{ height: 2, width: 102 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={[
                    NLCColor.LightRed,
                    NLCColor.shadeRed,
                  ]}
                />
              </View>
            ) : (
              <TouchableOpacityView
                style={styles.tabs}
                onPress={() => changeTab(title)}>
                <AppText type={THIRTEEN} weight={POPPINS_MEDIUM} color={LIGHTWHITE}>
                  {title}
                </AppText>
              </TouchableOpacityView>
            );
          })}
        </View>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            flex: flexOne,
          }}>
          <FlatList
            data={reversedData}
            style={{ flex: flexOne, marginTop: 10 }}
            contentContainerStyle={{ flexGrow: flexOne }}
            keyExtractor={(item, index) => index?.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              isLoading ? <></> : <ListEmptyComponent activeTab={activeTab} />
            }
            renderItem={renderItem}
          />
        </View> */}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: Screen.Width}}
          renderTabBar={props => <RenderTabBar {...props} />}
        />
      </CommonImageBackground>
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default MyMatches;
