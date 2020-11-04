import React, { Component, Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { RNLockScreen } from 'react-native-lock-screen'
import wallpaper from './assets/wallpaper.jpg'
import { List } from 'react-native-paper';
import { createScreen } from './state/screens/actions'
import { getScreen, setScreen } from './state/screens/hooks'
import SettingComponent from './components/SettingComponent'
import PatternComponent from './components/PatternComponent'


const SCREENS = {
  'SettingComponent': <SettingComponent />,
  'PatternComponent': <PatternComponent />,
}

export default function App(props) {
  const dispatch = useDispatch();
  const currentScreen = getScreen('currentScreen');
  console.log("currentScreen", currentScreen);
  useEffect(() => {
    dispatch(createScreen({ 'name': 'SettingComponent' }));
  }, [])

  return (
    <Fragment>
      { currentScreen && SCREENS[currentScreen] }
    </Fragment>
  )
}