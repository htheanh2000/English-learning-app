import React, { Component, Fragment, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import database from '@react-native-firebase/database';
import { Button } from 'react-native-paper';
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;
import { updateGold, updateCharacters ,updateUserCharacters } from '../../store/user'
import Data from '../../Data/characters'
function Shop() {
  let user = useSelector(state => state.user)
  const [index, setIndex] = useState(1)
  const [Uri, setUri] = useState(1)
  const [status, setStatus] = useState("")
  const [showModal, setShowModal] = useState(false)
  let newCha = 1
  let data = null
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("user",user)
    if (user.characters) {
      if (user.characters.find(element => element === Data[index].name)) {
        setStatus("Unlocked")
      }
      else {
        setStatus("Buy")
      }
    }
    else {
      setStatus("Buy")
    }

  })
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
  const setNext = () => {
    setIndex(index + 1)
  }

  const setPrev = () => {
    setIndex(index - 1)
  }
  const buy = async () => {
    if (status === "Unlocked") return
    const goldAfter = user.gold - Data[index].price
    if (goldAfter >= 0) {
      await dispatch(updateGold(goldAfter))
      await dispatch(updateCharacters(Data[index].name))
      console.log("sth")
      if (auth().currentUser) {
        console.log("sth")
        const userId = auth().currentUser.uid;
        console.log("sth")
        if (userId) {
          database()
            .ref('users/' + userId)
            .update({
              gold: goldAfter,
            })

          const sth =  user.characters ? [
            ...user.characters,
            Data[index].name
          ] : [Data[index].name]
          console.log("sth", sth)
          database()
            .ref('users/' + userId + '/characters')
            .set(sth)
        }
      }
      setShowModal(true)
    }
  }

  const Modal = () => {
    return (
      <View style={styles.modal}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#3f5453" }}>Buy successful !</Text>
        <Button color="#fff" style={{ backgroundColor: "#7c24ff", marginTop: 20 }} onPress={() => setShowModal(false)}>Ok!</Button>
      </View>
    )
  }

  const selectCha =()=> {
    dispatch(updateUserCharacters(Data[index].name))
    if (auth().currentUser) {
      const userId = auth().currentUser.uid;
      if (userId) {
        database()
          .ref('users/' + userId + '/currentCharacter')
          .set(
                Data[index].name
          )
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>

        <View style={{ position: "absolute", backgroundColor: "#fffb00", padding: 10, borderRadius: 5, top: 20, left: 10 }}>
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{user.gold} GOLD</Text>
        </View>
        {
          user.currentCharacter === Data[index].name || status === "Buy" ? 
          
          null : 
          <TouchableOpacity style={{ position: "absolute", backgroundColor: "#fffb00", padding: 10, borderRadius: 5, top: 20, right: 10 }} onPress={()=> selectCha()}>
            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }} >Chọn làm nhân vật</Text>
          </TouchableOpacity>
        }

        <Image style={styles.khung} source={Data[index].uri} />
        <Text style={{ marginTop: 10, fontSize: 26, color: "#fff" }}>{Data[index].name}</Text>
        <Text style={{ marginTop: 5, fontSize: 20, color: "#fff" }}>Price: {Data[index].price.toString()}</Text>
        <Button color="#fff" style={{ backgroundColor: "#097c9c", marginTop: 20 }} onPress={() => buy()}>{status}</Button>
      </View>
      <View style={{ flexDirection: "row", paddingTop: 50, width: "100%", justifyContent: "center", alignItems: "center" }}>
        {
          index - 1 ? <Button color="#fff" style={{ backgroundColor: "#7c24ff", marginRight: 20 }} onPress={() => setPrev()}>Prev</Button> : null
        }
        {
          Data.length - index - 1 !== 0 ? <Button color="#fff" style={{ backgroundColor: "#7c24ff", marginLeft: 20 }} onPress={() => setNext()}>Next</Button> : null
        }
      </View>
      {
        showModal ? <Modal /> : null
      }
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
    marginTop: 50,
    resizeMode: "contain",
    height: "40%"
  },
  slideC: {


  },
  titleC: {

  },
  modal: {
    width: 300,
    height: 200,
    backgroundColor: "#66fff7",
    position: "absolute",
    marginLeft: (widthR - 300) / 2,
    marginTop: (heightR) / 2 - 300,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});


