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
import { ListItem, Avatar } from 'react-native-elements'
import { List } from 'react-native-paper';
import { createScreen } from './state/screens/actions'
import { getScreen, setScreen } from './state/screens/hooks'
import SettingComponent from './components/SettingComponent'
import PatternComponent from './components/PatternComponent'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //subtitle: 'Vice Chairman'
  },
]

const SCREENS = {
  'SettingComponent': <SettingComponent />,
  'PatternComponent': <PatternComponent />,
}

export default function App(props) {
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);

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