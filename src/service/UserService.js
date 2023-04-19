import axios from 'react-native-axios';
import { EndPoint } from '../utils/Endpoint';

const headers = { 
  'Content-Type': 'application/json'
}
export const USER_API = {

    userLogin:async function(payload){
      var data = JSON.stringify(payload);
      return axios.request({
        method: 'post',
        url: `${EndPoint}auth/google-auth`,
        data: payload,
      })
    },

    userUpdate:async function(payload){
      var data = JSON.stringify(payload);
      const headers = {
        'Authorization': 'Bearer ' + payload?.token,
        'Content-Type': 'application/json'
      }
      return axios.request({
        method: 'post',
        
        url: `${EndPoint}auth/update-profile`,
        data: payload,
        headers: headers
      })
    },

    userPhoneLogin:async function(payload){
      
      var data = JSON.stringify(payload);
      return axios.request({
        method: 'post',
        url: `${EndPoint}auth/phone-auth`,
        data: payload,
       
      })
    },
    
  getAllNotifications: async function (token) {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
    return axios.request({
      method: 'get',
      url: `${EndPoint}private/notifications`,
      headers: headers
    })
  },
  getData: async function (name,token) {
   
    return axios.request({
        method: 'get',
        url: `${EndPoint}private/data/`+name,
        

    })
},
    
   
    
};