import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { Button, ProgressBar, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Lesson = props => {
  const [question, setQuestion] = useState(1)
  {console.log("propsw",  props.route.params)}
  const {map, mapLevel} = props.route.params
  const [url, setUrl] = useState(null)

  const navigation = useNavigation()
  const setNextQuestion =async()=> {
    console.log("length",map.Vocabulary.length)
    if(question < map.Vocabulary.length-1) {
      await setQuestion(question+1) 
      getImg()
    }
  }
  const setPrevQuestion =async()=> {
    if(question > 1) {
      await setQuestion(question-1) 
      getImg()
    }
  }

  const getImg =async()=>{
    console.log("Maps/" +mapLevel +"/" + map.Vocabulary[question].ImgUrl);
    const url = await storage()
    .ref("Maps/" +mapLevel +"/" + map.Vocabulary[question].ImgUrl)
    .getDownloadURL()
    setUrl(url)
  }
  getImg()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.hardMode}>
            <AntDesign name="hearto" size={30} color="#fff700"></AntDesign>
          </View>
          <View>
            <Text style={styles.process}>{question}/{map.Vocabulary.length-1}</Text>
            <TouchableOpacity>
            <Text style={styles.title}>{map.Name}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.exit}  onPress={()=> navigation.navigate("Home")}>X</Text>
        </View>
        <ProgressBar progress={question/10} color="#fff" />
      </View>

      <View style={{ marginTop: 70, alignItems: "center" }}>
        <View style={styles.vocaView}>  
          {
            url ? 
            <Image style={styles.image} source={{
              uri: url,
            }}></Image> : null
          }
          <Text style={styles.text}>{map.Vocabulary[question].Name} ({map.Vocabulary[question].Type})</Text>
          <Text style={styles.text}>{map.Vocabulary[question].Means}</Text>
          {/* <View style={styles.volumeView} >
            <FontAwesome style={styles.volume} name="volume-up" size={40} color="#fff700"></FontAwesome>
            <FontAwesome style={styles.volume} name="headphones" size={40} color="#fff700"></FontAwesome>
          </View> */}
        </View>

        <View style={styles.example}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.exText}>{map.Vocabulary[question].Example.Ex1.EN}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Text style={styles.exText}>{map.Vocabulary[question].Example.Ex1.VN}</Text>
          </TouchableOpacity>

         
          <View style={{flexDirection:"row", justifyContent: "space-around", width: screenWidth*.8}}>
            {
              question !== 1 ?
              <TouchableOpacity style={styles.btn}  onPress={()=> setPrevQuestion()}>
              <Text style={styles.exText}>Prev</Text>
            </TouchableOpacity> : 
            null
            }
             
              { question !==  map.Vocabulary.length-1 ? <TouchableOpacity style={styles.btn} onPress={()=> setNextQuestion()}>
                <Text style={styles.exText} >Next</Text>
              </TouchableOpacity> : 
              <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Home")}>
                <Text style={styles.exText} >Submit</Text>
              </TouchableOpacity>}
              
          </View>
          
        </View>
      </View>


    </View>
  );
};
export default Lesson;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#85c2ff',
  },
  header: {
    width: screenWidth,
    zIndex:999
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
    color: "#fff100",
    fontSize: 16,
    textAlign: "center",
    fontWeight:"100"

  },
  exit: {
    color: "#fff",
    fontSize: 36
  },
  vocaView: {
    backgroundColor: "#5fbacf",
    width: screenWidth * .9,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 170,
    paddingTop: 20
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
    marginTop: 5
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
    justifyContent:"center",
    alignItems:"center"
  },
  exText: {
    color: "#343f52",
    fontSize: 16,
    margin: 5,
    textAlign:"left",
    textAlign:"center"
  },
  item: {
    textAlign:"center",
    width:screenWidth*.9,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor:"#bfd7ff",
    borderRadius: 10,
    margin: 5,
    padding: 5
  },
  exvolume: {
    paddingLeft: 5,
    margin: 5
  },
  btn : {
    marginTop:20,
    alignItems:"center",
    justifyContent:"center",
    width:100,
    height:40,
    borderRadius: 5,
    backgroundColor:"#bfd7ff"
  }
});