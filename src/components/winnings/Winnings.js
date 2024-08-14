import React, { useEffect, useState } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { appOperation } from '../../appOperation';
import { AppText, BLACK, BLACKOPACITY, FORTEEN, LATO_SEMI_BOLD, LIGHTBLUE, POPPINS_BOLD, SIXTEEN, TEN, TWELVE, WHITE } from '../../common/AppText';
import { toastAlert } from '../../helper/utility';
import styles from './styles';
import { SpinnerSecond } from '../../common/SpinnerSecond';
import FastImage from 'react-native-fast-image';
import { Layer_1 } from '../../helper/image';
import { Screen } from '../../theme/dimens';
const Winnings = ({ id, privateis, notLive }) => {
  const data = [{}, {}, {}];
  const [prizeList, setPrizeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onRefresh, setOnrefresh] = useState(false);

  const getPrizeList = async () => {
    try {
      setOnrefresh(true);
      const res = privateis ? await appOperation.customer.getPrizeListPrivate(id, privateis) : await appOperation.customer.getPrizeList(id);
      if (res.code == 200) {
        setPrizeList(res?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setOnrefresh(false);
    }
  };
  useEffect(() => {
    getPrizeList();
  }, []);
  const renderWinnings = ({ item }) => {
    return (
      <>
        {item?.EndRank !== null ?
          <View style={styles.winningContainer}>
            <AppText >
              #{item.StartRank == item?.EndRank ? item.StartRank : `${item?.StartRank}-${item?.EndRank}`}
            </AppText>
            <AppText >{parseInt(item?.Price)?.toFixed(2)}</AppText>
          </View >
          : <View style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20%"
          }} >
            <AppText weight={POPPINS_BOLD}
              type={FORTEEN}
              color={LIGHTBLUE}>
              Rank 1
            </AppText>
            <AppText
              color={BLACKOPACITY}
              weight={POPPINS_BOLD}
              type={TWELVE}>
              Winner takes all the glory!
            </AppText>
            <FastImage
              source={Layer_1}
              resizeMode='contain'
              style={{
                height: 160,
                width: 200,
                alignSelf: "center"
              }}
            />
          </View>

        }
      </>
    );
  };
  return (
    <>
      <View style={styles.head}>
        <AppText type={TEN}>RANK</AppText>
        <AppText type={TEN}>WINNINGS</AppText>
      </View>
      <View>
        {loading ? (
          <SpinnerSecond loading />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={prizeList}
            renderItem={renderWinnings}
            contentContainerStyle={{  flex: privateis && !notLive ? 1 : 0, height:Screen.Height  }}
            refreshControl={
              <RefreshControl refreshing={onRefresh} onRefresh={getPrizeList} />
            }
          />
        )}
      </View>
    </>
  );
};

export default Winnings;
