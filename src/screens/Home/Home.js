import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppSafeAreaView } from '../../common/AppSafeAreaView';
import Basketball from './Basketball';
import Football from './Football';
import Cricket from './Cricket';
import Kabbadi from './Kabbadi';
import NavigationService from '../../navigation/NavigationService';
import { _createwallet, getBannerList, getUserWallet } from '../../actions/profileAction';
import { KeyBoardAware } from '../../common/KeyboardAware';
import { HomeTopHeader } from '../../common/HomeTopHeader';
import { BannerLoop } from '../../helper/image';
import Geolocation from '@react-native-community/geolocation';

const Home = () => {
  const dispatch = useDispatch();
  const [selectedLabel, setSelectedLabel] = useState('Cricket');
  const [latitude, setLatitude] = useState('');
  const [longitute, setLongitute] = useState('');
  const [refershing, setRefreshingTwo] = useState(false);
  const [random, setRandom] = useState(0);
  const onClick = Cricket => {
    setSelectedLabel(Cricket);
  };
  useEffect(() => {
    dispatch(getUserWallet());
    dispatch(getBannerList());
    
    // requestLocationPermission();

  }, []);
 
  const requestLocationPermission = async () => {
    const isIos = Platform.OS === 'ios';
    if (isIos) {
      Geolocation.requestAuthorization();
      fetchLocation();
    } else {
      const checkLocationPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (checkLocationPermission) {
        fetchLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            fetchLocation();
          } else {
            Alert.alert(
              'This app needs location access',
              'Please grant location assess so this app can detect beacons in the background',

            );
          }
        } catch (err) {
          console.log(err);

        }
      }
    }
  };
  const getLatituteLongitute = (lat, long) => {
    setLatitude(lat)
    setLongitute(long)
  }
  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        getLatituteLongitute(
          position.coords.latitude,
          position.coords.longitude,
        );
      }
    );
  };
  // const handleDynamicLink = link => {

  //   if (link && link?.url) {
  //     navigate(link.url);
  //   }
  // };
  // const navigate = async url => {
  //   const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
  //   const queryString = url.split('?')[1];
  //   const paramsArray = queryString.split('&');
  //   const params = {};
  //   paramsArray.forEach(param => {
  //     const [key, value] = param.split('=');
  //     if (key && value) {
  //       params[key] = decodeURIComponent(value);
  //     }
  //   });
  //   const teamId = params['teamId'];
  //   const matchId = params['matchID'];
  //   const userId = params['userId'];
  //   const match_id = params['match_id'];
  //   const category = params['category'];

  //   if (teamId && userId && matchId && customerToken) {
  //     let data = {
  //       newId: teamId,
  //       second: userId,
  //       matchid: matchId
  //     }
  //     dispatch(shareTeam(data))
  //   }
  //   if (match_id && customerToken || category) {
  //     dispatch(MycreateShareContest(match_id, true, category));
  //   }
  // };
  // useEffect(() => {
  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //   // When the component is unmounted, remove the listener
  //   return () => unsubscribe();
  // }, []);
  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       if (link?.url) {
  //         navigate(link.url);
  //       }
  //     });
  // }, []);
  const bannerData = [
    {
      id: '1',
      image: BannerLoop,
    },
    {
      id: '2',
      image: BannerLoop,
    },
    {
      id: '3',
      image: BannerLoop,
    },
  ];
  const onRefresh = () => {
    setRandom(Math.random())
  }

  return (
    <AppSafeAreaView
      statusColor={true}
      light={true}
      style={{ backgroundColor: "#F8F8F8" }}
      hidden={false}>
      <HomeTopHeader
        walletIcon={true}
        personClick={() =>
          NavigationService.openDrawer()
        }
      />
      <KeyBoardAware
        refreshControl={
          <RefreshControl refreshing={refershing} onRefresh={onRefresh} />
        }>
        {selectedLabel == 'Cricket' ? (
          <Cricket random={random} setRefreshingTwo={setRefreshingTwo} />
        ) : selectedLabel == 'Football' ? (
          <Football />
        ) : selectedLabel == 'Basketball' ? (
          <Basketball />
        ) : (
          <Kabbadi jobType="Kabbadi" />
        )}
      </KeyBoardAware>
      
    </AppSafeAreaView>
  );
};
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: '8%',
  },
  personImage: {
    height: 28,
    width: 28,
  },
  combineIcon: {
    height: 30,
    width: 85,
  },
  notificationIcon: {
    height: 17,
    width: 16,
  },
});

export default Home;
