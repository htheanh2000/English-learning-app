import React, { Component, Fragment, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import database from '@react-native-firebase/database';
import { Button } from 'react-native-paper';
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;

const Data = [
  {
    uri : require('../../assets/Character/yak.gif'),
    name: "yak"
  },
  {
    uri : require('../../assets/Character/donkey.gif'),
    name: "Donkey",
    price: "1000"
  },
  {
    uri : require('../../assets/Character/gorilla.gif'),
    name: "gorilla"
  },
  {
    uri : require('../../assets/Character/orangutan.gif'),
    name: "orangutan"
  },
  {
    uri : require('../../assets/Character/yak.gif'),
    name: "yak"
  }
]

function Shop() {
  const user = useSelector(state => state.user)
  const [index, setIndex] = useState(1)
  const [Uri, setUri] = useState(1)
  let data = null
  const getData = async () => {
    await database()
      .ref('characters/')
      .once('value')
      .then(snapshot => {
        data = snapshot.val()
      });
      setIndex[1]
    console.log("data", data[index].Name)
  }
  getData()

  const setNext=()=> {
    setIndex(index+1)
  }

  const setPrev=()=> {
    setIndex(index-1)
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
         <Image style={styles.khung} source={Data[index].uri} /> 
          <Text style={{marginTop: 10, fontSize: 26, color: "#fff"}}>{Data[index].name}</Text> 
          <Text style={{marginTop: 5, fontSize: 20, color: "#fff"}}>Price: {Data[index].price}</Text> 
      </View>
      <Button onPress={()=>setNext()}>Next</Button>
      <Button onPress={()=>setPrev()}>Prev</Button>
    </View>
  )
}

export default Shop

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  title: {
    height: heightR * 1 / 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7dc2ff",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,

  },
  khung: {
    resizeMode: "contain",
    // width: "30%",
    height: "40%"
  },
  slideC: {


  },
  titleC: {

  }
});


