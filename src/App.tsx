import React, {useEffect, useRef} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import {Provider} from 'react-redux';
import Navigator from './navigation/Navigator';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootComponent from './RootComponent';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import store from './store/store';
import {onAppStart} from './helper/utility';
import PushController from './PushController';
import {fcmService} from './Notification/FMCService';
import {localNotificationService} from './Notification/LocalNotificationService';

// onAppStart();
const App = () => {
  const toastRef = useRef(null);


  useEffect(() => {
    fcmService.register();
    return () => {
      localNotificationService.unRegister();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 20000);

    onAppStart(store);

  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootComponent>
          <Navigator />
          {/* <Toast ref={toastRef} /> */}
        </RootComponent>
        {/* <PushController/> */}
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

export const navigationRef = React.createRef();
