import React from 'react';
import { View } from 'react-native';
import { CheckboxProps } from '../../types/common';
import { TouchableOpacityView } from '../TouchableOpacityView';
import { tick } from '../../helper/image';
import styles from './styles';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { RootState } from '../../libs/rootReducer';
import LinearGradient from 'react-native-linear-gradient';
import { NLCColor, colors } from '../../theme/color';

const Checkbox = ({ onPress, value, disabled, type }: any) => {

  return (
    <TouchableOpacityView
      onPress={onPress}
      underlayColor="transparent"
      disabled={disabled}
      style={{}}>
      <LinearGradient colors={[NLCColor.LightRed, NLCColor.shadeRed]} style={styles.linearGradientWrapper}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}>
        {value ? (
          <View style={[styles.selectedUIFilter(type, colors)]}>
            <FastImage
              source={tick}
              resizeMode={'contain'}
              tintColor={colors.white}
              style={[styles.checkboxTick(type, colors)]}
            />
          </View>
        ) : (
          <View style={styles.unchecked(colors)} />
        )}
      </LinearGradient>
    </TouchableOpacityView>
  );
};

export default Checkbox;
