import React, {useEffect, type PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView
} from 'react-native';
import { Notification, Notifications, Registered, RegistrationError } from 'react-native-notifications';


import ConfigurationScreen from './screens/ConfigurationScreen';
import { mainService } from './services/main.service';

const initNotifications = async () => {
  Notifications.registerRemoteNotifications()
  Notifications.events().registerRemoteNotificationsRegistered((event:Registered)=>{
    console.log('token', event.deviceToken)
    mainService.registerDeviceNotificationToken(event.deviceToken)
  })
  Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
    console.error(event);
});
Notifications.events().registerNotificationReceivedBackground((notification: Notification, completion: (response: any) => void) => {
  console.log("Notification Received - Background", notification.payload);

  // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
  completion({alert: true, sound: true, badge: false});
    });
}

const App = () => {

  useEffect(()=>{
    initNotifications()
  }, [])

  return (
    <SafeAreaView>
      <ConfigurationScreen/>
    </SafeAreaView>
  );
};

export default App;
