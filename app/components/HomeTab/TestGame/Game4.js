import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import FastImage from 'react-native-fast-image'
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Game4 = props => {
    const { questionList, question, mapLevel } = props
    const [arr, setArr] = useState([])
    const [color, setColor] = useState("#fff")
    const [correct, setCorrect] = useState(null)
    const [urlQues, setUrlQues] = useState()
    const [showTip, setShowTip] = useState(false)
    const [answerList, setAnswerList] = useState([])
    const [tempArr, setTempArr] = useState([])
    const [lengthArr, setLength] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        getImg()
        setShowTip(false)
        getAnswerList()
        setTempArr([])
        setColor("#fff")
        setError()
    }, [question])



    const getAnswerList = () => {
        const arr = []
        const temp = []
        const length = questionList[question].Name.length
        var i;

        let randomnum = []
        while (randomnum.length < length) {
            const num = Math.floor((Math.random() * length))
            if (randomnum.find(e => e === num) === undefined) {
                randomnum.push(num)
            }
           
        }
        for (i = 0; i < length; i++) {
            const c = questionList[question].Name.slice(randomnum[i], randomnum[i] + 1)
            arr.push(c)
            temp.push("")
        }
        setAnswerList(arr)
        setLength(temp)
    }

    const getImg = async () => {

        const url = await storage()
            .ref("Maps/" + mapLevel + "/" + questionList[question].ImgUrl)
            .getDownloadURL()
        setUrlQues(url)
    }


    const renderAnsList = () => {
        return (
            lengthArr ?
                <View style={styles.boxView}>
                    {lengthArr.map((item, index) =>
                        <TouchableOpacity onPress={() => unSelectAns(tempArr[index], index)} style={styles.box}>
                            <Text style={styles.boxText}>{tempArr[index] ? tempArr[index] : ""}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                : null
        )
    }

    const selectAns = (item, index) => {
        setTempArr([...tempArr, item])
        let t = answerList.splice(index, 1)
    }

    const unSelectAns = (item, index) => {
        setAnswerList([...answerList, item])
        tempArr.splice(index, 1)
    }

    const renderAnsListUser = () => {
        return (
            answerList ?
                <View style={styles.boxView}>
                    {answerList.map((item, index) =>
                        <TouchableOpacity onPress={() => selectAns(item, index)} style={[styles.box, { backgroundColor: "#3b38c9" }]}>
                            <Text style={styles.boxText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                : null
        )
    }

    const submit = () => {
        let str = ""
        tempArr.map(item => str = str + item)
        if (str.length < lengthArr.length) {
            setError(" Oh no, bạn cần điền hết ô trống")
            return
        }
        if (str === questionList[question].Name) {
            setColor("#3ddb68")
            setTimeout(function () {
                props.onPress(true)
            }, 200);
        }
        else {
            setColor("#f2440f")
            setTimeout(function () {
                props.onPress(false)
            }, 200);
        }

    }
    return (
        <View style={styles.container}>

            <TouchableOpacity >
                {
                    urlQues ?
                        <FastImage style={styles.questionImg} source={{
                            uri: urlQues,
                        }}></FastImage> : null
                }
            </TouchableOpacity>

            <TouchableOpacity style={[styles.showTipView, {backgroundColor:"#fff"}]} onPress={() => setShowTip(true)}>
                <Text style={styles.questionText}>{showTip ? questionList[question].Means : "SHOW TIP"} </Text>
            </TouchableOpacity>

            {renderAnsList()}
            {renderAnsListUser()}
            <Text style={styles.questionText}>{error} </Text>
            
            <TouchableOpacity style={[styles.questionView, { backgroundColor: color }]} onPress={() => submit(true)}>
                <Text style={styles.questionText}>SUBMIT </Text>
            </TouchableOpacity>
        </View>
    );
};
export default Game4;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    questionView: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        borderRadius: 30,
        width: 250,
    },
    showTipView: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        width: 150,
    },
    questionText: {
        textAlign: "center",
        fontSize: 16,
    },
    questionImg: {
        width: 200,
        height: 200,
        marginTop: 30,
        borderRadius: 20
    },
    box: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 5,
        margin: 5,
        marginTop: 10,
        justifyContent: "center",
        alignContent: "center"
    },
    boxView: {
        width:screenWidth*.8,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        flexWrap:"wrap"
    },
    boxText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase"
    }

});