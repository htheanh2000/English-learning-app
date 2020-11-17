import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ImageBackground,View,Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withTheme } from 'react-native-paper';


const SplashScreen = props => {

  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      
     <Text style={{fontSize:24, fontWeight:"bold", color:"#fff"}}>Wellcome to my app</Text>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
      <Image source={require('../../assets/amongus.gif')} style={styles.Gif}></Image>
    </View>

    
  );
};
export default withTheme(SplashScreen);;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#000",
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  Gif: {
    width:300,
    height:300
  }
});