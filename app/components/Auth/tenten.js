import React, { useState, useEffect } from 'react';
import {View,Text, StyleSheet,Image,Dimensions } from 'react-native';
import Timeslide from '../../../Timeslide'

import Quotes from '../../Data/Quotes.json'
import Bg from '../../Data/Bg'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const tenten = props => {
    Timeslide.startService()
    const quote = Quotes[Math.floor(Math.random() * 10)]
    const bg = Bg[Math.floor(Math.random() * 10)]

  return (
    <View style={styles.container}>
        <Image style={{width: screenWidth, height:screenHeight, opacity: .2}}
            source={bg.uri}
        ></Image>
        <View style={{position:"absolute"}}>
          <Text style={styles.content}>"{quote.content}"</Text>
          <Text style={styles.author}>-- {quote.author} --</Text>
        </View>
       
    </View>
  );
};
export default tenten;

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
  }
});