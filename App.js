import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedReducer } from './src/store/RootReducer';
import { configureStore, } from '@reduxjs/toolkit';
import AuthNavigator from './src/navigation/AuthNavigator';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

import messaging from '@react-native-firebase/messaging';
import { USER_API } from './src/service/UserService';
import { setActionList, setAllBrokerList, setAllBrokerListRedux, setBrokerList, setBrokerListRedux, setBrokerUpdateObj, setChartTimeFrameList, setDefaultBrokerObj, setEmotionList, setFilterObjRedux, setSegmentList, setSessionList, setTradeTypeList, setUserBrokerList } from './src/store/DataSlice';
import { BROKER_API } from './src/service/BrokerService';
import notifee from '@notifee/react-native';
import VersionCheck from 'react-native-version-check';
import { NativeBaseProvider, Box } from "native-base";
import AppNavigator from './src/navigation/AppNavigator';
import { Alert, Linking } from 'react-native';


const Container = () => {

  const userAuth = useSelector(state => state?.userAuth?.user)
  const dispatch = useDispatch()
  const user = useSelector(state => state?.userAuth)

  useEffect(() => {
    const checkpdate = () => {
      VersionCheck.needUpdate()
        .then(async res => {
          console.log(res?.isNeeded);    // true
          if (res?.isNeeded) {
           // handleVersionCheck(res.storeUrl);  // open store if update is needed.
          }
        });
    }

    checkpdate()
  }, [])


  const handleVersionCheck = (link) => {
    // Display a confirmation dialog
    Alert.alert(
        'Download Update',
        'You can download the new version of the application',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Download',
                onPress: () => {
                  Linking.openURL(link);
                },
            },
        ],
        { cancelable: false }
    );
};

  useEffect(() => {
    const fetchData = async () => {

    
      await BROKER_API.getAllBrokers(userAuth?._id, userAuth?.token).then((res) => {
        dispatch(setUserBrokerList(res))
      })

      await USER_API.getData("action").then((res) => {
        console.log(res,"RES")
        dispatch(setActionList(res))
      })
      await USER_API.getData("segment").then((res) => {
        dispatch(setSegmentList(res))
      })
      await USER_API.getData("session").then((res) => {
        dispatch(setSessionList(res))
      })
      await USER_API.getData("emotions").then((res) => {
        dispatch(setEmotionList(res))
      })
      await USER_API.getData("tradetype").then((res) => {
        dispatch(setTradeTypeList(res))
      })
      await USER_API.getData("charttimeframe").then((res) => {
        dispatch(setChartTimeFrameList(res))
      })

      await USER_API.getData("brokers").then((res) => {
        dispatch(setAllBrokerList(res))
      })


    }

    fetchData()
  }, [user])


  return (
    <NavigationContainer>
      {user?.isSuccess ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

async function onDisplayNotification(e) {

  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: e?.notification?.title,
    body: e?.notification?.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

function App() {



  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(error);
    }
  };


  useEffect(() => {
    getFCMToken();

    messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage)
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      onDisplayNotification(remoteMessage)
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          onDisplayNotification(remoteMessage)
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      onDisplayNotification(remoteMessage)
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  return (
    <NativeBaseProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <React.Fragment>
          <Container />
        </React.Fragment>
      </PersistGate>
    </Provider >
    </NativeBaseProvider>
  )
}

export default App