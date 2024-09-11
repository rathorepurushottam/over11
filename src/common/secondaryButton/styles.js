import {StyleSheet} from 'react-native';
import React from 'react';
import {Primary} from '../../theme/dimens';
import { NLCColor, NewColor, colors } from '../../theme/color';

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    justifyContent: 'center',
  },
  grediant: {
    borderRadius: 20,
  },
  buttonContainer: {
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },

  buttonText: {
    // color: NLCColor.Red,
  },
  touchableopacityview: colors => ({
    backgroundColor: colors.purple,
    height: 50,
    //width: 310,
    borderRadius: 5,
  }),
  textstyle: colors => ({
    textAlign: 'center',
    color: colors.white,
    // fontSize: 18,
    marginVertical: 10,
  }),
});

export default styles;
