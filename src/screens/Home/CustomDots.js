import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/color';

const CustomDots = ({index, activeIndex}) => {
  return (
    <View style={[styles.dot, index === activeIndex && styles.activeDot]} />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    backgroundColor: colors.inactiveDot,
    borderRadius: 50,
    marginRight: 4,
    marginTop:5
  },
  activeDot: {
    backgroundColor: colors.buttonBg,
  },
});
export default CustomDots;