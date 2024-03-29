import moment from 'moment';
import { EndPoint } from '../utils/Endpoint';

export const TRADE_API = {
  addTrade: async function (payload, token) {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return fetch(`${EndPoint}private/trades`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          return data.data;
        } else {
          throw new Error(data.msg);
        }
      });
  },

  getAllTrades: async function (payload, token) {

    console.log("===============getAllTrades=================",moment(Date.now()).format())

    const { sortBy, start, end,userId ,brokerId,duration} = payload;
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return fetch(`${EndPoint}private/trades-filter/${userId}/${brokerId}/${sortBy}/${duration?.start}/${end}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          return data?.data;
        } else {
          throw new Error(data.msg);
        }
      });
  },

  getAllCalenderTrades: async function (payload, token) {
    const { start, end,userId } = payload;
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return fetch(`${EndPoint}private/trades/${userId}/${start}/${end}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          return data?.data;
        } else {
          throw new Error(data.msg);
        }
      });
  },

  remTrade: async function (payload, token) {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return fetch(`${EndPoint}private/trades`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          return data.data;
        } else {
          throw new Error(data.msg);
        }
      });
  },

  updateTrade: async function (payload, token) {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return fetch(`${EndPoint}private/trades`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          return data.data;
        } else {
          throw new Error(data.msg);
        }
      });
  },
};
