import { all, fork } from 'redux-saga/effects';
import { appInfoSaga } from './appInfo';
import course from './course';
import category from './category';
import topic from './topic';
import reference from './reference';
import operation from './operation';

export default function* rootSaga() {
  yield fork(course);
  yield fork(category);
  yield fork(topic);
  yield fork(operation);
  yield fork(reference);
  yield all([...appInfoSaga]);
}
