import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React,{useEffect} from 'react'
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

const Container = () => {
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
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  
    return unsubscribe;
  }, []);
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrokerProvider>
          <TradeProvider>
            <React.Fragment>
              <Container />
            </React.Fragment>
          </TradeProvider>
        </BrokerProvider>
      </PersistGate>
    </Provider >
  )
}

export default App