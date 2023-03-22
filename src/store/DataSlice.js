import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    actionList: [],
    emotionList: [],
    tradeTypeList: [],
    segmentList: [],
    sessionList: [],
    tradeList:[],
    brokerList:[],
    chartTimeFrameList: [],
};
export const DataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {

        setActionList: (state, action) => {
            state.actionList = action.payload;
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
        setBrokerList: (state, action) => {
            state.brokerList = action.payload;
        },
        setTradeList: (state, action) => {
            state.tradeList = action.payload;
        },

        


        flushAuthData: (state) => {
            state.brokerList = [];
            state.tradeList = [];
            state.actionList = [];
            state.emotionList = [];
            state.tradeTypeList = [];
            state.segmentList = [];
            state.sessionList = [];
            state.chartTimeFrameList = [];
            AsyncStorage.clear();

        }

    },
});
export const { setActionList,setBrokerList,setTradeList, setChartTimeFrameList,setSegmentList,setSessionList,setTradeTypeList,setEmotionList, flushAuthData, } = DataSlice.actions;

export default DataSlice.reducer;