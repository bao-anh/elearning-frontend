import {
  jssPreset,
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { create } from 'jss';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.js';
import configStore from './redux/store';
import theme from './theme';
import './index.css';

const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});

const generateClassName = createGenerateClassName({
  productionPrefix: 'some',
});

const store = configStore();
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store.store as any}>
      <PersistGate persistor={store.persistor} loading={makeLoading()}>
        <StylesProvider jss={jss} generateClassName={generateClassName}>
          <App />
        </StylesProvider>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

function makeLoading() {
  return (
    <div className='main-loading'>
      <div className='lds-dual-ring'></div>
    </div>
  );
}
