import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from 'reducers';
import App from 'containers/app';
import apiService from 'services/api';

const store = createStore(reducer, {}, applyMiddleware(apiService));

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
