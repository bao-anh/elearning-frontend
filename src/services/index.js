import axios from 'axios';
import Config from '../config';

export const setToken = (token) => {
  window.localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getToken = () => {
  return window.localStorage.getItem('token');
};

export const removeToken = () => {
  const token = getToken();
  if (token) return window.localStorage.removeItem('token');
};

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? Config.HEROKU_URL
      : Config.LOCALHOST_URL,
  timeout: 30000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Bearer ${getToken()}`,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       removeToken();
//       window.location = '/signin';
//     } else {
//       return Promise.reject(error);
//     }
//     return error;
//   }
// );
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 500) {
//       window.location = '/';
//     } else {
//       return Promise.reject(error);
//     }
//     return error;
//   }
// );
