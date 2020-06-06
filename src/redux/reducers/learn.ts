import { Reducer } from 'redux';
import { LearnAction } from '../actions/learn';
import {
  LEARN_SET_LISTEN_DATA,
  LEARN_SET_STUDY_DATA,
  LEARN_SET_WRITE_DATA,
  LEARN_WRITE_ANSWER,
  LEARN_LISTEN_ANSWER,
  LEARN_FETCH_ON_PROGRESS,
  LEARN_FETCH_SUCCESS,
} from '../actions/types';

export interface LearnState {
  isLoading: boolean;
  study: Object;
  write: {
    termIds: Array<any>;
    remain: Array<any>;
    correct: Array<any>;
    incorrect: Array<any>;
  };
  listen: {
    termIds: Array<any>;
    remain: Array<any>;
    correct: Array<any>;
    incorrect: Array<any>;
  };
  error: string;
}

const initState = {
  isLoading: true,
  study: {},
  write: {
    termIds: [],
    remain: [],
    correct: [],
    incorrect: [],
  },
  listen: {
    termIds: [],
    remain: [],
    correct: [],
    incorrect: [],
  },
  error: '',
};

const learnState: Reducer<LearnState> = (
  state: LearnState = initState,
  action: LearnAction | any
): LearnState => {
  switch (action.type) {
    case LEARN_SET_LISTEN_DATA: {
      return {
        ...state,
        listen: action.listen,
      };
    }
    case LEARN_SET_WRITE_DATA: {
      return {
        ...state,
        write: action.write,
      };
    }
    case LEARN_SET_STUDY_DATA: {
      return {
        ...state,
        study: action.study,
      };
    }
    case LEARN_WRITE_ANSWER: {
      const newRemain = [...state.write.remain];
      const newCorrect = [...state.write.correct];
      const newIncorrect = [...state.write.incorrect];
      if (action.isCorrect) {
        newCorrect.push(newRemain[0]);
        newRemain.shift();
      } else {
        newIncorrect.push(newRemain[0]);
        newRemain.shift();
      }
      return {
        ...state,
        write: {
          ...state.write,
          remain: newRemain,
          correct: newCorrect,
          incorrect: newIncorrect,
        },
      };
    }
    case LEARN_LISTEN_ANSWER: {
      const newRemain = [...state.listen.remain];
      const newCorrect = [...state.listen.correct];
      const newIncorrect = [...state.listen.incorrect];
      if (action.isCorrect) {
        newCorrect.push(newRemain[0]);
        newRemain.shift();
      } else {
        newIncorrect.push(newRemain[0]);
        newRemain.shift();
      }
      return {
        ...state,
        listen: {
          ...state.listen,
          remain: newRemain,
          correct: newCorrect,
          incorrect: newIncorrect,
        },
      };
    }
    case LEARN_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LEARN_FETCH_ON_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
};

export default learnState;
