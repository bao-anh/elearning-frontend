import { fork } from 'redux-saga/effects';
import auth from './auth';
import course from './course';
import category from './category';
import topic from './topic';
import lesson from './lesson';
import assignment from './assignment';
import operation from './operation';

export default function* rootSaga() {
  yield fork(auth);
  yield fork(course);
  yield fork(category);
  yield fork(topic);
  yield fork(operation);
  yield fork(lesson);
  yield fork(assignment);
}
