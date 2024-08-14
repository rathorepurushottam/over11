import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  AppText,
  BLACK,
  BLACKOPACITY,
  EIGHT,
  EIGHTEEN,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  SEMI_BOLD,
  TEN,
  TWELVE,
  WHITE,
} from '../../common/AppText';
import { DUMMY_USER, PANT, persons } from '../../helper/image';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { SpinnerSecond } from '../../common/SpinnerSecond';
import { NLCColor, colors } from '../../theme/color';
import { BaseUrl, IMAGE_BASE_URL, toastAlert } from '../../helper/utility';
import { getAllPlayerList, getOtherUserProfile } from '../../slices/matchSlice';
import { PLAYER_PREVIEW, PLAYER_PREVIEW_TWO } from '../../navigation/routes';
import { TouchableOpacityView } from '../../common/TouchableOpacityView';
import NavigationService from '../../navigation/NavigationService';
import { flexOne } from '../../theme/dimens';

const LeaderBoardList = ({ matchId, id, forStatus, setForStatus, selfCreateContest }) => {
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  const userData = useSelector(state => {
    return state.profile.userData;
  });
  const contestData = useSelector(state => state?.match?.contestData);
  const [leaderBoards, setLeaderBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onRefresh, setOnrefresh] = useState(false);
  const [myDataleader, setMyDataleader] = useState([]);
  const [ForConnectedTo, setForConnectedTo] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  let url = `${BaseUrl}leader-board?limit=10&skip=0&matchid=${matchId}&contest_category_id=${id}&user_id=${userData?._id}`;
  let urlTwo = `${BaseUrl}mainleaderboard?limit=10&skip=0&contest_category_id=${id}&matchid=${matchId}&user_id=${userData?._id}`;

  useEffect(() => {
    if (matchId && id) {
      wsRef.current = new WebSocket(selfCreateContest ? urlTwo : url);
      wsRef.current.onopen = () => { };
      wsRef.current.onclose = e => {
        setLoading(false);
        wsRef.current = new WebSocket(selfCreateContest ? urlTwo : url);
      };
      wsRef.current.onerror = e => {
        setLoading(false);
        wsRef.current = new WebSocket(selfCreateContest ? urlTwo : url);
      };
      return () => {
        wsRef.current.close();
      };
    }
  }, [matchId, id]);
  const getData = React.useCallback(() => {
    if (isConnected && wsRef.current) {
      wsRef.current.close();
      setIsConnected(false);
    }
    try {
      wsRef.current = new WebSocket(selfCreateContest ? urlTwo : url);
      wsRef.current.onopen = () => {
        setIsConnected(true); // Set the connection status to true
      };
      if (!wsRef.current) return;

      wsRef.current.onmessage = e => {
        const parseData = JSON.parse(e?.data);
        const liveStatus = JSON.parse(e?.data);
        setForStatus(liveStatus?.live);
        setLeaderBoards(parseData?.data);
        setLoading(false);
      };
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [isConnected]);
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
  useEffect(() => {
    let Mydata = leaderBoards?.map(item => {
      return item?.email === userData?.email &&
        item?.full_name === userData?.full_name &&
        item?.mobile_number === userData?.mobile_number
        ? item
        : {};
    });
    const filteredData = Mydata.filter(item => Object.keys(item).length !== 0);
    setMyDataleader(filteredData);
  }, [leaderBoards]);
  const filteredArray = leaderBoards.filter(item => !Array.isArray(item));
  const playerPreview = (teamPlayer, full_name, teamname, total_points) => {
    if (forStatus && forStatus == 'true') {
      if (teamPlayer?.user_id == userData?._id) {
        let selectedPlayers = teamPlayer?.players?.map(k => {
          return k?.pid;
        });
        const teamsName = [
          ...new Set(
            teamPlayer?.players?.map(data => data?.primary_team?.title),
          ),
        ];
        let newData = [];
        teamPlayer?.players?.forEach(player => {
          let data = { ...player };
          data['title'] = player?.primary_team?.title;
          newData.push(data);
        });
        const firstTitleName = teamsName[0];
        const secondTitleName = teamsName[1];
        const firstTeamCount = teamPlayer.players?.filter(
          item =>
            item?.primary_team?.title === firstTitleName && !item?.substitute,
        )?.length;
        const secondTeamCount = teamPlayer.players?.filter(
          item =>
            item?.primary_team?.title === secondTitleName && !item?.substitute,
        )?.length;
        const captain = teamPlayer?.players?.find(item => item.caption);
        const viceCaptain = teamPlayer?.players?.find(
          item => item?.vice_caption,
        );
        let data = {};
        dispatch(getAllPlayerList(contestData?._id, data, false, {}));
        NavigationService.navigate(PLAYER_PREVIEW_TWO, {
          oldData: contestData,
          selectedPlayers: selectedPlayers,
          selectedPlayerDetails: newData,
          player: secondTeamCount,
          playerTwo: firstTeamCount,
          team_name: teamPlayer?.name,
          captainId: captain?.pid,
          vice_caption: viceCaptain?.pid,
          team_id: teamPlayer?._id,
          total_points: total_points,
          teamName: teamname,
          full_name: full_name,
          replacedPlayers: teamPlayer?.replacedPlayers,
          notReplacedSubstitutes: teamPlayer?.notReplacedSubstitutes
        });
      } else {
        toastAlert.showToastError(
          'Please wait till the match starts to view other teams',
        );
      }
    } else {
      let selectedPlayers = teamPlayer?.players?.map(k => {
        return k?.pid;
      });
      const teamsName = [
        ...new Set(teamPlayer?.players?.map(data => data?.primary_team?.title)),
      ];
      let newData = [];
      teamPlayer?.players?.forEach(player => {
        let data = { ...player };
        data['title'] = player?.primary_team?.title;
        newData.push(data);
      });
      const firstTitleName = teamsName[0];
      const secondTitleName = teamsName[1];
      const firstTeamCount = teamPlayer.players?.filter(
        item =>
          item?.primary_team?.title === firstTitleName && !item?.substitute,
      )?.length;
      const secondTeamCount = teamPlayer.players?.filter(
        item =>
          item?.primary_team?.title === secondTitleName && !item?.substitute,
      )?.length;
      const captain = teamPlayer?.players?.find(item => item.caption);
      const viceCaptain = teamPlayer?.players?.find(item => item?.vice_caption);
      let data = {};
      dispatch(getAllPlayerList(teamPlayer?._id, data, false, {}));
      NavigationService.navigate(PLAYER_PREVIEW_TWO, {
        oldData: contestData,
        selectedPlayers: selectedPlayers,
        selectedPlayerDetails: newData,
        player: secondTeamCount,
        playerTwo: firstTeamCount,
        team_name: teamPlayer?.name,
        captainId: captain?.pid,
        vice_caption: viceCaptain?.pid,
        team_id: teamPlayer?._id,
        total_points: total_points,
        teamName: teamname,
        full_name: full_name,
        replacedPlayers: teamPlayer?.replacedPlayers,
        notReplacedSubstitutes: teamPlayer?.notReplacedSubstitutes,
        teamPlayer: teamPlayer
      });
    }
  };
  const onProfile = id => {
    // const data = {
    //   user_id: id,
    // };`
    // dispatch(getOtherUserProfile(id));
    console.log('Hellooo')
  };
  const renderLeaderBoard = ({ item, index }) => {
    return (
      <TouchableOpacityView
        onPress={() =>
          playerPreview(
            item?.team_details,
            `${item?.full_name || item?.username
              ? `${item?.full_name
                ? item?.full_name
                : item?.username
                  ? item?.username
                  : null
              }`
              : item?.created_by?.full_name
                ? item?.created_by?.full_name
                : item?.created_by?.username
                  ? item?.created_by?.username
                  : null
            }`,
            `${item?.team_details?.name ? item?.team_details?.name : ''}`,
            item?.team_details?.total_points,
          )
        }
        style={[
          styles.leaderBoardContainer,
          {
            backgroundColor:
              filteredArray?.length == 1
                ? NLCColor.white
                : null,
            borderBottomWidth: 1,
            borderBottomColor: NLCColor.white
          },
        ]}>
        <View style={styles.underView}>
          <TouchableOpacityView onPress={() => onProfile(item?.team_details?.user_id)}>
            <FastImage
              style={styles.userImg}
              resizeMode="contain"
              source={
                item?.logo
                  ? {
                    uri: `${IMAGE_BASE_URL + item?.logo}`,
                  }
                  : item?.created_by?.logo
                    ? {
                      uri: `${IMAGE_BASE_URL + item?.created_by?.logo}`,
                    }
                    : persons
              }
            // source={PANT}
            />
          </TouchableOpacityView>
          <View
            style={{ flex: 1.4, marginLeft: 6 }}>
            <AppText> {`${item?.full_name || item?.username
              ? `${item?.full_name
                ? item?.full_name
                : item?.username
                  ? item?.username
                  : null
              }`
              : item?.created_by?.full_name
                ? item?.created_by?.full_name
                : item?.created_by?.username
                  ? item?.created_by?.username
                  : null
              } (${item?.team_details?.name ? item?.team_details?.name : ''})`}</AppText>
            {contestData?.Status == 'Completed' ? (
              <>
                {item?.winningZone || item?.winnings ?
                  <AppText
                    type={TEN}
                    weight={POPPINS_MEDIUM}
                    style={{ color: '#00B81C' }}>
                    {item?.winnings ? `You Won ₹ ${item?.winnings}` : item?.winningZone}
                  </AppText> : <></>
                }
              </>
            ) : (
              <>
                {item?.winningZone !== undefined ?
                  <AppText
                    type={TEN}
                    weight={POPPINS_MEDIUM}
                    style={{ color: '#00B81C' }}>
                    In Winning Zone
                  </AppText> : <></>
                }
              </>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            {item?.team_details?.total_points ? (
              <AppText weight={SEMI_BOLD} type={TWELVE}>
                {item?.team_details?.total_points}
              </AppText>
            ) : (
              <></>
            )}
            {item?.rank ? (
              <AppText weight={SEMI_BOLD} type={TWELVE}>
                # {item?.rank}
              </AppText>
            ) : (
              <></>
            )}
          </View>
        </View>
      </TouchableOpacityView >
    );
  };
  const mydataleaderboard = () => {
    return (
      myDataleader &&
      myDataleader?.map(item => {
        return (
          <TouchableOpacityView
            style={[
              styles.leaderBoardContainer,
              {
                backgroundColor: "#EBEBEB",
                borderBottomWidth: 1,
                borderBottomColor: colors.lightgry
              },
            ]}
            onPress={() =>
              playerPreview(
                item?.team_details,
                `${item?.full_name || item?.username
                  ? `${item?.full_name
                    ? item?.full_name
                    : item?.username
                      ? item?.username
                      : null
                  }`
                  : item?.created_by?.full_name
                    ? item?.created_by?.full_name
                    : item?.created_by?.username
                      ? item?.created_by?.username
                      : null
                }`,
                `${item?.team_details?.name ? item?.team_details?.name : ''}`,
                item?.team_details?.total_points,
              )
            }>
            <TouchableOpacityView onPress={() =>
              playerPreview(
                item?.team_details,
                `${item?.full_name || item?.username
                  ? `${item?.full_name
                    ? item?.full_name
                    : item?.username
                      ? item?.username
                      : null
                  }`
                  : item?.created_by?.full_name
                    ? item?.created_by?.full_name
                    : item?.created_by?.username
                      ? item?.created_by?.username
                      : null
                }`,
                `${item?.team_details?.name ? item?.team_details?.name : ''}`,
                item?.team_details?.total_points,
              )
            } style={styles.underView}>
              <TouchableOpacityView onPress={() => onProfile(item?.team_details?.user_id)}>
                <FastImage
                  style={styles.userImg}
                  resizeMode="contain"
                  source={
                    item?.logo
                      ? {
                        uri: `${IMAGE_BASE_URL + item?.logo}`,
                      }
                      : item?.created_by?.logo
                        ? {
                          uri: `${IMAGE_BASE_URL + item?.created_by?.logo}`,
                        }
                        : persons
                  }
                // source={PANT}
                />
              </TouchableOpacityView>
              <TouchableOpacityView
                onPress={() =>
                  playerPreview(
                    item?.team_details,
                    `${item?.full_name || item?.username
                      ? `${item?.full_name
                        ? item?.full_name
                        : item?.username
                          ? item?.username
                          : null
                      }`
                      : item?.created_by?.full_name
                        ? item?.created_by?.full_name
                        : item?.created_by?.username
                          ? item?.created_by?.username
                          : null
                    }`,
                    `${item?.team_details?.name ? item?.team_details?.name : ''}`,
                    item?.team_details?.total_points,
                  )
                }
                style={{ flex: 1.4, marginLeft: 6 }}>
                <AppText> {`${item?.full_name || item?.username
                  ? `${item?.full_name
                    ? item?.full_name
                    : item?.username
                      ? item?.username
                      : null
                  }`
                  : item?.created_by?.full_name
                    ? item?.created_by?.full_name
                    : item?.created_by?.username
                      ? item?.created_by?.username
                      : null
                  } (${item?.team_details?.name ? item?.team_details?.name : ''})`}</AppText>
                {contestData?.Status == 'Completed' ? (
                  <>
                    {item?.winningZone || item?.winnings ?
                      <AppText
                        type={TEN}
                        weight={POPPINS_MEDIUM}
                        style={{ color: '#00B81C' }}>
                        {item?.winnings ? `You Won ₹ ${item?.winnings}` : item?.winningZone}
                      </AppText> : <></>
                    }
                  </>
                ) : (
                  <>
                    {item?.winningZone !== undefined ?
                      <AppText
                        type={TEN}
                        weight={POPPINS_MEDIUM}
                        style={{ color: '#00B81C' }}>
                        In Winning Zone
                      </AppText> : <></>
                    }
                  </>
                )}
              </TouchableOpacityView>
              <TouchableOpacityView
                onPress={() =>
                  playerPreview(
                    item?.team_details,
                    `${item?.full_name || item?.username
                      ? `${item?.full_name
                        ? item?.full_name
                        : item?.username
                          ? item?.username
                          : null
                      }`
                      : item?.created_by?.full_name
                        ? item?.created_by?.full_name
                        : item?.created_by?.username
                          ? item?.created_by?.username
                          : null
                    }`,
                    `${item?.team_details?.name ? item?.team_details?.name : ''}`,
                    item?.team_details?.total_points,
                  )
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                {item?.team_details?.total_points ? (
                  <AppText weight={SEMI_BOLD} type={TWELVE}>
                    {item?.team_details?.total_points}
                  </AppText>
                ) : (
                  <></>
                )}
                {item?.rank ? (
                  <AppText weight={SEMI_BOLD} type={TWELVE}>
                    # {item?.rank}
                  </AppText>
                ) : (
                  <></>
                )}
              </TouchableOpacityView>
            </TouchableOpacityView>
          </TouchableOpacityView>
        );
      })
    );
  };
  return (
    <>
      <View style={styles.head}>
        <AppText
          weight={SEMI_BOLD}
          type={TEN}
          style={{
            flex: 2,
          }}>{`ALL TEAMS (${filteredArray?.length})`}</AppText>
        {filteredArray[0]?.team_details?.total_points ||
          filteredArray[0]?.team_details?.total_points ? (
          <>
            <AppText
              style={{ flex: 1 }}
              type={TEN}
            >
              Points
            </AppText>
            <AppText type={TEN}>
              Rank
            </AppText>
          </>
        ) : (
          <></>
        )}
        {/* <AppText type={TEN}>{`ALL TEAMS (${leaderBoards?.length})`}</AppText>
        <AppText type={TEN}>WINNINGS</AppText> */}
      </View>
      {loading ? (
        <SpinnerSecond loading />
      ) : (
        <>
          {filteredArray?.length ?
            <FlatList
              data={filteredArray}
              renderItem={renderLeaderBoard}
              keyExtractor={(item, index) => index?.toString()}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews
              maxToRenderPerBatch={20}
              initialNumToRender={15}
              scrollEnabled={true}
              ListHeaderComponent={
                filteredArray?.length == 1 ? null : mydataleaderboard
              }
              refreshControl={
                <RefreshControl refreshing={onRefresh} onRefresh={getData} />
              }
            />
            :
            <AppText style={{
              textAlign: 'center',
              marginTop: '20%'
            }} color={BLACK} weight={POPPINS_SEMI_BOLD} >
              No other team has joined this contest
            </AppText>
          }
        </>
      )}
    </>
  );
};

export default LeaderBoardList;
