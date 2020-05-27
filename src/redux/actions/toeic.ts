import {
  TOEIC_FETCH_BY_USER_ID,
  TOEIC_SET_DATA,
  TOEIC_FETCH_ON_PROGRESS,
  TOEIC_FETCH_SUCCESS,
  TOEIC_SUBMIT_SCORE,
} from '../actions/types';

export interface ToeicAction {
  type: string;
  toeic?: any;
  targetScore?: any;
  currentScore?: any;
}

export function fetchToeicByUserId(): ToeicAction {
  return {
    type: TOEIC_FETCH_BY_USER_ID,
  };
}

export function setToeic(toeic: any): ToeicAction {
  return {
    type: TOEIC_SET_DATA,
    toeic,
  };
}

export function fetchToeicOnProgress(): ToeicAction {
  return {
    type: TOEIC_FETCH_ON_PROGRESS,
  };
}

export function fetchToeicSuccess(): ToeicAction {
  return {
    type: TOEIC_FETCH_SUCCESS,
  };
}

export function submitToeicScore(
  targetScore: number,
  currentScore?: number
): ToeicAction {
  return {
    type: TOEIC_SUBMIT_SCORE,
    targetScore,
    currentScore,
  };
}
