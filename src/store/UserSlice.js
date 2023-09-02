import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  user: {},
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
   

    flushAuthUser: (state) => {
      state.user= {};
      state.isLoading =  false;
      state.isSuccess = false;
      state.errMsg = '';
      AsyncStorage.clear();
       
    }
    
  },
});
export const {setUserDetails,flushAuthUser,setAuthSuccess} = UserSlice.actions;

export default UserSlice.reducer;