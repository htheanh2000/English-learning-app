
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Loader';
import { mainStyles } from '../../styles/mainStyles'
import { Dimensions } from "react-native";
import { login, setStatus } from '../../store/user'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function logCurrentStorage() {
  AsyncStorage.getAllKeys().then((keyArray) => {
    AsyncStorage.multiGet(keyArray).then((keyValArray) => {
      let myStorage: any = {};
      for (let keyVal of keyValArray) {
        myStorage[keyVal[0]] = keyVal[1]
      }

      console.log('CURRENT STORAGE: ', myStorage);
    })
  });
}
const LoginScreen = props => {
  const dispatch = useDispatch()
  // const { user } = useSelector(state => state.user)

  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  const [LogLocation, setLogLocation] = useState("false");

  const handleSubmitPress = async () => {
    setErrortext('');
    setLoading(true)
    if (!userEmail || !userPassword) {
      setErrortext('Email/Password can\'t be null');
      setLoading(false)
      return
    }

    auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((iUser) => {
        const user = auth().currentUser
        if (user) {
          const userId = iUser.user.uid;
          console.log("userId",userId);
          database()
            .ref('users/' + userId)
            .once('value')
            .then(snapshot => {
              console.log("snapshopt", snapshot.val());
              dispatch(login(snapshot.val()))
            });
          setLoading(false)

        }
        else {
          console.log("You haven't login");
          setLoading(false)

        }
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('=====auth/invalid-email======');
          setErrortext("/invalid-email")
        }
        if (error.code === 'auth/user-disabled') {
          console.log('=====auth/user-disabled======');
          setErrortext("You account disabled by some resome")
          // return dispatch(loginSuccess())
        }
        if (error.code === 'auth/user-not-found') {
          console.log('=====auth/user-not-found======');
          setErrortext("This account haven't registered")
          // return dispatch(loginSuccess())
        }
        if (error.code === 'auth/wrong-password') {
          console.log('=====auth/wrong-password=====');
          setErrortext("wrong password")
        }

        console.error(error);
        setLoading(false)

      });

    return
  }


  return (
    <View style={mainStyles.mainBody}>
      <Loader loading={loading} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 200 }}>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Enter Email"
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="text"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Enter Password"
                placeholderTextColor="#F6F6F7"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}

            <View style={{ width: screenWidth, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => handleSubmitPress()}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate('RegisterScreen')}>
                <Text style={styles.buttonTextStyle}>REGISTER</Text>
              </TouchableOpacity>
            </View>

            {/* <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('ForgotPasswordScreen')}>
              Sorry! I'm forgot my pasord 
            </Text> */}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    color: '#FFFFFF',
    borderColor: '#fff',
    borderWidth: 1,
    height: 35,
    width: 120,
    borderRadius: 30,

    justifyContent: "center",
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});