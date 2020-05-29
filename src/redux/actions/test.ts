import {
  TEST_FETCH_DATA,
  TEST_SET_DATA,
  TEST_FETCH_SUCCESS,
  TEST_FETCH_ON_PROGRESS,
} from '../actions/types';

export interface TestAction {
  type: string;
  test?: any;
  testType?: any;
}

export function fetchTest(testType: any): TestAction {
  return {
    type: TEST_FETCH_DATA,
    testType,
  };
}

export function setTest(test: any): TestAction {
  return {
    type: TEST_SET_DATA,
    test,
  };
}

export function fetchTestOnProgress(): TestAction {
  return {
    type: TEST_FETCH_ON_PROGRESS,
  };
}

export function fetchTestSuccess(): TestAction {
  return {
    type: TEST_FETCH_SUCCESS,
  };
}
