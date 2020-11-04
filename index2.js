import React, { Component } from 'react';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'
import store, { persistor } from './state'
import { PersistGate } from 'redux-persist/integration/react';

function WrapApp(){
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <PaperProvider>
          <App />
        </PaperProvider>
      {/* </PersistGate> */}
    </Provider>
  )
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(WrapApp);
