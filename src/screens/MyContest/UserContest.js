import React, {useState, useEffect} from 'react';
import {Dimensions, StatusBar, View, FlatList} from 'react-native';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';

import CommonImageBackground from '../../common/commonImageBackground';
import AuthHeader from '../../common/AuthHeader';
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  FORTEEN,
  POPPINS_MEDIUM,
  POPPINS_BOLD,
  WHITE,
} from '../../common/AppText';
import ContestStyles from './ContestStyles';
import {Screen, flexOne} from '../../theme/dimens';
import {NLCColor, colors} from '../../theme/color';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import ContestCard from '../../components/matchCard/contestCard/ContestCard';
import {transformData} from '../../helper/utility';
import Contest from '../../components/matchCard/contest.js/Contest';
import FilterData from './FilterData';
import PrimaryButton from '../../common/primaryButton';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import MyContestList from '../../components/matchCard/myContest/MyContestList';
import MyContestListETC from '../../components/matchCard/myContest/MyContestListcETC';

const FirstRoute = ({
  SortbyFilterData,
  myTeam,
  transformedData,
  isHome,
  _id,
  match_id,
  rout,
}) =>
  SortbyFilterData?.length > 0 ? (
    <FlatList
      data={SortbyFilterData}
      renderItem={({item}) => (
        <ContestCard details={item} totalTeamCount={myTeam?.length} />
      )}
      ListHeaderComponent={<FilterData />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{marginTop: 10}}
      keyExtractor={(item, index) => index.toString()} // Return the index as a string
      ListFooterComponent={() => {
        return <View style={{height: 80}} />;
      }}
    />
  ) : (
    rout?.params?.isFromMyMatch && (
      <FlatList
        data={transformedData && transformedData}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<FilterData />}
        renderItem={({item}) => (
          <Contest
            details={item}
            totalTeamCount={myTeam?.length}
            matchId={isHome ? match_id : _id}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={false}
        //     onRefresh={() => onRefresh('contest')}
        //   />
        // }
        style={{
          width: '100%',
          alignSelf: 'center',
        }}
      />
    )
  );

const SecondRoute = ({
  myContest,
  rout,
  MyCreateContestData,
  _id,
  contestData,
}) => (
  <View
    style={{
      flex: 1,
    }}>
    <FlatList
      data={myContest}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <MyContestList item={item} matchDetails={rout?.params} />
      )}
      ListHeaderComponent={
        MyCreateContestData ? (
          MyCreateContestData?.map(item => (
            <MyContestListETC
              item={item}
              teamName={contestData}
              _id={_id}
              myMatches={rout?.params?.myMatches}
              matchDetails={rout?.params}
            />
          ))
        ) : (
          <></>
        )
      }
      ListEmptyComponent={
        <EmptyComponent
          MyCreateContestData={MyCreateContestData}
          myContest={myContest}
        />
      }
      keyExtractor={(item, index) => index.toString()}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={false}
      //     onRefresh={() => onRefresh('my contest')}
      //   />
      // }
      style={{
        width: '100%',
        alignSelf: 'center',
        flex: flexOne,
      }}
      contentContainerStyle={{
        flexGrow: flexOne,
      }}
    />
  </View>
);

const ThreeRoute = () => <View style={{flex: 1, backgroundColor: 'pink'}} />;

const RenderTabBar = props => {
  return (
    <TabBar
      {...props}
      contentContainerStyle={{
        backgroundColor: colors.white,
        // alignItems:"center",
        // justifyContent:'center',
        height: 50,
      }}
      renderLabel={({route, focused}) => (
        <View
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            width: Dimensions.get('window').width / 2.5,
          }}>
          {focused ? (
            <LinearGradient
              colors={[NLCColor.LightRed, NLCColor.shadeRed]}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                flexDirection: 'column',
                width: '80%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopRightRadius:
                  route.key == 'first' ? 20 : route.key == 'second' ? 20 : 0,
                borderBottomRightRadius:
                  route.key == 'first' ? 20 : route.key == 'second' ? 20 : 0,
                borderTopLeftRadius:
                  route.key == 'second' ? 20 : route.key == 'three' ? 20 : 0,
                borderBottomLeftRadius:
                  route.key == 'second' ? 20 : route.key == 'three' ? 20 : 0,
                borderColor: colors.black,
              }}>
              <AppText type={FORTEEN} weight={POPPINS_BOLD} color={WHITE}>
                {route?.title}
              </AppText>
            </LinearGradient>
          ) : (
            <TouchableOpacityView style={[ContestStyles.tabs]}>
              <AppText color={BLACKOPACITY} type={FORTEEN}>
                {route?.title}
              </AppText>
            </TouchableOpacityView>
          )}
        </View>
      )}
      indicatorStyle={{backgroundColor: 'transparent'}}
      scrollEnabled={!props.scrollEnabled ? props.scrollEnabled : true}
      // tabStyle={{width: '100%'}}
      pressColor={'transparent'}
      // style={[ContestStyles.tabbar, props.style]}
    />
  );
};

const EmptyComponent = ({MyCreateContestData, myContest}) => {
  return MyCreateContestData?.length || myContest?.length ? (
    <></>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <AppText
        weight={POPPINS_MEDIUM}
        style={{
          textAlign: 'center',
        }}>
        You haven't joined a contest yet!{'\n'}Find a contest to join and start
        winning
      </AppText>
      <PrimaryButton
        // onPress={() => setActiveTab(1)}
        smallBtn={ContestStyles.joinButtonMyContest}
        title="JOIN A CONTEST"
      />
    </View>
  );
};

const UserContest = () => {
  const rout = useRoute();
  const dispatch = useDispatch();
  const contestData = useSelector(state => state?.match?.contestData);
  const myContest = useSelector(state => state?.match?.myContest);
  const contestList = useSelector(state => state?.match?.contestList);
  const MyCreateContestData = useSelector(
    state => state?.match?.MyCreateContestData,
  );
  const isLoading = useSelector(state => state.auth.isLoading);
  const myTeam = useSelector(state => state?.match?.myTeams);
  const SortbyFilterData = useSelector(state => state?.match?.SortbyFilterData);
  const [modalRemove, setModalRemove] = useState(false);
  const [saveTitle, setTitle] = useState('');
  const [totalCount, setTotalCount] = useState([
    myContest?.length + MyCreateContestData?.length,
    myTeam?.length,
  ]);
  const transformedData = transformData(contestList?.data);
  const currentDate = new Date();
  const inputDate = new Date(contestData?.StartDateTime);
  const isPastTime = inputDate < currentDate;
  const [index, setIndex] = React.useState(
    rout?.params?.isFromMyMatch == true || isPastTime == 'false' ? 1 : 0,
  );
  const {_id, isFromMyMatch, match_id, isHome, SeriesId} = contestData ?? '';
  const [routes] = React.useState([
    {key: 'first', title: 'Contest'},
    {key: 'second', title: `My Contest (${totalCount[0]})`},
    {key: 'three', title: `My Team (${totalCount[1]})`},
  ]);
  const routeIsFromMyMatch = rout?.params?.isFromMyMatch;
  useEffect(() => {
    setTitle(
      index == 0
        ? 'Select Contest'
        : index == 1
        ? 'My Contest'
        : index == 2
        ? 'My Team'
        : 'Select Contest',
    );
  }, [index]);

  //   const renderScene = () => SceneMap({
  //     first: FirstRoute,
  //     second: SecondRoute,
  //     three: ThreeRoute,
  //   });

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <FirstRoute
            SortbyFilterData={SortbyFilterData}
            myTeam={myTeam}
            transformedData={transformedData}
            isHome={isHome}
            match_id={match_id}
            _id={_id}
            rout={rout}
          />
        );
      case 'second':
        return (
          <SecondRoute
            myContest={myContest}
            rout={rout}
            MyCreateContestData={MyCreateContestData}
            _id={_id}
            contestData={contestData}
          />
        );
      case 'three':
        return <ThreeRoute />;
      default:
        return null;
    }
  };

  return (
    <AppSafeAreaView light={true} hidden={false}>
      <StatusBar
        backgroundColor={'#282828'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <AuthHeader
          details={rout?.params}
          setModalRemove={setModalRemove}
          title={saveTitle}
          completeMatch={rout?.params?.isFromMyMatch}
        />
        <View style={ContestStyles.mainContainer}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: Screen.Width}}
            renderTabBar={props => <RenderTabBar {...props} />}
          />
        </View>
        {index !== 1 &&
          !rout?.params?.isFromMyMatch &&
          isPastTime != 'false' && (
            <View
              style={[
                ContestStyles.buttonContainer,
                {marginVertical: Platform.OS == 'ios' ? 20 : 10},
              ]}>
              <PrimaryButton
                buttonStyle={[
                  ContestStyles.buttonStyle,
                  {marginTop: Platform.OS == 'ios' ? -5 : 0},
                ]}
                onPress={() => {
                  dispatch(getTab(''));
                  dispatch(setAllPlayers([]));
                  let data = {cid: SeriesId};
                  dispatch(getAllPlayerList(_id, data));
                  NavigationService.navigate(
                    SELECT_PLAYER,
                    contestData,
                    isFromMyMatch,
                  );
                  dispatch(setIsContestEntry(false));
                }}
                title="CREATE TEAM"
              />
            </View>
          )}
        <SpinnerSecond loading={isLoading} />
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

export default UserContest;
