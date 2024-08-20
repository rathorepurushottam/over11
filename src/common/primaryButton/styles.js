import {StyleSheet} from 'react-native';
import React from 'react';
import {Primary} from '../../theme/dimens';
import { colors } from '../../theme/color';

const styles = StyleSheet.create({
  linearGradient: {
    height: 50,
    justifyContent :"flex-end",
      borderColor: "#A91515",
          borderRightWidth: 2,
          borderRightColor: "#A91515",
          borderBottomColor: "#A91515",
          borderBottomWidth: 2,
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 4,
          borderTopRightRadius: 4,
  },
  linearGradientWrapper: {
    borderRadius: 5,
    padding: 1,
  },
  smallBtn: {
    height: 50,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText:{
    fontWeight:"700",
    textTransform:"uppercase",
  },
});

export default styles;
