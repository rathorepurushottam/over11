import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState, useMemo, useRef} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {AppSafeAreaView} from '../../common/AppSafeAreaView';
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  BROWNYELLOW,
  ELEVEN,
  FORTEEN,
  GRY,
  LIGHTBLUE,
  LIGHTWHITE,
  POPPINS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  RED,
  SEMI_BOLD,
  TEN,
  WHITE,
} from '../../common/AppText';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import PlayerRoleBadge from '../../components/playerRoleBedge/PlayerRoleBedge';
import {
  BAT,
  BOWL,
  GLOVE,
  GREEN_PLUS_ICON,
  LEFT_ARROW,
  PANT,
  RED_MINUS,
  StopIcon,
  all_rounder,
  all_rounderIcon,
  backIconMain,
  batsmanIcon,
  bowlerIcon,
  dropDownRed,
  headerIner,
  rightArrow,
  wicket_keeper,
  wicket_keeperIcon,
} from '../../helper/image';
import {modifyName, toastAlert} from '../../helper/utility';
import NavigationService from '../../navigation/NavigationService';
import {PLAYER_PREVIEW, SELECT_CAPTAIN} from '../../navigation/routes';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPlayerList, getPlayerDetail} from '../../slices/matchSlice';
import PlayerBedge from '../../components/playerBedge/PlayerBedge';
import {StatusBar} from 'native-base';
import CommonImageBackground from '../../common/commonImageBackground';
import SecondaryButton from '../../common/secondaryButton';
import PrimaryButton from '../../common/primaryButton';
import PlayerDetailModal from '../../common/PlayerDetailModal';
import moment from 'moment';
import {NLCColor, NewColor, colors} from '../../theme/color';
import {LiveTime} from '../../common/LiveTime';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {MatchLiveModal} from '../../common/MatchLiveModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Screen, flexOne, universalPaddingHorizontal} from '../../theme/dimens';
import UnannouncedPlayer from '../UnannouncedPlayer';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
export const data = [
  {
    imageSource: GLOVE,
  },
  {
    imageSource: BAT,
  },
  {
    imageSource: BAT,
  },
  {
    imageSource: BAT,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
  {
    imageSource: BOWL,
  },
];

const SelectPlayer = () => {
  const dispatch = useDispatch();
  const contestData = useSelector(state => state?.match?.contestData);
  const myTeam = useSelector(state => state?.match?.myTeams);
  const isLoading = useSelector(state => state?.match?.isLoading);
  const {_id, TeamA, TeamB, TeamAlogo, TeamsShortNames, TeamBlogo, SeriesId} =
    contestData ?? '';
  const allPlayers = useSelector(state => state?.match?.allPlayers);
  const getPlayerTab = useSelector(state => state?.match?.getPlayerTab);
  const route = useRoute();
  // console.log(route,'====route');
  const AleartLive = useRef();
  const refsheetUnannounced = useRef();
  const [activeTab, setActiveTab] = useState('WK');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [availableCredits, setAvailableCredits] = useState(100);
  const [removeTabs, setRemoveTabs] = useState(false);

  const [random, setRandom] = useState(10);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlayerDetails, setSelectedPlayersDetails] = useState([]);
  const [captainId, setCaptainId] = useState(null);
  const [viceCaptainId, setViceCaptainId] = useState(null);
  const [newAllPlayer, setNewAllplayer] = useState('');
  const [saveTitle, setSaveTitle] = useState('');
  const [playerimg, setplayerimg] = useState(null);
  const [logo, setlogo] = useState(null);
  const [onClose, setOnClose] = useState(false);
  const [playerTwo, setPlayerTwo] = useState(
    route?.params?.playerTwo ? [...route?.params?.playerTwo] : [],
  );
  const [player, setPlayer] = useState(
    route?.params?.player ? [...route?.params?.player] : [],
  );
  const currentDate = new Date();
  const inputDate = new Date(contestData?.StartDateTime);
  const timeDifference = Math.floor(
    (inputDate - currentDate) / (24 * 60 * 60 * 1000),
  );

  const [isTeamCompleted, setIsTeamCompleted] = useState(false);

  const [saveTeam, setSaveTeam] = useState({});
  const convertToTeamsTitle2 = arr => {
    const TeamsTitle2 = arr && arr?.map(title => title.trim());
    return TeamsTitle2;
  };
  const removedSpacesTeamsTitle = convertToTeamsTitle2(contestData?.TeamsTitle);
  useEffect(() => {
    if (
      route?.params?.isEditMode ||
      route?.params?.isCloneMode ||
      route?.params?.shareTeam
    ) {
      const filteredpid = route?.params?.selectedPlayers.filter(
        item => !item.substitute,
      );
      route?.params?.selectedPlayers?.find(e => {
        return (
          e?.vice_caption == true ? setViceCaptainId(e?.pid) : null,
          e?.caption == true ? setCaptainId(e?.pid) : null
        );
      });
    //   route?.params?.selectedPlayers?.forEach(e => {
    //     if (e?.vice_caption) {
    //         setViceCaptainId(e?.pid);
    //     }
    //     if (e?.caption) {
    //         setCaptainId(e?.pid);
    //     }
    // });
    
      const pids = filteredpid.map(item => item.pid);
      const usedCredit = route?.params?.selectedPlayers
        .filter(item => !item.substitute) 
        .reduce((total, item) => total + item.fantasy_player_rating, 0);
      const filteredData = route?.params?.selectedPlayers.filter(
        item => !item.substitute,
      );
      const mergedData = route?.params?.selectedPlayers.map(item => {
        const matchingItem = allPlayers.find(
          newItem => newItem.pid === item.pid,
        );
        if (matchingItem) {
          return {
            ...item,
            caption_percent: matchingItem.caption_percent,
            vice_caption_percent: matchingItem.vice_caption_percent,
          };
        }
        return item;
      });

      const datanew = mergedData.filter(item => !item.substitute);
      const filteredDataTwo = route?.params?.selectedPlayers.filter(
        item => item.substitute === true,
      );
      const player1 = route?.params?.selectedPlayers.filter(
        item => item.title == removedSpacesTeamsTitle[0],
      );
      const player2 = route?.params?.selectedPlayers.filter(
        item => item.title == removedSpacesTeamsTitle[1],
      );
      setPlayer(player1);
      setPlayerTwo(player2);
      setAvailableCredits(filteredData);
      setAvailableCredits(Number(100) - Number(usedCredit));
      setSelectedPlayers(pids);
      setSelectedPlayersDetails(datanew);
      // setfilterPlayer(filteredDataTwo);
    }
  }, []);
  useEffect(() => {
    if (removeTabs) {
      if (route?.params?.isFromMyMatch == true) {
        console.log('Close');
      } else {
        AleartLive.current.open();
      }
    }
  }, [removeTabs]);
  const filterSelectedPlayer = useMemo(() => {
    return allPlayers?.reduce(
      (preVal, item) => {
        if (
          item?.playing_role === 'wk' &&
          selectedPlayers.includes(item?.pid)
        ) {
          preVal['wk'].push(item);
        }
        if (
          item?.playing_role === 'bowl' &&
          selectedPlayers.includes(item?.pid)
        ) {
          preVal['bowl'].push(item);
        }
        if (
          item?.playing_role === 'bat' &&
          selectedPlayers.includes(item?.pid)
        ) {
          preVal['bat'].push(item);
        }
        if (
          item?.playing_role === 'all' &&
          selectedPlayers.includes(item?.pid)
        ) {
          preVal['all'].push(item);
        }
        return preVal;
      },
      {
        wk: [],
        bat: [],
        all: [],
        bowl: [],
      },
    );
  }, [selectedPlayers, allPlayers, filterSelectedPlayer]);
  const filterPlayerUnannounced = allPlayers?.filter(e => {
    return selectedPlayers.includes(e?.pid);
  });
  const Unannounced = filterPlayerUnannounced?.filter(e => {
    return e?.playing11 == 'false';
  });
  const UnannouncedTWO = filterPlayerUnannounced?.filter(e => {
    return e?.playing11 == 'false';
  });
  useEffect(() => {
    if (
      route?.params?.isEditMode ||
      route?.params?.isCloneMode ||
      route?.params?.shareTeam
    ) {
      if (!onClose) {
        if (Unannounced?.length) {
          refsheetUnannounced?.current?.open();
        }
      }
    }
  }, [Unannounced]);

  const [Tabs, setTabs] = useState(['WK', 'BAT', 'AR ', 'BOWL']);
  const getPlayersData = () => {
    if (route?.params?.isEditMode || route?.params?.isCloneMode) {
      const customSort = (a, b) => {
        if (a.playing11 === b.playing11) {
          return 0;
        }
        if (a.playing11 == 'true') {
          return -1;
        }
        return 1;
      };
      const customSortRating = (a, b) => {
        if (a.fantasy_player_rating === b.fantasy_player_rating) {
          return 0;
        }
        if (a.fantasy_player_rating < b.fantasy_player_rating) {
          return 1; // Sort in descending order (highest rating first)
        }
        return -1;
      };
      if (index === 1 || activeTab === 'BAT') {
        const updatedDatanew = allPlayers?.map(player => {
          const pid = player.pid;
          const matchingData = route?.params?.selectedPlayers?.find(
            item => item.pid === pid,
          );

          if (matchingData) {
            return {...player, substitute: matchingData.substitute};
          }

          return player;
        });
        return updatedDatanew
          .filter(player => player.playing_role == 'bat')
          .sort(customSortRating)
          .sort(customSort);
      } else if (index === 3 || activeTab === 'BOWL') {
        const updatedDatanew = allPlayers?.map(player => {
          const pid = player.pid;
          const matchingData = route?.params?.selectedPlayers?.find(
            item => item.pid === pid,
          );

          if (matchingData) {
            return {...player, substitute: matchingData.substitute};
          }

          return player;
        });
        return updatedDatanew
          .filter(player => player.playing_role == 'bowl')
          .sort(customSortRating)
          .sort(customSort);
      } else if (index === 0 || activeTab === 'WK') {
        const updatedDatanew = allPlayers?.map(player => {
          const pid = player.pid;
          const matchingData = route?.params?.selectedPlayers?.find(
            item => item.pid === pid,
          );

          if (matchingData) {
            return {...player, substitute: matchingData.substitute};
          }

          return player;
        });
        return updatedDatanew
          .filter(player => player.playing_role == 'wk')
          .sort(customSortRating)
          .sort(customSort);
      } else if (index === 2 || activeTab === 'AR') {
        const updatedDatanew = allPlayers?.map(player => {
          const pid = player.pid;
          const matchingData = route?.params?.selectedPlayers?.find(
            item => item.pid === pid,
          );

          if (matchingData) {
            return {...player, substitute: matchingData.substitute};
          }

          return player;
        });
        return updatedDatanew
          .filter(player => player.playing_role == 'all')
          .sort(customSortRating)
          .sort(customSort);
      }
    } else {
      const customSort = (a, b) => {
        if (a.playing11 === b.playing11) {
          return 0;
        }
        if (a.playing11 == 'true') {
          return -1;
        }
        return 1;
      };
      const customSortRating = (a, b) => {
        if (a.fantasy_player_rating === b.fantasy_player_rating) {
          return 0;
        }
        if (a.fantasy_player_rating < b.fantasy_player_rating) {
          return 1; // Sort in descending order (highest rating first)
        }
        return -1;
      };
      if (index === 1 || activeTab === 'BAT') {
        if (
          allPlayers.some(
            player =>
              player.playing_role === 'bat' && player.playing11 !== undefined,
          )
        ) {
          if (saveTitle == 'PLAYERS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort((a, b) => b.first_name.localeCompare(a.first_name));
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort((a, b) => a.first_name.localeCompare(b.first_name));
            }
          } else if (saveTitle == 'CREDITS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort(
                  (a, b) => b.fantasy_player_rating - a.fantasy_player_rating,
                );
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort(
                  (a, b) => a.fantasy_player_rating - b.fantasy_player_rating,
                );
            }
          } else if (saveTitle == 'AVG POINTS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort((a, b) => b.average_point - a.average_point);
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort((a, b) => a.average_point - b.average_point);
            }
          } else {
            return allPlayers
              .filter(player => player.playing_role === 'bat')
              .sort(customSortRating)
              .sort(customSort);
          }
        } else {
          if (saveTitle == 'PLAYERS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort((a, b) => b.first_name.localeCompare(a.first_name));
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort((a, b) => a.first_name.localeCompare(b.first_name));
            }
          } else if (saveTitle == 'CREDITS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort(
                  (a, b) => b.fantasy_player_rating - a.fantasy_player_rating,
                );
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort(
                  (a, b) => a.fantasy_player_rating - b.fantasy_player_rating,
                );
            }
          } else if (saveTitle == 'AVG POINTS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort((a, b) => b.average_point - a.average_point);
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bat')
                .sort((a, b) => a.average_point - b.average_point);
            }
          } else {
            return allPlayers
              .filter(player => player.playing_role === 'bat')
              .sort(customSortRating)
              .sort(customSort);
          }
        }
      } else if (index === 3 || activeTab === 'BOWL') {
        if (
          allPlayers.some(
            player =>
              player.playing_role === 'bowl' && player.playing11 !== undefined,
          )
        ) {
          if (saveTitle == 'PLAYERS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort((a, b) => b.first_name.localeCompare(a.first_name));
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort((a, b) => a.first_name.localeCompare(b.first_name));
            }
          } else if (saveTitle == 'CREDITS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort(
                  (a, b) => b.fantasy_player_rating - a.fantasy_player_rating,
                );
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort(
                  (a, b) => a.fantasy_player_rating - b.fantasy_player_rating,
                );
            }
          } else if (saveTitle == 'AVG POINTS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort((a, b) => b.average_point - a.average_point);
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort((a, b) => a.average_point - b.average_point);
            }
          } else {
            return allPlayers
              .filter(player => player.playing_role === 'bowl')
              .sort(customSortRating)
              .sort(customSort);
            8;
          }
        } else {
          if (saveTitle == 'PLAYERS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort((a, b) => b.first_name.localeCompare(a.first_name));
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort((a, b) => a.first_name.localeCompare(b.first_name));
            }
          } else if (saveTitle == 'CREDITS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort(
                  (a, b) => b.fantasy_player_rating - a.fantasy_player_rating,
                );
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort(
                  (a, b) => a.fantasy_player_rating - b.fantasy_player_rating,
                );
            }
          } else if (saveTitle == 'AVG POINTS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort((a, b) => b.average_point - a.average_point);
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'bowl')
                .sort((a, b) => a.average_point - b.average_point);
            }
          } else {
            return allPlayers
              .filter(player => player.playing_role === 'bowl')
              .sort(customSortRating)
              .sort(customSort);
          }
        }
      } else if (index == 0 || activeTab == 'wk') {
        if (
          allPlayers.some(
            player =>
              player.playing_role === 'wk' && player.playing11 !== undefined,
          )
        ) {
          if (saveTitle == 'PLAYERS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort((a, b) => b.first_name.localeCompare(a.first_name));
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort((a, b) => a.first_name.localeCompare(b.first_name));
            }
          } else if (saveTitle == 'CREDITS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort(
                  (a, b) => b.fantasy_player_rating - a.fantasy_player_rating,
                );
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort(
                  (a, b) => a.fantasy_player_rating - b.fantasy_player_rating,
                );
            }
          } else if (saveTitle == 'AVG POINTS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort((a, b) => b.average_point - a.average_point);
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort((a, b) => a.average_point - b.average_point);
            }
          } else {
            return allPlayers
              .filter(player => player.playing_role === 'wk')
              .sort(customSortRating)
              .sort(customSort);
          }
        } else {
          if (saveTitle == 'PLAYERS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort((a, b) => b.first_name.localeCompare(a.first_name));
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort((a, b) => a.first_name.localeCompare(b.first_name));
            }
          } else if (saveTitle == 'CREDITS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort(
                  (a, b) => b.fantasy_player_rating - a.fantasy_player_rating,
                );
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort(
                  (a, b) => a.fantasy_player_rating - b.fantasy_player_rating,
                );
            }
          } else if (saveTitle == 'AVG POINTS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort((a, b) => b.average_point - a.average_point);
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'wk')
                .sort((a, b) => a.average_point - b.average_point);
            }
          } else {
            return allPlayers
              .filter(player => player.playing_role === 'wk')
              .sort(customSortRating)
              .sort(customSort);
          }
        }
      } else if (index == 2 || activeTab === 'AR') {
        if (
          allPlayers.some(
            player =>
              player.playing_role === 'all' && player.playing11 !== undefined,
          )
        ) {
          if (saveTitle == 'PLAYERS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort((a, b) => b.first_name.localeCompare(a.first_name));
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort((a, b) => a.first_name.localeCompare(b.first_name));
            }
          } else if (saveTitle == 'CREDITS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort(
                  (a, b) => b.fantasy_player_rating - a.fantasy_player_rating,
                );
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort(
                  (a, b) => a.fantasy_player_rating - b.fantasy_player_rating,
                );
            }
          } else if (saveTitle == 'AVG POINTS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort((a, b) => b.average_point - a.average_point);
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort((a, b) => a.average_point - b.average_point);
            }
          } else {
            return allPlayers
              .filter(player => player.playing_role === 'all')
              .sort(customSortRating)
              .sort(customSort);
          }
        } else {
          if (saveTitle == 'PLAYERS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort((a, b) => b.first_name.localeCompare(a.first_name));
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort((a, b) => a.first_name.localeCompare(b.first_name));
            }
          } else if (saveTitle == 'CREDITS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort(
                  (a, b) => b.fantasy_player_rating - a.fantasy_player_rating,
                );
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort(
                  (a, b) => a.fantasy_player_rating - b.fantasy_player_rating,
                );
            }
          } else if (saveTitle == 'AVG POINTS') {
            if (newAllPlayer == 'high') {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort((a, b) => b.average_point - a.average_point);
            } else {
              return allPlayers
                .filter(player => player.playing_role === 'all')
                .sort((a, b) => a.average_point - b.average_point);
            }
          } else {
            return allPlayers
              .filter(player => player.playing_role === 'all')
              .sort(customSortRating)
              .sort(customSort);
          }
        }
      }
    }
  };
  // console.log(activeTab,'===active')
  const errorMsg = type => {
    if (type === 'wk') {
      return 'Please Select at least one Wicket Keeper';
    }
    if (type === 'bat') {
      return 'Please Select at least one Batsman';
    }
    if (type === 'all') {
      return 'Please Select at least one All rounder';
    }
    if (type === 'bowl') {
      return 'Please Select at least one Bowler';
    }
  };
  const addPlayerInTeam = items => {
    const selectLength = selectedPlayers.length;
    const wikLength = filterSelectedPlayer.wk.length;
    const bolLength = filterSelectedPlayer.bowl.length;
    const batLength = filterSelectedPlayer.bat.length;
    const allLength = filterSelectedPlayer.all.length;
    const role = items.playing_role;
    if (items?.fantasy_player_rating > availableCredits) {
      return toastAlert.showToastError('Available Credit is Low');
    }
    if (player?.length == 10 && items?.title == removedSpacesTeamsTitle[0]) {
      return toastAlert.showToastError(
        `Please select player from ${removedSpacesTeamsTitle[1]} team`,
      );
    }
    if (playerTwo?.length == 10 && items?.title == removedSpacesTeamsTitle[1]) {
      return toastAlert.showToastError(
        `Please select player from ${removedSpacesTeamsTitle[0]} team`,
      );
    }
    if (selectLength >= 8) {
      const blankData = Object.keys(filterSelectedPlayer).filter(key => {
        return !filterSelectedPlayer[key].length;
      });
      let mess = '';
      switch (true) {
        case wikLength === 8 && role === 'wk':
          mess = 'Maximum of 8 Wicket Keeper per team';
          break;
        case bolLength === 8 && role === 'bowl':
          mess = 'Maximum of 8 Bowlers per team';
          break;
        case batLength === 8 && role === 'bat':
          mess = 'Maximum of 8 BatsMan per team';
          break;
        case allLength === 8 && role === 'all':
          mess = 'Maximum of 8 All Rounder per team';
          break;
        case selectLength >= 9 &&
          selectLength < 11 &&
          !blankData.includes(role):
          if (blankData.length === 1) {
            if (selectLength > 9) {
              mess = errorMsg(blankData[0]);
            }
          } else {
            mess = errorMsg(blankData[0]);
          }
          break;
        case selectLength >= 11:
          mess = 'Maximum Player Selected';
          break;
      }
      if (mess) {
        return toastAlert.showToastError(mess);
      }
    }
    if (items?.title == removedSpacesTeamsTitle[0]) {
      let array = [...player];
      array?.push(items);
      setPlayer(array);
    } else {
      let array2 = [...playerTwo];
      array2?.push(items);
      setPlayerTwo(array2);
    }
    setSelectedPlayers([...selectedPlayers, items?.pid]);
    setSelectedPlayersDetails([...selectedPlayerDetails, items]);
    setAvailableCredits(availableCredits - items?.fantasy_player_rating);
    handleCheckTeamPlayer();
  };

const removePlayerFromTeam = item => {
  if (captainId === item?.pid) {
    setCaptainId(null);
  }
  const filterTeam = selectedPlayers?.filter(data => data !== item?.pid);
  const filterTeamDetails = selectedPlayerDetails?.filter(
    player => player?.pid !== item?.pid,
  );
  const filterTeamDetails1 = player?.filter(
    player => player?.pid !== item?.pid,
  );
  const filterTeamDetails2 = playerTwo?.filter(
    player => player?.pid !== item?.pid,
  );
  setAvailableCredits(availableCredits + item?.fantasy_player_rating);
  setSelectedPlayers(filterTeam);
  setSelectedPlayersDetails(filterTeamDetails);
  setPlayer(filterTeamDetails1);
  setPlayerTwo(filterTeamDetails2);
  handleCheckTeamPlayer();
};


  const handleCheckTeamPlayer = () => {
    if (selectedPlayers?.length === 11) {
      console.log('Selected 11 Players');
      setIsTeamCompleted(true);
    } else {
      console.log('Not Selected 11 Players');
      setIsTeamCompleted(false);
    }
  };

  const onContinueClick = () => {
    if (selectedPlayers?.length < 11) {
      return toastAlert.showToastError('Please Select 11 Players');
    }
    NavigationService.navigate(SELECT_CAPTAIN, {
      matchDetails: contestData,
      selectedPlayers: selectedPlayers,
      selctedPlayerDetails: selectedPlayerDetails,
      isEditMode: route?.params?.isEditMode,
      team_id: route?.params?.team_id,
      team_name: route?.params?.team_name,
      captain: route?.params?.captain,
      viceCaptain: route?.params?.viceCaptain,
      isCloneMode: route?.params?.isCloneMode,
      availableCredits: availableCredits,
      player: player,
      playerTwo: playerTwo,
      isFromMyMatch: route?.params?.isFromMyMatch,
      shareTeam: route?.params?.shareTeam,
    });
  };
  const onPreview = () => {
    NavigationService.navigate(PLAYER_PREVIEW, {
      oldData: contestData,
      selectedPlayers: selectedPlayers,
      availableCredits: availableCredits,
      selectedPlayerDetails: selectedPlayerDetails,
      player: player,
      playerTwo: playerTwo,
      myTeam: false,
      captainId: captainId,
      vice_caption: viceCaptainId,
    });
  };
  const onDetail = (id, item) => {
    dispatch(getPlayerDetail(id));
    setSaveTeam(item);
    setplayerimg(item?.playing_role);
    setlogo(item?.logo_url);
    setIsVisible(true);
  };
  const renderItem = ({item}) => {
    const playerIcon =
      item?.playing_role === 'wk'
        ? wicket_keeperIcon
        : item?.playing_role === 'bowl'
        ? bowlerIcon
        : item?.playing_role === 'bat'
        ? batsmanIcon
        : item?.playing_role === 'all'
        ? all_rounderIcon
        : null;
    return selectedPlayers?.includes(item?.pid) ? (
      <LinearGradient
        colors={['#FFC4C400', '#FFC4C4']}
        start={{x: 0, y: 0.1}}
        end={{x: 1, y: 0}}
        style={[styles.selectPlayerContainer]}>
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => removePlayerFromTeam(item)}>
          <TouchableOpacityView
            onPress={() => onDetail(item?.pid, item)}
            style={{flex: 1, alignItems: 'flex-start'}}>
            <FastImage
              source={
                item?.profile_image ? {uri: item?.profile_image} : playerIcon
              }
              style={styles.playerImage}
              resizeMode="contain"
            />
          </TouchableOpacityView>
          <View style={{flex: 1.5, alignItems: 'flex-start', marginLeft: 15}}>
            <AppText color={BLACK} numberOfLines={1} style={styles.playerName}>
              {modifyName(item?.first_name)}
            </AppText>
            <AppText type={TEN} numberOfLines={1} weight={POPPINS_MEDIUM}>
              {item?.teamName}
            </AppText>
            {item?.playing11 == undefined ? (
              <>
                {item?.last_play ? (
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        height: 5,
                        width: 5,
                        borderRadius: 100,
                        backgroundColor: NLCColor.Red,
                        marginTop: 5,
                      }}
                    />
                    <AppText
                      style={{
                        color: NLCColor.Red,
                        marginLeft: 5,
                        fontWeight: 700,
                        fontSize: 10,
                      }}
                      weight={POPPINS_MEDIUM}>
                      Played last match
                    </AppText>
                  </View>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {item?.playing11 == 'true' ? (
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        height: 6,
                        width: 6,
                        borderRadius: 100,
                        backgroundColor: '#00B81C',
                        marginTop: 5,
                      }}
                    />
                    <AppText
                      style={{
                        color: '#00B81C',
                        marginLeft: 5,
                        fontWeight: 500,
                      }}
                      weight={SEMI_BOLD}>
                      Announced
                    </AppText>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        height: 6,
                        width: 6,
                        borderRadius: 100,
                        backgroundColor: '#FF0000',
                        marginTop: 5,
                      }}
                    />
                    <AppText
                      style={{
                        color: '#FF0000',
                        marginLeft: 5,
                        fontWeight: 500,
                      }}
                      weight={SEMI_BOLD}>
                      Unannounced
                    </AppText>
                  </View>
                )}
              </>
            )}
          </View>
          <View style={{flex: 1, alignItems: 'center', marginEnd: 0}}>
            <AppText weight={POPPINS_MEDIUM} style={styles.points}>
              {item?.average_point ? item?.average_point?.toFixed(2) : 0}
            </AppText>
          </View>
          <View style={styles.creditBtnView}>
            <AppText style={{marginLeft: 15}} weight={POPPINS_MEDIUM}>
              {item?.fantasy_player_rating}
            </AppText>

            <FastImage
              resizeMode="contain"
              source={RED_MINUS}
              style={styles.plusIcon}
            />
          </View>
        </Pressable>
      </LinearGradient>
    ) : (
      <Pressable
        style={[
          styles.selectPlayerContainer,
          {
            backgroundColor:
              selectedPlayers?.length === 11 ? colors.gray : colors.white,
          },
        ]}
        onPress={() =>
          selectedPlayers?.length == 11 ? null : addPlayerInTeam(item)
        }>
        <TouchableOpacityView
          onPress={() => onDetail(item?.pid, item)}
          style={{flex: 1, alignItems: 'flex-start'}}>
          <FastImage
            source={
              item?.profile_image ? {uri: item?.profile_image} : playerIcon
            }
            style={styles.playerImage}
            resizeMode="contain"
          />
        </TouchableOpacityView>
        <View style={{flex: 1.5, alignItems: 'flex-start', marginLeft: 15}}>
          <AppText
            weight={POPPINS_MEDIUM}
            numberOfLines={1}
            style={styles.playerName}>
            {modifyName(item?.first_name)}
          </AppText>
          <AppText numberOfLines={1} weight={POPPINS_MEDIUM} type={TEN}>
            {item?.teamName}
            {/* <Text style={{color: '#21B5F6'}}>DC</Text> Sel By 91.84%**/}
          </AppText>
          {item?.playing11 == undefined ? (
            <>
              {item?.last_play ? (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 5,
                      width: 5,
                      borderRadius: 100,
                      backgroundColor: NLCColor.Red,
                      marginTop: 5,
                    }}
                  />
                  <AppText
                    style={{
                      color: NLCColor.Red,
                      marginLeft: 5,
                      fontWeight: 700,
                      fontSize: 10,
                    }}
                    weight={POPPINS_MEDIUM}>
                    Played last match
                  </AppText>
                </View>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {item?.playing11 == 'true' ? (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 6,
                      width: 6,
                      borderRadius: 100,
                      backgroundColor: '#00B81C',
                      marginTop: 5,
                    }}
                  />
                  <AppText
                    style={{
                      color: '#00B81C',
                      marginLeft: 5,
                      fontWeight: 500,
                    }}
                    weight={SEMI_BOLD}>
                    Announced
                  </AppText>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 6,
                      width: 6,
                      borderRadius: 100,
                      backgroundColor: '#FF0000',
                      marginTop: 5,
                    }}
                  />
                  <AppText
                    style={{
                      color: '#FF0000',
                      marginLeft: 5,
                      fontWeight: 500,
                    }}
                    weight={SEMI_BOLD}>
                    Unannounced
                  </AppText>
                </View>
              )}
            </>
          )}
        </View>
        <View style={{flex: 1, alignItems: 'center', marginEnd: 0}}>
          <AppText style={[styles.points, {marginLeft: -5}]}>
            {item?.average_point ? item?.average_point?.toFixed(2) : 0}
          </AppText>
        </View>
        <View style={styles.creditBtnView}>
          <AppText style={{marginLeft: 15}} weight={POPPINS_MEDIUM}>
            {item?.fantasy_player_rating}
          </AppText>

          <FastImage
            resizeMode="contain"
            source={GREEN_PLUS_ICON}
            style={styles.plusIcon}
          />
        </View>
      </Pressable>
    );
  };

  const filterDataOfSorting = title => {
    setNewAllplayer(
      newAllPlayer == 'high' ? 'low' : newAllPlayer == 'low' ? 'high' : 'low',
    );
    if (title == 'PLAYERS') {
      setSaveTitle('PLAYERS');
      getPlayersData();
    } else if (title == 'CREDITS') {
      setSaveTitle('CREDITS');
      getPlayersData();
    } else if (title == 'AVG POINTS') {
      setSaveTitle('AVG POINTS');
      getPlayersData();
    }
  };
  const onSubmit = unannouncesSelect => {
    const playerNew = unannouncesSelect.filter(i => {
      return i?.title == removedSpacesTeamsTitle[0];
    });
    const playerTwoNew = unannouncesSelect.filter(i => {
      return i?.title == removedSpacesTeamsTitle[1];
    });
    if (unannouncesSelect?.length) {
      let newData = selectedPlayers.filter(
        player =>
          !unannouncesSelect.some(
            unannouncedPlayer => unannouncedPlayer.pid === player,
          ),
      );
      let newDatadetails = selectedPlayerDetails.filter(
        player =>
          !unannouncesSelect.some(
            unannouncedPlayer => unannouncedPlayer.pid === player.pid,
          ),
      );
      const totalFantasyRating = unannouncesSelect.reduce(
        (total, player) => total + player.fantasy_player_rating,
        0,
      );
      let playerLengthOne = player.filter(
        player => !playerNew.some(newPlayer => newPlayer.pid === player.pid),
      );
      let playerLengthTwo = playerTwo.filter(
        player => !playerTwoNew.some(newPlayer => newPlayer.pid === player.pid),
      );
      setSelectedPlayers(newData);
      setSelectedPlayersDetails(newDatadetails);
      setOnClose(true);
      setAvailableCredits(availableCredits + totalFantasyRating);
      setPlayer(playerLengthOne?.length ? playerLengthOne : player);
      setPlayerTwo(playerLengthTwo?.length ? playerLengthTwo : playerTwo);
      refsheetUnannounced?.current?.close();
    } else {
      toastAlert.showToastError('Please select Unannounced player to remove');
    }
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'wk', title: 'WK'},
    {key: 'bat', title: 'BAT'},
    {key: 'ar', title: 'AR'},
    {key: 'bowl', title: 'BOWL'},
  ]);

  const wk = () => {
    return (
      <View
        style={{width: Screen.Width - 25, marginTop: 10, alignSelf: 'center'}}>
        <FlatList
          data={getPlayersData()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const bat = () => {
    return (
      <View
        style={{width: Screen.Width - 25, marginTop: 10, alignSelf: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getPlayersData()}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const ar = () => {
    return (
      <View
        style={{width: Screen.Width - 25, marginTop: 10, alignSelf: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getPlayersData()}
          renderItem={renderItem}
        />
      </View>
    );
  };
  const bowl = () => {
    return (
      <View
        style={{width: Screen.Width - 25, marginTop: 10, alignSelf: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getPlayersData()}
          renderItem={renderItem}
        />
      </View>
    );
  };
  const renderScene = SceneMap({
    wk: wk,
    bat: bat,
    ar: ar,
    bowl: bowl,
  });

  return (
    <AppSafeAreaView light={true} hidden={false}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <TouchableOpacityView
          onPress={() => NavigationService.goBack()}
          style={styles.topContainer}>
          <FastImage
            resizeMode="contain"
            source={backIconMain}
            style={styles.leftArrow}
          />
          <AppText
            style={{marginTop: 15}}
            weight={POPPINS_MEDIUM}
            color={WHITE}
            type={FORTEEN}>
            Create Team
          </AppText>
        </TouchableOpacityView>
        <ImageBackground
          source={headerIner}
          resizeMode="contain"
          style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={{
                uri:
                  route?.params?.TeamAlogo == undefined
                    ? TeamAlogo
                    : route?.params?.TeamAlogo,
              }}
              style={styles.teamLogo}
              resizeMode="contain"
            />
            <View>
              <AppText color={WHITE} style={{paddingLeft: 5}}>
                {TeamsShortNames && TeamsShortNames?.length !== 0
                  ? TeamsShortNames[0]
                  : ''}
              </AppText>
              <AppText
                color={WHITE}
                weight={POPPINS_MEDIUM}
                style={{paddingLeft: 5}}>
                {player?.length}
              </AppText>
            </View>
          </View>
          <LiveTime
            view={true}
            color={timeDifference >= 1 ? WHITE : WHITE}
            top={true}
            details={contestData}
            setRemoveTabs={setRemoveTabs}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <AppText color={WHITE} style={{paddingRight: 5}}>
                {' '}
                {TeamsShortNames &&
                  TeamsShortNames.length >= 1 &&
                  TeamsShortNames[1]}
              </AppText>
              <AppText
                color={WHITE}
                weight={POPPINS_MEDIUM}
                style={{
                  paddingRight: 5,
                  alignSelf: 'flex-end',
                }}>
                {playerTwo?.length}
              </AppText>
            </View>
            <FastImage
              source={{
                uri:
                  route?.params?.TeamBlogo == undefined
                    ? TeamBlogo
                    : route?.params?.TeamBlogo,
              }}
              style={styles.teamLogo}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
        <View style={styles.card}>
          <View style={styles.midContainer}>
            <View style={{justifyContent: 'center'}}>
              <AppText type={TEN}>Selection</AppText>
              <AppText type={TEN} weight={POPPINS_BOLD}>
                {`${selectedPlayers?.length}/11`}
              </AppText>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <AppText type={TEN} weight={POPPINS_MEDIUM}>
                Credit
              </AppText>
              <AppText type={TEN} weight={POPPINS_BOLD}>
                {availableCredits}
              </AppText>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 8,
              }}>
              {new Array(11).fill('').map((_, index) => {
                return index + 1 > selectedPlayerDetails?.length ? (
                  <PlayerBedge />
                ) : (
                  <PlayerRoleBadge
                    data={selectedPlayerDetails}
                    playerDetails={index + 1}
                  />
                );
              })}
            </View>
            <FastImage
              style={{
                height: 24,
                width: 24,
              }}
              resizeMode="contain"
              tintColor={NLCColor.shineRed}
              source={StopIcon}
            />
          </View>
        </View>

        <View style={{flex: 1}}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={e => {
              setIndex(e);
            }}
            initialLayout={{width: layout.width}}
            renderTabBar={props => (
              <RenderTabBar
                {...props}
                newAllPlayer={newAllPlayer}
                saveTitle={saveTitle}
                filterDataOfSorting={filterDataOfSorting}
                filterSelectedPlayer={filterSelectedPlayer}
                onTabChange={e => {
                  setActiveTab(e);
                }}
              />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <SecondaryButton
            onPress={onPreview}
            buttonStyle={[
              styles.buttonStyle,
              {
                borderWidth: 1,
                borderRadius: 10,
                borderColor: NLCColor.Red,
              },
            ]}
            title={'TEAM PREVIEW'}
            titleStyle={{color: NLCColor.Red}}
          />
          <PrimaryButton
            buttonStyle={styles.buttonStyle}
            onPress={onContinueClick}
            title="CONTINUE"
          />
        </View>
      </CommonImageBackground>
      <PlayerDetailModal
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(false)}
        removePlayerFromTeam={item => removePlayerFromTeam(item)}
        addPlayerInTeam={item => addPlayerInTeam(item)}
        selectedPlayers={selectedPlayers}
        playerimg={playerimg}
        logo={logo}
        saveTeam={saveTeam}
      />
      <RBSheet
        ref={refsheetUnannounced}
        closeOnPressBack={false}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={
          Unannounced?.length == 1
            ? 230
            : Unannounced?.length == 2
            ? 330
            : Unannounced?.length >= 3
            ? 450
            : 450
        }
        customStyles={{
          container: {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingHorizontal: universalPaddingHorizontal,
            paddingVertical: 10,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
            display: 'none',
          },
        }}>
        <UnannouncedPlayer
          Unannounced={Unannounced}
          onSubmit={onSubmit}
          UnannouncedTWO={UnannouncedTWO}
          setAvailableCredits={setAvailableCredits}
          availableCredits={availableCredits}
          onClose={() => {
            refsheetUnannounced?.current?.close(), setOnClose(true);
          }}
        />
      </RBSheet>
      <SpinnerSecond loading={isLoading} />
      <MatchLiveModal AleartLive={AleartLive} />
    </AppSafeAreaView>
  );
};

export default SelectPlayer;

export const RenderTabBar = props => {
  const {
    onTabChange,
    saveTitle,
    filterSelectedPlayer,
    filterDataOfSorting,
    newAllPlayer,
  } = props;
  return (
    <>
      <TabBar
        {...props}
        onTabPress={e => {
          onTabChange(e?.route?.title);
        }}
        scrollEnabled={false}
        tabStyle={[{flex: 1}, props.tabStyle]}
        renderLabel={({route, focused}) => (
          <>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText
                type={FORTEEN}
                color={focused ? RED : BLACK}
                weight={POPPINS_MEDIUM}>
                {`${route?.title}${` (${
                  route?.title == 'WK'
                    ? filterSelectedPlayer?.wk?.length
                    : route?.title == 'BAT'
                    ? filterSelectedPlayer?.bat?.length
                    : route?.title == 'AR'
                    ? filterSelectedPlayer?.all?.length
                    : route?.title == 'BOWL'
                    ? filterSelectedPlayer?.bowl?.length
                    : ''
                })`}`}
              </AppText>
              {focused ? (
                <LinearGradient
                  style={{height: 2, width: 65}}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={[NLCColor.LightRed, NLCColor.shadeRed]}
                />
              ) : (
                <View style={{height: 2, width: 102}} />
              )}
            </View>
          </>
        )}
        indicatorStyle={{backgroundColor: 'transparent'}}
        pressColor={'transparent'}
        style={[{width: '100%', backgroundColor: 'transparent', elevation: 0}]}
      />
      <View style={styles.playerListingHead}>
        <AppText
          style={{flex: 1}}
          type={ELEVEN}
          weight={POPPINS_MEDIUM}
          color={'#B1B1B1'}>
          INFO
        </AppText>
        <TouchableOpacityView
          style={{
            flex: 1.6,
            padding: 2,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => filterDataOfSorting('PLAYERS')}>
          <AppText color={'#B1B1B1'} type={ELEVEN} weight={POPPINS_MEDIUM}>
            PLAYERS
          </AppText>
          {'PLAYERS' == saveTitle ? (
            <FastImage
              style={{
                height: 9,
                width: 8,
                marginLeft: 5,
                marginTop: -1,
                transform: [
                  {rotate: newAllPlayer == 'high' ? '180deg' : '0deg'},
                ],
              }}
              source={dropDownRed}
              resizeMode="contain"
            />
          ) : (
            <></>
          )}
        </TouchableOpacityView>
        <TouchableOpacityView
          style={{
            padding: 2,
            flexDirection: 'row',
            flex: 1.4,
            alignItems: 'center',
          }}
          onPress={() => filterDataOfSorting('AVG POINTS')}>
          <AppText color={'#B1B1B1'} type={ELEVEN} weight={POPPINS_MEDIUM}>
            AVG POINTS
          </AppText>
          {'AVG POINTS' == saveTitle ? (
            <FastImage
              style={{
                height: 9,
                width: 8,
                marginLeft: 5,
                marginTop: -1,
                transform: [
                  {rotate: newAllPlayer == 'high' ? '180deg' : '0deg'},
                ],
              }}
              source={dropDownRed}
              resizeMode="contain"
            />
          ) : (
            <></>
          )}
        </TouchableOpacityView>
        <TouchableOpacityView
          style={{padding: 2, flexDirection: 'row', alignItems: 'center'}}
          onPress={() => filterDataOfSorting('CREDITS')}>
          <AppText color={'#B1B1B1'} type={ELEVEN} weight={POPPINS_MEDIUM}>
            CREDITS
          </AppText>
          {'CREDITS' == saveTitle ? (
            <FastImage
              style={{
                height: 9,
                width: 8,
                marginLeft: 5,
                marginTop: -1,
                transform: [
                  {rotate: newAllPlayer == 'high' ? '180deg' : '0deg'},
                ],
              }}
              source={dropDownRed}
              resizeMode="contain"
            />
          ) : (
            <></>
          )}
        </TouchableOpacityView>
      </View>
    </>
  );
};
