import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { api, setToken, removeToken } from '../../services';
import {
  setUserInfo,
  fetchUserSuccess,
  fetchUserOnProgress,
  setAuthenticate,
} from '../actions/auth';
import {
  AUTH_FETCH_USER_INFO,
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

export function* login(action: any) {
  try {
    yield put(fetchUserOnProgress());
    const response = yield call(onLogin, action.credentials);
    yield removeToken();
    yield setToken(response.data.token);
    const userInfo = yield call(getUserInfo);
    yield put(setUserInfo(userInfo.data));
    yield put(setAuthenticate(true));
    yield put(fetchUserSuccess());
  } catch (err) {
    action.onError(err.response.data);
    yield put(fetchUserSuccess());
  }
}

export function* register(action: any) {
  try {
    yield put(fetchUserOnProgress());
    const response = yield call(onRegister, action.credentials);
    yield setToken(response.data.token);
    const userInfo = yield call(getUserInfo);
    yield put(setUserInfo(userInfo.data));
    yield put(setAuthenticate(true));
    yield put(fetchUserSuccess());
  } catch (err) {
    action.onError(err.response.data);
    yield put(fetchUserSuccess());
  }
}

export function* fetchUserInfo() {
  try {
    const response = yield call(getUserInfo);
    yield put(setUserInfo(response.data));
  } catch (err) {
    console.log(err);
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

export default function* auth() {
  yield fork(watchLogin);
  yield fork(watchRegister);
  yield fork(watchFetchUserInfo);
}
