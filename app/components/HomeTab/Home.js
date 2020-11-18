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
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const Home = props => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [map, setMap] = useState(null)
  const [mapName, setMapName] = useState('')
  const [mapLevel, setMapLevel] = useState('1')
  const [init, setInit] = useState(false)
  const [star, setStar] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!init) {
      runInit()
      setInit(true)
      setLoading(false)
    }
  })

  console.log("------RUN INIT -----",user);
  const runInit = async () => {
    console.log("------RUN INIT -----");
    if (auth().currentUser) {
      const userId = auth().currentUser.uid;
      if (userId) {
        database()
          .ref('users/' + userId)
          .once('value')
          .then(snapshot => {
            const user = snapshot.val()
            dispatch(setStatus(user))
          });
      }
    }
  }
  const checkUserPassMap = async () => {
    console.log("checkUserPassMap", user.map[mapLevel])
    user.map[mapLevel] ? setStar(user.map[mapLevel]) : setStar(0)

  }
  const press = async (mapLevel) => {
    setLoading(true)
    await setMapLevel(mapLevel)
    await database()
      .ref('maps/' + mapLevel)
      .once('value')
      .then(snapshot => {
        const maps = snapshot.val()
        setMap(maps)
        setMapName(maps.Name)
        setMapLevel(mapLevel)
      });
    await checkUserPassMap()
    setShowModal(true)
    setLoading(false)
  }

  return (

    <View style={styles.container}>
      <Loader loading={loading} />
      <Image style={styles.image}
        source={require('../../assets/map2.jpg')}
      ></Image>
      {
        user.map ?
          <View style={{ width: screenWidth, height: screenHeight, position: "absolute", top: 0, left: 0 }}>
            {
              localMap.map(item => {
                return (
                  <TouchableOpacity style={[styles.btnModal, { backgroundColor:  user.map[item.level] ? "#e3d932" : "#5c6466", top: item.top, left: item.left }]} onPress={() => press(item.level)}>
                    <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center" }}>{item.level}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View> : null
      }
      {
        showModal ? <TouchableOpacity style={styles.layout} onPress={() => setShowModal(false)}>
          <Modal star={star} map={map} mapLevel={mapLevel} mapName={mapName} />
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
  }
}); 