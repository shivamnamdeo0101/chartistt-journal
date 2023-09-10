import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    refresh:false,
    userBrokerList:[],

    confirm: null,
    actionList: [],
    emotionList: [],
    tradeTypeList: [],
    segmentList: [],
    sessionList: [],
    tradeList: [],
    chartTimeFrameList: [],
    allBrokerList:[],
};
export const DataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {

        setActionList: (state, action) => {
            state.actionList = action.payload;
        },
        setUserBrokerList: (state, action) => {
            state.userBrokerList = action.payload;
        },
        toggleRefresh: (state,action) => {
            state.refresh = action.payload;
        },
        setEmotionList: (state, action) => {
            state.emotionList = action.payload;
        },
        setTradeTypeList: (state, action) => {
            state.tradeTypeList = action.payload;
        },
        setSegmentList: (state, action) => {
            state.segmentList = action.payload;
        },
        setSessionList: (state, action) => {
            state.sessionList = action.payload;
        },
        setChartTimeFrameList: (state, action) => {
            state.chartTimeFrameList = action.payload;
        },
      
        setTradeList: (state, action) => {
            state.tradeList = action.payload;
        },
        
        


        flushAuthData: (state) => {
            state.confirm = null;
            state.userBrokerList = [];
            state.tradeList = [];
            state.actionList = [];
            state.allBrokerList = [];
            state.emotionList = [];
            state.tradeTypeList = [];
            state.segmentList = [];
            state.sessionList = [];
            state.chartTimeFrameList = [];
            AsyncStorage.clear();

        }

    },
});
export const { setActionList,setUserBrokerList,toggleRefresh, setBrokerList, setBrokerEdit, setConfirm, setTradeList, setChartTimeFrameList, setSegmentList, setSessionList, setTradeTypeList, setEmotionList, flushAuthData, } = DataSlice.actions;

export default DataSlice.reducer;