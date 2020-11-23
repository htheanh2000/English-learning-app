import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler, Button } from 'react-native';
import Quotes from '../../Data/Quotes.json'
import Bg from '../../Data/Bg'
import Modal from './Modal'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import { setStatus } from '../../store/user'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Auth/Loader'
import localMap from '../../Data/map'
import Data from '../../Data/characters'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const Home = props => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [map, setMap] = useState(null)
  const [mapName, setMapName] = useState('')
  const [mapLevel, setMapLevel] = useState('1')
  const [star, setStar] = useState(0)
  const [loading, setLoading] = useState(false)
  const [index,setIndex] = useState("")
  useEffect(() => {
    Data.map(item => {
      if(item.name === user.currentCharacter) {
        setIndex(item.id)
      }
    })
  })

 
  const checkUserPassMap = async () => {
    if (user.map && user.map[mapLevel]) {
      setStar(user.map[mapLevel])
    }
    else {
      setStar(0)
    }
  }
  const press = async (mapLevel) => {
    if(user.level + 1 <  mapLevel)  return
    setLoading(true)
    await setMapLevel(mapLevel)
    await database()
      .ref('maps/' + mapLevel)
      .once('value')
      .then(snapshot => {
        const maps = snapshot.val()
        setMap(maps)
        setMapName(maps.Name)
      });
    await checkUserPassMap()
    setShowModal(true)
    setLoading(false)
  }
  const mapColor =(level)=> {
    if(user.map) {
      if(user.map[level]) {
        return "#e3d932"
      }
    }
    if(user.level+1 === level) {
      return "green"
    }
   
    return "#b5b5b5"
  }
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Image style={styles.image}
        source={require('../../assets/map2.jpg')}
      ></Image>
      <View style={{ width: screenWidth, height: screenHeight, position: "absolute", top: 0, left: 0 }}>
        {
          localMap.map(item => {
            return (
              <TouchableOpacity style={[styles.btnModal, {   backgroundColor:mapColor(item.level), top: item.top, left: item.left }]}  onPress={() => press(item.level)} >
                  <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center" }}>{item.level}</Text>
                    {
                        item.level === user.level+1  && index > 0 ? 
                        <Image style={styles.character} source={Data[index].uri}></Image> : null
                    }
              </TouchableOpacity>
            )
          })
        }
      </View>
      {
        showModal ? <TouchableOpacity style={styles.layout} onPress={() => setShowModal(false)}>
          <Modal star={star} onPress={() => setShowModal(false)} map={map} mapLevel={mapLevel} mapName={mapName} />
        </TouchableOpacity> : null
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
    color: "white",
    fontSize: 16,
    fontWeight: "100",
    lineHeight: 25,
    textAlign: "center",
    margin: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  author: {
    color: "white",
    fontSize: 18,
    fontWeight: "100",
    lineHeight: 25,
    textAlign: "center",
    margin: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: screenWidth,
    height: screenHeight,
    position: "absolute"
  },
  btnModal: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "#8E8684",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  layout: {
    backgroundColor: "transparent",
    width: screenWidth,
    height: screenHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  character: {
    top:-40,  
    resizeMode: "contain",
    height: "100%",
    zIndex: 999,
    position:"absolute"
  }
}); 