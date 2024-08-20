import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppSafeAreaView = ({
  children,
  style,
  statusColor,
  hidden,
  light
}: any) => {

  return Platform.OS === 'ios' ? (
    <View style={[{ flex: 1 }, style]}>
      <SafeAreaView
        edges={['right', 'left']}
        style={{
          flex: 1,
        }}>
        {children}
      </SafeAreaView>
    </View>
  ) : (
    <View style={[{ flex: 1, backgroundColor: 'white' }, style]}>
      <StatusBar
        translucent={false}
        backgroundColor={statusColor ? 'black' : "black"}
        barStyle={light? "light-content": "dark-content"}
        hidden={hidden}
      />
      {children}
    </View>
  );
};

export { AppSafeAreaView };
