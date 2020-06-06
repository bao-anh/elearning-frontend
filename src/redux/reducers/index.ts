import { combineReducers } from 'redux';
import { AppState } from '../appstate';
import courseState from './course';
import categoryState from './category';
import topicState from './topic';
import lessonState from './lesson';
import assignmentState from './assignment';
import authState from './auth';
import toeicState from './toeic';
import scaleState from './scale';
import testState from './test';
import setState from './set';
import learnState from './learn';

const rootReducer = combineReducers<AppState>({
  authState: authState,
  categoryState: categoryState,
  courseState: courseState,
  topicState: topicState,
  lessonState: lessonState,
  assignmentState: assignmentState,
  toeicState: toeicState,
  scaleState: scaleState,
  testState: testState,
  setState: setState,
  learnState: learnState,
});

export default rootReducer;
