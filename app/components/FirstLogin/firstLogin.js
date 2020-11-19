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
function FirstLogin() {
   return(
       <View>
           <Text>First seting</Text>
       </View>
   )
}

export default FirstLogin

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


