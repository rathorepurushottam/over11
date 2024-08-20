import {StyleSheet, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {right_arrow} from '../../helper/image';
import {AppText, BOLD, FOURTEEN, NORMAL, POPPINS_MEDIUM, WHITE} from '../AppText';
import {TouchableOpacityView} from '../TouchableOpacityView';
import {NLCColor, NewColor, colors} from '../../theme/color';

const Listing = ({Icon, Name, next, lastName, onPress, onPressMain}) => {
  return (
    <TouchableOpacityView
      activeOpacity={1}
      onPress={onPressMain}
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.redText,
        borderRadius: 5
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.ImageContainer}>
          <FastImage
            source={Icon}
            resizeMode="contain"
            tintColor={colors.redText}
            style={[
              {width: 24, height: 24, resizeMode: 'contain'},
              !next && {width: 20, height: 20},
            ]}
            
          />
        </View>
        <View style={{marginLeft: 15}}>
          <AppText type={FOURTEEN} weight={POPPINS_MEDIUM}>
            {Name}
          </AppText>
        </View>
      </View>

      <View>
        {lastName && (
          <AppText type={FOURTEEN} weight={BOLD}>
            {lastName}
          </AppText>
        )}
        {next && (
          <TouchableOpacityView
            onPress={() => {
              onPress();
            }}>
            <FastImage
              source={right_arrow}
              resizeMode="contain"
              style={{width: 18, height: 15, marginRight: 10}}
              tintColor={colors.redText}
            />
          </TouchableOpacityView>
        )}
      </View>
    </TouchableOpacityView>
  );
};

export default Listing;

const styles = StyleSheet.create({
  icon_Name: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer: {
    backgroundColor: NewColor.linerLightBlueTwinty,
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft:3
  },
  color: colors => ({
    color: colors.white,
  }),
});
