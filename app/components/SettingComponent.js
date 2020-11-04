import React, { Component, Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createScreen } from '../state/screens/actions'
import {
  Image,
  StyleSheet,
  View,
  Text,
  Switch
} from 'react-native';
import { RNLockScreen } from 'react-native-lock-screen'
import { ListItem, Avatar } from 'react-native-elements'
import { List, Checkbox } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import TimeSlide from '../../Timeslide';

function SettingComponent () {


  let [source, setSource] = useState('');
  const [theme, setTheme] = useState('value');



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
      {
        <View>
          <List.AccordionGroup>
            <List.Accordion
              title="Themes"
              id="1"
              left={props => <List.Icon {...props} icon="onepassword" />}
            >
              <View style={theme === "Motivation" ? styles.active : styles.unactive}>
                <List.Item title="Motivation" onPress={(t) => setThemef(t = "Motivation")} />
              </View>
              <View style={theme === "Math" ? styles.active : styles.unactive}>
                <List.Item title="Math" onPress={(t) => setThemef(t = "Math")} />
              </View>
              <View style={theme === "Chemistry" ? styles.active : styles.unactive}>
                <List.Item title="Chemistry"  onPress={(t) => setThemef(t = "Chemistry")} />
              </View>
              <View style={theme === "Scientist" ? styles.active : styles.unactive}>
                <List.Item title="Scientist"  onPress={(t) => setThemef(t = "Scientist")} />
              </View>

            </List.Accordion>

            <List.Accordion
              title="Wallpaper"
              id="1"
              left={props => <List.Icon {...props} icon="onepassword" />}
            >
              <View style={theme === "Motivation" ? styles.active : styles.unactive}>
                <List.Item title="Coming soon" onPress={(t) => setThemef(t = "Motivation")} />
              </View>
              <View style={theme === "Math" ? styles.active : styles.unactive}>
                <List.Item title="Coming soon" onPress={(t) => setThemef(t = "Math")} />
              </View>
              <View style={theme === "Chemistry" ? styles.active : styles.unactive}>
                <List.Item title="Coming soon"  onPress={(t) => setThemef(t = "Chemistry")} />
              </View>
              <View style={theme === "Scientist" ? styles.active : styles.unactive}>
                <List.Item title="Coming soon"  onPress={(t) => setThemef(t = "Scientist")} />
              </View>
            </List.Accordion>

          </List.AccordionGroup>

        </View>
      }
    </View>
  )
}

export default SettingComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  active: {
    backgroundColor: "#d0efff"
  },
  unactive: {
    backgroundColor: "white"
  }
});


