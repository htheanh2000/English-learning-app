import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View,Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = props => {
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
     
      AsyncStorage.getItem('user').then(value =>
        props.navigation.replace(
          value ? 'SettingComponent' : 'SettingComponent'
        )
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
     <Text style={{fontSize:24, fontWeight:"bold", color:"#fff"}}>Wellcome to TimeSlide</Text>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});