import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {

    confirm: null,
    actionList: [],
    emotionList: [],
    tradeTypeList: [],
    segmentList: [],
    sessionList: [],
    tradeList: [],
    defaultBrokerObj:{},
    brokerEdit: false,
    brokerUpdateObj: {},

    filterObjRedux: {},

    brokerList: [],
    chartTimeFrameList: [],
    allBrokerList: [],
    brokerListRedux: []
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
        setUserBrokerListRedux: (state, action) => {
            state.brokerListRedux = action.payload;
        },
        setAllBrokerListRedux: (state, action) => {
            state.allBrokerList = action.payload;
        },
        setDefaultBrokerObj: (state, action) => {
            state.defaultBrokerObj = action.payload;
        },
        setBrokerUpdateObj: (state, action) => {
            state.brokerUpdateObj = action.payload;
        },


        setConfirm: (state, action) => {
            state.confirm = action.payload;
        },

        setBrokerEdit: (state, action) => {
            state.brokerEdit = action.payload;
        },

        setFilterObjRedux: (state, action) => {
            state.filterObjRedux = action.payload;
        },








        flushAuthData: (state) => {
            state.confirm = null;
            state.filterObjRedux = {};
            state.defaultbrokerObj = [];
            state.brokerList = [];
            state.tradeList = [];
            state.actionList = [];
            state.allBrokerList = [];
            state.brokerUpdateObj = {};
            state.emotionList = [];
            state.tradeTypeList = [];
            state.segmentList = [];
            state.sessionList = [];
            state.chartTimeFrameList = [];
            state.brokerListRedux = [];
            state.brokerEdit = false;
            AsyncStorage.clear();

        }

    },
});
export const { setActionList, setFilterObjRedux, setBrokerList, setBrokerEdit, setConfirm, setTradeList, setBrokerUpdateObj, setAllBrokerListRedux, setDefaultBrokerObj, setBrokerListRedux, setChartTimeFrameList, setSegmentList, setSessionList, setTradeTypeList, setEmotionList, flushAuthData, } = DataSlice.actions;

export default DataSlice.reducer;