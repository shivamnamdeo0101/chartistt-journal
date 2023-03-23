import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React,{useEffect,useState} from 'react'
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
import { setActionList, setBrokerList, setChartTimeFrameList, setEmotionList, setSegmentList, setSessionList, setTradeTypeList } from './src/store/DataSlice';
import { BROKER_API } from './src/service/BrokerService';
import Loading from './src/components/Loading';

const Container = () => {


  const userAuth = useSelector(state=>state?.userAuth?.user)

  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async ()=>{
      
      await BROKER_API.getAllBrokers(userAuth?._id,userAuth?.token).then((res) => {
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


       
    }

    fetchData()
  }, [])


  
  const user = useSelector(state => state?.userAuth)

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


function App() {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  
    return unsubscribe;
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