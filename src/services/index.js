import axios from 'axios';
import Config from '../config';

const callApi = ({ method, url, params }) => {
  console.log('CALL API ', url);
  return new Promise(async (resolve, reject) => {
    axios({
      baseURL: Config.BASE_URL,
      timeout: Config.HTTP_REQUEST_TIMEOUT,
      url: url,
      // cancelToken: source.token,
      method: method ? method : 'POST',
      data: params ? params : null
    })
      .then(response => {
        console.log('ket qua server tra ve Hiep sida:', response);
        if (response.status === Config.HTTP_REQUEST_SUCCESSS) {
          resolve(response.data);
        } else {
          reject('failed');
        }
      })
      .catch(e => {
        console.log('url:', url);
        reject(e);
      });
  });
};

const callElearningApi = ({ method, url, params }) => {
  return new Promise(async (resolve, reject) => {
    axios({
      baseURL: Config.ELEARNING_URL,
      timeout: Config.HTTP_REQUEST_TIMEOUT,
      url: url,
      method: method ? method : 'POST',
      data: params ? params : null
    })
      .then(response => {
        if (response.status === Config.HTTP_REQUEST_SUCCESSS) {
          resolve(response.data);
        } else {
          reject('failed');
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export { callApi, callElearningApi };
