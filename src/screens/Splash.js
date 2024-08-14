import React, {useState, useEffect} from 'react';

import {
  TouchableOpacity,
  Image,
  ImageBackgroundBase,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
} from 'react-native';

const Splash = ({navigation}) => {
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirst(true);
    }, 5000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSecond(true);
    }, 5000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);
  });

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
        
      {first ? (
        <Image
          style={styles.poster}
          source={require('../../assets/images/Splash.png')}
        />
      ) : null}
      {second ? (
        <Image
          style={styles.logos}
          source={require('../../assets/images/logo1.png')}
        />
      ) : null}
       
   
    </View>
  );
};

const styles = StyleSheet.create({
  poster: {
    flex:2,
    width:'100%',
    resizeMode: 'cover',
    paddingTop: 5,
   
  },
  logos: {
    width: 250,
    height: 260,
    alignSelf: 'center',
    resizeMode: 'stretch',
    position: 'absolute',
    top: 240,
  },
});

export default Splash;
