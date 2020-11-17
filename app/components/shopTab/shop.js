import React, { Component, Fragment, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import ProgressCircle from 'react-native-progress-circle'
import {useSelector} from 'react-redux'
import { Avatar } from 'react-native-paper';
import FastImage from 'react-native-fast-image'

const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;

function Shop() {
  const user = useSelector(state => state.user)
  useEffect(()=> {
    console.log("state", user);
  })
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image style={styles.khung} source={require('../../assets/Character/yak.gif')}></Image>
      </View>
    </View>
  )
}

export default Shop

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  item: {
    width: widthR,
    height: 50,
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "#eee",
    flexDirection: "row"
  },
  icon: {
    marginRight: 20
  },
  rightIcon: {
    position: "absolute",
    right: 20
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff"
  },
  image: {
    width: 120,
    height: 120
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
    height: "30%"
  },
  textName: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold"
  },
  textContent: {
    color: "#000",
    fontSize: 16,
  },
  modalView: {
    padding: 10,
    position: "absolute",
    backgroundColor: "#fff",
    alignItems: "center",
    width: widthR * .8,
    left: widthR * .1,
    height: 180,
    top: heightR / 2 - 50,
    borderRadius: 30,
    zIndex: 99,
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center"
  },
  heroTitle: {
    color: "#0a0d38",
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    textAlign: "center",
    top: 10,
    width: 100,
    left: widthR * .4 - 50,

  },
  nextLevel: {
    textAlign: "center",
    color: "#0a0d38",
    fontWeight: "bold"
  },
  history: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 130
  },
  historytitle: {
    color: "#0a0d38",
    fontWeight: "bold",
    paddingTop: 5,
    fontSize: 16
  },
  historyMatch: {
    width: widthR * .7,
    height: 54,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#fff",
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  defeat: {
    borderWidth: 3,
    borderColor: "#ff4530",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },
  victory: {
    borderWidth: 3,
    borderColor: "#5da4f0",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  }

});


