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
import Data from '../../Data/characters'
function RollCallTab() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [isRollCalled, setRollCall] = useState(true)
    const month = new Date().getMonth() + 1
    const [dateList, setDateList] = useState(null)
    const current = new Date().getFullYear() + '-' + month + '-' + new Date().getDate()
    let  obj = null

    useEffect(() => {
        if (user.rollCalls && user.rollCalls[user.rollCalls.length - 1] === current) {
            setRollCall(false)
        }
    })
    const rollCallf = () => {
        dispatch(rollCall(current))
        if (auth().currentUser) {
            const userId = auth().currentUser.uid;
            const sth = user.rollCalls ? [
                ...user.rollCalls,
                current
            ] : [
                    current
                ]

            console.log("sth", sth);
            if (userId) {
                database()
                    .ref('users/' + userId + '/rollCalls')
                    .set(sth)
            }
        }
        setRollCall(false)
    }
    obj =  user.rollCalls ? user.rollCalls.reduce((c, v) => Object.assign(c, {[v]: {selected: true,marked: true}}), {}) : null
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back ! {user.username}</Text>
            {
                isRollCalled ? <TouchableOpacity style={styles.rollcall} onPress={() => rollCallf()}>
                    <Image style={{ width: 200, height: 200 }} source={require('../../assets/rollcall.jpg')}></Image>
                </TouchableOpacity> : null  
            }
            {
                obj ? <Calendar
                    markedDates={obj}
                /> : <Calendar/>
            }
        </View>
    )
}

export default RollCallTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        backgroundColor: "#000",
        paddingBottom: 20,
        paddingTop: 20,
        textAlign: "center",
        fontSize: 24,
        color: "#fff"
    },
    rollcall: {
        width: 200,
        height: 200,
        position: "absolute",
        left: widthR / 2 - 100,
        top: heightR / 2 - 0,
    }
});


