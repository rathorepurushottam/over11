import React, { useEffect, useState, useRef } from 'react';
import { View, Pressable, ImageBackground } from 'react-native';
import styles from './styles';
import { Newarrow, headLine, notified } from '../../helper/image';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {
  AppText,
  BLACK,
  BUTTONCOLOR,
  ELEVEN,
  GREEN,
  LATO_BOLD,
  LATO_SEMI_BOLD,
  NORMAL,
  POPPINS_BOLD,
  POPPINS_BOLD_ITALIC,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  RED,
  SEMI_BOLD,
  TEN,
  WHITE,
} from '../../common/AppText';
import NavigationService from '../../navigation/NavigationService';
import { MY_CONTEST, USER_CONTEST } from '../../navigation/routes';
import { nameSlice, toastAlert } from '../../helper/utility';
import { setContestData, setSortByFilter } from '../../slices/matchSlice';
import { useDispatch } from 'react-redux';
import { TouchableOpacityView } from '../../common/TouchableOpacityView';
import RBSheet from 'react-native-raw-bottom-sheet';
import MatchRemainder from './matchRemainder/MatchRemainder';
import { NLCColor, colors } from '../../theme/color';
import { flexOne } from '../../theme/dimens';
import { LiveTime } from '../../common/LiveTime';
import LinearGradient from 'react-native-linear-gradient';

const MatchCard = ({
  details,
  isFromMyMatch = false,
  tab = null,
  isHome,
  myMatches,
  completedmatch = true,
}) => {
  const dispatch = useDispatch();
  const sheet = useRef();
  let isMatchToday = moment().isSame(details?.StartDateTime, 'day');
  const [contestDetails, setContestDetails] = useState(null);
  const [removeTabs, setRemoveTabs] = useState(false)
  const dateObj = new Date(details?.StartDateTime);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  const formattedTime =
    formattedHours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + meridiem;
  const currentDate = new Date();
  const inputDate = new Date(details?.StartDateTime);
  const { data } = (details?.contest_details && details?.contest_details[0]) ?? '';
  const timeDifference = Math.floor(
    (inputDate - currentDate) / (24 * 60 * 60 * 1000),
  );
  useEffect(() => {
    const contest = data?.reduce((prev, current) => {
      return Number(prev?.winning_amount) > Number(current?.winning_amount)
        ? prev
        : current;
    });

    setContestDetails(contest);
  }, [data]);
  const onNavigateContest = () => {
    if (details?.Status === 'Completed') {
      dispatch(setContestData({ ...details, isFromMyMatch, tab, isHome }));
      NavigationService.navigate(MY_CONTEST, { isFromMyMatch: true });
    } else if (details?.contest_details?.length == 0) {
      return toastAlert.showToastError('There Are No Contest For This Match');
    } else {
      dispatch(setContestData({ ...details, isFromMyMatch, tab, isHome }));
      NavigationService.navigate(MY_CONTEST, { isFromMyMatch: false });
      dispatch(setSortByFilter([]))
    }
  };
  return (
    <Pressable
      style={
        [contestDetails
          ? styles.cardContainer
          : styles.cardContainerTwo,
        { height: details?.contest_details?.length == 0 ? 110 : 140 }]}
      onPress={onNavigateContest}>
      <View style={styles.matchImage}>
        <View>
          <View style={styles.seriesNametext} >
            <AppText
              numberOfLines={1}
              weight={POPPINS_SEMI_BOLD}
              color={BLACK}
              style={{ bottom: 22 }} >{details?.SeriesName}</AppText>

          </View>
          {details?.line_up_out && (
            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end", marginRight: 10 }}>
              <View style={styles.greenCircle} />
              <AppText style={{ marginTop: 6 }} color={GREEN} type={TEN}>
                LINEUP OUT
              </AppText>
            </View>
          )}
        </View>

        <View style={[styles.teamContainer, { marginTop: details?.line_up_out ? 0 : 20 }]}>
          <View
            style={{ flex: flexOne, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AppText weight={POPPINS_MEDIUM} type={TEN} numberOfLines={1} color={BLACK}>
                {details?.TeamA && nameSlice(details?.TeamA)}
              </AppText>
              <FastImage
                source={{ uri: details?.TeamAlogo }}
                style={styles.teamImage}
                resizeMode="contain"
              />
            </View>
            <AppText
              style={{
                marginLeft: 5,
                marginTop: 20,
              }}
              weight={POPPINS_MEDIUM} color={BLACK}>
              {details?.TeamsShortNames[0]}
            </AppText>
          </View>
          <View style={styles.timeContainer}>
            <View
              style={{
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: colors.lightRed,
                paddingVertical: 2
              }}>
              <LiveTime
                type={ELEVEN}
                top={true}
                details={details}
                setRemoveTabs={setRemoveTabs}

              />
            </View>
            <AppText color={BLACK}>{formattedTime}</AppText>
          </View>
          <View style={{ alignItems: 'flex-end', flex: 1 }}>
            <View
              style={{
                flex: flexOne,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AppText
                color={BLACK}
                style={{
                  marginRight: 5,
                  marginTop: 20,
                }}
                numberOfLines={1}
                weight={NORMAL}
              >
                {details?.TeamsShortNames[1]}
              </AppText>
              {/* <View style={styles.teamShortNameTextTwo}> */}
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <AppText
                  color={BLACK}
                  style={{
                    marginRight: 5,
                  }}
                  weight={NORMAL}>

                  {details?.TeamB && nameSlice(details?.TeamB)}
                </AppText>
                <FastImage
                  source={{ uri: details?.TeamBlogo }}
                  style={styles.teamImage}
                  resizeMode="contain"
                />
              </View>
              {/* </View> */}
            </View>
          </View>
        </View>
      </View>
      {
        myMatches !== undefined ? (
          <View style={styles.bottom}>
            <View style={styles.teamConunt}>
              <View style={styles.teamConunt}>
                <AppText weight={POPPINS_MEDIUM}>{details?.countTeam} </AppText>
                <AppText weight={POPPINS_MEDIUM}>Team</AppText>
              </View>
              <View
                style={[
                  styles.teamConunt,
                  {
                    marginLeft: 20,
                  },
                ]}>
                <AppText weight={POPPINS_MEDIUM}>
                  {details?.countContest}{' '}
                </AppText>
                <AppText weight={POPPINS_MEDIUM}>Contests</AppText>
              </View>
            </View>
          </View>
        ) : (
          <>
            {details?.contest_details?.length == 0 ? <></> :
              <View style={[styles.bottom,{height:34}]}>
                {contestDetails?.contest_type && contestDetails?.contest_type ? (
                  <ImageBackground
                    source={headLine}
                    style={styles.contestName}>
                    <AppText
                      color={BUTTONCOLOR}
                      style={{ fontSize: 11, }}
                      weight={POPPINS_MEDIUM}>
                      {contestDetails?.contest_type}
                    </AppText>
                    <AppText
                      weight={LATO_SEMI_BOLD}
                      type={ELEVEN}
                      color={BUTTONCOLOR}
                      style={[
                        styles.textStyle,
                        { marginLeft: 5, },
                      ]}>
                      ₹
                    </AppText>
                    <AppText color={BUTTONCOLOR} weight={POPPINS_MEDIUM} style={[styles.textStyle, { marginTop: 2 }]}>
                      {contestDetails?.winning_amount}
                    </AppText>
                  </ImageBackground>
                ) : <View style={{ flex: 1 }}></View>}

                {/* <View style={styles.lineUpOut}>
                  <FastImage source={Newarrow} resizeMode='contain'
                    style={{
                      height: 43,
                      width: 43
                    }} tintColor={NLCColor.Red} />
                </View> */}
              </View>
            }
          </>
        )
      }
      <RBSheet
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
          data={details}
          onClose={() => sheet?.current?.close()}
        />
      </RBSheet>
    </Pressable >
  );
};

export default MatchCard;
