import moment from 'moment';
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
    getAllTrades: async function (payload,token) {

        console.log(payload,"NW Payload")

        const  headers = { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }
        return axios.request({
            method: 'post',
            url: `${EndPoint}private/trades-filter`,
            data: payload,
            headers:headers
        })
    },
    
    remTrade: async function (payload,token) {
        const  headers = { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }
        return axios.request({
            method: 'delete',
            url: `${EndPoint}private/trades`,
            data: payload,
            headers:headers
        })
    },
    updateTrade: async function (payload,token) {
        const  headers = { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }
        return axios.request({
            method: 'put',
            url: `${EndPoint}private/trades`,
            data: payload,
            headers:headers
        })
    },



};