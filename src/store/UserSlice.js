import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  user: {},
  brokerObj:{},
  tradeObj:{},
  brokerId:"",
  isLoading: false,
  isSuccess: false,
  errMsg: '',
};
export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    
    setAuthSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.errMsg = '';
    },

    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    setBrokerId: (state, action) => {
      state.brokerId = action.payload;
    },
    setBrokerObj: (state, action) => {
      state.brokerObj = action.payload;
    },
    setTradeObj: (state, action) => {
      state.tradeObj = action.payload;
    },

    flushAuthData: (state) => {
      state.user= {};
      state.tradeObj = {},
      state.brokerObj = {},
      state.brokerId  =  "";
      state.isLoading =  false;
      state.isSuccess = false;
      state.errMsg = '';
      AsyncStorage.clear();
       
    }
    
  },
});
export const {setUserDetails,flushAuthData,setAuthSuccess,setBrokerId ,setBrokerObj,setTradeObj} = UserSlice.actions;

export default UserSlice.reducer;