import { Reducer } from 'redux';
import { ToeicAction } from '../actions/toeic';
import {
  SCALE_SET_DATA,
  SCALE_FETCH_ON_PROGRESS,
  SCALE_FETCH_SUCCESS,
} from '../actions/types';

export interface ScaleState {
  isLoading: boolean;
  data: Array<any>;
  error: string;
}

const initState = {
  isLoading: true,
  data: [],
  error: '',
};

const scaleState: Reducer<ScaleState> = (
  state: ScaleState = initState,
  action: ToeicAction | any
): ScaleState => {
  switch (action.type) {
    case SCALE_SET_DATA: {
      return {
        ...state,
        data: action.scale,
      };
    }
    case SCALE_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SCALE_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default scaleState;
