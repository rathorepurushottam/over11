import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StatusBar, FlatList, RefreshControl, Platform } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { AppSafeAreaView } from '../../common/AppSafeAreaView';
import { SpinnerSecond } from '../../common/SpinnerSecond';
import FilterSheet from '../../components/filterSheet/FilterSheet';
import CommonHeader from '../../components/matchCard/commonHeader/CommonHeader';
import MatchRemainder from '../../components/matchCard/matchRemainder/MatchRemainder';
import MyContestList from '../../components/matchCard/myContest/MyContestList';
import MyTeam from '../../components/matchCard/myTeam/MyTeam';
import NavigationService from '../../navigation/NavigationService';
import { CREATE_CONTEST, SELECT_PLAYER } from '../../navigation/routes';
import {
  MycreateContest,
  getAllPlayerList,
  getContestList,
  getMyJoinedContest,
  getMyTeam,
  getTab,
  setAllPlayers,
  setIsContestEntry,
} from '../../slices/matchSlice';
import styles from './styles';
import Contest from '../../components/matchCard/contest.js/Contest';
import { Screen, flexOne } from '../../theme/dimens';
import CommonImageBackground from '../../common/commonImageBackground';
import PrimaryButton from '../../common/primaryButton';
import SecondaryButton from '../../common/secondaryButton';
import { AppText, BLACK, POPPINS_MEDIUM } from '../../common/AppText';
import { NewColor, colors } from '../../theme/color';
import ContestCard from '../../components/matchCard/contestCard/ContestCard';
import { getKycDetails } from '../../actions/profileAction';
import { MatchLiveModal } from '../../common/MatchLiveModal';
import { transformData } from '../../helper/utility';
import MyContestListETC from '../../components/matchCard/myContest/MyContestListcETC';
import SlideSwiper from '../../common/SlideSwiper';

const MyContest = () => {
  const dispatch = useDispatch();
  const sheet = useRef();
  const route = useRoute();
  const filterSheet = useRef();
  const AleartLive = useRef();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const contestData = useSelector(state => state?.match?.contestData);
  const contestList = useSelector(state => state?.match?.contestList);
  const myTeam = useSelector(state => state?.match?.myTeams);
  const myContest = useSelector(state => state?.match?.myContest);
  const SortbyFilterData = useSelector(state => state?.match?.SortbyFilterData);
  const transformedData = transformData(contestList?.data);
  const MyCreateContestData = useSelector(
    state => state?.match?.MyCreateContestData,
  );
  const currentDate = new Date();
  const inputDate = new Date(contestData?.StartDateTime);
  const isPastTime = inputDate < currentDate;
  const [filterdata, setFilterData] = useState([]);
  const [entry, setEntry] = useState([]);
  const [team, setTeam] = useState([]);
  const [prize, setPrize] = useState([]);
  const [contest, setContest] = useState([]);
  const [modalRemove, setModalRemove] = useState(false)
  const [saveTitle, setTitle] = useState('')
  const [activeTab, setActiveTab] = useState(
    route?.params?.isFromMyMatch == true || isPastTime == 'false'
      ? 2
      : 1,
  );
  useEffect(() => {
    setTitle(activeTab == 1 ? 'Select Contest' : activeTab == 2 ? "My Contest" : activeTab == 3 ? "My Team" : 'Select Contest')
  }, [activeTab])
  const { _id, isFromMyMatch, match_id, isHome, SeriesId } = contestData ?? '';
  useFocusEffect(
    useCallback(() => {
      let outputObject = {};
      dispatch(getContestList(outputObject, _id));
      dispatch(getMyTeam(_id));
      dispatch(getMyJoinedContest(_id));
      dispatch(MycreateContest(_id));
    }, []),
  );
  useEffect(() => {
    dispatch(getKycDetails());
  }, []);
  // useEffect(() => {
  //   if (modalRemove) {
  //     if (route?.params?.isFromMyMatch == true) {
  //       console.log('Close')
  //     } else {
  //       AleartLive.current.open()
  //     }
  //   }
  // }, [modalRemove])
  const renderItem = ({ item }) => {
    return (
      <Contest
        details={item}
        totalTeamCount={myTeam?.length}
        matchId={isHome ? match_id : _id}
      />
    );
  };
  const renderMyTeam = ({ item }) => {
    return <MyTeam item={item} tab={route?.params?.tab} />;
  };
  const renderMyContest = ({ item }) => {
    return <MyContestList item={item} matchDetails={route?.params} />;
  };
  const renderContest = ({ item }) => {
    return <ContestCard details={item} totalTeamCount={myTeam?.length} />;
  };
  const renderMyCreateContest = () => {
    return (
      MyCreateContestData &&
      MyCreateContestData?.map(item => {
        return (
          <MyContestListETC
            item={item}
            teamName={contestData}
            _id={_id}
            myMatches={route?.params?.myMatches}
            matchDetails={route?.params}
          />
        );
      })
    );
  };
  const EmptyComponent = () => {
    return MyCreateContestData?.length || myContest?.length ? <></> : (
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
          }}
        >
          You haven't joined a contest yet!{'\n'}Find a contest to join and
          start winning
        </AppText>
        <PrimaryButton
          onPress={() => setActiveTab(1)}
          buttonStyle={{paddingHorizontal: 40, marginTop: 20}}
          title="JOIN A CONTEST"
        />
      </View>
    );
  };
  const EmptyComponentTwo = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppText
          style={{
            color: 'black',
            fontSize: 14,
            textAlign: 'center',
          }}>
          You haven't created a team yet!{'\n'}The first step to winning starts
          here.
        </AppText>
      </View>
    );
  };
  const onRefresh = type => {
    if (type == 'contest') {
      let outputObject = {};
      dispatch(getContestList(outputObject, isHome ? match_id : _id));
    } else if (type == 'my contest') {
      dispatch(getMyJoinedContest(isHome ? match_id : _id));
    } else {
      dispatch(getMyTeam(isHome ? match_id : _id));
    }
  };
  return (
    <AppSafeAreaView light={false} hidden={false}>
      <StatusBar
        backgroundColor={'black'}
        barStyle={'light-content'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common  >
        <CommonHeader
          details={route?.params}
          showFilter={() => filterSheet.current.open()}
          showPopup={() => sheet.current?.open()}
          activeTab={activeTab}
          setActiveTab={e => setActiveTab(e)}
          completeMatch={route?.params?.isFromMyMatch}
          setModalRemove={setModalRemove}
          title={saveTitle}
        />
        <View style={styles.mainContainer}>
          {activeTab === 1 && SortbyFilterData?.length > 0 ? (
            <FlatList
              data={SortbyFilterData}
              renderItem={renderContest}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 10 }}
              keyExtractor={(item, index) => index.toString()} // Return the index as a string
              ListFooterComponent={() => {
                return <View style={{ height: 80 }} />;
              }}
            />
          ) : (
            <>
              {activeTab == 1 && !route?.params?.isFromMyMatch ? (
                <FlatList
                  data={transformedData}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  refreshControl={
                    <RefreshControl
                      refreshing={false}
                      onRefresh={() => onRefresh('contest')}
                    />
                  }
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                  }}
                />
              ) : (
                <></>
              )}
              {activeTab == 2 && (
                <View
                  style={{
                    flex: 1,
                  }}>
                  <FlatList
                    data={myContest}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderMyContest}
                    ListHeaderComponent={renderMyCreateContest}
                    ListEmptyComponent={<EmptyComponent />}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                      <RefreshControl
                        refreshing={false}
                        onRefresh={() => onRefresh('my contest')}
                      />
                    }
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
              )}
              {activeTab == 3 && (
                <View
                  style={{
                    flex: flexOne,
                  }}>
                  <FlatList
                    data={myTeam}
                    renderItem={renderMyTeam}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<EmptyComponentTwo />}
                    refreshControl={
                      <RefreshControl
                        refreshing={false}
                        onRefresh={() => onRefresh('my team')}
                      />
                    }
                    contentContainerStyle={{
                      flexGrow: flexOne,
                    }}
                    style={{
                      width: '100%',
                      flex: flexOne,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              )}
            </>
          )}
        </View>
        {/* <RBSheet
          ref={sheet}
          closeOnDragDown={true}
          height={201}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            draggableIcon: {
              backgroundColor: 'transparent',
              display: 'none',
            },
          }}>
          <MatchRemainder
            data={contestData}
            onClose={() => sheet?.current?.close()}
          />
        </RBSheet> */}
        <RBSheet
          ref={filterSheet}
          closeOnDragDown={false}
          height={Screen.Height * 0.75}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            draggableIcon: {
              backgroundColor: 'transparent',
              display: 'none',
            },
          }}>
          <FilterSheet
            onClose={() => filterSheet?.current?.close()}
            filterdata={filterdata}
            setFilterData={setFilterData}
            entry={entry}
            setEntry={setEntry}
            team={team}
            setTeam={setTeam}
            prize={prize}
            setPrize={setPrize}
            contest={contest}
            setContest={setContest}
          />
        </RBSheet>
        {activeTab !== 2 &&
          !route?.params?.isFromMyMatch &&
          isPastTime != 'false' && (
            <View style={[styles.buttonContainer, { marginVertical: Platform.OS == 'ios' ? 20 : 10 }]}>
              {/* <SecondaryButton
                onPress={() => NavigationService.navigate(CREATE_CONTEST)}
                buttonStyle={[styles.buttonStyle,{marginTop: Platform.OS == 'ios'? -5:0}]}
                title={'CREATE CONTEST'}
                titleStyle={{ color: colors.black, marginTop: -5 }}
                btnStyle={{
                  backgroundColor: NewColor.linerWhite,
                  borderWidth: 2,
                  height: 45,
                  borderRadius: 10,
                }}
              /> */}
              <PrimaryButton
                buttonStyle={[styles.buttonStyle, { marginTop: Platform.OS == 'ios' ? -5 : 0 }]}
                onPress={() => {
                  dispatch(getTab(''));
                  dispatch(setAllPlayers([]))
                  let data = { cid: SeriesId };
                  dispatch(getAllPlayerList(_id, data));
                  NavigationService.navigate(SELECT_PLAYER, contestData, isFromMyMatch);
                  dispatch(setIsContestEntry(false));
                }}
                title="CREATE TEAM"
              />
            </View>
          )}
        <SpinnerSecond loading={isLoading} />
      </CommonImageBackground>
      <MatchLiveModal AleartLive={AleartLive} />
    </AppSafeAreaView>
  );
};

export default MyContest;
