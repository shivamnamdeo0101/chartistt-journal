import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import UserSlice from "./UserSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  userAuth: UserSlice
});

const persistConfig = {
  key: "root",
  storage:AsyncStorage,
  whitelist: ["userAuth"],
  timeout: null
  
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
