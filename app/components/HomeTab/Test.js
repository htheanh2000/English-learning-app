import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FastImage, Dimensions, TouchableOpacity, BackHandler, ScrollView, SafeAreaView } from 'react-native';
import { Button, ProgressBar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux'
import { updateMapAndLevel } from '../../store/user'
import Game1 from './TestGame/Game1'
import Game2 from './TestGame/Game2'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Test = props => {
  const { star } = props
  const [isShowTip, setIsShowTip] = useState(false)
  let [question, setQuestion] = useState(0)
  const [value, onChangeText] = useState('');
  const [score, setScore] = useState(0)
  const { map, mapLevel } = props.route.params
  const [url, setUrl] = useState(null)
  const [finish, setFinish] = useState(false)
  const [unFinish, setunFinish] = useState(false)
  const navigation = useNavigation()
  const [array, setArray] = useState([])
  const [isShu, setIsShu] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [arr, setArr] = useState('')
  const rArr = []


  const randomNumber =async()=> {
    while (rArr.length < 10) {
      rArr.push(Math.floor((Math.random() * 10) + 1))
    }
    setArr(rArr)
  }
  useEffect(()=>{
    randomNumber()
  },[])
 

  const checkAns = (ans) => {
    if (ans) {
      setScore(score + 1)
    }
    console.log(ans)
  }
  const setNextQuestion = async (ans) => {
    console.log("question", question)
    if(question === 9) 
    {
      submit()
      return
    }
    checkAns(ans)
    setQuestion(question + 1)
    onChangeText('')
    setIsShowTip(false)
  }

  const getImg = async () => {
    const url = await storage()
      .ref("Maps/" + mapLevel + "/" + map.Vocabulary[array[question]].ImgUrl)
      .getDownloadURL()
    setUrl(url)
  }
  const submit = async () => {
    setScore(Math.floor(score / 3))
    const newStar = Math.floor(score / 3)
    if (star > newStar) {
      setFinish(true)
      return
    }

    if (newStar < 1) {
      setunFinish(true)
      return
    }
    const payload = {
      level: mapLevel,
      star: newStar
    }
    dispatch(updateMapAndLevel(payload))
    if (mapLevel > user.level) {
      if (auth().currentUser) {
        const userId = auth().currentUser.uid;
        if (userId) {
          database()
            .ref('users/' + userId + "/level/")
            .set(mapLevel)
        }
      }
    }
    if (auth().currentUser) {
      const userId = auth().currentUser.uid;
      if (userId) {
        database()
          .ref('users/' + userId + "/map/" + mapLevel)
          .set(newStar)
      }
    }
    setFinish(true)
    console.log("star", newStar);
  }
  const goHome = () => {
    navigation.navigate("Home")
  }


  const ShowTip = () => {
    setIsShowTip(true)
  }

  const renderGame=()=> {
    return(
      arr ?
      <Game2 mapLevel={mapLevel} onPress={(ans)=>setNextQuestion(ans)} questionList={map.Vocabulary} question={arr[question]}></Game2>
      : null
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.hardMode}>
            <AntDesign name="heart" size={30} color="#ffa8a8"></AntDesign>
          </View>
          <View>
            <Text style={styles.process}>{question + 1}/10</Text>
            <TouchableOpacity>
              <Text style={styles.title}>{map.Name}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.exit} onPress={() => navigation.navigate("Home")}>X</Text>
        </View>
        <ProgressBar progress={(question + 1) / 10} color="#476491" />
      </View>

      {
        renderGame()
      }
       
      {finish ?
        <View style={styles.modal}>
          <View style={styles.star}>
            <AntDesign name={score >= 1 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
            <AntDesign name={score >= 2 ? "star" : "staro"} style={{ padding: 5, marginTop: -20 }} size={40} color="#FFd700"></AntDesign>
            <AntDesign name={score >= 3 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
          </View>
          <Text style={{ textAlign: "center", color: "#C1C9D4", fontSize: 30, fontWeight: "bold" }}>Congratulation !</Text>
          <Text style={{ fontSize: 20, color: "#C1C9D4" }}>You get {score}/10</Text>
          <Button style={styles.goHome} onPress={() => goHome()}>Go back Home</Button>
        </View> : null}
      {unFinish ?
        <View style={styles.modal}>
          <View style={styles.star}>
            <AntDesign name={score >= 1 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
            <AntDesign name={score >= 2 ? "star" : "staro"} style={{ padding: 5, marginTop: -20 }} size={40} color="#FFd700"></AntDesign>
            <AntDesign name={score >= 3 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
          </View>
          <Text style={{ textAlign: "center", color: "#C1C9D4", fontSize: 30, fontWeight: "bold" }}>Sorry !</Text>
          <Text style={{ fontSize: 20, color: "#C1C9D4" }}>You get {score} star</Text>
          <Text style={{ fontSize: 14, padding: 10, textAlign: "center", color: "#C1C9D4" }}>You need a litte lucky to pass the test</Text>
          <Button style={styles.goHome} onPress={() => goHome()}>Go back Home</Button>
        </View> : null}
    </SafeAreaView>
  );
};
export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#53A0FF',
  },
  header: {
    width: screenWidth,
    zIndex: 999
  },
  hardMode: {
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center"
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center"
  },
  process: {
    color: "#fff700",
    fontSize: 16,
    textAlign: "center"
  },
  exit: {
    color: "#fff",
    fontSize: 36
  },
  vocaView: {
    backgroundColor: "#3ABEFF",
    width: screenWidth * .8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    paddingTop: 40
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#fff",
    top: -50,
    position: "absolute",

  },
  text: {
    color: "#fff",
    fontSize: 22,
    // marginTop: -55
  },
  volume: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  volumeView: {
    flexDirection: "row"
  },
  example: {
    width: screenWidth * .8,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  exText: {
    color: "#000",
    fontSize: 16,
    margin: 5,
    textAlign: "left"
  },
  item: {
    textAlign: "center",
    width: screenWidth * .8,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#25a14a",
    borderRadius: 0,
    margin: 5,
  },
  exvolume: {
    paddingLeft: 5,
    margin: 5
  },
  btn: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#95f597"
  },
  textinput: {
    width: 150,
    height: 60,
    backgroundColor: "transparent",
    textAlign: "center",
    letterSpacing: 5,
    textTransform: "uppercase",
    fontWeight: "100",
    fontSize: 16,
    color: "#fff",
  },
  modal: {
    position: "absolute",
    width: 300,
    height: 400,
    top: screenHeight / 2 - 250,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  showtip: {
    backgroundColor: "#466b7a",
    borderRadius: 5,
  },
  star: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 20
  },
  goHome: {
    width: 200,
    height: 40,
    backgroundColor: "#b3d0ff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  }
});