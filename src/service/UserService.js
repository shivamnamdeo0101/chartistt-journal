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
    
    getAllNotifications: async function (token) {
      const  headers = { 
          'Authorization': 'Bearer '+token, 
          'Content-Type': 'application/json'
      }
      return axios.request({
          method: 'get',
          url: `${EndPoint}private/notifications`,
          headers:headers
      })
  },

    
   
    
};