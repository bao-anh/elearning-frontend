import {
  SCALE_FETCH_DATA,
  SCALE_SET_DATA,
  SCALE_FETCH_ON_PROGRESS,
  SCALE_FETCH_SUCCESS,
} from '../actions/types';

export interface ScaleAction {
  type: string;
  scale?: any;
}

export function fetchScale(): ScaleAction {
  return {
    type: SCALE_FETCH_DATA,
  };
}

export function setScale(scale: any): ScaleAction {
  return {
    type: SCALE_SET_DATA,
    scale,
  };
}

export function fetchScaleOnProgress(): ScaleAction {
  return {
    type: SCALE_FETCH_ON_PROGRESS,
  };
}

export function fetchScaleSuccess(): ScaleAction {
  return {
    type: SCALE_FETCH_SUCCESS,
  };
}
