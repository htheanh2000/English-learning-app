import React, { Button, Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { createScreen } from './state/screens/actions'
import { getScreen, setScreen } from './state/screens/hooks'

import {check,request,openSettings, PERMISSIONS, RESULTS} from 'react-native-permissions';
//HOme
import SettingComponent from './components/SettingComponent'
import PatternComponent from './components/PatternComponent'
import Advertisement from './components/Advertisement'
//Auth 
import SplashScreen from './components/Auth/SplashScreen'
import LoginScreen from './components/Auth/LoginScreen'
import RegisterScreen from './components/Auth/RegisterScreen'
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen'
import tenten from './components/Auth/tenten'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthOptions = {
  headerShown: false
}


function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="tenten"
    >
      <Stack.Screen name="tenten" component={tenten} options={AuthOptions} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={AuthOptions} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={AuthOptions} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={AuthOptions} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={AuthOptions} />

      <Tab.Screen name="SettingComponent" component={SettingComponent} />
      <Tab.Screen name="PatternComponent" component={PatternComponent} options={AuthOptions}/>
      <Tab.Screen name="Advertisement" component={Advertisement} />
    </Stack.Navigator>
  );
}


const _checkCameraAndPhotos = () => {
  check(PERMISSIONS.ANDROID.LOCATION_ALWAYS)
  .then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        openSettings()
        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.GRANTED:
        return 1;
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  })
  .catch((error) => {
    // …
  });
}


export default function App(props) {
  // _checkCameraAndPhotos()
  return (
    <Fragment>
      <NavigationContainer>
          {RootStack()}
      </NavigationContainer>
    </Fragment>
  )
}