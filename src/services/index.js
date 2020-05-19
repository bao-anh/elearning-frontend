import axios from 'axios';
import Config from '../config';

export const callApi = ({ method, url, params }) => {
  console.log('CALL API ', url);
  return new Promise(async (resolve, reject) => {
    axios({
      baseURL: Config.BASE_URL,
      timeout: Config.HTTP_REQUEST_TIMEOUT,
      url: url,
      // cancelToken: source.token,
      method: method ? method : 'POST',
      data: params ? params : null,
    })
      .then((response) => {
        console.log('ket qua server tra ve Hiep sida:', response);
        if (response.status === Config.HTTP_REQUEST_SUCCESSS) {
          resolve(response.data);
        } else {
          reject('failed');
        }
      })
      .catch((e) => {
        console.log('url:', url);
        reject(e);
      });
  });
};

export const callElearningApi = ({ method, url, params }) => {
  return new Promise(async (resolve, reject) => {
    axios({
      baseURL: Config.ELEARNING_URL,
      timeout: Config.HTTP_REQUEST_TIMEOUT,
      url: url,
      method: method ? method : 'POST',
      data: params ? params : null,
    })
      .then((response) => {
        if (response.status === Config.HTTP_REQUEST_SUCCESSS) {
          resolve(response.data);
        } else {
          reject('failed');
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const api = axios.create({
  baseURL: Config.HEROKU_URL,
  timeout: 30000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = '/signin';
    } else {
      return Promise.reject(error);
    }
    return error;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403 || error.response.status === 404) {
      window.location = '/';
    } else {
      return Promise.reject(error);
    }
    return error;
  }
);

export const setToken = (token) => {
  window.localStorage.setItem('token', token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getToken = () => {
  return window.localStorage.getItem('token');
};

export const removeToken = () => {
  return window.localStorage.removeItem('token');
};
