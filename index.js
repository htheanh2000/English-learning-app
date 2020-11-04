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

function WrapApp(props){
  return (
    <Provider store={store}>
        <PaperProvider>
          	<App props={props} />
        </PaperProvider>
    </Provider>
  )
}


const Timeslide =async () => {
	// console.log('Receiving TimeSlide!');
};

AppRegistry.registerHeadlessTask('TimeSlide', () => Timeslide);
AppRegistry.registerComponent(appName, () => WrapApp);