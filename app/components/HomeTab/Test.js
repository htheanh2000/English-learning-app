import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FastImage, Dimensions, TouchableOpacity, BackHandler, ScrollView, SafeAreaView } from 'react-native';
import { Button, ProgressBar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux'
import { updateMapAndLevel } from '../../store/user'
import Game1 from './TestGame/Game1'
import Game2 from './TestGame/Game2'
import Game3 from './TestGame/Game3'
import Game4 from './TestGame/Game4'
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import {updateGold} from '../../store/user'
import { InterstitialAd, RewardedAd, RewardedAdEventType, TestIds, AdEventType } from '@react-native-firebase/admob';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const Test = props => {
  const { star } = props
  let [question, setQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const { map, mapLevel } = props.route.params
  const [finish, setFinish] = useState(false)
  const [unFinish, setunFinish] = useState(false)
  const navigation = useNavigation()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [arr, setArr] = useState('')
  const rArr = []
  const [gameType, setGameType] = useState(3)
  const [loaded, setLoaded] = useState(false);

  const adUnitId = __DEV__ ? TestIds.REWARDED  : 'ca-app-pub-1626321943018250~1658020858';

  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  const randomNumber = async () => {
    while (rArr.length < 10) {
      const num = Math.floor((Math.random() * 10) + 1)
      if (rArr.indexOf(num) === -1) {
        rArr.push(num)
      }
    }
    setArr(rArr)
  }
  useEffect(() => {
    randomNumber()
  }, [])

  useEffect(() => {
    randomGameType()
  }, question)

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
          setLoaded(true);
        }
  
        if (type === RewardedAdEventType.EARNED_REWARD) {
          console.log('User earned reward of ', reward);
        }
      });
  
      // Start loading the rewarded ad straight away
      rewarded.load();
  
      // Unsubscribe from events on unmount
      return () => {
        eventListener();
      };

    }, []);

  const  showInterstitialAd = () => {
      // Create a new instance
      const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
  
      // Add event handlers
      interstitialAd.onAdEvent((type, error) => {
          if (type === AdEventType.LOADED) {
              interstitialAd.show();
          }
      });
  
      // Load a new advert
      interstitialAd.load();
  }
  const randomGameType = () => {
    const num = Math.floor((Math.random() * 4)) + 1
    setGameType(num)
  }

  const checkAns = (ans) => {
    if (ans) {
      setScore(score + 1)
    }
  }
  const setNextQuestion = async (ans) => {
    randomGameType()
    if (question === 9) {
      submit()
      return
    }
    checkAns(ans)
    setQuestion(question + 1)
  }


  const submit = async () => {
    const newStar = Math.floor(score / 3)
    if (star > newStar) {
      setFinish(true)
      return
    }
    else {
      if (newStar < 1) {
        setunFinish(true)
        return
      }
      const payload = {
        level: mapLevel,
        star: newStar
      }
      dispatch(updateMapAndLevel(payload))
      if (mapLevel > user.level) {
        if (auth().currentUser) {
          const userId = auth().currentUser.uid;
          if (userId) {
            database()
              .ref('users/' + userId + "/level/")
              .set(mapLevel)
          }
        }
      }
      if (auth().currentUser) {
        const userId = auth().currentUser.uid;
        if (userId) {
          database()
            .ref('users/' + userId + "/map/" + mapLevel)
            .set(newStar)
        }
      }
      setFinish(true)
      console.log("star", newStar);
    }
  }
  const goHome = (x) => {
    console.log("goHone")
    const newGold = user.gold + score*10*x + 10
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
    navigation.navigate("Home")
  }



  const renderGame1 = () => {
    return (
      arr ? <Game1 mapLevel={mapLevel} onPress={(ans) => setNextQuestion(ans)} questionList={map.Vocabulary} question={arr[question]}></Game1> : null
    )
  }
  const renderGame2 = () => {
    return (
      arr ? <Game2 mapLevel={mapLevel} onPress={(ans) => setNextQuestion(ans)} questionList={map.Vocabulary} question={arr[question]}></Game2> : null
    )
  }
  const renderGame3 = () => {
    return (
      arr ? <Game3 mapLevel={mapLevel} onPress={(ans) => setNextQuestion(ans)} questionList={map.Vocabulary} question={arr[question]}></Game3> : null
    )
  }

  const renderGame4 = () => {
    return (
      arr ? <Game4 mapLevel={mapLevel} onPress={(ans) => setNextQuestion(ans)} questionList={map.Vocabulary} question={arr[question]}></Game4> : null
    )
  }
  

  const showRewardAd = () => {
    rewarded.onAdEvent((type, error) => {
        if (type === RewardedAdEventType.LOADED) {
          rewarded.show();
        }

        if (type === RewardedAdEventType.EARNED_REWARD) {
            console.log('User earned reward of 5 lives');
            goHome(2)
        }
    });
    rewarded.load();
}
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.hardMode}>
            <AntDesign name="heart" size={30} color="#ffa8a8"></AntDesign>
          </View>
          <View>
            <Text style={styles.process}>{question + 1}/10</Text>
            <TouchableOpacity>
              <Text style={styles.title}>{map.Name}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.exit} onPress={() => navigation.navigate("Home")}>X</Text>
        </View>
        <ProgressBar progress={(question + 1) / 10} color="#476491" />
      </View>
    
      {
        gameType === 1 ? renderGame1() : null
      }

      {
        gameType === 2 ? renderGame2() : null
      }

      {
        gameType === 3 ? renderGame3() : null
      }

      {
        gameType === 4 ? renderGame4() : null
      }

      {finish ?
        <View style={styles.modal}>
          <View style={styles.star}>
            <AntDesign name={score >= 1 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
            <AntDesign name={score >= 2 ? "star" : "staro"} style={{ padding: 5, marginTop: -20 }} size={40} color="#FFd700"></AntDesign>
            <AntDesign name={score >= 3 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
          </View>
          <Text style={{ textAlign: "center", color: "#C1C9D4", fontSize: 30, fontWeight: "bold" }}>Congratulation !</Text>
          <Text style={{ fontSize: 20, color: "#C1C9D4" }}>You get {score*10} Gold</Text>
          <Button style={styles.goHome} onPress={() => goHome(1)}>Go back Home</Button>
          <Button style={styles.goHome} onPress={() => showRewardAd()}>QC để x2 Gold</Button>
        </View> : null}
      {unFinish ?
        <View style={styles.modal}>
          <View style={styles.star}>
            <AntDesign name={score >= 1 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
            <AntDesign name={score >= 2 ? "star" : "staro"} style={{ padding: 5, marginTop: -20 }} size={40} color="#FFd700"></AntDesign>
            <AntDesign name={score >= 3 ? "star" : "staro"} style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
          </View>
          <Text style={{ textAlign: "center", color: "#C1C9D4", fontSize: 30, fontWeight: "bold" }}>Sorry !</Text>
          <Text style={{ fontSize: 20, color: "#C1C9D4" }}>You get {score} star</Text>
          <Text style={{ fontSize: 14, padding: 10, textAlign: "center", color: "#C1C9D4" }}>You need a litte lucky to pass the test</Text>
          <Button style={styles.goHome} onPress={() => goHome()}>Go back Home</Button>
        </View> : null}
    </SafeAreaView>
  );
};
export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#53A0FF',
  },
  header: {
    width: screenWidth,
    zIndex: 999
  },
  hardMode: {
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center"
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center"
  },
  process: {
    color: "#fff700",
    fontSize: 16,
    textAlign: "center"
  },
  exit: {
    color: "#fff",
    fontSize: 36
  },
  vocaView: {
    backgroundColor: "#3ABEFF",
    width: screenWidth * .8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    paddingTop: 40
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#fff",
    top: -50,
    position: "absolute",

  },
  text: {
    color: "#fff",
    fontSize: 22,
    // marginTop: -55
  },
  volume: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  volumeView: {
    flexDirection: "row"
  },
  example: {
    width: screenWidth * .8,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  exText: {
    color: "#000",
    fontSize: 16,
    margin: 5,
    textAlign: "left"
  },
  item: {
    textAlign: "center",
    width: screenWidth * .8,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#25a14a",
    borderRadius: 0,
    margin: 5,
  },
  exvolume: {
    paddingLeft: 5,
    margin: 5
  },
  btn: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#95f597"
  },
  textinput: {
    width: 150,
    height: 60,
    backgroundColor: "transparent",
    textAlign: "center",
    letterSpacing: 5,
    textTransform: "uppercase",
    fontWeight: "100",
    fontSize: 16,
    color: "#fff",
  },
  modal: {
    position: "absolute",
    width: 300,
    height: 400,
    top: screenHeight / 2 - 250,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  showtip: {
    backgroundColor: "#466b7a",
    borderRadius: 5,
  },
  star: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 20
  },
  goHome: {
    width: 200,
    height: 40,
    backgroundColor: "#b3d0ff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  }
});