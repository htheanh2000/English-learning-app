import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler, } from 'react-native';
import { Button, ProgressBar, TextInput  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Test = props => {
  const {star} = props
  const [isShowTip, setIsShowTip] = useState(false)
  let [question, setQuestion] = useState(0)
  const [value, onChangeText] = useState('');
  const [score, setScore] = useState(0)
  const { map, mapLevel } = props.route.params
  const [url, setUrl] = useState(null)
  const [finish, setFinish] = useState(false)
  const navigation = useNavigation()
  const [array,setArray] = useState([10,1,2,3,4,5,6,7,8,9])
  const [isShu,setIsShu] = useState(false)

  useEffect(()=> {
    isShu ? null: shuffle(array)
    getImg()
  })

  const checkAns = () => {
    // setScore(score+1)
    if (map.Vocabulary[array[question]].Name === value) {
     setScore(score+1)
    //  console.log("true");
    }
  }
  const setNextQuestion = async () => {
    checkAns()
    setQuestion(question + 1)
    onChangeText('')
    setIsShowTip(false)
    if (question < 9) {
        console.log("question",question);
    }
  }
  const setPrevQuestion = async () => {
    checkAns()
    onChangeText('')
    setIsShowTip(false)
    if (question > 0) {
      await setQuestion(question - 1)
    }
  }

  const getImg = async () => {

    const url = await storage()
      .ref("Maps/" + mapLevel + "/" + map.Vocabulary[array[question]].ImgUrl)
      .getDownloadURL()
    setUrl(url)

  }
  const submit = () => {
    checkAns()
    setFinish(true)
    console.log("submit",star)
    console.log("star", Math.floor(score/3));

  }
  const goHome = () => {
    if(star > Math.floor(score/3)) return

    if (auth().currentUser) {
      const userId = auth().currentUser.uid;
      if (userId) {
        database()
        .ref('users/' + userId + "/map/"  + mapLevel)
        .set(Math.floor(score/3))

        // database()
        //   .ref('users/' + userId + "/map/")
        //   .once('value')
        //   .then(snapshot => {
        //     console.log('User data: ', snapshot.val());
        //   });
      }
    }
    navigation.navigate("Home")
  }

  const shuffle =async(array)=> {
    var i = array.length,
      j = 0,
      temp;

    while (i--) {

      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;

    }
    console.log("array",array)

    await setArray(array); 
    await setIsShu(true)

  }
  const ShowTip=()=> {
    setIsShowTip(true)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.hardMode}>
            <AntDesign name="heart" size={30} color="#ffa8a8"></AntDesign>
          </View>
          <View>
            <Text style={styles.process}>{question+1}/10</Text>
            <TouchableOpacity>
               <Text style={styles.title}>{map.Name}</Text> 
            </TouchableOpacity>
          </View>
          <Text style={styles.exit} onPress={() => navigation.navigate("Home")}>X</Text>
        </View>
        <ProgressBar progress={question/10} color="#476491" />
      </View>

      <View style={{ marginTop: 100, alignItems: "center" }}>
        <View style={styles.vocaView}>
          {
            url ?
              <Image style={styles.image} source={{
                uri: url,
              }}></Image> : null
          }
          {
          isShowTip ?  <Text style={styles.text}>{map.Vocabulary[array[question]].Name}</Text> : <Button style={styles.showtip} onPress={()=> ShowTip()} color="#fff">Show Tip</Button>
          }          

          <TextInput style={styles.textinput}  onChangeText={text => onChangeText(text)}
           value={value}></TextInput>
        </View>

        <View style={styles.example}>

          <View style={{ flexDirection: "row", justifyContent: "space-around", width: screenWidth * .8 }}>
            {/* {
              question !== 0 ?
                <TouchableOpacity style={styles.btn} onPress={() => setPrevQuestion()} >
                  <Text style={styles.exText}>Prev</Text>
                </TouchableOpacity> :
                null
            } */}

            {question !== 9 ? 
            <TouchableOpacity style={styles.btn} onPress={setNextQuestion}>
              <Text style={styles.exText} >Next</Text>
            </TouchableOpacity> : 
            <TouchableOpacity style={styles.btn} onPress={() => submit()}>
                <Text style={styles.exText} >Submit</Text>
              </TouchableOpacity>}

          </View>

        </View>
      </View>

      {finish ?
        <View style={styles.modal}>
              <View style={styles.star}>
                    <AntDesign name={score >= 1 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
                    <AntDesign name={score >= 2 ? "star" : "staro"} style={{ padding: 5, marginTop: -20 }} size={40} color="#FFd700"></AntDesign>
                    <AntDesign name={score >= 3 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
                </View>
          <Text style={{ textAlign: "center" , color: "#C1C9D4", fontSize: 30, fontWeight: "bold"}}>Congratulation !</Text>
          <Text style={{fontSize: 20 , color: "#C1C9D4"}}>You get {score}/10</Text>
          <Button style={styles.goHome} onPress={() => goHome()}>Go back Home</Button>
        </View> : null}

    </View>
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
    width:150,
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
    height: 200,
    top: screenHeight / 2 - 150,
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
    flexDirection:"row",
    alignItems: "center",
    // padding: 20
  },
  goHome: {
    width: 200,
    height: 40,
    backgroundColor: "#b3d0ff",
    alignItems:"center",
    justifyContent: "center",
    marginTop: 10
  }
});