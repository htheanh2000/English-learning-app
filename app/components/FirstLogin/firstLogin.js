import React, { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useDispatch} from 'react-redux'
import { setLanguage } from '../../store/user';
import {setStatus} from '../../store/user'
import I18n from '../../i18n/i18n'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const FirstLogin = (props) => {
    const { user } = props
    const [index, setIndex] = useState(0)
    const dispatch = useDispatch()
    const setLg = (lg) => {
        setLanguage(lg)
        user.language = lg
        if (auth().currentUser) {
            const userId = auth().currentUser.uid;
            console.log("userId", userId);
            if (userId) {
                database()
                    .ref('users/' + userId)
                    .update({
                        language: lg
                    })
            }
        }
        dispatch(setStatus(user))
        I18n.locale = lg;        
        dispatch(setLanguage(lg))
    }


    const welcomeTab = () => {
        return(
            <View  style={{ width: "100%", height:"100%" , alignItems: "center"}}>
                <Text style={{ fontSize: 30, textAlign: "center" }}>Welcome to witch world {user.username}</Text>

                <TouchableOpacity  onPress={()=> setIndex(index+1)}>
                    <Image style={{height: 200, marginTop: 100, resizeMode: "contain"}} source={require('../../assets/logo.png')}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, textAlign: "center", margin: 50, }}>Click the hat to next step</Text>
            </View>
        )
    }

    const languageTab = () => {
        return (
            <View  style={{ width: "100%", height:"100%" , alignItems: "center"}}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 30, textAlign: "center" }}>Select your language</Text>
                    <View style={{ flexDirection: "row", marginTop: 30 }}>
                        <TouchableOpacity style={{ width: 150, height: 100, marginRight: 10, borderRadius: 5 }} onPress={() => setLg("vn")}>
                            <Image style={{ width: 150, height: 100, marginRight: 10, borderRadius: 5 }} source={require('../../assets/vn.jpg')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: 150, height: 100, marginRight: 10, borderRadius: 5 }} onPress={() => setLg("en")}>
                            <Image style={{ width: 150, height: 100, marginLeft: 10, borderRadius: 5 }} source={require('../../assets/en.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    {/* <Button onPress={()=> start()}>Let's Start</Button> */}
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rebeccapurple' }}>
            <View style={{
                backgroundColor: 'floralwhite',
                borderRadius: 5,
                height: screenHeight,
                alignItems: "center",
                position: "relative",
                padding: 40,
                marginLeft: 0,
                marginRight: 0,
            }}>

                { index === 0? welcomeTab() : null}
                { index === 1? languageTab() : null}
            </View>

        </SafeAreaView>
    )
}

export default FirstLogin
