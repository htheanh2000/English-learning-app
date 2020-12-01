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


function DailyMission() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [dailyList, setDailyList] = useState([])
    useEffect(() => {
        if (auth().currentUser) {
            const userId = auth().currentUser.uid;
            if (userId) {
                database()
                .ref('users/' + userId + '/dailyMission/')
                .on('value' , snapshot => {
                    const list = snapshot.val()
                    console.log("DailyMission", snapshot.val())
                    if (list) {
                        setDailyList(list)
                    }
                });
            }
          }
          
    },[])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back ! </Text>
        </View>
    )
}

export default DailyMission

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    
});


