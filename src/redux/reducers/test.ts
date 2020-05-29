import { Reducer } from 'redux';
import { TestAction } from '../actions/test';
import {
  TEST_SET_DATA,
  TEST_FETCH_ON_PROGRESS,
  TEST_FETCH_SUCCESS,
} from '../actions/types';

export interface TestState {
  isLoading: boolean;
  data: Array<any>;
  error: string;
}

const initState = {
  isLoading: true,
  data: [],
  error: '',
};

const testState: Reducer<TestState> = (
  state: TestState = initState,
  action: TestAction | any
): TestState => {
  switch (action.type) {
    case TEST_SET_DATA: {
      return {
        ...state,
        data: action.test,
      };
    }
    case TEST_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TEST_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default testState;
