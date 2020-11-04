import React, { Button, Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { createScreen } from './state/screens/actions'
import { getScreen, setScreen } from './state/screens/hooks'
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid } from "react-native";
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

const settingOptions = {
  headerStyle: {
    backgroundColor: '#000000',
  },
  headerTintColor: '#fff',
  title: 'Setting',
  headerTitleStyle: {
    fontWeight: 'light',
    fontSize: 16,
    
    // textAlign: "center"
  },
}
function RootStack(props) {

console.log("props.alarmID",props.props.alarmID);
  return (
    <Stack.Navigator
      initialRouteName= {props.props.alarmID  ? "tenten": "SplashScreen"}
    >
      <Stack.Screen name="tenten" component={tenten} options={AuthOptions} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={AuthOptions} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={AuthOptions} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={AuthOptions} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={AuthOptions} />

      <Tab.Screen name="SettingComponent" component={SettingComponent}  options={settingOptions}/>
      <Tab.Screen name="PatternComponent" component={PatternComponent} options={AuthOptions}/>
      <Tab.Screen name="Advertisement" component={Advertisement} />
    </Stack.Navigator>
  );
}


const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};



export default function App(props) {
  console.log("app", props);
  requestCameraPermission()
  return (
    
    <Fragment>
      <NavigationContainer>
          {RootStack(props)}
      </NavigationContainer>
    </Fragment>
  )
}
