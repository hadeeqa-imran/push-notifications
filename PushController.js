import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const PushController = () => {

  useEffect(() => {
    // Request permission to receive notifications
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    // Check if the app has the permission to receive notifications
    requestPermission();

    // Get the device's FCM token
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };

    getToken();

    // Listen to whether the token refreshes
    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(token => {
      console.log('FCM Token refreshed:', token);
    });

    // Listen for foreground notifications
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      if (Platform.OS === 'ios') {
        PushNotification.localNotification({
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
        });
      } else {
        Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
      }
    });

    // Handle background and quit state notifications
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return () => {
      unsubscribeOnTokenRefresh();
      unsubscribeOnMessage();
    };
  }, []);

  return null;
};

export default PushController;
