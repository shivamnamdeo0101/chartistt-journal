import { EndPoint } from '../utils/Endpoint';

export const BROKER_API = {
  addBroker: async function (payload, token) {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return fetch(`${EndPoint}private/brokers`, {
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

  getAllBrokers: async function (userId, token) {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return fetch(`${EndPoint}private/brokers/` + userId, {
      method: 'GET',
      headers: headers,
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

  remBroker: async function (payload, token) {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return fetch(`${EndPoint}private/brokers`, {
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

  updateBroker: async function (payload, token) {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    };

    return fetch(`${EndPoint}private/brokers`, {
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
