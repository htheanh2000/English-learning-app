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

    const [arr, setArr] = useState([{ name: "WitchWorld", mean: "Thế giới phù thủy" }])
    const [value, onChangeText] = React.useState("");
    const [nextWord, setNextWord] = React.useState("");
    const [error, setError] = React.useState("");
    const [score, setScore] = React.useState(0);
    const [translate, setTranslate] = React.useState(-1)
    useEffect(() => {
        setNextWord("")
        onChangeText("")
        setError("")
    }, [score])

    const callApi = async (url, newVoca) => {
        console.log("call api")
        var options = {
            method: 'GET',
            url: url,
        };
        let newWorld = {}

        axios.request(options)
            .then(function async(response) {
                console.log(response.data);
                // Tra từ 
                const rNum = Math.floor(Math.random() * 10);

                console.log("call check api")
                var options = {
                    method: 'GET',
                    url: "https://api.tracau.vn/WBBcwnwQpV89/s/" + response.data[rNum].word + "/en",
                };

                const enWord = response.data[rNum].word

                 axios.request(options)
                    .then(function (response) {
                        console.log("response data", response.data);
    
                        if (response.data.sentences.length) {
                            newWorld = {
                                name: enWord,
                                mean: response.data.sentences[0].fields.vi
                            }
                            setArr([...arr, newVoca,newWorld])
                            console.log("newVoca", newVoca)
    
                        }
                        else {
                            setError("Từ vựng không hợp lệ")
                        }
    
                    })
                    .catch(function (error) {
                        console.error(error);
                    });

                setArr([...arr, value, newVoca])
                setScore(score + 1)
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const submit = async () => {
        const lastC = value.slice(value.length - 1, value.length)
        const beginC = value.slice(0, 1)
        const lastVoca = arr[arr.length - 1].name
        const lastCofVoca = lastVoca.slice(lastVoca.length - 1, lastVoca.length)
        let newVoca = {}
        console.log("lastCofVoca", lastCofVoca)
        if (
            lastCofVoca.toLowerCase() !== beginC.toLowerCase()
        ) {
            setError("Sai luật rùi á bạn gì đóa ơi !")
            // return
        }
        else {
            const url = "https://api.datamuse.com/words?ml=duck&sp=" + lastC + "*&max=10"
            console.log("call check api")
            var options = {
                method: 'GET',
                url: "https://api.tracau.vn/WBBcwnwQpV89/s/" + value.toLowerCase() + "/en",
            };

            await axios.request(options)
                .then(function (response) {
                    console.log("response data", response.data);

                    if (response.data.sentences.length) {
                        newVoca = {
                            name: value,
                            mean: response.data.sentences[0].fields.vi
                        }
                        setArr([...arr, newVoca])
                        console.log("newVoca", newVoca)

                    }
                    else {
                        setError("Từ vựng không hợp lệ")
                    }

                })
                .catch(function (error) {
                    console.error(error);
                });

            console.log("error", error)

            if (error) return

            else {
                setTimeout(function () {
                    callApi(url, newVoca)
                }, 1000)
            }
        }


    }
    const gg = () => {
        setArr([{ name: "WitchWorld", mean: "Thế giới phù thủy" }])
        
        setScore(0)
    }
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.boxSubmit} onPress={() => submit()} >
                <Text style={styles.boxText}>Submit</Text>
            </TouchableOpacity>

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
                    arr.map((item, index ) =>
                        <TouchableOpacity style={styles.box} onPress={()=> setTranslate(index)}>
                           <Text style={styles.boxText}>{ translate !== index ? item.name : item.mean}</Text>
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