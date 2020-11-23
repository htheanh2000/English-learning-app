import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Loader from './Loader';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux'
import { mainStyles } from '../../styles/mainStyles'
import AsyncStorage from '@react-native-community/async-storage';
import FirstLogin from '../FirstLogin/firstLogin';
import { useNavigation } from '@react-navigation/native';
import {setStatus} from '../../store/user'
const RegisterScreen = props => {
    const dispatch = useDispatch()
    let [username, setUsername] = useState('Baoanh');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [firstLogin,setFirstLogin] = useState(false)
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    const navigation = useNavigation()
    let newUser = {
        level: 0,
        rank: null,
        username: username,
        gold : 10000,
        online: true,
        exp: 0,
        firstLogin: false,
        history: [],
        characters: [] ,
        language: "en"
    }
    const handleSubmitButton = async () => {
        setLoading(true)

        if (!username) {
            setErrortext('Please fill ussername');
            setLoading(false)
            return;
        }
        if (!password) {
            setErrortext('Please fill password');
            setLoading(false)
            return;
        }
        
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log('User account created & signed in!');
                if (auth().currentUser) {
                   const userId = auth().currentUser.uid;
                    console.log("userId", userId);
                    if (userId) {
                        database()
                        .ref('users/' + userId).set(newUser)
                    }
                }
                AsyncStorage.setItem("user", JSON.stringify(newUser))
                // dispatch(setStatus(newUser))
                setFirstLogin(true)
                setLoading(false)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setErrortext('That email address is already in use!');
                    setLoading(false)
                    return
                }
                if (error.code === 'auth/invalid-email') {
                    setErrortext('That email address is invalid!');
                    setLoading(false)
                    return
                }

                console.error(error);
            });

    };

    return (
            !firstLogin ? 
            <View style={mainStyles.mainBody}>
            <Loader loading={loading} />
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView enabled>
                    <View style={{ marginTop: 200 }}>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={username => setUsername(username)}
                                placeholder="Enter character name: "
                                placeholderTextColor="#F6F6F7"
                                keyboardType="default"
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={email => setEmail(email)}
                                placeholder="Enter username"
                                placeholderTextColor="#F6F6F7"
                                keyboardType="email-address"
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={password => setPassword(password)}
                            placeholder="Enter password"
                            placeholderTextColor="#F6F6F7"
                            autoCapitalize="sentences"
                            returnKeyType="default"
                            secureTextEntry={true}
                            blurOnSubmit={false}
                        />
                    </View>

                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}> {errortext} </Text>
                    ) : null}

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => props.navigation.navigate("LoginScreen")}>
                        <Text style={styles.buttonTextStyle}>LOGIN</Text>
                    </TouchableOpacity> */}
                </KeyboardAvoidingView>
            </ScrollView>
        </View> : <FirstLogin user={newUser}/>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        width: 300,
        marginTop: 20,
        margin: 10,
    },
    buttonStyle: {
        flex: 1,
        color: 'white',
        height: 40,
        marginRight: 100,
        marginLeft: 100,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',

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
    errorTextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});

