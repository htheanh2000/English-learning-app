import React, { useState, useEffect } from 'react';
import {View,Text, StyleSheet,Image,Dimensions,TouchableOpacity,BackHandler } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Quotes from '../../Data/Quotes.json'
import Bg from '../../Data/Bg'
import Modal from './Modal'
import { Button } from 'react-native-paper';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Home = props => {
  const [showModal, setShowModal] = useState(false);

    const quote = Quotes[Math.floor(Math.random() * 10)]
    const bg = Bg[Math.floor(Math.random() * 10)]

  return (
    <View style={styles.container}>
        <Image style={styles.image}
            source={require('../../assets/map.jpg')}
        ></Image>
        
        {
          !showModal ?
            <Button icon="camera" mode="contained" onPress={() => setShowModal(true)}>
              Press me
            </Button> : null
        }
        {
          showModal ? <Modal/> : null
        }
    </View>
  );
};
export default Home;

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
  content: {
     color:"white",
     fontSize:16, 
     fontWeight:"100", 
     lineHeight:25 ,
     textAlign:"center", 
     margin:30, 
     alignItems:"center", 
     justifyContent:"center"
  },
  author: {
    color:"white",
    fontSize:18, 
    fontWeight:"100", 
    lineHeight:25 ,
    textAlign:"center", 
    margin:30, 
    alignItems:"center", 
    justifyContent:"center"
  },
  icon :{
    alignItems:"center",
    justifyContent:"center",
  },
  image: {
    width: screenWidth,
    height: screenHeight,
    position:"absolute"
  }
});