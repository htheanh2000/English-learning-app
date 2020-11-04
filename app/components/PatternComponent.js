import AsyncStorage from '@react-native-community/async-storage';
import React, { Component, Fragment, useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { RNLockScreen } from 'react-native-lock-screen'
import Advertisement from './Advertisement'

export default function PatternComponent(props) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(null)
   const _onCapture = (lock) => {
     console.log("lock: " + lock);
     setOpen({ open: true });
   }
   useEffect(() => {
      initData();
   }, [])

   const initData = async () => {
    const source = await AsyncStorage.getItem('wallpaper');
    setSrc(source);
   }

  const _onVerified = () => {
    setOpen({ open: true });
  }

  return <View style={styles.container}>
  { !open ? <Fragment>
    <StatusBar
      backgroundColor={'#4a8df3'}
      barStyle={"dark-content"}
    />
     <RNLockScreen type={1} mode={0}
        onCapture={_onCapture}            
        onVerified={_onVerified}
      />
  </Fragment>
  : <Advertisement /> }
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
