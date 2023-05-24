import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { RouteConfig } from './routes';

import configureStore from './redux/setup/storeSetup';
import './utils/axios';
import Toaster from './ui/layouts/common/Toaster';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './App.css';
import './ui/default.css';

const { store, persistor } = configureStore();
if (
  process.env.REACT_APP_DEMO_SETUP === 'true' &&
  (process.env.REACT_APP_USERNAME === undefined ||
    process.env.REACT_APP_PASSWORD === undefined)
) {
  console.warn(
    'You need to add process.env.REACT_APP_USERNAME and process.env.REACT_APP_PASSWORD in .env file.',
  );
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <RouteConfig />
      </PersistGate>
    </Provider>
  );
};

export default App;
