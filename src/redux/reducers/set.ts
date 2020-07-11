import { Reducer } from 'redux';
import { SetAction } from '../actions/set';
import {
  SET_SET_DATA,
  SET_SET_CURRENT,
  SET_FETCH_ON_PROGRESS,
  SET_FETCH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/types';

export interface SetState {
  isLoading: boolean;
  data: Array<any>;
  error: string;
  current: Object;
}

const initState = {
  isLoading: true,
  data: [],
  current: {},
  error: '',
};

const setState: Reducer<SetState> = (
  state: SetState = initState,
  action: SetAction | any
): SetState => {
  switch (action.type) {
    case SET_SET_DATA: {
      return {
        ...state,
        data: action.set,
      };
    }
    case SET_SET_CURRENT: {
      return {
        ...state,
        current: action.set,
      };
    }
    case SET_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SET_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case AUTH_LOGOUT:
      return initState;
    default:
      return state;
  }
};

export default setState;
