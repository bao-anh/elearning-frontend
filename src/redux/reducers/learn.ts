import { Reducer } from 'redux';
import { LearnAction } from '../actions/learn';
import {
  LEARN_SET_LISTEN_DATA,
  LEARN_SET_STUDY_DATA,
  LEARN_SET_WRITE_DATA,
  LEARN_SET_ALL_WRITE_DATA,
  LEARN_SET_ALL_LISTEN_DATA,
  LEARN_SET_ALL_STUDY_DATA,
  LEARN_WRITE_ANSWER,
  LEARN_LISTEN_ANSWER,
  LEARN_STUDY_ANSWER,
  LEARN_FETCH_ON_PROGRESS,
  LEARN_FETCH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/types';

export interface LearnState {
  isLoading: boolean;
  all: {
    study: Object;
    write: Object;
    listen: Object;
  };
  error: string;
}

const initState = {
  isLoading: true,
  all: {
    study: {},
    write: {},
    listen: {},
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
        [action.setId]: {
          //@ts-ignore
          ...state[action.setId],
          listen: action.listen,
        },
      };
    }

    case LEARN_SET_WRITE_DATA: {
      return {
        ...state,
        [action.setId]: {
          //@ts-ignore
          ...state[action.setId],
          write: action.write,
        },
      };
    }

    case LEARN_SET_STUDY_DATA: {
      return {
        ...state,
        [action.setId]: {
          //@ts-ignore
          ...state[action.setId],
          study: action.study,
        },
      };
    }

    case LEARN_SET_ALL_WRITE_DATA: {
      return {
        ...state,
        all: {
          ...state.all,
          write: action.write,
        },
      };
    }

    case LEARN_SET_ALL_LISTEN_DATA: {
      return {
        ...state,
        all: {
          ...state.all,
          listen: action.listen,
        },
      };
    }

    case LEARN_SET_ALL_STUDY_DATA: {
      return {
        ...state,
        all: {
          ...state.all,
          study: action.study,
        },
      };
    }

    case LEARN_WRITE_ANSWER: {
      //@ts-ignore
      const newRemain = [...state[action.setId].write.remain];
      //@ts-ignore
      const newCorrect = [...state[action.setId].write.correct];
      //@ts-ignore
      const newIncorrect = [...state[action.setId].write.incorrect];
      if (action.isCorrect) {
        newCorrect.push(newRemain[0]);
        newRemain.shift();
      } else {
        newIncorrect.push(newRemain[0]);
        newRemain.shift();
      }
      return {
        ...state,
        [action.setId]: {
          //@ts-ignore
          ...state[action.setId],
          write: {
            //@ts-ignore
            ...state[action.setId].write,
            remain: newRemain,
            correct: newCorrect,
            incorrect: newIncorrect,
          },
        },
      };
    }

    case LEARN_LISTEN_ANSWER: {
      //@ts-ignore
      const newRemain = [...state[action.setId].listen.remain];
      //@ts-ignore
      const newCorrect = [...state[action.setId].listen.correct];
      //@ts-ignore
      const newIncorrect = [...state[action.setId].listen.incorrect];
      if (action.isCorrect) {
        newCorrect.push(newRemain[0]);
        newRemain.shift();
      } else {
        newIncorrect.push(newRemain[0]);
        newRemain.shift();
      }
      return {
        ...state,
        [action.setId]: {
          //@ts-ignore
          ...state[action.setId],
          listen: {
            //@ts-ignore
            ...state[action.setId].listen,
            remain: newRemain,
            correct: newCorrect,
            incorrect: newIncorrect,
          },
        },
      };
    }

    case LEARN_STUDY_ANSWER: {
      //@ts-ignore
      const { remain, familiar, mastered, current } = state[action.setId].study;
      const newRemain = [...remain];
      const newFamiliar = [...familiar];
      const newMastered = [...mastered];
      if (action.isCorrect) {
        if (action.position === 'remain') {
          const index = newRemain.findIndex(
            //@ts-ignore
            (ele) => ele.name === current.name
          );
          newRemain.splice(index, 1);
          newFamiliar.push(current);
          const newCurrentIndex = Math.floor(
            Math.random() * (newRemain.length + newFamiliar.length)
          );
          let newCurrent = {};
          if (newCurrentIndex >= newRemain.length) {
            newCurrent = newFamiliar[newCurrentIndex - newRemain.length];
          } else newCurrent = newRemain[newCurrentIndex];

          return {
            ...state,
            [action.setId]: {
              //@ts-ignore
              ...state[action.setId],
              study: {
                //@ts-ignore
                ...state[action.setId].study,
                familiar: newFamiliar,
                remain: newRemain,
                current: newCurrent,
              },
            },
          };
        } else if (action.position === 'familiar') {
          const index = newFamiliar.findIndex(
            //@ts-ignore
            (ele) => ele.name === current.name
          );
          newFamiliar.splice(index, 1);
          newMastered.push(current);
          let newCurrent = {};
          if (newRemain.length !== 0 || newFamiliar.length !== 0) {
            const newCurrentIndex = Math.floor(
              Math.random() * (newRemain.length + newFamiliar.length)
            );
            if (newCurrentIndex >= newRemain.length) {
              newCurrent = newFamiliar[newCurrentIndex - newRemain.length];
            } else newCurrent = newRemain[newCurrentIndex];
          }
          return {
            ...state,
            [action.setId]: {
              //@ts-ignore
              ...state[action.setId],
              study: {
                //@ts-ignore
                ...state[action.setId].study,
                familiar: newFamiliar,
                mastered: newMastered,
                current: newCurrent,
              },
            },
          };
        }
      } else {
        if (action.position === 'remain') {
          const newCurrentIndex = Math.floor(
            Math.random() * (newRemain.length + newFamiliar.length)
          );
          let newCurrent = {};
          if (newCurrentIndex >= newRemain.length) {
            newCurrent = newFamiliar[newCurrentIndex - newRemain.length];
          } else newCurrent = newRemain[newCurrentIndex];

          return {
            ...state,
            [action.setId]: {
              //@ts-ignore
              ...state[action.setId],
              study: {
                //@ts-ignore
                ...state[action.setId].study,
                current: newCurrent,
              },
            },
          };
        } else if (action.position === 'familiar') {
          const index = newFamiliar.findIndex(
            //@ts-ignore
            (ele) => ele.name === current.name
          );
          newFamiliar.splice(index, 1);
          newRemain.push(current);
          const newCurrentIndex = Math.floor(
            Math.random() * (newRemain.length + newFamiliar.length)
          );
          let newCurrent = {};
          if (newCurrentIndex >= newRemain.length) {
            newCurrent = newFamiliar[newCurrentIndex - newRemain.length];
          } else newCurrent = newRemain[newCurrentIndex];

          return {
            ...state,
            [action.setId]: {
              //@ts-ignore
              ...state[action.setId],
              study: {
                //@ts-ignore
                ...state[action.setId].study,
                familiar: newFamiliar,
                remain: newRemain,
                current: newCurrent,
              },
            },
          };
        }
      }
      return state;
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

    case AUTH_LOGOUT: {
      return initState;
    }
    default:
      return state;
  }
};

export default learnState;
