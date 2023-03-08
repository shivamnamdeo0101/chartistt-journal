import axios from 'react-native-axios';
import { EndPoint } from '../utils/Endpoint';


export const TRADE_API = {

    addTrade: async function (payload,token) {
        const  headers = { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }
        return axios.request({          
            method: 'post',
            url: `${EndPoint}private/trades`,
            data: payload,
            headers:headers
        })
    },
    getAllTrades: async function (userId,token) {
        const  headers = { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/trades/`+userId,
            headers:headers
        })
    },




};