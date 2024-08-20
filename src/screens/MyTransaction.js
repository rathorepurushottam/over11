import React, { useEffect, useState } from 'react';
import { AppSafeAreaView } from '../common/AppSafeAreaView';
import { FlatList, StyleSheet, View } from 'react-native';
import CommonImageBackground from '../common/commonImageBackground';
import Header from '../common/Header';
import { universalPaddingHorizontal } from '../theme/dimens';
import LinearGradient from 'react-native-linear-gradient';
import {
  AppText,
  BLACK,
  BROWNYELLOW,
  FIRST,
  FORTEEN,
  FORTH,
  GREEN,
  LIGHTBLUE,
  LIGHTWHITE,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  RED,
  SECOND,
  SEMI_BOLD,
  TWELVE,
  WHITE,
} from '../common/AppText';
import { TouchableOpacityView } from '../common/TouchableOpacityView';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIbatDepositTransaction,
  getTransactionsContest,
  getTransactionsDeposit,
  getTransactionsWithdrawals,
} from '../actions/profileAction';
import { SpinnerSecond } from '../common/SpinnerSecond';
import { TEN } from '../common/AppText';
import moment from 'moment';
import { StatusBar } from 'native-base';
import { TransactionFilter } from '../common/transactionFilter';
import { NLCColor, NewColor, colors } from '../theme/color';
import PrimaryButton from '../common/primaryButton';
import { BOTTOM_TAB_HOMESCREEN } from '../navigation/routes';
import { fixedToTwo } from '../helper/utility';
import SlideSwiper from '../common/SlideSwiper';
import ProfileHeader from '../common/ProfileHeader';

export const ListEmptyComponent = ({ title, activeTab }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <AppText
        style={{ textAlign: 'center' }}
        type={FORTEEN}
        weight={POPPINS_MEDIUM}>
        {title
          ? title
          : `You haven't joined any upcoming contests \n Join contests for any of the upcoming matches`}
      </AppText>
    </View>
  );
};

const MyTransaction = () => {
  const dispatch = useDispatch();
  const depositTransactions = useSelector(state => {
    return state.profile.depositTransactions;
  });
  const contestTransactions = useSelector(state => {
    return state.profile.contestTransactions;
  });
  const withdrawalsTransactions = useSelector(state => {
    return state.profile.withdrawalsTransactions;
  });
  const isLoading = useSelector((state: RootState) => {
    return state.auth.isLoading;
  });
  const [activeTab, setActiveTab] = useState(1);
  const [filterTab, setFilterTab] = useState(0);
  const [type, setType] = useState('ADDCASH')
  const data = [
    {
      id: 1,
      title: 'Deposits',
      key: 'ADDCASH',
    },
    {
      id: 2,
      title: 'Contests',
      key: 'contests',
    },
    {
      id: 3,
      title: 'Withdrawals',
      key: 'withdrawl',
    },
  ];

  const titles = [
      { key: 'first', title: 'Deposits' },
      { key: 'second', title: `Contests` },
      { key: 'three', title: `Withdrawals` },
    ];


  const dataFilter = [
    {
      id: 1,
      title: 'Success',
    },
    {
      id: 2,
      title: 'In-process',
    },
    {
      id: 3,
      title: 'Failed',
    },
  ];

  useEffect(() => {
    dispatch(getTransactionsDeposit(type));
  }, [type]);

  const renderItem = ({ item, index }) => {
    const { createdAt, message, transaction_id, amount, requestedamount } = item ?? '';
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemContainerSecond}>
          <AppText weight={POPPINS_MEDIUM} type={TWELVE} style={{ flex: 1 }}>
            {moment(createdAt).format('DD MMM')?.toUpperCase()}
            {'\n'}
            <AppText weight={POPPINS_LIGHT} color={FIRST} style={{ flex: 1 }}>
              {moment(createdAt).format('hh:mm A')?.toUpperCase()}
            </AppText>
          </AppText>
          <View
            style={{
              flex: 1.2,
            }}>
            <AppText color={GREEN} style={{ textAlign: 'center' }}>
              {`${message}`}
            </AppText>
            <AppText
              weight={POPPINS_LIGHT}
              color={FIRST}
              style={{ textAlign: 'center' }}>
              Txn ID-{transaction_id}
            </AppText>
          </View>
          <View style={{ flex: 1, }}>
            {requestedamount ?
              <AppText color={RED} style={{ textAlign: 'right' }}>
                TDS {fixedToTwo(requestedamount - amount)}
              </AppText>
              : <></>}
            <AppText color={GREEN} style={{ textAlign: 'right' }}>
              INR {fixedToTwo(amount)}
            </AppText>
          </View>
        </View>
      </View>
    );
  };

  const listheader = (item) => {
    return (
      <View style={styles.renderItemContainerSecond}>
        <AppText color={BLACK} type={TEN} style={{ flex: 1 }}>
          DATE & TIME
        </AppText>
        <AppText
          color={BLACK} 
          type={TEN}
          style={{ flex: 1, textAlign: 'center' }}>
          TRANSACTION DETAILS
        </AppText>
        <AppText
          color={BLACK} 
          type={TEN}
          style={{ flex: 1, textAlign: 'right' }}>
          AMOUNT
        </AppText>
      </View>
    );
  };
  const reverseData = [...depositTransactions].reverse();
  return (
    <AppSafeAreaView light={true} hidden={false}>
      <StatusBar
        backgroundColor={'#282828'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <CommonImageBackground common>
        <ProfileHeader
          commonHeader
          title="Transaction"
          style={{ padding: universalPaddingHorizontal, }}
        />
        {/* <View style={styles.containerHeader}>
          {data?.map(item => {
            return item.id == activeTab ? (
              <View
                style={{
                  flexDirection: 'column',
                  width: '33%',
                  height: 38,
                  justifyContent: 'space-evenly',
                  padding: 5,
                  alignItems: 'center',
                }}>
                <AppText
                  color={RED}
                  weight={POPPINS_MEDIUM}
                  type={FORTEEN}>
                  {item?.title}
                </AppText>
                <LinearGradient
                  style={{ height: 2, width: 102 }}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  colors={[
                    NLCColor.LightRed,
                    NLCColor.shadeRed
                  ]}></LinearGradient>
              </View>
            ) : (
              <TouchableOpacityView
                style={styles.tabs}
                onPress={() => { setActiveTab(item?.id), setType(item.key) }}>
                <AppText type={FORTEEN} weight={POPPINS_MEDIUM} color={LIGHTWHITE}>
                  {item?.title}
                </AppText>
              </TouchableOpacityView>
            );
          })}
        </View> */}
        {/* <TransactionFilter
          setFilterTab={setFilterTab}
          filterTab={filterTab}
          data={dataFilter}
        /> */}
        {/* <View style={styles.container}>
          {activeTab === 1 && (
            <FlatList
              data={reverseData}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              ListHeaderComponent={listheader}
              keyExtractor={item => item._id}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              ListEmptyComponent={
                isLoading ? (
                  <></>
                ) : (
                  <ListEmptyComponent title={'Nothing to show.'} />
                )
              }
            />
          )}
          {activeTab === 2 && (
            <FlatList
              data={reverseData}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              ListHeaderComponent={listheader}
              keyExtractor={item => item._id}
              contentContainerStyle={{
                flexGrow: 1,
                marginTop: 10,
              }}
              ListEmptyComponent={
                isLoading ? (
                  <></>
                ) : (
                  <ListEmptyComponent title={'Nothing to show.'} />
                )
              }
            />
          )}
          {activeTab === 3 && (
            <FlatList
              data={reverseData}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              ListHeaderComponent={listheader}
              keyExtractor={item => item._id}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              ListEmptyComponent={
                isLoading ? (
                  <></>
                ) : (
                  <ListEmptyComponent title={'Nothing to show.'} />
                )
              }
            />
          )}
        </View> */}
        <SlideSwiper tabTitles={titles} reverseData={reverseData}/>
        <SpinnerSecond loading={isLoading} />
      </CommonImageBackground>
    </AppSafeAreaView>
  );
};

export default MyTransaction;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: universalPaddingHorizontal,
  },
  containerHeader: {
    height: 45,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    width: '33%',
    height: 38,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
  },

  renderItemContainer: {
    flex: 1,
  },
  renderItemContainerSecond: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: universalPaddingHorizontal,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginTop: 5,
    borderBottomColor: "#BEBEBE"
  },
});
