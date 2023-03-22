import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  user: {},
  brokerObj:{},
  tradeObj:{},
  defaultRange:"",

  filterObj:{},

  startDate:"",
  endDate:"",
  customDate:"",

  brokerId:"",
  isLoading: false,
  isSuccess: false,
  errMsg: '',
  rangeDate:{}
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
    setDefaultRange: (state, action) => {
      state.defaultRange = action.payload;
    },
    setFilterObj: (state, action) => {
      state.filterObj = action.payload;
    },

    setStartDateRedux: (state, action) => {
      state.startDate = action.payload;
    },

    setClearRange: (state) => {
      state.rangeDate = {};
    },

    setRangeDateRedux: (state, action) => {
      state.rangeDate = action.payload;
    },




    setEndDateRedux: (state, action) => {
      state.endDate = action.payload;
    },

    setCustomDate: (state, action) => {
      state.customDate = action.payload;
    },

    setTradeObj: (state, action) => {
      state.tradeObj = action.payload;
    },

    flushAuthData: (state) => {
      state.user= {};
      state.tradeObj = {},
      state.brokerObj = {},
      state.rangeDate = {},
      state.defaultRange = ""
      state.brokerId  =  "";
      state.customDate = "",
      state.startDate ="",
      state.endDate = "",
      state.isLoading =  false;
      state.isSuccess = false;
      state.errMsg = '';
      AsyncStorage.clear();
       
    }
    
  },
});
export const {setUserDetails,flushAuthData, setRangeDateRedux, setClearRange,setFilterObj,setEndDateRedux,setStartDateRedux,setCustomDate, setAuthSuccess,setBrokerId ,setDefaultRange,setBrokerObj,setTradeObj} = UserSlice.actions;

export default UserSlice.reducer;