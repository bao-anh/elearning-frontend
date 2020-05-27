import { Reducer } from 'redux';
import { ToeicAction } from '../actions/toeic';
import {
  TOEIC_SET_DATA,
  TOEIC_FETCH_ON_PROGRESS,
  TOEIC_FETCH_SUCCESS,
} from '../actions/types';

export interface ToeicState {
  isLoading: boolean;
  data: Array<any>;
  error: string;
}

const initState = {
  isLoading: true,
  data: [],
  error: '',
};

const toeicState: Reducer<ToeicState> = (
  state: ToeicState = initState,
  action: ToeicAction | any
): ToeicState => {
  switch (action.type) {
    case TOEIC_SET_DATA: {
      return {
        ...state,
        data: action.toeic,
      };
    }
    case TOEIC_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TOEIC_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default toeicState;
