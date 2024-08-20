import React from 'react';
import { TouchableOpacityView } from '../../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import { right_arrow } from '../../../helper/image';
import styles from './styles';
import { AppText, BLACK, ELEVEN, POPPINS_BOLD, POPPINS_MEDIUM, REDTEXT, WHITE } from '../../../common/AppText';
import { colors } from '../../../theme/color';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
const ViewAll = ({ onPress }) => {
  return (
    <TouchableOpacityView style={styles.viewAllBtn} onPress={onPress}>
      <AppText
        weight={POPPINS_BOLD}
        type={ELEVEN}
        color={REDTEXT}
        style={{ marginRight: 5,borderBottomWidth: 1, borderBottomColor: colors.redText}}>
        View all
      </AppText>
      {/* <FastImage
        source={right_arrow}
        style={styles.rightArrow}
        resizeMode="contain"
        tintColor={colors.black}
      /> */}
    </TouchableOpacityView>
  );
};

export default ViewAll;
