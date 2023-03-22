import axios from 'react-native-axios';
import { EndPoint } from '../utils/Endpoint';


export const BROKER_API = {

    addBroker: async function (payload,token) {
        const  headers = { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }
        return axios.request({
            method: 'post',
            url: `${EndPoint}private/brokers`,
            data: payload,
            headers:headers
        })
    },

    getAllBrokers: async function (userId,token) {
        const  headers = { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/brokers/`+userId,
            headers:headers
        })
    },

    remBroker: async function (payload,token) {
        const  headers = { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }
        return axios.request({
            method: 'delete',
            url: `${EndPoint}private/brokers`,
            data: payload,
            headers:headers
        })
    },
    updateBroker: async function (payload,token) {
        const  headers = { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }
        return axios.request({
            method: 'put',
            url: `${EndPoint}private/brokers`,
            data: payload,
            headers:headers
        })
    },



};