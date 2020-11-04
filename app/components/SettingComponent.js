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

function SettingComponent(props) {
  let [source, setSource] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);


  const dispatch = useDispatch();

  const [lock, setLock] = useState(false);

  const setLockandService =async()=> {
    await setLock(!lock);
    console.log("lock", lock);
    lock ? TimeSlide.startService() : TimeSlide.stopService()
    lock ? alert("you have startService") : alert("you have stopService")
  }

  const _onPressItem = (type) => {
    console.log("type", type);
    props.navigation.navigate('PatternComponent')
  }

  const _onPressItem2 = async () => {
    console.log("click item 2");
  }
  const selectWallpaper = async() => {
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
        let source =  'data:image/jpeg;base64,' + response.data
        setSource('data:image/jpeg;base64,' + response.data)
        

        console.log("AsyncStorage src",source);
        await AsyncStorage.setItem("wallpaper",JSON.stringify(source))
        const img = await AsyncStorage.getItem("wallpaper")
        console.log("img", img);
      }
    });

  
  }

  return (
    <View style={styles.container}>
      {
        <View>
          <List.Item
            title="Profile"
            //description="Item description"
            left={props => <List.Icon {...props} icon="profile" />}
          />
          <List.AccordionGroup>
            <List.Accordion
              title="Password"
              id="1"
              left={props => <List.Icon {...props} icon="onepassword" />}
            >
              <List.Item title="Pattern" onPress={() => _onPressItem('Pattern')} />
              <List.Item title="Number" onPress={_onPressItem2} />
              <List.Item title="Slide" onPress={_onPressItem2} />
              <List.Item title="Gesture" onPress={_onPressItem2} />
              <List.Item title="No" onPress={_onPressItem2} />
            </List.Accordion>
          </List.AccordionGroup>
          <List.Item
            title="Password"
            left={props => <List.Icon {...props} icon="onepassword" />}
          />
          <List.Item
            title="Wallpaper"
            left={props => <List.Icon {...props} icon="wallpaper" />}
            onPress={() => selectWallpaper()}
          />
          <List.Item
            title="Lock screen"
            //description="Item description"
            left={props => <List.Icon {...props} icon="lock" />}
            right={props => <Checkbox style={{ color: 'red', marginLeft: 0 }} status={lock ? 'unchecked' : 'checked'} label="Item" />}
            onPress={() => setLockandService(lock)}
          />
        </View>
      }
    </View>
  )
}

export default SettingComponent

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


