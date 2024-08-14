import {StyleSheet} from 'react-native';
import {NLCColor, NewColor, colors} from '../../../theme/color';

const styles = StyleSheet.create({
  viewAllBtn: {
    height: 23,
    width: 76,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth:2,
    borderColor:NLCColor.Red
  },
  rightArrow: {
    height: 10,
    width: 10,
  },
});

export default styles;
