import React from 'react';
import { Main } from './src/Main';
import { Provider } from 'react-redux';
import { store } from './src/store';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
