import React from 'react';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {
  AppText,
  POPPINS_EXTRA_BOLD_ITALIC,
  SIXTEEN,
  POPPINS_BOLD,
  WHITE,
} from '../AppText';
import { RootState } from '../../libs/rootReducer';
import { TouchableOpacityView } from '../TouchableOpacityView';
import { NLCColor, colors } from '../../theme/color';

const PrimaryButton = ({
  title,
  buttonStyle,
  onPress,
  smallBtn,
  titleStyle,
  type,
  ...rest
}: any) => {
  return (
    <TouchableOpacityView
      activeOpacity={1}
      {...rest}
      style={buttonStyle}
      onPress={onPress}>
      <LinearGradient
        colors={[NLCColor.LightRed, NLCColor.shadeRed]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 1 }}
        style={[styles.linearGradient, smallBtn]}>
        <AppText
          type={type ? type : SIXTEEN}
          weight={POPPINS_BOLD}
          style={[styles.buttonText, titleStyle]}>
          {title}
        </AppText>
      </LinearGradient>
    </TouchableOpacityView>
  );
};

export default PrimaryButton;
