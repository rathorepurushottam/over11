import { StyleSheet } from 'react-native';

import { Screen } from '../../theme/dimens';
import { NLCColor, NewColor, colors } from '../../theme/color';

const styles = StyleSheet.create({
  bottomContainer: {
    marginHorizontal: 20,
    flex: 1
  },
  withdraw: colors => ({
    color: colors.black,
    marginTop: Screen.Height / 24,
  }),
  wallet: colors => ({
    color: 'black',
  }),

  box: {
    // borderWidth: 2,
    // borderColor: NewColor.linerBlackFive,
    backgroundColor: NLCColor.background,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  boxTwo: {
    backgroundColor: NLCColor.background,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  textInputBox: {
    height: 45,
    width: 330,
    fontSize: 12,
    fontWeight: '700',
  },
  boxContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  bottomBoxContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    marginTop: Screen.Height / 2.4,
  },
  otp: colors => ({
    color: colors.black,
    marginTop: 10,
  }),
  image: {
    height: 24,
    width: 22,
    alignSelf: 'center',
  },
  rightText: colors => ({
    color: colors.black,
  }),
  rightContainer: {
    marginLeft: 5,
    alignSelf: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ammount: colors => ({
    color: colors.code,
    marginTop: 4,
  }),
  tickContainer: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: NLCColor.Red,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: 'center',
    marginRight: 10
  },
  tick: {
    height: 10,
    width: 10,
    backgroundColor: NLCColor.Red,
    borderRadius: 50
  }
});

export default styles;
