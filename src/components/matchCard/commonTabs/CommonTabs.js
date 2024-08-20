
import React, { useMemo, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { TouchableOpacityView } from '../../../common/TouchableOpacityView';
import styles from './styles';
import { AppText, BLACK, BLACKOPACITY, FORTEEN, LIGHTBLUE, POPPINS_BOLD, POPPINS_SEMI_BOLD, WHITE } from '../../../common/AppText';
import { NLCColor, colors } from '../../../theme/color';
import SlideSwiper from '../../../common/SlideSwiper';
import FastImage from 'react-native-fast-image';
import { bottomtapHed } from '../../../helper/image';

const CommonTabs = ({ activeTab, setActiveTab, totalCount, completeMatch, details, removeTabs }) => {
  const data = [
    {
      id: 1,
      title: 'Contest',
      showTitle: 'Select Contest',
    },
    {
      id: 2,
      title: `My Contest (${totalCount[0]})`,
      showTitle: 'My Contest',
    },
    {
      id: 3,
      title: `My Team (${totalCount[1]})`,
      showTitle: 'My Team',
    },
  ];
  // const data = [
  //   { key: 'first', title: 'Contest' },
  //   { key: 'second', title: `My Contest (${totalCount[0]})` },
  //   { key: 'three', title: `My Team (${totalCount[1]})` },
  // ];
  const dataTwo = [
    {
      id: 2,
      title: `My Contest (${totalCount[0]})`,
      showTitle: 'My Contest',
    },
    {
      id: 3,
      title: `My Team (${totalCount[1]})`,
      showTitle: 'My Team',
    },
  ];
  return (
    <View style={styles.container}>
      {completeMatch || removeTabs ? (
        <View style={styles.tabContainer}>
          {dataTwo?.map(item => {
            return item.id == activeTab ? (
              <LinearGradient
              colors={[NLCColor.LightRed,NLCColor.shadeRed]}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  height: 38,
                  justifyContent: 'space-evenly',
                  padding: 5,
                  alignItems: 'center',
                  backgroundColor: "#1F7596",
                  borderTopRightRadius: item.id == 2 ? 20 : 0,
                  borderBottomRightRadius: item.id == 2 ? 20 : 0,
                  // borderRightWidth: item.id == 2 ? 2 : 0,
                  borderBottomRightWidth: item.id == 2 ? 2 : 0,
                  borderColor: colors.black,
                  borderTopLeftRadius: item.id == 3 ? 20 : 0,
                  borderBottomLeftRadius: item.id == 3 ? 20 : 0,
                  borderLefttWidth: item.id == 3 ? 2 : 0,
                  borderBottomLeftWidth: item.id == 3 ? 2 : 0,
                }}>
                <AppText type={FORTEEN} weight={POPPINS_BOLD}  color={WHITE}>
                  {item?.title}
                </AppText>
              </LinearGradient>
            ) : (
              <TouchableOpacityView
                style={[
                  styles.tabs,
                  {
                    width: '50%',
                  },
                ]}
                onPress={() => setActiveTab(item?.id)}>
                <AppText color={BLACKOPACITY} type={FORTEEN}>{item?.title}</AppText>
              </TouchableOpacityView>
            );
          })}
        </View>
      ) : (
        <View style={styles.tabContainer}>
          {data?.map(item => {
            return item.id == activeTab ? (
              <View
              colors={[NLCColor.LightRed,NLCColor.shadeRed]}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
                style={{
                  flexDirection: 'column',
                  width: '33%',
                  height: 38,
                  justifyContent: 'space-evenly',
                  padding: 5,
                  alignItems: 'center',
                  // backgroundColor: "#1F7596",
                  // borderTopRightRadius: item.id == 1 || item.id == 2 ? 20 : 0,
                  // borderBottomRightRadius: item.id == 1 || item.id == 2 ? 20 : 0,
                  // // borderRightWidth: item.id == 1 ? 2 : 0,
                  // borderBottomRightWidth: item.id == 1 ? 2 : 0,
                  // borderColor: colors.black,
                  // borderTopLeftRadius: item.id == 3 || item.id == 2 ? 20 : 0,
                  // borderBottomLeftRadius: item.id == 3 || item.id == 2 ? 20 : 0,
                  // borderLefttWidth: item.id == 3 ? 2 : 0,
                  // borderBottomLeftWidth: item.id == 3 ? 2 : 0,
                  borderBottomColor: colors.redText,
                  borderBottomWidth: 2
                }}>
                  
                <AppText type={FORTEEN} weight={POPPINS_SEMI_BOLD} color={BLACKOPACITY}>
                  {item?.title}
                </AppText>
                {/* <FastImage
                  resizeMode="contain"
                  style={{width: 50, height: 12, marginTop: 0}}
                  source={bottomtapHed}
                  tintColor={NLCColor.Red}
                /> */}
              </View>
            ) : (
              <TouchableOpacityView
                style={[
                  styles.tabs,
                  {
                    width: '33%',
                  },
                ]}
                onPress={() => setActiveTab(item?.id)}>
                <AppText color={BLACKOPACITY} weight={POPPINS_SEMI_BOLD} type={FORTEEN}>{item?.title}</AppText>
              </TouchableOpacityView>
            );
          })}
           {/* <SlideSwiper tabTitles={data} reverseData={[]}/> */}
        </View>
      )}
    </View>
  );
};

export default CommonTabs;
