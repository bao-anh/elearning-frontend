import {
  LEARN_FETCH_STUDY_BY_SET_ID,
  LEARN_FETCH_WRITE_BY_SET_ID,
  LEARN_FETCH_LISTEN_BY_SET_ID,
  LEARN_SET_LISTEN_DATA,
  LEARN_SET_STUDY_DATA,
  LEARN_SET_WRITE_DATA,
  LEARN_WRITE_ANSWER,
  LEARN_LISTEN_ANSWER,
  LEARN_STUDY_ANSWER,
  LEARN_UPDATE_REMEMBER,
  LEARN_FETCH_ON_PROGRESS,
  LEARN_FETCH_SUCCESS,
} from '../actions/types';

export interface LearnAction {
  type: string;
  set?: any;
  setId?: number;
  onError?: any;
  onSuccess?: any;
  study?: any;
  write?: any;
  listen?: any;
  isCorrect?: any;
  correct?: any;
  incorrect?: any;
  practiceType?: String;
  position?: any;
}

export function fetchStudyBySetId(setId: any, onError: any): LearnAction {
  return {
    type: LEARN_FETCH_STUDY_BY_SET_ID,
    setId,
    onError,
  };
}

export function fetchWriteBySetId(setId: any, onError: any): LearnAction {
  return {
    type: LEARN_FETCH_WRITE_BY_SET_ID,
    setId,
    onError,
  };
}

export function fetchListenBySetId(setId: any, onError: any): LearnAction {
  return {
    type: LEARN_FETCH_LISTEN_BY_SET_ID,
    setId,
    onError,
  };
}

export function setStudy(study: any): LearnAction {
  return {
    type: LEARN_SET_STUDY_DATA,
    study,
  };
}

export function setWrite(write: any): LearnAction {
  return {
    type: LEARN_SET_WRITE_DATA,
    write,
  };
}

export function setListen(listen: any): LearnAction {
  return {
    type: LEARN_SET_LISTEN_DATA,
    listen,
  };
}

export function writeAnswer(isCorrect: any): LearnAction {
  return {
    type: LEARN_WRITE_ANSWER,
    isCorrect,
  };
}

export function listenAnswer(isCorrect: any): LearnAction {
  return {
    type: LEARN_LISTEN_ANSWER,
    isCorrect,
  };
}

export function studyAnswer(position: any, isCorrect: any): LearnAction {
  return {
    type: LEARN_STUDY_ANSWER,
    position,
    isCorrect,
  };
}

export function updateRemember(
  setId: any,
  practiceType: String,
  onSuccess: any,
  onError: any
): LearnAction {
  return {
    type: LEARN_UPDATE_REMEMBER,
    setId,
    practiceType,
    onSuccess,
    onError,
  };
}

export function fetchLearnSuccess(): LearnAction {
  return {
    type: LEARN_FETCH_SUCCESS,
  };
}

export function fetchLearnOnProgress(): LearnAction {
  return {
    type: LEARN_FETCH_ON_PROGRESS,
  };
}
