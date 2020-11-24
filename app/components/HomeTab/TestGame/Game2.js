import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import FastImage from 'react-native-fast-image'
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const Game2 = props => {
    const { questionList, question, mapLevel } = props
    const [arr, setArr] = useState([])
    const [color, setColor] = useState("#fff")
    const [correct, setCorrect] = useState(null)
    const [imgQues, setImgQues] = useState("")
    const [id, setIndex] = useState(-1)
    useEffect(() => {
        randomNum()
    }, [question])


    const randomNum = async () => {

        const imgQuestion = await storage()
            .ref("Maps/" + mapLevel + "/" + questionList[question].ImgUrl)
            .getDownloadURL()

        setImgQues(imgQuestion)
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

        ansArr.map(async (item) => {
            anotherArr.push({
                name: questionList[item.num].Name,
                status: item.status
            })
        })

        setTimeout(function () { setArr(anotherArr) }, 500);

    }

    const pressAns = (ans, index) => {
        setIndex(index)
        if (ans) {
            setColor("green")
        }
        else {
            setColor("red")
        }
        setTimeout(function () {
            setColor("#fff")
            props.onPress(ans)
        }, 500);
    }

    const renderAns = () => {
        return (
            <View >
                <View style={styles.rowView}>
                    <TouchableOpacity onPress={() => pressAns(arr[0].status, 0)} style={[styles.ansView, {backgroundColor: id === 0 ? color : "#fff"}]}>
                        {arr && arr[0] ? <Text>{arr[0].name}</Text> : null} 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressAns(arr[1].status, 1)} style={[styles.ansView, {backgroundColor: id === 1 ? color : "#fff"}]}>
                    {arr && arr[1] ? <Text>{arr[1].name}</Text> : null} 
                    </TouchableOpacity>
                </View>

                <View style={styles.rowView}>
                    <TouchableOpacity onPress={() => pressAns(arr[2].status, 2)} style={[styles.ansView, {backgroundColor: id === 2 ? color : "#fff"}]}>
                    {arr && arr[2] ? <Text>{arr[2].name}</Text> : null} 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressAns(arr[3].status, 3)} style={[styles.ansView, {backgroundColor: id === 3 ? color : "#fff"}]}>
                    {arr && arr[3] ? <Text>{arr[3].name}</Text> : null} 
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={[styles.questionView, { backgroundColor: color }]}>
                {
                    imgQues ?
                        <FastImage style={styles.image} source={{
                            uri: imgQues,
                        }}></FastImage> : null
                }
            </View>
            {renderAns()}
            <View style={styles.AnswerView}></View>
        </View>
    );
};
export default Game2;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    questionView: {
        marginBottom: 50,
        marginTop: 50,
        borderRadius: 150,
        width: 150,
        height: 150
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
        width: 150,
        height: 50,
        margin: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        borderRadius: 150,
        width: 150,
        height: 150
    }
});