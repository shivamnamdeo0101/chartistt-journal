export const CALC = {

    pAndL:async function (list) {
       
        return 50
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



};