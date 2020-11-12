import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { Button, ProgressBar, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Test = props => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.hardMode}>
            <AntDesign name="hearto" size={30} color="#fff700"></AntDesign>
          </View>
          <View>
            <Text style={styles.process}>2/10</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
               <Text style={styles.title}>Fruit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.exit}>X</Text>
        </View>
        <ProgressBar progress={0.2} color="#fff" />
      </View>

      <View style={{ marginTop: 100, alignItems: "center" }}>
        <View style={styles.vocaView}>  
          <Image style={styles.image} source={require('../../assets/apple.png')}></Image>
          {/* <Text style={styles.text}>Apple (n)</Text> */}
          <Text style={styles.text}>_ _ _ _ _ _</Text>
        </View>
        </View>

        <View style={styles.volumeView} >
            <FontAwesome style={styles.volume} name="volume-up" size={40} color="#fff700"></FontAwesome>
            {/* <FontAwesome style={styles.volume} name="headphones" size={40} color="#fff700"></FontAwesome> */}
          </View>

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
    marginTop: 5
  },
  volume: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  volumeView: {
    paddingTop:100,
    flexDirection: "row"
  },
  example: {
    width: screenWidth * .8,
    paddingTop: 30,
  },
  exText: {
    color: "#fff",
    fontSize: 16,
    margin: 5
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor:"#25a14a",
    borderRadius: 10,
    margin: 5,
    alignItems:"center"
  },
  exvolume: {
    paddingLeft: 5,
    margin: 5
  }
});