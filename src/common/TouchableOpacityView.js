import React, { ReactNode } from 'react';
import { TouchableOpacity as TouchableOpacityBase, Platform } from 'react-native';
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler';
import { TouchableOpacityViewProps } from '../types/common.js';

const TouchableOpacityView = ({
  children,
  isGesture,
  ...props
}: any) => {
  const isIos = Platform.OS === 'ios';
  if (isGesture && !isIos) {
    return (
      <TouchableOpacityGesture activeOpacity={1} {...props}>
        {children}
      </TouchableOpacityGesture>
    );
  } else {
    return (
      <TouchableOpacityBase activeOpacity={1} {...props}>
        {children}
      </TouchableOpacityBase>
    );
  }
};

export { TouchableOpacityView };
