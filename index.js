/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React, { Component } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/state'



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
        <PaperProvider>
          <App />
        </PaperProvider>
    </Provider>
  )
}


const test =async () => {
	console.log('Receiving test!');
};

AppRegistry.registerHeadlessTask('test', () => test);
AppRegistry.registerComponent(appName, () => WrapApp);