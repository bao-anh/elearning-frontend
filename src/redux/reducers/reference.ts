import { Reducer } from 'redux';
import Reference from '../../models/Reference';
import { ReferenceAction } from '../actions/reference';
import {
  REFERENCE_SET_DATA,
  REFERENCE_FETCH_SUCCESS,
  REFERENCE_FETCH_ON_PROGRESS,
} from '../actions/types';

export interface ReferenceState {
  isLoading: boolean;
  data: Array<Reference>;
  error: string;
}

const initState = {
  isLoading: true,
  data: [],
  error: '',
};

const authState: Reducer<ReferenceState> = (
  state: ReferenceState = initState,
  action: ReferenceAction | any
): ReferenceState => {
  switch (action.type) {
    case REFERENCE_SET_DATA: {
      return {
        ...state,
        data: action.reference,
      };
    }
    case REFERENCE_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REFERENCE_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default authState;
