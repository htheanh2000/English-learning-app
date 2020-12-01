import React, {  useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux'
import database from '@react-native-firebase/database';
import { Calendar } from 'react-native-calendars'
import { rollCall } from '../../store/user'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DailyMission from './DailyMission'
import I18n from '../../i18n/i18n'
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;
const Tab = createMaterialTopTabNavigator();


function SecondRoute() {
    return (
        <View style={styles.scene}>
            <Text >Welcome back ! </Text>
        </View>
    )
}


function MyTabs() {
    return (
        
      <Tab.Navigator>
        <Tab.Screen name={I18n.t("Daily mission")} component={DailyMission} />
        <Tab.Screen name="Settings" component={SecondRoute} />
      </Tab.Navigator>
    );
  }

function RollCallTab() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [isRollCalled, setRollCall] = useState(true)
    const month = new Date().getMonth() + 1
    const [dateList, setDateList] = useState(null)
    let current = ""
    let obj = null
 
    const initialLayout = { width: Dimensions.get('window').width };
    
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

        current = year + '-' + month + '-' + date
        console.log("current", current)

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
    obj = user.rollCalls ? user.rollCalls.reduce((c, v) => Object.assign(c, { [v]: { selected: true, marked: true } }), {}) : null
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
                /> : <Calendar />
            }
            
           {MyTabs()}
        </View>
    )
}

export default RollCallTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee"
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
    },
    scene: {
        flex:1,
        // backgroundColor:"red"
    },
});


