import {useRoute} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Dimensions,
  RefreshControl,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {
  AppText,
  BLACKOPACITY,
  BROWNYELLOW,
  FIFTEEN,
  FORTEEN,
  GREEN,
  LATO_SEMI_BOLD,
  LIGHTWHITE,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  RED,
  TEN,
  WHITE,
  BLACK,
} from '../../common/AppText';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import LeaderBoardList from '../../components/leaderBoardList/LeaderBoardList';
import Winnings from '../../components/winnings/Winnings';
import {GLORY, SINGLE, WINNER, m} from '../../helper/image';
import NavigationService from '../../navigation/NavigationService';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {SELECT_PLAYER} from '../../navigation/routes';
import {
  getAllPlayerList,
  getTab,
  setAllPlayers,
  setIsContestEntry,
  setSelectedMatch,
} from '../../slices/matchSlice';
import CommonHeader from '../../components/matchCard/commonHeader/CommonHeader';
import {BaseUrl, numberWithCommas, toastAlert} from '../../helper/utility';
import Confirmation from '../../common/Confirmation';
import CommonImageBackground from '../../common/commonImageBackground';
import {NLCColor, NewColor, colors} from '../../theme/color';
import {LIGHTBLUE} from '../../common/AppText';
import RBSheet from 'react-native-raw-bottom-sheet';
import SelectTeam from '../../components/selectTeam/SelectTeam';
import {Screen, universalPaddingHorizontal} from '../../theme/dimens';
import {ScoreCard} from '../ScoreCard';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

export const RenderTabBar = props => {
  return (
    <TabBar
      {...props}
      contentContainerStyle={{
        backgroundColor: colors.white,
        width: Screen.Width,
        height: 50,
      }}
      renderLabel={({route, focused}) => (
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            height: 38,
            justifyContent: 'space-evenly',
            padding: 5,
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
              style={{height: 2, width: 102}}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={[NLCColor.LightRed, NLCColor.shadeRed]}></LinearGradient>
          ) : (
            <View style={{width: 102, height: 2}}></View>
          )}
        </View>
      )}
      indicatorStyle={{backgroundColor: 'transparent'}}
      scrollEnabled={!props.scrollEnabled ? props.scrollEnabled : true}
      tabStyle={[{width: 'auto'}, props.tabStyle]}
      pressColor={'transparent'}
      style={[styles.tabbar, props.style]}
    />
  );
};

const FirstRoute = ({route}) => (
  <Winnings
    id={route?.data?.params?.details?.contest_category_id}
    privateis={route?.data?.params?.privateis}
    notLive={route?.data?.params?.notLive}
  />
);

const SecondRoute = ({route}) => (
  <LeaderBoardList
    matchId={route?.data?.params?.matchDetails?.MatchId}
    id={route?.data?.params?.details?.contest_category_id}
    setForStatus={route?.fnStatus}
    forStatus={route?.status}
    selfCreateContest={route?.data?.params?.selfCreateContest}
  />
);

const ThreeRoute = ({route}) => (
  <FlatList
    data={route?.scoreBoard && route?.scoreBoard[0]?.innings}
    renderItem={route?.renderItemScore}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{marginTop: 10}}
    refreshControl={
      <RefreshControl refreshing={false} onRefresh={() => route?.refresh()} />
    }
  />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  three: ThreeRoute,
});

const renderMyScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const LeaderBoard = () => {
  const route = useRoute();
  const wsRef = useRef(null);
  const wsRefTwo = useRef(null);
  const dispatch = useDispatch();
  const details = route?.params?.details ?? '';
  const detailsTwo = details?.details ?? '';
  const {Winning_percent, data} = route?.params?.item ?? '';
  const totalTeamCount = route?.params?.totalTeamCount;
  const matchDetails = useSelector(state => state?.match?.contestData);
  const [activeTab, setActiveTab] = useState(1);
  const [isAdd, setIsAdd] = useState(false);
  const [time, setTime] = useState('');
  const [leaderBoards, setLeaderBoards] = useState([]);
  const [forStatus, setForStatus] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [ForConnectedTo, setForConnectedTo] = useState(false);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [TeamAScore, setTeamAScore] = useState([]);
  const [TeamBScore, setTeamBScore] = useState([]);
  const [modalRemove, setModalRemove] = useState(false);
  const [updown, setUpDown] = useState('');
  const [random, setRandom] = useState(10);
  const selectTeam = useRef();
  const {_id, SeriesId} = matchDetails ?? '';
  const userData = useSelector(state => {
    return state.profile.userData;
  });

  const TABS = [
    {id: 1, title: 'Winnings'},
    {id: 2, title: 'Leaderboard'},
  ];
  const TABSTWO = [
    {id: 1, title: 'Winnings'},
    {id: 2, title: 'Leaderboard'},
    {id: 3, title: 'Scorecard'},
  ];

  let url = `${BaseUrl}leader-board?limit=10&skip=0&matchid=${route?.params?.matchDetails?.MatchId}&contest_category_id=${route?.params?.details?.contest_category_id}&user_id=${userData?._id}`;
  let urlTwo = `${BaseUrl}leader-board?limit=10&skip=0&matchid=${route?.params?.matchDetails?.MatchId}&contest_category_id=${route?.params?.details?.contest_category_id}&user_id=${userData?._id}`;
  const onJoinContest = async () => {
    if (totalTeamCount === 0) {
      dispatch(setSelectedMatch({...details}));
      dispatch(setIsContestEntry(true));
      dispatch(getTab(''));
      dispatch(setAllPlayers([]));
      let data = {cid: SeriesId};
      dispatch(getAllPlayerList(_id, data));
      NavigationService.navigate(SELECT_PLAYER, matchDetails);
    } else if (totalTeamCount === 1) {
      dispatch(setSelectedMatch({...details}));
      setIsAdd(true);
    } else if (totalTeamCount > 1) {
      selectTeam?.current?.open();
    }
  };
  useEffect(() => {
    if (
      route?.params?.matchDetails?.MatchId &&
      route?.params?.details?.contest_category_id
    ) {
      wsRefTwo.current = new WebSocket(urlTwo);
      wsRefTwo.current.onopen = () => {
        console.log('connected');
        // wsRef.current.send('1000000');
      };
      wsRefTwo.current.onclose = e => {
        console.log('Connection Failed Plz Check Your Network', e);
        // setLoading(false);
        wsRefTwo.current = new WebSocket(urlTwo);
      };
      wsRefTwo.current.onerror = e => {
        console.log('Something Went Wrong', e);
        // setLoading(false);
        wsRefTwo.current = new WebSocket(urlTwo);
      };
      return () => {
        wsRefTwo.current.close();
      };
    }
  }, [route?.params?.matchDetails?.MatchId]);
  const getData = React.useCallback(() => {
    if (isConnected && wsRefTwo.current) {
      wsRefTwo.current.close();
      setIsConnected(false);
    }
    try {
      wsRefTwo.current = new WebSocket(urlTwo);
      wsRefTwo.current.onopen = () => {
        setIsConnected(true); // Set the connection status to true
      };
      if (!wsRefTwo.current) return;
      wsRefTwo.current.onmessage = e => {
        const parseData = JSON.parse(e?.data);
        setScoreBoard(parseData?.score);
        setTeamAScore(parseData && parseData?.score[0]?.teama);
        setTeamBScore(parseData && parseData?.score[0]?.teamb);

        // setLoading(false);
      };
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [isConnected]);
  const reconnectWebSocket = () => {
    if (wsRefTwo.current && wsRefTwo.current.readyState !== WebSocket.OPEN) {
      wsRefTwo.current = new WebSocket(url);
      wsRefTwo.current.onopen = () => {
        console.log('reconnected');
      };
      wsRefTwo.current.onclose = e => {
        reconnectWebSocket(); // Call the function recursively to reconnect
      };
      wsRefTwo.current.onerror = e => {
        reconnectWebSocket(); // Call the function recursively to reconnect
      };
      wsRefTwo.current.onmessage = e => {
        const parseData = JSON.parse(e?.data);
        setScoreBoard(parseData?.score);

        setTeamAScore(parseData && parseData?.score[0]?.teama);
        setTeamBScore(parseData && parseData?.score[0]?.teamb);

        // setLeaderBoards(parseData?.data);
      };
    }
  };
  useEffect(() => {
    if (!ForConnectedTo) {
      getData();
      setForConnectedTo(true);
    } else {
      const interval = setInterval(() => {
        getData();
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const onRefresh = type => {
    reconnectWebSocket();
    setRandom(Math.random());
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Winnings', data: route},
    {
      key: 'second',
      title: 'Leaderboard',
      data: route,
      fnStatus: setForStatus,
      status: forStatus,
    },
    {
      key: 'three',
      title: 'Scorecard',
      scoreBoard: scoreBoard,
      renderItemScore: renderItemScore,
      refresh: onRefresh,
    },
  ]);

  const currentDate = new Date();
  const inputDate = new Date(matchDetails?.StartDateTime);

  const isPastTime = inputDate < currentDate;
  const renderTop = () => {
    return (
      <View style={styles.container}>
        <CommonHeader
          allContest={true}
          style={{
            marginBottom: 0,
          }}
          walletIco={true}
          details={route?.params?.matchDetails}
          showPopup={() => sheet.current?.open()}
          activeTab={2}
          setActiveTab={e => setActiveTab(e)}
          completeMatch={
            route?.params?.matchDetails?.Status == 'Completed' ? true : false
          }
          setModalRemove={setModalRemove}
        />
        <>
          {isPastTime ? (
            <View
              style={{
                paddingHorizontal: universalPaddingHorizontal,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // marginTop: -10,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <AppText weight={POPPINS_MEDIUM}>
                  {matchDetails?.TeamsShortNames[0]}
                </AppText>
                <AppText weight={POPPINS_MEDIUM}>
                  {TeamAScore && TeamAScore[0]?.scores_full
                    ? TeamAScore[0]?.scores_full
                    : 'Yet to bat'}
                </AppText>
              </View>
              {/* <View style={{flex:1, alignItems:'center', }} >
                <View
                  style={{
                    paddingHorizontal: 10,
                    // paddingVertical:5,
                    height: 31,
                    alignItems: 'center',
                    backgroundColor: colors.green,
                    justifyContent: 'center',
                    width: 100,
                    borderRadius: 5,
                    marginRight: filteredArray[0]?.match_details?.teamb
                      ?.scores_full
                      ? 0
                      : 5,
                  }}>
                  <AppText
                    style={{textTransform: 'capitalize', marginTop: 2}}
                    type={FORTEEN}
                    weight={POPPINS_MEDIUM}
                    color={WHITE}>
                    {matchDetails?.Status}
                  </AppText>
                </View>
              </View> */}
              <View
                style={{
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <AppText weight={POPPINS_MEDIUM}>
                  {matchDetails?.TeamsShortNames[1]}
                </AppText>
                <AppText style={{textAlign: 'right'}} weight={POPPINS_MEDIUM}>
                  {TeamBScore && TeamBScore[0]?.scores_full
                    ? TeamBScore[0]?.scores_full
                    : 'Yet to bat'}
                </AppText>
              </View>
            </View>
          ) : (
            <>
              <View style={[styles.contestDetails, {marginTop: 0}]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <AppText type={TEN} color={BLACKOPACITY}>
                    PRIZE POOL
                  </AppText>
                  {route?.params?.details?.JoinWithMULT && (
                    <AppText type={TEN} color={BLACKOPACITY}>
                      Multiple Entries
                    </AppText>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 6,
                  }}>
                  <AppText type={FIFTEEN} weight={LATO_SEMI_BOLD}>
                    ₹{route?.params?.details?.winning_amount}
                  </AppText>
                  {/* <AppText
                    color={BLACKOPACITY}
                    type={TEN}
                    weight={LATO_SEMI_BOLD}
                    style={{
                      marginLeft: 10,
                      flex: 1,
                    }}>
                    {details?.Winning_percent || detailsTwo?.Winning_percent ? Number(details?.Winning_percent || detailsTwo?.Winning_percent)?.toFixed(2) :
              0}% Winners l 1st ₹{details && details?.Rankdata[0]?.Price || detailsTwo?.data?.Rankdata[0]?.Price  ?
                parseInt(details?.Rankdata[0]?.Price || detailsTwo?.data?.Rankdata[0]?.Price)?.toFixed(2) : 0}
                  </AppText> */}
                </View>
                <View style={styles.progressBar}>
                  <LinearGradient
                    style={{
                      width: `${route?.params?.progressBarWidth}%`,
                      height: '100%',
                      borderRadius: 4,
                    }}
                    start={{x: 0, y: 0}}
                    colors={[
                      NLCColor.LightRed,
                      NLCColor.shadeRed,
                    ]}></LinearGradient>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 6,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <AppText color={BLACKOPACITY} type={TEN}>
                    {route?.params?.details?.Contestsize} spots
                  </AppText>
                  <AppText type={TEN} color={GREEN}>
                    {`${
                      route?.params?.details?.Contestsize -
                      (route?.params?.details?.joined || 0)
                    } spots left`}
                  </AppText>
                </View>
              </View>
              <View style={styles.bottomContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.commonViewStyle}>
                    <FastImage
                      source={GLORY}
                      tintColor={NLCColor.Red}
                      style={styles.gloryIcon}
                    />
                    <AppText
                      color={BLACKOPACITY}
                      type={TEN}
                      weight={LATO_SEMI_BOLD}
                      style={styles.commonTextStyle}>
                      {details?.EnteryType !== 'Paid'
                        ? 'Glory awaits!'
                        : `₹${Math.round(details?.Rankdata[0]?.Price).toFixed(
                            2,
                          )}`}
                    </AppText>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <FastImage
                      source={WINNER}
                      tintColor={NLCColor.Red}
                      style={styles.gloryIcon}
                    />
                    <AppText
                      color={BLACKOPACITY}
                      type={TEN}
                      style={styles.commonTextStyle}>
                      {route?.params?.item?.data?.WinningAmount
                        ? route?.params?.item?.data?.WinningAmount
                        : 0}
                      %
                    </AppText>
                  </View>
                  <View style={styles.commonViewStyle}>
                    <FastImage
                      tintColor={NLCColor.Red}
                      source={details?.JoinWithMULT ? m : SINGLE}
                      resizeMode="contain"
                      style={styles.gloryIcon}
                    />
                    <AppText
                      color={BLACKOPACITY}
                      type={TEN}
                      style={styles.commonTextStyle}>
                      {details?.JoinWithMULT
                        ? `Upto ${details?.teams}`
                        : 'Single'}
                    </AppText>
                  </View>
                </View>
              </View>
            </>
          )}
        </>
      </View>
    );
  };
  const renderTabs = () => {
    return (
      <View style={styles.container2}>
        {TABS?.map((item, index) => {
          return index + 1 == activeTab ? (
            <View
              style={{
                flexDirection: 'column',
                width: '33%',
                height: 38,
                justifyContent: 'space-evenly',
                padding: 5,
                alignItems: 'center',
              }}>
              <AppText weight={POPPINS_MEDIUM} type={FORTEEN} color={RED}>
                {item?.title}
              </AppText>
              <LinearGradient
                style={{height: 2, width: 102}}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  NLCColor.LightRed,
                  NLCColor.shadeRed,
                ]}></LinearGradient>
            </View>
          ) : (
            <TouchableOpacityView
              style={styles.tabs}
              onPress={() => setActiveTab(index + 1)}>
              <AppText
                weight={POPPINS_MEDIUM}
                type={FORTEEN}
                color={LIGHTWHITE}>
                {item?.title}
              </AppText>
            </TouchableOpacityView>
          );
        })}
      </View>
    );
  };
  const renderTabsTwo = () => {
    return (
      <View style={styles.container2}>
        {TABSTWO?.map((item, index) => {
          return index + 1 == activeTab ? (
            <View
              style={{
                flexDirection: 'column',
                width: '33%',
                height: 38,
                justifyContent: 'space-evenly',
                padding: 5,
                alignItems: 'center',
              }}>
              <AppText weight={POPPINS_MEDIUM} type={FORTEEN} color={RED}>
                {item?.title}
              </AppText>
              <LinearGradient
                style={{height: 2, width: 102}}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={[
                  NLCColor.LightRed,
                  NLCColor.shadeRed,
                ]}></LinearGradient>
            </View>
          ) : (
            <TouchableOpacityView
              style={styles.tabs}
              onPress={() => setActiveTab(index + 1)}>
              <AppText
                weight={POPPINS_MEDIUM}
                type={FORTEEN}
                color={LIGHTWHITE}>
                {item?.title}
              </AppText>
            </TouchableOpacityView>
          );
        })}
      </View>
    );
  };
  const renderMain = () => {
    return (
      <>
        {activeTab == 1 && (
          <Winnings
            id={route?.params?.details?.contest_category_id}
            privateis={route?.params?.privateis}
            notLive={route?.params?.notLive}
          />
        )}
        {activeTab == 2 && (
          <LeaderBoardList
            matchId={route?.params?.matchDetails?.MatchId}
            id={route?.params?.details?.contest_category_id}
            setForStatus={setForStatus}
            forStatus={forStatus}
            selfCreateContest={route?.params?.selfCreateContest}
          />
        )}
        {activeTab == 3 && (
          <FlatList
            data={scoreBoard && scoreBoard[0]?.innings}
            renderItem={renderItemScore}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginTop: 10}}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => onRefresh()}
              />
            }
          />
        )}
      </>
    );
  };
  const length = scoreBoard && scoreBoard[0]?.innings?.length;
  const renderItemScore = ({item, index}) => {
    return (
      <ScoreCard
        item={item}
        length={length}
        index={index}
        updown={updown}
        setUpDown={setUpDown}
      />
    );
  };
  return (
    <AppSafeAreaView light={true} hidden={false}>
      <StatusBar
        backgroundColor={'#282828'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <View style={{flex: 1}}>
          {renderTop()}
          <TabView
            navigationState={{index, routes}}
            renderScene={
              scoreBoard && scoreBoard[0]?.status_note == ''
                ? renderMyScene
                : renderScene
            }
            onIndexChange={setIndex}
            initialLayout={{width: Screen.Width}}
            renderTabBar={props => <RenderTabBar {...props} />}
          />
        </View>
      </CommonImageBackground>
      <RBSheet
        ref={selectTeam}
        closeOnDragDown={false}
        openDuration={100}
        height={Dimensions.get('window').height}
        customStyles={{
          container: {
            backgroundColor: NewColor.linerWhite,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
            display: 'none',
          },
        }}>
        <SelectTeam
          contestDetails={details}
          matchDetails={matchDetails}
          onClose={() => selectTeam?.current?.close()}
          selectTeam={selectTeam}
        />
      </RBSheet>
    </AppSafeAreaView>
  );
};

export default LeaderBoard;
