import React, { Button, Fragment, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
//HOme
import SettingComponent from './components/SettingComponent'
import PatternComponent from './components/PatternComponent'
import Advertisement from './components/Advertisement'
import ThemesComponent from './components/ThemesComponent'
//Auth 
import SplashScreen from './components/Auth/SplashScreen'
import LoginScreen from './components/Auth/LoginScreen'
import RegisterScreen from './components/Auth/RegisterScreen'
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen'
import tenten from './components/Auth/tenten'

//Theme 
import ThemeDetail from './components/ThemesTab/ThemeDetail'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthOptions = {
  headerShown: false
}

const settingOptions = {

  headerStyle: {
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    }
  },
  headerTintColor: '#1a1c20000',
  title: 'Setting',
  headerTitleStyle: {
    fontWeight: 'light',
    fontSize: 20,
    // margin: 20,
    marginLeft: 20
    // textAlign: "center"
  },
}

const ThemesStack = createStackNavigator();

function ThemesStackScreen() {
  return (
    <ThemesStack.Navigator initialRouteName="ThemeComponent">
      <ThemesStack.Screen name="ThemeComponent" component={ThemesComponent}  options={AuthOptions}/>
      <ThemesStack.Screen name="ThemeDetail" component={ThemeDetail}  options={AuthOptions}/>
    </ThemesStack.Navigator>
  );
}

function RootStack(props) {

  console.log("props.alarmID", props.props.alarmID);
  return (
    <Stack.Navigator
      initialRouteName={props.props.alarmID ? "SettingComponent" : "SettingComponent"}
    >
      <Stack.Screen name="tenten" component={tenten} options={AuthOptions} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={AuthOptions} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={AuthOptions} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={AuthOptions} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={AuthOptions} />

    </Stack.Navigator>
  );
}


function mainFlow() {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#14274e',
          inactiveTintColor:"#9ba4b4",
          labelStyle: {
            fontSize: 12,
          },
          style: {
            backgroundColor: '#f1f6f9',
          },
        }}
     
    >
      <Tab.Screen
        name="1"
        component={SettingComponent}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Themes"
        component={ThemesStackScreen}
        options={{
          tabBarLabel: 'Themes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallpaper" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={tenten}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size }) => (
            <MaterialCommunityIcons name="home-circle"  color={ focused ?"#03c04a" : "tomato"} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="4"
        component={tenten}
        options={{
          tabBarLabel: 'Chủ đề',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="diamond-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="5"
        component={tenten}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color}) => (
            <Ionicons name="notifications" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default function App(props) {
  SplashScreen
  return (
    props.props.alarmID ?
    tenten()
     :
    <Fragment>
      <NavigationContainer>
        {/* {RootStack(props)} */}
        {mainFlow()}
      </NavigationContainer>
    </Fragment>
  )
}
