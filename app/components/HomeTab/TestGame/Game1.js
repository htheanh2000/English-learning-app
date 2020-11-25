import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import FastImage from 'react-native-fast-image'
import storage from '@react-native-firebase/storage';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const Game1 = props => {
    const { questionList, question, mapLevel } = props
    const [arr, setArr] = useState([])
    const [color, setColor] = useState("#fff")
    const [correct, setCorrect] = useState(null)

    useEffect(() => {
        randomNum()
    },[question])
    

    const randomNum = async () => {
        let ansArr = []
        let anotherArr = []
           while(ansArr.length < 4) {
               const num = Math.floor((Math.random() * 10) + 1)
               if(ansArr.find(e => e.num === num ) === undefined && num !== question) {
                    ansArr.push({num: num, status: false})
               }
           }
           const pos = Math.floor((Math.random() * 3) )
           
           ansArr[pos] = {
               num: question,
               status: true
           }
           setCorrect(pos)


           await Promise.all(ansArr.map(async(item) => {
                 const url = await storage()
                    .ref("Maps/" + mapLevel + "/" +questionList[item.num].ImgUrl)
                    .getDownloadURL()
                anotherArr.push({
                    url: url,
                    status: item.status
                })
           }))
           setArr(anotherArr)
    }   

    const pressAns =(ans)=> {
      if(ans) {
          setColor("#3ddb68")
      }
      else{
        setColor("#f2440f")
      }
      setTimeout(function()
      {
          setColor("#fff")  
          props.onPress(ans)
         }, 500);
    }

    const renderAns = () => {
        return (
                <View >
                    <View style={styles.rowView}>
                        <TouchableOpacity onPress={()=> pressAns(arr[0].status)} style={styles.ansView}>
                            {
                                arr[0]?
                                    <FastImage style={styles.image} source={{
                                        uri: arr[0].url,
                                    }}></FastImage> : null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> pressAns(arr[1].status)} style={styles.ansView}>
                            {
                                arr[1] ?
                                    <FastImage style={styles.image} source={{
                                        uri: arr[1].url,
                                    }}></FastImage> : null
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowView}>
                        <TouchableOpacity onPress={()=> pressAns(arr[2].status)} style={styles.ansView}>
                            {
                                arr[2]  ?
                                    <FastImage style={styles.image} source={{
                                        uri: arr[2].url,
                                    }}></FastImage> : null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> pressAns(arr[3].status)} style={styles.ansView}>
                            {
                                arr[3] ?
                                    <FastImage style={styles.image} source={{
                                        uri: arr[3].url,
                                    }}></FastImage> : null
                            }
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={[styles.questionView, {backgroundColor:color}]}>
                <Text style={styles.questionText}>{questionList[question].Name}</Text>
            </View>
            
            {renderAns()}
            <View style={styles.AnswerView}></View>
        </View>
    );
};
export default Game1;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    questionView: {
        marginTop: 50,
        marginBottom: 50,
        padding: 10,
        borderRadius: 30,
        width: 250,
    },
    questionText: {
        textAlign: "center",
        fontSize: 16,
        color: "#000"
    },
    rowView: {
        width: screenWidth * .8,
        flexDirection: "row",
        justifyContent: "space-around",

    },
    ansView: {
        width: 100,
        height: 100,
        margin: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    }
});