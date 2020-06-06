import { fork } from 'redux-saga/effects';
import auth from './auth';
import course from './course';
import category from './category';
import topic from './topic';
import lesson from './lesson';
import assignment from './assignment';
import toeic from './toeic';
import scale from './scale';
import operation from './operation';
import test from './test';
import set from './set';
import learn from './learn';

export default function* rootSaga() {
  yield fork(auth);
  yield fork(course);
  yield fork(category);
  yield fork(topic);
  yield fork(operation);
  yield fork(lesson);
  yield fork(assignment);
  yield fork(scale);
  yield fork(toeic);
  yield fork(test);
  yield fork(set);
  yield fork(learn);
}
