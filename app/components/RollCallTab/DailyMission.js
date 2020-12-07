import React, { Component, Fragment, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import database from '@react-native-firebase/database';
import { Button } from 'react-native-paper';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;
import { rollCall } from '../../store/user'
import DailyMissionData from '../../Data/DailyMission'


function DailyMission(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [dailyList, setDailyList] = useState([])
    const [correct, setCorrect] = useState()
    const { current } = props

    useEffect(() => {

    }, [])

    const reciveGold =(index)=> {
        setCorrect(1)
    }
    const rewwardGold =(gold)=> {
        setCorrect(0)
        console.log("rewwardGold")
        const newGold = user.gold + gold
       
        if (auth().currentUser) {
          const userId = auth().currentUser.uid;
          if (userId) {
            database()
            .ref('users/' + userId)
            .update({
              gold: newGold,
            })
            database()
                    .ref('users/' + userId + '/DailyMission/missionList/' + index)
                    .set(-1)

          }
        }
        
        dispatch(updateGold(newGold))
        setCorrect(-1)
    }

    const RenderBtn = (index) => {
        if (
            dailyList && dailyList.missionList && dailyList.missionList[index] === 1
        ) {
            return (
                <Button color={"#fff"} style={[styles.btnView, {backgroundColor:"#4287f5"}]} onPress={() => reciveGold(index)}>Nhận</Button>
            )
        }
        else if( dailyList && dailyList.missionList && dailyList.missionList[index] === -1)
        {
            return (
                <Button color={"#fff"} style={[styles.btnView, {backgroundColor:"#555957"}]} onPress={() => console.log("Đã Nhận")}>Đã nhận</Button>
            )
        }
        else {
            return (
                <Button color={"#000"} style={[styles.btnView, {backgroundColor:"#3df590"}]} onPress={() => console.log("Chưa làm")}>Chưa làm</Button>
            )
        }

    }

    const Modal =()=> {
        return(
            <View style={styles.modal}>
                <Image style={styles.modalImg} source={require("../../assets/congratulation.jpg")}></Image>
                <Text style={styles.textImg}>Chúc mừng cậu đã hoàn thành thử thách!</Text>
                <View style={{flexDirection:"row", paddingTop: 10}}>
                    <Button color={"#fff"} style={{backgroundColor:"#543534", marginRight:10}} onPress={()=> rewwardGold(50)} >+{50} Gold</Button>
                    <Button color={"#fff"} style={{backgroundColor:"#74d49f",marginLeft:10}}  onPress={()=> rewwardGold(100)} >+{100} Gold</Button>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.dailyView}>
                {DailyMissionData.map((item, index) =>
                    <View style={styles.itemView}>
                        <Text >{item.Name}</Text>
                        {RenderBtn(index)}
                    </View>)}
            </View>
            {
                correct === 1 ?   <Modal></Modal>  : null
            }
        </View>
    )
}

export default DailyMission

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height:heightR,
        width: widthR,
    },
    dailyView: {
        justifyContent: "center",
        alignItems: "center",
        width: widthR,
        marginTop:10
    },
    itemView: {
        width: widthR * .8,
        padding: 10,
        backgroundColor: "#eee",
        marginTop: 15,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row"
    },
    btnView: {
        position: "absolute",
        right: 0,
        backgroundColor: "#f1f52c"
    },
    modal: {
        position:"absolute",
        alignItems: 'center',
        top:100,
        paddingTop: 50,
        width: 400,
        height: 400,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    modalImg:{
        width:200,
        height:200
    },
    textImg: {
        marginTop:20,
        fontSize:20,
        fontWeight:"bold",
        width: 200,
        textAlign:"center",
        color:"#b39b9a"
    },
});


