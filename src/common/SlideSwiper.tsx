import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Screen } from "../theme/dimens";
import LinearGradient from "react-native-linear-gradient";
import {
  TEN,
  BLACK,
  BROWNYELLOW,
  FORTEEN,
  GREEN,
  LIGHTBLUE,
  LIGHTWHITE,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  RED,
  SEMI_BOLD,
  TWELVE,
  WHITE,
  AppText, SIXTEEN
} from '../common/AppText';
import { fixedToTwo } from '../helper/utility';
import moment from 'moment';
import { RootState } from "../store/store";
import { universalPaddingHorizontal } from '../theme/dimens';
import { NLCColor, NewColor, colors } from '../theme/color';

export const RenderTabBar = (props: any) => {
  return (
      <TabBar
        {...props}
        renderLabel={({ route, focused }) => (
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              height: 38,
              justifyContent: 'space-evenly',
              padding: 5,
              alignItems: 'center',
            }}>
            <AppText type={FORTEEN} color={focused ? RED : BLACK} weight={POPPINS_MEDIUM}>
              {route.title}
            </AppText>
            {focused ? 
            <LinearGradient
            style={{ height: 2, width: 102 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[
              NLCColor.LightRed,
              NLCColor.shadeRed
            ]}></LinearGradient> :<View style={{width:102, height:2}}></View>
            }
          </View>
        )}
        indicatorStyle={{ backgroundColor: 'transparent'}}
        scrollEnabled={!props.scrollEnabled ? props.scrollEnabled : true}
        tabStyle={[{ width: 'auto' }, props.tabStyle]}
        pressColor={'transparent'}
        style={[styles.tabbar, props.style]}
      />

  );
};

const SlideSwiper = ({tabTitles, reverseData}: any) => {
  const [index, setIndex] = React.useState(0);
  const isLoading = useSelector((state: RootState) => {
    return state.auth.isLoading;
  });
  // const [routes] = React.useState([
  //   { key: 'first', title: 'Deposits' },
  //   { key: 'second', title: `Contests` },
  //   { key: 'three', title: `Withdrawals` },
  // ]);
  const [routes] = React.useState(tabTitles);

  // const ListEmptyComponent = (title: any) => {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <AppText
  //         style={{ textAlign: 'center' }}
  //         type={FORTEEN}
  //         weight={POPPINS_MEDIUM}>
  //         {title
  //           ? title
  //           : `You haven't joined any upcoming contests \n Join contests for any of the upcoming matches`}
  //       </AppText>
  //     </View>
  //   );
  // };

  const renderItem = (item: any ) => {
    const { createdAt, message, transaction_id, amount, requestedamount } = item ?? '';
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemContainerSecond}>
          <AppText weight={POPPINS_MEDIUM} type={TWELVE} style={{ flex: 1 }}>
            {moment(createdAt).format('DD MMM')?.toUpperCase()}
            {'\n'}
            <AppText weight={POPPINS_LIGHT} color={RED} style={{ flex: 1 }}>
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
              color={RED}
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

  const listheader = () => {
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

  const renderScene = SceneMap({
    first: () => <FlatList
    data={reverseData}
    showsVerticalScrollIndicator={false}
    renderItem={renderItem}
    ListHeaderComponent={listheader}
    keyExtractor={(item: { _id: any; }) => item._id}
    contentContainerStyle={{
      flexGrow: 1,
    }}
    ListEmptyComponent={isLoading ? <></> : <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <AppText
      style={{ textAlign: 'center' }}
      type={FORTEEN}
      weight={POPPINS_MEDIUM}>
      {'Nothing to show.'}
    </AppText>
  </View>}
    // ListEmptyComponent={
    //   isLoading ? (
    //     <></>
    //   ) : (
    //     <ListEmptyComponent title={'Nothing to show.'} />
    //   )
    // }
  />,
    second: () => <FlatList
    data={reverseData}
    showsVerticalScrollIndicator={false}
    renderItem={renderItem}
    ListHeaderComponent={listheader}
    keyExtractor={(item: { _id: any; }) => item._id}
    contentContainerStyle={{
      flexGrow: 1,
    }}
    ListEmptyComponent={isLoading ? <></> : <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <AppText
      style={{ textAlign: 'center' }}
      type={FORTEEN}
      weight={POPPINS_MEDIUM}>
      {'Nothing to show.'}
    </AppText>
  </View>}
    // ListEmptyComponent={
    //   isLoading ? (
    //     <></>
    //   ) : (
    //     <ListEmptyComponent title={'Nothing to show.'} />
    //   )
    // }
  />,
    three: () => <FlatList
    data={reverseData}
    showsVerticalScrollIndicator={false}
    renderItem={renderItem}
    ListHeaderComponent={listheader}
    keyExtractor={(item: { _id: any; }) => item._id}
    contentContainerStyle={{
      flexGrow: 1,
    }}
    ListEmptyComponent={isLoading ? <></> : <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <AppText
      style={{ textAlign: 'center' }}
      type={FORTEEN}
      weight={POPPINS_MEDIUM}>
      {'Nothing to show.'}
    </AppText>
  </View>}
    // ListEmptyComponent={
    //   isLoading ? (
    //     <></>
    //   ) : (
    //     <ListEmptyComponent title={'Nothing to show.'} />
    //   )
    // }
  />
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Screen.Width }}
      renderTabBar={props => (
        <RenderTabBar
          {...props}
          style={{ marginHorizontal: 10 }}
        />
      )}
    />
  )
}
export default SlideSwiper
const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  container: {
    height: 45,
    // top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
})
{/* <TabView
navigationState={{ index, routes }}
renderScene={renderScene}
onIndexChange={setIndex}
initialLayout={{ width: Screen.Width }}
renderTabBar={props => (
  <RenderTabBar
    {...props}
    style={{ marginHorizontal: 10 }}
  />
)}
/> */}
// const renderScene = SceneMap({
//   first: () => contestView(),
//   second: () => MyContestView(),
//   three: () => MyTeamView()
// })