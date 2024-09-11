import React from "react";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import {
  AppText,
  POPPINS_EXTRA_BOLD_ITALIC,
  SIXTEEN,
  POPPINS_BOLD,
  WHITE,
  REDTEXT,
} from "../AppText";
import { RootState } from "../../libs/rootReducer";
import { TouchableOpacityView } from "../TouchableOpacityView";
import { NLCColor, colors } from "../../theme/color";
import { View } from "react-native";

const PrimaryButton = ({
  title,
  buttonStyle,
  onPress,
  smallBtn,
  titleStyle,
  type,
  ...rest
}) => {
  return (
    <TouchableOpacityView
      activeOpacity={1}
      {...rest}
      style={buttonStyle}
      onPress={onPress}
    >
      
      <View style={[styles.linearGradient, smallBtn]}>
      <View
        style={{
         borderWidth: 2,
    borderColor: '#A91515',
          alignItems: 'center',
    justifyContent: 'center',
          marginBottom: 2,
          marginRight: 2,
          borderRadius: 10,
          height: 50,
        }}
      >
        <AppText
          type={type ? type : SIXTEEN}
          weight={POPPINS_BOLD}
          color={REDTEXT}
          style={[styles.buttonText, titleStyle]}
        >
          {title}
        </AppText>
        </View>
      </View>
     
    </TouchableOpacityView>
  );
};

export default PrimaryButton;
