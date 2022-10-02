import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { RouteConfig } from './routes';

import configureStore from './redux/setup/storeSetup';
import Toaster from './ui/layouts/common/Toaster';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './App.css';
import './ui/default.css';

const { store, persistor } = configureStore();

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
