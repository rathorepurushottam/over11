import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {
  AppText,
  BLACK,
  BUTTONCOLOR,
  EIGHT,
  GREEN,
  POPPINS_BOLD,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  TEN,
  WHITE,
} from '../../common/AppText';
import NavigationService from '../../navigation/NavigationService';
import { MY_CONTEST, USER_CONTEST } from '../../navigation/routes';
import { nameSlice, nameSliceTwo, toastAlert } from '../../helper/utility';
import { useDispatch, useSelector } from 'react-redux';
import { setContestData } from '../../slices/matchSlice';
import FastImage from 'react-native-fast-image';
import { NewColor, colors } from '../../theme/color';
import { VS, joinMatch, myMatchbackGround, mymatchebox } from '../../helper/image';
import { Screen, universalPaddingHorizontal } from '../../theme/dimens';
import { LiveTime } from '../../common/LiveTime';
export const getDate = details => {
  let a = moment();
  let b = moment(details?.StartDateTime);
  const duration = moment.duration(b.diff(a));
  const diffInHours = Math.floor(duration.asHours());
  const diffInDays = Math.floor(duration.asDays());
  const diffInMin = duration.minutes();
  const diffInSec = duration.seconds();
  if (diffInHours > 24) {
    let temp = {
      hour: diffInHours,
      time: `${diffInDays}d`,
      minute: 40,
    };
    return temp;
  } else {
    let temp = {
      hour: diffInHours,
      minute: diffInMin,
      time: `${diffInHours > 0 ? `${diffInHours}h` : ''} ${diffInMin}m ${diffInHours > 0 ? '' : `${diffInSec}s`
        }`,
    };
    return temp;
  }
};
export const TruncateString = (name, id) => {
  const MAX_LENGTH = id ? 10 : 25;
  // Check if the name length exceeds the maximum length
  if (name.length > MAX_LENGTH) {
    // Truncate the string and add an ellipsis
    const truncatedName = name.slice(0, MAX_LENGTH) + '...';
    return truncatedName
  } else {
    // If the name is within the maximum length, display it as is
    return name
  }
}
const Matchsection = ({
  details,
  isFromMyMatch = false,
  // tab = null,
  isHome,
  index,
}) => {
  const dispatch = useDispatch();
  const { contest_details, status } = details ?? '';
  const myMatchesHome = useSelector(state => state.match.myMatchesHome);
  let isMatchToday = moment().isSame(details?.StartDateTime, 'day');
  const [contestDetails, setContestDetails] = useState(null);
  const [removeTabs, setRemoveTabs] = useState(false)
  const { data } = (contest_details && contest_details[0]) ?? '';
  const contestList = useSelector(state => state?.match?.contestList);
  const [time, setTime] = useState({
    time: '',
    hour: 0,
    minute: 0,
  });
  const dateObj = new Date(details?.StartDateTime);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  const formattedTime =
    formattedHours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + meridiem;
  const currentDate = new Date();
  const inputDate = new Date(details?.StartDateTime);
  const timeDifference = Math.floor(
    (inputDate - currentDate) / (24 * 60 * 60 * 1000),
  );
  const isPastTime = inputDate < currentDate;
  let tab = isPastTime == true ? 'Completed' : null
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getDate(details));
    }, 1000);
    return () => clearInterval(interval);
  }, [details]);
  useEffect(() => {
    const contest = data?.reduce((prev, current) => {
      return Number(prev?.winning_amount) > Number(current?.winning_amount)
        ? prev
        : current;
    });

    setContestDetails(contest);
  }, [data]);
  const onNavigateContest = () => {
    if (details?.contest_details?.length == 0) {
      return toastAlert.showToastError('There Are No Contest For This Match');
    } else if (isPastTime == false) {
      dispatch(setContestData({ ...details }));
      NavigationService.navigate(MY_CONTEST, { isFromMyMatch: false, tab });
    } else if (isPastTime == true) {
      dispatch(setContestData({ ...details }));
      NavigationService.navigate(MY_CONTEST, { isFromMyMatch: true, tab });
    } else {
      dispatch(setContestData({ ...details }));
      NavigationService.navigate(MY_CONTEST, { isFromMyMatch: false, tab });
    }
  };

  return (
    <Pressable onPress={onNavigateContest}>
      <View
        style={[
          styles.mainContainer,
          {
            marginLeft:
              myMatchesHome?.length + 1 == index
                ? 0
                : universalPaddingHorizontal,
            marginRight:
              myMatchesHome?.length - 1 == index
                ? universalPaddingHorizontal
                : 0,
            borderRadius: 10
          },
        ]}>
        <ImageBackground
          resizeMode='contain'
          style={{
            width: 185,
            height: 65,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            alignSelf: "center"
          }}
          source={joinMatch}>
          <FastImage
            resizeMode="contain"
            style={styles.teamImage}
            source={{ uri: details?.TeamAlogo }}
          />
          <AppText weight={POPPINS_BOLD} type={TEN} style={styles.seriesNameText}>
            {TruncateString(details?.SeriesName, true)}
          </AppText>
          <FastImage
            resizeMode="contain"
            style={styles.teamImage}
            source={{ uri: details?.TeamBlogo }}
          />
        </ImageBackground>
        <View style={{ alignSelf: "center", marginTop: -15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              color={BLACK}
              weight={POPPINS_SEMI_BOLD} type={TEN} numberOfLines={1}>
              {details?.TeamA && nameSliceTwo(details?.TeamA)}
            </AppText>
            <FastImage source={VS}
              resizeMode='contain'
              style={{ height: 27, width: 15, marginRight: 5, marginLeft: 5,}} 
              tintColor= '#00000050'/>
            <AppText
              color={BLACK} weight={POPPINS_SEMI_BOLD} type={TEN} numberOfLines={1}>
              {details?.TeamB && nameSliceTwo(details?.TeamB)}
            </AppText>
          </View>
          <View style={styles.oneView}>
            {details?.Status === 'Completed' || details?.Status === 'Cancelled' ?
              <AppText
                weight={POPPINS_MEDIUM}
                type={EIGHT}
                color={BUTTONCOLOR}>
                {details?.Status}
              </AppText>
              :
              <>
                {isPastTime ?
                  <AppText
                    type={TEN}
                    weight={POPPINS_MEDIUM}
                    style={
                      [
                        {
                          color:
                            timeDifference >= 1
                              ? colors.gray
                              : colors.lightRed,
                        },
                      ]
                    }>
                    {
                      details?.Status === 'Live'
                        ? details?.Status
                        : formattedTime
                    }
                  </AppText> :
                  <>
                    <LiveTime
                      type={EIGHT}
                      top={true}
                      details={details}
                      setRemoveTabs={setRemoveTabs}
                    />
                  </>
                }
              </>
            }
          </View>
        </View>
        <View style={styles.bottomView}>
          <AppText
            color={BLACK}
            style={{
              marginTop: 2,
            }}>
            {details?.countTeam} Team
          </AppText>
          <AppText
            color={BLACK}
            style={{
              marginTop: 2,
              marginLeft: 15,
            }}>
            {details?.countContest} Contests
          </AppText>
        </View>
      </View>
    </Pressable >
  );
};
const styles = StyleSheet.create({
  bottom: {
    height: 22,
    justifyContent: 'space-around',
    backgroundColor: '#1F2A2C',
    flexDirection: 'row',
    alignItems: 'center',
    width: 190,
    top: 30,
    right: 10,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  today: {
    color: 'white',
    fontSize: 10,
  },
  live: {
    color: '#15CE31',
    fontSize: 10,
  },
  mainContainer: {
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    // width: Screen.Width / 2,
    resizeMode: 'contain',
    backgroundColor: colors.white,
    paddingHorizontal: 5
  },
  seriesNameText: {
    textAlign: 'center',
    marginTop: -10
  },
  teamView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
  },
  teamAtext: {},
  teamBtext: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'POPPINS',
    flex: 1,
    textAlign: 'right',
  },
  teamLogoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  teamImage: {
    width: 45,
    height: 40,
    resizeMode: 'contain',
    marginTop: 5,
  },
  winning_amount: {
    color: 'white',
    fontSize: 9,
    fontWeight: '500',
    fontFamily: 'POPPINS',
    left: 15,
  },
  oneView: {
    alignItems: 'center',
  },
  bottomView: {
    height: 22,
    backgroundColor: NewColor.linerBlackFivegry,
    marginTop: 9,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
});
export default Matchsection;
