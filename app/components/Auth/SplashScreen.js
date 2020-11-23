import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ImageBackground,View,Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { setStatus } from '../../store/user'
import { useDispatch, useSelector } from 'react-redux'
import { withTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import I18n from '../../i18n/i18n'
const SplashScreen = props => {
  let [animating, setAnimating] = useState(true);
  const User = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    runInit()
    setTimeout(() => {
      setAnimating(false);
    }, 3000);
  }, []);

   const runInit = async () => {
      if (auth().currentUser) {
      const userId = auth().currentUser.uid;
      if (userId) {
        database()
          .ref('users/' + userId)
          .once('value')
          .then(snapshot => {
            const user = snapshot.val()
            dispatch(setStatus(user))
           I18n.locale = user.language
          });
      }
    }
  }

  return (
    <View style={styles.container}>
      
     <Text style={{fontSize:24, fontWeight:"bold", color:"#fff"}}>Wellcome to Witch World</Text>
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