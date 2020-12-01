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

    const { current } = props

    useEffect(() => {

        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        if (new Date().getMonth() + 1 < 10) {
            month = "0" + month
        }

        if (new Date().getDate() < 10) {
            date = "0" + date
        }

        const current = year + '-' + month + '-' + date
        console.log("current", current)



        if (auth().currentUser) {
            const userId = auth().currentUser.uid;
            if (userId) {
                database()
                    .ref('users/' + userId + '/DailyMission/')
                    .on('value', snapshot => {
                        const list = snapshot.val()
                        console.log("DailyMission", snapshot.val())
                        if (list) {
                            if (list && list.lastDaily)
                                setDailyList(list)
                        }
                        else {
                            console.log("current", current)
                            database()
                                .ref('users/' + userId + "/DailyMission")
                                .set({
                                    lastDaily: current,
                                })
                        }

                    });
            }
        }
    }, [])

    const reciveGold =(index)=> {
        if (auth().currentUser) {
            const userId = auth().currentUser.uid;
            if (userId) {
                database()
                    .ref('users/' + userId + '/DailyMission/missionList/' + index)
                    .set(-1)
            }
        }
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
    return (
        <View style={styles.container}>
            <View style={styles.dailyView}>
                {DailyMissionData.map((item, index) =>
                    <View style={styles.itemView}>
                        <Text >{item.Name}</Text>
                        {RenderBtn(index)}
                    </View>)}
            </View>
        </View>
    )
}

export default DailyMission

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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
    }
});


