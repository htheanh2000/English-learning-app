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
import {useSelector,useDispatch} from 'react-redux'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Avatar, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image'
import Data from '../../Data/characters'
import {setLanguage} from '../../store/user'
import I18n from  '../../i18n/i18n'
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;

function Profile(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [index,setIndex] = useState("")
  useEffect(()=> {
      Data.map(item => {
        if(item.name === user.currentCharacter) {
          setIndex(item.id)
        }
      })
  })
  const navigation = useNavigation()
  // const selectWallpaper = async () => {
  //   var options = {
  //     title: 'Select Image',
  //     customButtons: [
  //       { name: 'customOptionKey', title: 'Choose Photo from .... ' },
  //     ],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  //   ImagePicker.showImagePicker(options, async response => {
  //     console.log('Response = ', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       let source = 'data:image/jpeg;base64,' + response.data
  //       setSource('data:image/jpeg;base64,' + response.data)
  //       console.log("AsyncStorage src", source);
  //       await AsyncStorage.setItem("wallpaper", JSON.stringify(source))
  //       const img = await AsyncStorage.getItem("wallpaper")
  //       console.log("img", img);
  //     }
  //   });
  const switchLg =()=> {

    if(user.language === "en") {
      I18n.locale = 'vn';
      dispatch(setLanguage("vn"))
      if (auth().currentUser) {
        const userId = auth().currentUser.uid;
        if (userId) {
          database()
            .ref('users/' + userId )
            .update({
              language: "vn"
            })
        }
      }  
    }
    else{
      I18n.locale = 'en';
      dispatch(setLanguage("en"))
      if (auth().currentUser) {
        const userId = auth().currentUser.uid;
        if (userId) {
          database()
            .ref('users/' + userId )
            .update({
              language: "en"
            })
        }
      }  
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
     
        {
          index > 0? <Image style={styles.khung} source={Data[index].uri}></Image> : <Image style={styles.khung} source={require('../../assets/test.gif')}></Image>
        }
        <Text style={styles.textName}>{user.username}</Text>
        <Text style={styles.textContent}>{I18n.t('Level')}: {user.level}</Text>
        <Text style={styles.textContent}>{I18n.t('Language')}: {user.language}</Text>


      </View>

      <View style={styles.modalView}>
        {/* <View style={{ textAlign: "center" }}>
          <ProgressCircle
            percent={66}
            radius={50}
            borderWidth={12}
            color="#3399FF"
            shadowColor="#f073e1"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{user.exp}%</Text>
          </ProgressCircle>
          <Text style={[styles.nextLevel, { paddingTop: 10 }]}>{100 - user.exp}+ to next level</Text>

        </View>
        <View>
           
             <Image style={styles.image} source={require('../../assets/rank.png')}></Image>
          <Text style={styles.nextLevel}>{user.rank}</Text>
        </View> */}
        <Button style={{backgroundColor:"#000" }} onPress={switchLg}>{I18n.t('Switch Language')}</Button>

      </View>
      
    </View>
  )
}

export default Profile

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
  khung: {
    marginTop: 50,
    resizeMode: "contain",
    height: "40%"
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


