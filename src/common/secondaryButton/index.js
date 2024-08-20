import { View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { AppText, POPPINS_EXTRA_BOLD_ITALIC, SIXTEEN, POPPINS_BOLD, FORTEEN, FIFTEEN, BROWNYELLOW, WHITE, RED } from '../AppText';
import { RootState } from '../../libs/rootReducer';
import { TouchableOpacityView } from '../TouchableOpacityView';
import { colors } from '../../theme/color';

const SecondaryButton = ({
  buttonStyle,
  title,
  onPress,
  btnStyle,
  smallBtn,
  titleStyle,
  buttonViewStyle,
  color,
}: any) => {

  return (
    <TouchableOpacityView
      style={buttonStyle}
      activeOpacity={1}
      onPress={onPress}>
        <View style={[styles.buttonContainer, buttonViewStyle]}>
          <AppText
            color={color ? color : WHITE}
            type={FIFTEEN}
            weight={POPPINS_BOLD}
            style={[styles.buttonText, titleStyle]}>
            {title}
          </AppText>
        </View >
    </TouchableOpacityView >
  );
};

export default SecondaryButton;
