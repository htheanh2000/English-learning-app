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
import wallpaper from './assets/wallpaper.jpg'
import Advertisement from './Advertisement'

export default function App(props) {
  const [open, setOpen] = useState(false);

  // const _onCapture = (lock) => {
  //   console.log("lock: " + lock);
  //   setOpen({ open: true });
  // }

  const _onVerified = () => {
    setOpen({ open: true });
  }

  return <View style={styles.container}>
  { !open ? <Fragment>
    <StatusBar
      backgroundColor={'#4a8df3'}
      barStyle={"light-content"}
    />
    <RNLockScreen type={1} mode={1}
      //onCapture={_onCapture}            
      onVerified={_onVerified}
      // headerFragmentProps={{
      //   backgroundColor: '#2777ae'
      // }}
      lock={'1234'}
      // lockLimit={6}
      // backgroundImage={wallpaper}
      // lockFragmentProps={{
      //   style: {
      //     backgroundColor: '#000'
      //   }
      // }}
      // pinProps={{
      //   confirmPin:{
      //     title: 'Confirm',
      //     style: {
      //       color: '#006400'
      //     }
      //   },
      //   // deletePin:{
      //   //   title: 'Delete',
      //   //   style: {
      //   //     color: '#006400'
      //   //   }
      //   // },
      //   rippleProps:{
      //     rippleColor: '#8b0000'
      //   },
      //   containerStyle:{
      //     backgroundColor: 'transparent'
      //   },
      //   textStyle:{
      //     color: '#000'
      //   },
      //   suggestionStyle: {
      //     color: '#989889'
      //   },
      //   alphabetPinSuggestion: true
      //}}
    />
  </Fragment>
  : <Advertisement />}
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
