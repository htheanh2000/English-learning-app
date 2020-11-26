import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import {Button} from "react-native-paper"
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from 'react-redux'
import admob ,{MaxAdContentRating, InterstitialAd, RewardedAd, RewardedAdEventType, TestIds, AdEventType } from '@react-native-firebase/admob';
import { updateGold } from '../../store/user';
import Admod from '../../Ads/admod'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1626321943018250~1658020858';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

const StoryTest = props=> {
    const user = useSelector(state => state.user)
    const {story} = props.route.params
    const [index, setIndex] = useState(1)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [ModalShow, setModalShow] = useState(false)
    const [correct, setCorrect] = useState()
    useEffect(() => {
        admob()
            .setRequestConfiguration({
                // Update all future requests suitable for parental guidance
                maxAdContentRating: MaxAdContentRating.PG,

                // Indicates that you want your content treated as child-directed for purposes of COPPA.
                tagForChildDirectedTreatment: true,

                // Indicates that you want the ad request to be handled in a
                // manner suitable for users under the age of consent.
                tagForUnderAgeOfConsent: true,
            })
            .then(() => {
                // Request config successfully set!
                console.log("Request config successfully set!")
            });


        const eventListener = rewarded.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                // rewarded.show();
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of ', reward);
            }
        });
        rewarded.onAdEvent((type, error, data) => {
              if (type === AdEventType.ERROR) {
               console.log('Ad error:', error);
             }
             if (type === AdEventType.CLOSED) {
                console.log('jasdfhdjksufhjk');
              }
         });
        // Start loading the rewarded ad straight away
        rewarded.load();
        // Unsubscribe from events on unmount
        return () => {
            eventListener();
        };

       
    });

    const showRewardAd = () => {
        console.log('showRewardAd')
        rewarded.onAdEvent((type, error) => {
            if (type === RewardedAdEventType.LOADED) {
                rewarded.show();
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of 5 lives');
               
            }
            if (type === AdEventType.ERROR) {
                console.log('Ad error:', error);
              }
              if (type === AdEventType.CLOSED) {
                rewwardGold(100)
               }
        });
        rewarded.load();
    }
    const pressAns=(id)=> {
        if(id === story.Question[index].Answer.correct) {
            console.log("Correct")
            setCorrect(1)
        }
        else {
            console.log("Un Correct")
            setCorrect(-1)
        }
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
    
          }
        }
        
        dispatch(updateGold(newGold))
        navigation.navigate("Training")
    }

   

    const Modal =()=> {
        return(
            <View style={styles.modal}>
                <Image style={styles.modalImg} source={require("../../assets/congratulation.jpg")}></Image>
                <Text style={styles.textImg}>Chúc mừng cậu đã hoàn thành thử thách!</Text>
                <View style={{flexDirection:"row", paddingTop: 10}}>
                    <Button color={"#fff"} style={{backgroundColor:"#543534", marginRight:10}} onPress={()=>{rewwardGold(50)}}>+50 Gold</Button>
                    <Button color={"#fff"} style={{backgroundColor:"#74d49f",marginLeft:10}}  onPress={()=>{showRewardAd()}}>+100 Gold</Button>
                </View>
            </View>
        )
    }

    const readAgain=()=> {
        console.log(" navigation.pop()")
        navigation.pop()
    }

    const ModalWrong =()=> {
        return(
            <View style={styles.modal}>
                <Image style={styles.modalImg} source={require("../../assets/unlucky.jpg")}></Image>
                <Text style={styles.textImg}>Cậu đọc chưa cẩn thận rồi !</Text>
                <View style={{flexDirection:"row", paddingTop: 10}}>
                    <Button color={"#fff"} style={{backgroundColor:"#543534", marginRight:10}} onPress={()=>{readAgain()}}>Read Againg</Button>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.ques}>
                <Text>{story.Question[1].Name.vn}</Text>
            </View>

            <View style={styles.ans}>
            <View style={styles.rowView}>
                    <TouchableOpacity onPress={() => pressAns(1)} style={styles.ansView}>
                        <Text>{story.Question[index].Answer[1].vn}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressAns(2)} style={styles.ansView}>
                    <Text>{story.Question[index].Answer[2].vn}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.rowView}>
                    <TouchableOpacity onPress={() => pressAns(3)} style={styles.ansView}>
                    <Text>{story.Question[index].Answer[3].vn}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressAns(4)} style={styles.ansView}>
                    <Text>{story.Question[index].Answer[4].vn}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                correct === 1 ?   <Modal></Modal>  : null
            }
            {
                correct === -1 ?   <ModalWrong></ModalWrong>  : null
            }
        </View>
    );
};
export default StoryTest;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent:"center"
    },
    ques: {
        padding: 20,
        backgroundColor:"#d3d2f7",
        borderRadius:20,
        marginTop: 100
    },
    ans: {
        marginTop:100,
        // backgroundColor:"#e8f095",
    },  
    rowView: {
        width: screenWidth * .8,
        flexDirection: "row",
        justifyContent: "space-around",

    },
    ansView: {
        width: 100,
        height: 50,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor:"#000",
        borderWidth:2,
        // backgroundColor:"#75fa85"
    },
    modal: {
        top:100,
        position:"absolute",
        alignItems: 'center',
        paddingTop: 50,
        width: screenWidth * .8,
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
    }
});