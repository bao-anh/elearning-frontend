import { Reducer } from 'redux';
import { SetAction } from '../actions/set';
import {
  SET_SET_DATA,
  SET_FETCH_ON_PROGRESS,
  SET_FETCH_SUCCESS,
} from '../actions/types';

export interface SetState {
  isLoading: boolean;
  data: Array<any>;
  error: string;
}

const initState = {
  isLoading: true,
  data: [],
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
    default:
      return state;
  }
};

export default setState;
