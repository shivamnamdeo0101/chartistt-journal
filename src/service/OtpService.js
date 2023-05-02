import axios from 'react-native-axios';
import { EndPoint } from '../utils/Endpoint';


export const OTP_API = {

    sendOtp: async function (payload,token) {
        
        return axios.request({
            method: 'post',
            url: `${EndPoint}auth/otp-send`,
            data: payload,
        })
    },

    checkOtp: async function (payload) {
    
        return axios.request({
            method: 'post',
            url: `${EndPoint}auth/otp-verify`,
            data:payload
        })
    }

   


};