import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import { logger } from 'redux-logger';
import rootReducer from './reducers/index';
import rootSaga from './sagas';
import { persistReducer, persistStore } from 'redux-persist';
import localforage from 'localforage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { AppState } from './appstate';
import createEncryptor from 'redux-persist-transform-encrypt';
import Config from '../config';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Array<Middleware> = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
localforage.config({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: 'uTest',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'data', // Should be alphanumeric, with underscores.
  description: 'offline data for web',
});
const encryptor = createEncryptor({
  secretKey: Config.SECRET_KEY,
  onError: function (error) {
    // Handle the error.
    console.log('encrypt error', error);
  },
});
const persistConfig = {
  key: 'root',
  storage: localforage,
  stateReconciler: autoMergeLevel2,
  transform: [encryptor],
  whitelist: [
    // 'courseState',
    'categoryState',
    // 'topicState',
    // 'assignmentState',
    // 'lessonState',
    'authState',
  ],
};
const pReducer = persistReducer(persistConfig, rootReducer);
export default function configureStore() {
  // create the composing function for our middlewares
  // const composeEnhancers = composeWithDevTools({})
  // create the redux-saga middleware
  // const sagaMiddleware = createSagaMiddleware()

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store: Store<AppState> = createStore<AppState>(
    //   connectRouter(history)(rootReducer),
    pReducer,
    //   initialState,
    applyMiddleware(...middlewares)
  );
  const persistor = persistStore(store, null);
  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
}
