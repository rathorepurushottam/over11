import { createSlice } from '@reduxjs/toolkit';
import { Linking } from 'react-native';
import { appOperation } from '../appOperation';
import { toastAlert } from '../helper/utility';
import NavigationService from '../navigation/NavigationService';
import { CONTESTSHARE, KYC_SCREEN, MY_BALANCE, OTHER_USER_PROFILE, PRIVATECONTESTLEADER, SHARE_TEAM } from '../navigation/routes';
import { getKycDetails, getUserProfile } from '../actions/profileAction';
import { customSort } from '../screens/Selectsubstitute.js/SelectSubstitute';
function expandData(data) {
  return data.map((item) => {
    const expandedData = item.data.map((nestedData) => ({ ...nestedData }));
    return { ...item, data: expandedData };
  });
}
export const initialState = {
  upcomingMatches: [],
  myTeams: [],
  myContest: [],
  CreateContestData: [],
  myMatchesData: [],
  isLoading: false,
  contestData: undefined,
  contestList: [],
  isContestEntry: false,
  selectedMatch: undefined,
  allPlayers: [],
  playerDetail: undefined,
  shareLink: undefined,
  walletCreateData: undefined,
  getPlayerTab: undefined,
  adharVerifydata: undefined,
  OtherProfileData: undefined,
  SortbyFilterData: [],
  upiVerifiy: undefined,
  contestListTeam: [],
  phonePeGetway_Response: undefined,
  allContestList: [],
  RemaningPlayer: [],
  substitute: [],
  saveTeamShare: [],
  MyCreateContestData: [],
  MatchDetails: undefined,
  dataContest: undefined,
  details: [],
  addharDetails: undefined,
  ifscDetails: undefined
};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setUpComingMatches: (state, { payload }) => {
      state.upcomingMatches = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setMyTeam: (state, { payload }) => {
      state.myTeams = payload;
    },
    setMyContest: (state, { payload }) => {
      state.myContest = payload;
    },
    setMyMatchesData: (state, { payload }) => {
      state.myMatchesData = payload;
    },
    setContestData: (state, { payload }) => {
      state.contestData = payload;
    },
    setMyMatchesHome: (state, { payload }) => {
      state.myMatchesHome = payload;
    },
    setCreateContest: (state, { payload }) => {
      state.CreateContestData = payload;
    },
    setContestList: (state, { payload }) => {
      state.contestList = payload;
    },
    setIsContestEntry: (state, { payload }) => {
      state.isContestEntry = payload;
    },
    setSelectedMatch: (state, { payload }) => {
      state.selectedMatch = payload;
    },
    setAllPlayers: (state, { payload }) => {
      state.allPlayers = payload;
    },
    setPlayerDetail: (state, { payload }) => {
      state.playerDetail = payload;
    },
    setShareLink: (state, { payload }) => {
      state.shareLink = payload;
    },
    setCreateWallet: (state, { payload }) => {
      state.walletCreateData = payload;
    },
    setTab: (state, { payload }) => {
      state.getPlayerTab = payload;
    },
    setAdharVerify: (state, { payload }) => {
      state.adharVerifydata = payload;
    },
    setOtherUserProfile: (state, { payload }) => {
      state.OtherProfileData = payload;
    },
    setUpiVerifiy: (state, { payload }) => {
      state.upiVerifiy = payload;
    },
    setSortByFilter: (state, { payload }) => {
      state.SortbyFilterData = payload;
    },
    setContestListTeam: (state, { payload }) => {
      state.contestListTeam = payload;
    },
    setPhonePeGewat: (state, { payload }) => {
      state.phonePeGetway_Response = payload;
    },
    setAllContest: (state, { payload }) => {
      state.allContestList = payload;
    },
    setRemaningPlayer: (state, { payload }) => {
      state.RemaningPlayer = payload;
    },
    setsubstitute: (state, { payload }) => {
      state.substitute = payload;
    },
    setShareTeam: (state, { payload }) => {
      state.saveTeamShare = payload;
    },
    setMyCreateContest: (state, { payload }) => {
      state.MyCreateContestData = payload;
    },
    setSavematchDetails: (state, { payload }) => {
      state.MatchDetails = payload;
    },
    setdataContest: (state, { payload }) => {
      state.dataContest = payload;
    },
    setMathdetails: (state, { payload }) => {
      state.details = payload;
    },
    setAdharDetails: (state, { payload }) => {
      state.addharDetails = payload;
    },
    setifscDetails: (state, { payload }) => {
      state.ifscDetails = payload;
    },
  },
});

export const {
  setUpComingMatches,
  setMyTeam,
  setMyContest,
  setMyMatchesData,
  setMyMatchesHome,
  setsavekey,
  setjoinuserContest,
  setContestData,
  setContestList,
  setIsContestEntry,
  setSelectedMatch,
  setAllPlayers,
  setPlayerDetail,
  setShareLink,
  setCreateWallet,
  setsubstitute,
  setLoading,
  setAdharVerify,
  setCreateContest,
  setTab,
  setUpiVerifiy,
  setOtherUserProfile,
  setSortByFilter,
  setContestListTeam,
  setPhonePeGewat,
  setAllContest,
  setRemaningPlayer,
  setShareTeam,
  setMyCreateContest,
  setSavematchDetails,
  setdataContest,
  setMathdetails,
  setAdharDetails,
  setForSheet,
  setifscDetails,
} = matchSlice.actions;
export default matchSlice.reducer;

export const getMyTeam = data => async dispatch => {
  try {
    const res = await appOperation.customer.getMyTeam(data);
    if (res.code == 200) {
      dispatch(setMyTeam(res?.data));
    }
  } catch { }
};
export const createContestData = data => async dispatch => {
  try {
    dispatch(setCreateContest(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getMyJoinedContest = data => async dispatch => {
  try {
    const res = await appOperation.customer.getMyJoinedContest(data);
    if (res.code == 200) {
      const updatedData = res.data.map((dataItem) => {
        const arrayfilter = res.arr.filter((e) => e?.contest_category_id === dataItem?.contest_category_id);
        return { ...dataItem, teamDetails: arrayfilter };
      });
      res.data = updatedData;
      dispatch(setMyContest(res?.data));
    }
  } catch (e) {
    console.log(e);
  }
};
export const setcreateContest =
  (data, matchid, payAmount, _id, _matchid, teamName, contestListId) => async dispatch => {
    let newData = {
      data1: data,
      matchid1: matchid,
    };
    console.log(JSON.stringify(newData));
    try {
      const res = await appOperation.customer.createContest(newData);
      console.log(res, 'res');
      // dispatch(setjoinuserContest(res))
      if (res?.success) {
        const data = {
          match_id: res?.matchcontestofuser?.match_id,
          matchid: _matchid,
          contest_category_id:
            res?.matchcontestofuser?.contest_category_id,
          teams_id: [_id],
          match_contest_category_id: res?.matchcontestofuser?._id,
          amount: payAmount,
          method: 'wallet',
          teamName: teamName,
        };
        dispatch(joinuserContest(data));
        dispatch(createContestData([]));
        dispatch(MycreateContest(contestListId));
        NavigationService.navigate(CONTESTSHARE);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const joinuserContest = data => async dispatch => {
  try {
    const res = await appOperation.customer.joinContestUserPri(data);
    console.log('res:::::::::', res);
    dispatch(setjoinuserContest(res));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const MycreateContest = (data, condition) => async dispatch => {
  try {
    const res = await appOperation.customer.getMyCreateContest(data);
    if (res.code == 200) {
      const updatedData = res.data.map((dataItem) => {
        const arrayfilter = res.arr.filter((e) => e?.contest_category_id === dataItem?.contest_category_id);
        return { ...dataItem, teamDetails: arrayfilter };
      });
      res.data = updatedData;
      let datanew = {
        first: res.data[0]?.match_id,
        second: res.data[0]?.contest_category_id
      }
      dispatch(setMyCreateContest(res?.data));
      dispatch(setSavematchDetails(res?.matchesdata));
      dispatch(shareTeamSave(datanew))
      condition ? NavigationService.navigate(PRIVATECONTESTLEADER) : null;
    }
  } catch (e) {
    console.log(e);
  }
};
export const joinContest = (data, matchDetails) => async dispatch => {
  try {
    const res = await appOperation.customer.joinContest(data);
    if (res.code == 200) {
      toastAlert.showToastError(res?.message);
      let data = {}
      dispatch(getContestList(matchDetails?._id));
      dispatch(getMyTeam(matchDetails?._id));
      dispatch(getMyJoinedContest(matchDetails?._id));
      dispatch(getUserProfile(false, false));
      let outputObject = {};
      dispatch(getContestList(outputObject, matchDetails?._id));
    }
  } catch (e) {
    console.log(e);
  }
};
export const savekey = data => async dispatch => {
  try {
    dispatch(setsavekey(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getContestList = (outputObject, id) => async dispatch => {
  let data = {
    matchid: id,
    object: outputObject,
  };
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.getContestList(data);
    if (res?.code === 200) {
      const MyContest = { ...res?.data }
      const newData = MyContest?.data?.map((dataitem) => {
        const filteredData = dataitem?.data?.map((dataItem) => {
          const arrayfilter = res?.getuserjounedcont?.filter(
            (e) =>
              e?.contest_category_id === dataItem?.contest_category_id &&
              !dataItem?.JoinWithMULT
          );
          const arrayfilterMulti = res?.getuserjounedcont?.filter(
            (e) =>
              e?.contest_category_id === dataItem?.contest_category_id
          );
          return { ...dataItem, remove: arrayfilter?.length ? true : false, teamDetails: arrayfilterMulti };
        });

        return { ...dataitem, data: filteredData };
      });
      const expandedData = expandData(newData);
      const expandDataNew = {
        data: expandedData,
      };
      dispatch(setContestList(expandDataNew));
      dispatch(setContestListTeam(res?.getuserjounedcont))
      const newArrya = [];
      const desiredInnerDataIds = res.data.reduce((acc, category) => {
        for (const entry of category.data) {
          acc.push(entry.inner_data_id);
        }
        return acc;
      }, []);
      const finalArray = { data: [] };
      for (const category of res?.data) {
        for (const entry of category?.data) {
          if (desiredInnerDataIds.includes(entry.inner_data_id)) {
            finalArray.data.push(entry);
          }
        }
      }
      dispatch(getFilterSortby(finalArray));
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getMyMatches = status => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.getMyMatchesData(status);
    if (res.code == 200) {
      dispatch(setMyMatchesData(res.data));
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getAllPlayerList = (id, data, subsitute, newData, navigate) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.getAllPlayers(id, data);

    if (res.code == 200) {
      const players = [];
      res?.data?.forEach(items => {
        items?.players?.forEach(player => {
          let data = { ...player };
          data['teamName'] = items?.team?.abbr;
          data['title'] = items?.team?.title;
          const isLastPlay = items?.last_match_played?.some(
            lastPlay => lastPlay?.player_id == player?.pid
          );
          data['last_play'] = isLastPlay;
          players.push(data);
        });
      });
      if (subsitute) {
        const newplayer = players.filter(
          player =>
            !newData.some(
              (existingPlayer) => existingPlayer.pid === player.pid,
            ),
        );
        let substitutePlayer = newData?.filter(item => {
          return item?.substitute === true;
        });
        let allPlayer = [...substitutePlayer, ...newplayer]
        const RemaningPlayerNew = allPlayer?.filter(player => player).sort(customSort)
        dispatch(setRemaning(RemaningPlayerNew));
      }
      dispatch(setAllPlayers(players));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getPlayerDetail = id => async dispatch => {
  try {
    dispatch(setPlayerDetail(undefined));
    dispatch(setLoading(true));
    const res = await appOperation.customer.player_detail(id);

    if (res?.success) {
      dispatch(setPlayerDetail(res.data));
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getSubsituted = data => async dispatch => {
  try {
    dispatch(setsubstitute(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getShareUrl = id => async dispatch => {
  try {
    const res = await appOperation.customer.share_url(id);
    if (res?.success) {
      dispatch(setShareLink(res?.data));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const setMatchRemainder = data => async dispatch => {
  try {
    const res = await appOperation.customer.match_reminder(data);
    console.log('res:::::::::', res);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getTab = data => async dispatch => {
  try {
    dispatch(setTab(data));
  } catch (e) {
    console.log(e);
  }
};
export const getAdharVerify = data => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.adharverify(data);
    console.log(res, 'resresresres');
    if (res?.success) {
      dispatch(setAdharVerify(res.data));
      toastAlert.showToastError(res.message);
      dispatch(getKycDetails());
      NavigationService.navigate(MY_BALANCE)
    } else {
      toastAlert.showToastError(res.message);

    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getOtherUserProfile = data => async dispatch => {
  try {
    const res = await appOperation.customer.otherUserProfile(data);
    if (res?.success) {
      dispatch(setOtherUserProfile(res.data));
      NavigationService.navigate(OTHER_USER_PROFILE);
    }
  } catch (e) {
    console.log(e, 'resresresres');

    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getUpiVerifiy = data => async dispatch => {
  try {
    const res = await appOperation.customer.upiVerifiy(data);
    if (res?.success) {
      toastAlert.showToastError(res.message);
      dispatch(getKycDetails());
      NavigationService.navigate(KYC_SCREEN);
    } else {
      toastAlert.showToastError(res.message);

    }
  } catch (e) {
    console.log(e, 'resresresres');

    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getFilterSortby = data => async dispatch => {
  try {
    dispatch(setSortByFilter(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const paymentGetwayPhonepe = (data, title, sheet) => async dispatch => {
  try {
    const res = await appOperation.customer.phonePeGetway(data);
    if (res?.success) {
      if (title == 'PAY_PAGE') {
        dispatch(setPhonePeGewat(res?.data?.data))
        sheet.current.open()
      } else {
        const payIntent = res?.data?.data?.instrumentResponse?.intentUrl;
        Linking.openURL(payIntent)
          .then((supported) => {
            if (!supported) {
              console.error('WhatsApp is not installed on your device.');
            }
          })
          .catch((error) => {
            console.error('An error occurred while opening WhatsApp:', error);
          });
      }
      // console.log(JSON.stringify(res), '==========');
    }
  } catch (e) {
    console.log(e, 'resresresres');

    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const paymentGetwayPhonepeText = (data, title, sheet) => async dispatch => {
  try {
    const res = await appOperation.customer.phonePeGetwayTest(data);
    if (res?.success) {
      if (title == 'PAY_PAGE') {
        dispatch(setPhonePeGewat(res?.data?.data))
        sheet.current.open()
      } else {
        const payIntent = res?.data?.data?.instrumentResponse?.intentUrl;
        Linking.openURL(payIntent)
          .then((supported) => {
            if (!supported) {
              console.error('WhatsApp is not installed on your device.');
            }
          })
          .catch((error) => {
            console.error('An error occurred while opening WhatsApp:', error);
          });
      }
      // console.log(JSON.stringify(res), '==========');
    }
  } catch (e) {
    console.log(e, 'resresresres');

    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const setRemaning = data => async dispatch => {
  try {
    dispatch(setRemaningPlayer(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const shareTeam = (data) => async dispatch => {
  try {
    const res = await appOperation.customer.share_Team(data);
    if (res?.success) {
      dispatch(setShareTeam(res?.data))
      let matchesObject = res?.matchesData && res?.matchesData[0];
      dispatch(setContestData(matchesObject))
      let newData = [];
      res?.data[0]?.players?.forEach(player => {
        let data = { ...player };
        data['title'] = player?.primary_team?.title;
        newData.push(data);
      });
      NavigationService.navigate(SHARE_TEAM, {
        selectedPlayerDetails: newData,
        useDetails: res?.data && res?.data[1]
      })
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const MycreateShareContest = (data, condition, category) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.getMyShareCreateContest(data, category)
    if (res.code == 200) {
      const updatedData = res.data.map((dataItem) => {
        const arrayfilter = res.arr.filter((e) => e?.contest_category_id === dataItem?.contest_category_id);
        return { ...dataItem, teamDetails: arrayfilter };
      });
      res.data = updatedData;
      let datanew = {
        first: res.data[0]?.match_id,
        second: res.data[0]?.contest_category_id
      }
      dispatch(setMyCreateContest(res?.data));
      dispatch(setSavematchDetails(res?.matchesdata));
      dispatch(shareTeamSave(datanew))
      condition ? NavigationService.navigate(PRIVATECONTESTLEADER) : null;
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const shareTeamSave = (data) => async dispatch => {
  try {
    const res = await appOperation.customer.share_Team_Data(data);
    if (res?.success) {
      let matchesObject = res?.data && res?.data[0];
      dispatch(setdataContest(matchesObject));
      const updatedData = res.contestdata.map((dataItem) => {
        const arrayfilter = res.arr.filter((e) => e?.contest_category_id === dataItem?.usercontest_details[0]?.contest_category_id);
        return { ...dataItem, teamDetails: arrayfilter };
      });
      res.contestdata = updatedData;
      dispatch(setMathdetails(res?.contestdata[0]))
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addharVerifiy = (data, filterSheet, setIsTimerActive) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.addharSendOtp(data);
    if (res?.success) {
      filterSheet?.current?.open();
      dispatch(setAdharDetails(res.data))
      toastAlert.showToastError(res.message)
      setIsTimerActive(true)
    } else {
      toastAlert.showToastError(res.message)
      dispatch(setAdharDetails([]))
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const emailVerifiyOtp = (data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.emailOtpVerifiry(data);
    if (res?.success) {
      toastAlert.showToastError(res.message)
      dispatch(getKycDetails());
      NavigationService.navigate(KYC_SCREEN);
    } else {
      toastAlert.showToastError(res.message)
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const addharVerifiyOtp = (data, filterSheet) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.adhaarOtpVerifiry(data);
    if (res?.success) {
      toastAlert.showToastError(res.message)
      filterSheet?.current?.close();
      dispatch(getKycDetails());
      NavigationService.navigate(MY_BALANCE);
    } else {
      toastAlert.showToastError(res.message)
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const panVerifiy = (data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.panVerifiyKyc(data);
    if (res?.success) {
      toastAlert.showToastError(res.message)
      dispatch(getKycDetails());
      NavigationService.navigate(KYC_SCREEN);
    } else {
      toastAlert.showToastError(res.message)
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const dlVerifiy = (data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.dlVerifiyKyc(data);
    if (res?.success) {
      toastAlert.showToastError(res.message)
      dispatch(getKycDetails());
      NavigationService.navigate(KYC_SCREEN);
    } else {
      toastAlert.showToastError(res.message)
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const voterIDVerifiy = (data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.voterIDVerifiyKyc(data);
    if (res?.success) {
      toastAlert.showToastError(res.message)
      dispatch(getKycDetails());
      NavigationService.navigate(KYC_SCREEN);
    } else {
      toastAlert.showToastError(res.message)
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const bankVerifiy = (data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.bankVerifiyKyc(data);
    if (res?.success) {
      toastAlert.showToastError(res.message)
      dispatch(getKycDetails());
      NavigationService.navigate(KYC_SCREEN);
    } else {
      toastAlert.showToastError(res.message)
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const ifscVerifiy = (data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.ifscVerifiyKyc(data);
    if (res?.success) {
      dispatch(setifscDetails(res.data))
    } else {
      toastAlert.showToastError(res.message)
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const deleteupi = (data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.delpayouteteUpi(data);
    if (res?.success) {
      toastAlert.showToastError(res.message)
      dispatch(getKycDetails());
    } else {
      toastAlert.showToastError(res.message)
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const payoutWithdraw = (data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await appOperation.customer.payout(data);
    if (res?.success) {
      toastAlert.showToastError(res.message)
      dispatch(getUserProfile(false, false));
      NavigationService.navigate(MY_BALANCE)
    } else {
      toastAlert.showToastError(res.message)
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};