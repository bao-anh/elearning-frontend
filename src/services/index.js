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
  baseURL: Config.LOCALHOST_URL,
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
