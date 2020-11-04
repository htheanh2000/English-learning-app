/**
 * @format
 */

import {AppRegistry,DeviceEventEmitter} from 'react-native';
import {name as appName} from './app.json';
import React, { Component } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'
import store, { persistor } from './app/state'
import { PersistGate } from 'redux-persist/integration/react';



if (__DEV__) {
	require('./app/ReactotronConfig');
} else {
	console.log = () => {};
	console.time = () => {};
	console.timeLog = () => {};
	console.timeEnd = () => {};
	console.warn = () => {};
	console.count = () => {};
	console.countReset = () => {};
	console.error = () => {};
	console.info = () => {};
}

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


const TimeSlide =async () => {
	console.log('Receiving TimeSlide!');
};

AppRegistry.registerHeadlessTask('TimeSlide', () => TimeSlide);
AppRegistry.registerComponent(appName, () => WrapApp);