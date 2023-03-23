import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import UserSlice from "./UserSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataSlice from "./DataSlice";

const rootReducer = combineReducers({
  userAuth: UserSlice,
  data:DataSlice
});

const persistConfig = {
  key: "root",
  storage:AsyncStorage,
  whitelist: ["userAuth","data"],
  timeout: null
  
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
