import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import axios from "axios";

const Game = props => {

    const [arr, setArr] = useState([ {name: "WitchWorld" , mean: "Thế giới phù thủy"} ])
    const [value, onChangeText] = React.useState("");
    const [nextWord, setNextWord] = React.useState("");
    const [error, setError] = React.useState("");
    const [score, setScore] = React.useState(0);
    useEffect(() => {
        setNextWord("")
        onChangeText("")
        setError("")
    }, [score])

    const callApi = async (url, value) => {
        console.log("call api")
        var options = {
            method: 'GET',
            url: url,
        };

        axios.request(options)
            .then(function (response) {
                console.log(response.data);

                const newVoca = {
                    name: response.data[0].word,
                    mean: "API"
                }

                setArr([...arr, value, newVoca)
                setScore(score + 1)
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const check = async (value) => {
        console.log("call check api")
        var options = {
            method: 'GET',
            url: "https://api.tracau.vn/WBBcwnwQpV89/s/" + value + "%7D/en",
        };

        axios.request(options)
            .then(function (response) {
                console.log("response data", response.data);
                {
                    response.data.sentences.length !== 5 ? setError("good Job !") : setError("Từ vựng không hợp lệ")
                }
            })
            .catch(function (error) {
                console.error(error);
            });

    }

    const submit = async () => {
        const lastC = value.slice(value.length - 1, value.length)
        const beginC = value.slice(0, 1)
        const lastVoca = arr[arr.length - 1]
        const lastCofVoca = lastVoca.slice(lastVoca.length - 1, lastVoca.length)

        if (
            lastCofVoca.toLowerCase() !== beginC.toLowerCase()
        ) {
            setError("Sai luật rùi á bạn gì đóa ơi !")
            return
        }
        else {
            const url = "https://api.datamuse.com/words?ml=duck&sp=" + lastC + "*&max=1"
            console.log("call check api")
            var options = {
                method: 'GET',
                url: "https://api.tracau.vn/WBBcwnwQpV89/s/" + value + "%7D/en",
            };

            await axios.request(options)
                .then(function (response) {
                    console.log("response data", response.data);
                    const newVoca = {
                        name: 
                    }
                    setArr([...arr, value])

                    {
                        response.data.sentences.length ? setError("good Job !") : setError("Từ vựng không hợp lệ")
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });

            console.log("error", error)

            if (error) return

            else {
                setTimeout(function () {
                    callApi(url, value)
                }, 1000)
            }
        }


    }
    const gg = () => {
        setArr(["Start"])
    }
    return (
        <View style={styles.container}>

            {/* <TouchableOpacity style={styles.boxSubmit} onPress={() => submit()} >
                <Text style={styles.boxText}>Submit</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.boxGG} onPress={() => gg()} >
                <Text style={styles.boxText}>Đầu hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.score}  >
                <Text style={styles.boxText}>score</Text>
                <Text style={styles.boxText}>{score}</Text>
            </TouchableOpacity>

            <Text style={{ color: "#000" }}>{error}</Text>
            {/* <Text style={styles.boxText}>{error}</Text> */}
            <TouchableOpacity style={styles.box} >
                <TextInput
                    style={{ height: 40, borderColor: 'gray', textAlign: "center", borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
            </TouchableOpacity>
            <View>
                {
                    arr.map(item =>
                        <TouchableOpacity style={styles.box}>
                            <Text style={styles.boxText}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>


        </View>
    );
};
export default Game;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: "center",
        height: screenHeight
    },
    boxText: {
        textAlign: "center",
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    box: {
        width: 150,
        height: 50,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 5,
        margin: 5,
        padding: 5,
        justifyContent: "center",
        alignContent: "center"
    },
    boxSubmit: {
        width: 150,
        height: 50,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 5,
        position: "absolute",
        justifyContent: "center",
        alignContent: "center",
        top: 10,
        left: 10
    },
    boxGG: {
        width: 150,
        height: 50,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 5,
        position: "absolute",
        justifyContent: "center",
        alignContent: "center",
        top: 10,
        right: 10
    },
    score: {
        width: 80,
        height: 20,
        position: "absolute",
        top: 15,
        alignContent: "center",
    }

});