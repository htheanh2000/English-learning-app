/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React, { Component } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './app/App';
import store from './app/store/store'
import { Provider } from 'react-redux'
import {myTheme} from './app/styles/themes'

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

function WrapApp(props){
  return (
    <Provider store={store}>
        <PaperProvider theme={myTheme}>
          	<App props={props} />
        </PaperProvider>
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => WrapApp);