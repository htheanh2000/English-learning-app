import React, { Button, Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { createScreen } from './app/state/screens/actions'
import { getScreen, setScreen } from './app/state/screens/hooks'
//HOme
import SettingComponent from './app/components/SettingComponent'
import PatternComponent from './app/components/PatternComponent'
import Advertisement from './app/components/Advertisement'
//Auth 
import SplashScreen from './app/components/Auth/SplashScreen'
import LoginScreen from './app/components/Auth/LoginScreen'
import RegisterScreen from './app/components/Auth/RegisterScreen'
import ForgotPasswordScreen from './app/components/Auth/ForgotPasswordScreen'
import tenten from './app/components/Auth/tenten'

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


// const _checkCameraAndPhotos = () => {
//   Permissions.checkMultiple(['camera', 'photo']).then(response => {
//     //response is an object mapping type to permission
//     if(!response) {
//       _alertForPhotosPermission()
//     }
//   })
// }

// const _alertForPhotosPermission =()=> {
//   Alert.alert(
//     'Can we access your photos?',
//     'We need access so you can set your profile pic',
//     [
//       {
//         text: 'No way',
//         onPress: () => console.log('Permission denied'),
//         style: 'cancel',
//       },
//       this.state.photoPermission == 'undetermined'
//         ? { text: 'OK', onPress: this._requestPermission }
//         : { text: 'Open Settings', onPress: Permissions.openSettings },
//     ],
//   )
// }

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