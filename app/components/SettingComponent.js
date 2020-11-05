import React, { Component, Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createScreen } from '../state/screens/actions'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
function SettingComponent () {

  let [source, setSource] = useState('');
  const [theme, setTheme] = useState('value');
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const navigation = useNavigation()
  const selectWallpaper = async () => {
    console.log("selectWallpaper");
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from .... ' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    ImagePicker.showImagePicker(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = 'data:image/jpeg;base64,' + response.data
        setSource('data:image/jpeg;base64,' + response.data)
        console.log("AsyncStorage src", source);
        await AsyncStorage.setItem("wallpaper", JSON.stringify(source))
        const img = await AsyncStorage.getItem("wallpaper")
        console.log("img", img);
      }
    });
  }
  const setThemef = (t) => {
    setTheme(t)
    console.log("theme", theme);
  }

  const showPopUp =()=> {

  }

  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.bigText}>Settings</Text>
            <AntDesign style={{marginRight:10}} name= "setting"  color= "#cfffdb" size={60}/>
        </View>
      
        <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate("ThemeComponent")}>
            <MaterialIcons style={styles.icon} name= "wallpaper"  color= "#008000" size={30} />
            <Text>Current Themes: Decoration</Text>
            <AntDesign style={styles.rightIcon} name= "right"  color= "#008000" size={30}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
            <AntDesign name= "heart"  color= "tomato" size={20} />
        </TouchableOpacity>
    </View>
  )
}

export default SettingComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  item: {
    width:widthR,
    height:50,
    // justifyContent:"center",
    alignItems:"center",
    padding:10,
    borderBottomWidth:2,
    borderColor:"#eee",
    flexDirection:"row"
  },
  icon: {
    marginRight:20
  },
  rightIcon: {
    position:"absolute",
    right:20
  },
  bigText: {
    fontWeight:"bold",
    fontSize:36,
    color:"#cfffdb"
  },
  title: {
    height:heightR/3,
    padding:30,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#4dbf6b",
  
  },
  gif: {
    width:100,
    height:100
  }

});


