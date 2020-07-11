import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api, setToken, removeToken } from '../../services';
import { handleRedirectWhenServerError } from '../../utils';
import Routes from '../../routes';
import {
  setUserInfo,
  fetchUserSuccess,
  fetchUserOnProgress,
  setAuthenticate,
} from '../actions/auth';
import {
  AUTH_FETCH_USER_INFO,
  AUTH_UPDATE_USER_INFO,
  AUTH_LOGIN,
  AUTH_REGISTER,
} from '../actions/types';

const onLogin = (credentials: any) => {
  return api.post('auth', credentials);
};

const onRegister = (credentials: any) => {
  return api.post('users', credentials);
};

const getUserInfo = () => {
  return api.get('auth');
};

export const putUserInfoWithImage = (user: any) => {
  return api.put('/users/with-image', user, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const putUserInfoWithoutImage = (user: any) => {
  return api.put('users/without-image', user);
};

export const updateCourseIds = (courseId: any) => {
  return api.put('users/courses', { courseId });
};

export function* login(action: any) {
  try {
    yield put(fetchUserOnProgress());
    const response = yield call(onLogin, action.credentials);
    yield removeToken();
    yield setToken(response.data.token);
    yield put(setUserInfo(response.data.user));
    yield put(setAuthenticate(true));
    yield put(fetchUserSuccess());
  } catch (err) {
    action.onError(err.response);
    yield put(fetchUserSuccess());
  }
}

export function* register(action: any) {
  try {
    yield put(fetchUserOnProgress());
    const response = yield call(onRegister, action.credentials);
    yield setToken(response.data.token);
    console.log(response);
    yield put(setUserInfo(response.data.user));
    yield put(setAuthenticate(true));
    yield put(fetchUserSuccess());
  } catch (err) {
    action.onError(err.response);
    yield put(fetchUserSuccess());
  }
}

export function* fetchUserInfo() {
  try {
    yield put(fetchUserOnProgress());
    const response = yield call(getUserInfo);
    yield put(setUserInfo(response.data));
    yield put(fetchUserSuccess());
  } catch (err) {
    handleRedirectWhenServerError(err, Routes);
    console.log(err.response);
  }
}

export function* updateUserInfo(action: any) {
  try {
    if (action.isUpdateWithImage) {
      const response = yield call(putUserInfoWithImage, action.userInfo);
      if (response.status === 200) {
        const userInfo = yield call(getUserInfo);
        yield put(setUserInfo(userInfo.data));
        action.onSuccess();
      }
    } else {
      const response = yield call(putUserInfoWithoutImage, action.userInfo);
      if (response.status === 200) {
        const userInfo = yield call(getUserInfo);
        yield put(setUserInfo(userInfo.data));
        action.onSuccess();
      }
    }
  } catch (err) {
    handleRedirectWhenServerError(err, Routes);
    console.log(err.response);
  }
}

export function* watchLogin() {
  yield takeLatest(AUTH_LOGIN, login);
}

export function* watchRegister() {
  yield takeLatest(AUTH_REGISTER, register);
}

export function* watchFetchUserInfo() {
  yield takeLatest(AUTH_FETCH_USER_INFO, fetchUserInfo);
}

export function* watchUpdateUserInfo() {
  yield takeLatest(AUTH_UPDATE_USER_INFO, updateUserInfo);
}

export default function* auth() {
  yield fork(watchLogin);
  yield fork(watchRegister);
  yield fork(watchFetchUserInfo);
  yield fork(watchUpdateUserInfo);
}
