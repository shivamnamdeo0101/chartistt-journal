import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedReducer } from './src/store/RootReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { TradeProvider } from './src/providers/TradeProvider';
import { BrokerProvider } from './src/providers/BrokerProvider';
import messaging from '@react-native-firebase/messaging';
import { DateModalProvider } from './src/providers/DateModalProvider';
import { USER_API } from './src/service/UserService';
import { setActionList, setAllBrokerListRedux, setBrokerList, setBrokerListRedux, setBrokerUpdateObj, setChartTimeFrameList, setDefaultBrokerObj, setEmotionList, setSegmentList, setSessionList, setTradeTypeList } from './src/store/DataSlice';
import { BROKER_API } from './src/service/BrokerService';
import Loading from './src/components/Loading';
import { setFilterObj } from './src/store/UserSlice';
import notifee from '@notifee/react-native';

const Container = () => {


  const userAuth = useSelector(state => state?.userAuth?.user)
  const data = useSelector(state => state?.data)
  const dispatch = useDispatch()
  const [brokerList, setbrokerList] = useState([])
  const user = useSelector(state => state?.userAuth)



  useEffect(() => {
    const fetchData = async () => {

      await BROKER_API.getAllBrokers(userAuth?._id, userAuth?.token).then((res) => {
        dispatch(setBrokerList(res?.data?.data))
      })

      await USER_API.getData("action").then((res) => {
        dispatch(setActionList(res?.data?.data))
      })
      await USER_API.getData("segment").then((res) => {
        dispatch(setSegmentList(res?.data?.data))
      })
      await USER_API.getData("session").then((res) => {
        dispatch(setSessionList(res?.data?.data))
      })
      await USER_API.getData("emotions").then((res) => {
        dispatch(setEmotionList(res?.data?.data))
      })
      await USER_API.getData("tradetype").then((res) => {
        dispatch(setTradeTypeList(res?.data?.data))
      })
      await USER_API.getData("charttimeframe").then((res) => {
        dispatch(setChartTimeFrameList(res?.data?.data))
      })
      await USER_API.getData("brokers").then((res) => {
        dispatch(setAllBrokerListRedux(res?.data?.data))
      })
   

    }

    fetchData()
  }, [user])


  return (
      <NavigationContainer>
        {user?.isSuccess ? <BottomTabNavigator /> : <AuthNavigator />}
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrokerProvider>
          <DateModalProvider>
            <TradeProvider>
              <React.Fragment>
                <Container />
              </React.Fragment>
            </TradeProvider>
          </DateModalProvider>
        </BrokerProvider>

      </PersistGate>
    </Provider >
  )
}

export default App