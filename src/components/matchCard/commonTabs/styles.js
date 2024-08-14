import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../theme/color';

const styles = StyleSheet.create({
  container: {
    height: 45,
    // top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 38,
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
  },
  tab: {
    fontSize: 14,
    color: 'white',
  },
  tabContainer: {
    height: 40,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15
  }
});

export default styles;
