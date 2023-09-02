import { EndPoint } from '../utils/Endpoint';

const headers = {
  'Content-Type': 'application/json',
};

export const USER_API = {
  userEmailLogin: async function (payload) {
    return fetch(`${EndPoint}auth/email-auth-login`, {
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

  userEmailReg: async function (payload) {
    return fetch(`${EndPoint}auth/email-auth-reg`, {
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

  userGoogleLogin: async function (payload) {
    return fetch(`${EndPoint}auth/google-auth`, {
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

  userGetProfile: async function (userId, token) {
    const authHeaders = {
      'Authorization': 'Bearer ' + token,
      ...headers,
    };

    return fetch(`${EndPoint}private/profile/` + userId, {
      method: 'GET',
      headers: authHeaders,
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

  userUpdate: async function (payload, token) {
    const authHeaders = {
      'Authorization': 'Bearer ' + token,
      ...headers,
    };

    return fetch(`${EndPoint}auth/update-profile`, {
      method: 'POST',
      headers: authHeaders,
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

  getAllNotifications: async function (token) {
    const authHeaders = {
      'Authorization': 'Bearer ' + token,
      ...headers,
    };

    return fetch(`${EndPoint}private/notifications`, {
      method: 'GET',
      headers: authHeaders,
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

  getData: async function (name, token) {
    const authHeaders = {
      'Authorization': 'Bearer ' + token,
      ...headers,
    };

    return fetch(`${EndPoint}private/data/` + name, {
      method: 'GET',
      headers: authHeaders,
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
