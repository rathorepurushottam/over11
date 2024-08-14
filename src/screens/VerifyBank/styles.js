import { StyleSheet } from 'react-native';
import { universalPaddingHorizontal } from '../../theme/dimens';
import { fontFamilyPoppins } from '../../theme/typography';
import { colors } from '../../theme/color';

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: universalPaddingHorizontal,
  },
  withdraw: {
    marginTop: 10,
  },
  box: {
    borderWidth: 1,
    backgroundColor: colors.bottomBackgroundColor,
    borderRadius: 16,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  label: {
    marginBottom: 10,
    // color:colors.white
  },
  textInputBox: {
    fontFamily: fontFamilyPoppins,
    fontSize: 12,
    color:colors.white
  },
  boxContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
  },
  bankLogo: {
    height: 50, width: 50,
    marginTop: 15
  },
  containeImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.borderLightBlue,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
    marginTop: 10
  }
});

export default styles;
