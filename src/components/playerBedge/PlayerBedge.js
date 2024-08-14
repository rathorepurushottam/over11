import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {shapeParallelogram} from '../../helper/image';
const PlayerBedge = () => {
  return (
    <FastImage
      resizeMode="contain"
      source={shapeParallelogram}
      tintColor={'#EDEDED'}
      style={styles.container}
    />
  );
};

export default PlayerBedge;
