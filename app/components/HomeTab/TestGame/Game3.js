import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import FastImage from 'react-native-fast-image'
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Tts from 'react-native-tts';

const Game3 = props => {
    const { questionList, question, mapLevel } = props
    const [arr, setArr] = useState([])
    const [color, setColor] = useState("#fff")
    const [correct, setCorrect] = useState(null)
    const [canListen, setCanlisten] = useState(true)
    const [error, setError] = useState("")
    useEffect(() => {
        randomNum()
        setCanlisten(true)
        setError("")
    }, [question])



    const randomNum = async () => {
        let ansArr = []
        let anotherArr = []
        while (ansArr.length < 4) {
            const num = Math.floor((Math.random() * 10) + 1)
            if (ansArr.find(e => e.num === num) === undefined && num !== question) {
                ansArr.push({ num: num, status: false })
            }
        }
        const pos = Math.floor((Math.random() * 3))

        ansArr[pos] = {
            num: question,
            status: true
        }
        setCorrect(pos)


        await Promise.all(ansArr.map(async (item) => {
            const url = await storage()
                .ref("Maps/" + mapLevel + "/" + questionList[item.num].ImgUrl)
                .getDownloadURL()
            anotherArr.push({
                url: url,
                status: item.status
            })
        }))
        setArr(anotherArr)

    }

    const pressAns = (ans) => {
        if (ans) {
            setError("Correct ! Giỏi lắm !")
        }
        else {
            setError("Hmmm ! Bạn đã bất cẩn rồi")
        }
        setTimeout(function () {
            setColor("#fff")
            props.onPress(ans)
        }, 500);
    }

    const speak = () => {
        console.log("speak:", questionList[question].Name)
        Tts.speak(questionList[question].Name, {
            androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 0.5,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
        });
    }

    const renderAns = () => {
        return (
            <View >
                <View style={styles.rowView}>
                    <TouchableOpacity onPress={() => pressAns(arr[0].status)} style={styles.ansView}>
                        {
                            arr[0] ?
                                <FastImage style={styles.image} source={{
                                    uri: arr[0].url,
                                }}></FastImage> : null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressAns(arr[1].status)} style={styles.ansView}>
                        {
                            arr[1] ?
                                <FastImage style={styles.image} source={{
                                    uri: arr[1].url,
                                }}></FastImage> : null
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.rowView}>
                    <TouchableOpacity onPress={() => pressAns(arr[2].status)} style={styles.ansView}>
                        {
                            arr[2] ?
                                <FastImage style={styles.image} source={{
                                    uri: arr[2].url,
                                }}></FastImage> : null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressAns(arr[3].status)} style={styles.ansView}>
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
           
            <TouchableOpacity onPress={() => speak()}>
                <FastImage style={styles.SpeakerImage} source={require('../../../assets/Speaker.png')}></FastImage>
            </TouchableOpacity>
            <Text style={styles.questionText}>{error} </Text>
             <TouchableOpacity style={[styles.questionView, {backgroundColor:"#fff"}]}  onPress={()=> setCanlisten(false)}>
                <Text style={styles.questionText}>{ !canListen ? questionList[question].Means : "I can't listen"}</Text>
            </TouchableOpacity>
            {renderAns()}
            <View style={styles.AnswerView}></View>
        </View>
    );
};
export default Game3;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    questionView: {
        padding: 10,
        borderRadius: 30,
        width: 150,
    },
    questionText: {
        textAlign: "center",
        fontSize: 16,
        color: "#000",
        marginBottom: 5
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
    },
    SpeakerImage: {
        width: 120,
        height: 120,
        margin: 30,
        marginBottom: 0
    }
});