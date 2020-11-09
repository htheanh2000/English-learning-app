import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Modal = props => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <MaterialCommunityIcons name="fruit-grapes" size={60} color="#54B0FF"></MaterialCommunityIcons>
            </View>

            <View style={styles.titleView}>
                <Text style={styles.title}>FRUIT</Text>
                <Text style={styles.content}>In this mission, you will learn about different pieces of fruits and learn to tell. Good luck!</Text>
            </View>
            <View style={styles.bottomView}>
                <View style={styles.star}>
                    <AntDesign name="star" style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
                    <AntDesign name="staro" style={{ padding: 5, marginTop: -20 }} size={40} color="#FFd700"></AntDesign>
                    <AntDesign name="staro" style={{ padding: 5 }} size={30} color="#FFd700"></AntDesign>
                </View>

                <View style={styles.btnView}>
                    <Button style={[styles.btn, {backgroundColor: "#3fd951"}]} icon="arm-flex"  mode="contained" onPress={() => navigation.navigate('Lesson')}>
                        Learn
                    </Button>
                    <Button style={[styles.btn, {backgroundColor: "#47c9f5"}]} icon="axe" mode="contained"  onPress={() => navigation.navigate('Test')}>
                        Test
                    </Button>
                </View>
            </View>


        </View>
    );
};
export default Modal;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 50,
        width: screenWidth * .8,
        height: 300,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    titleView: {
        paddingBottom: 0
    },
    logo: {
        width: 100,
        height: 100,
        zIndex: 999,
        borderRadius: 100,
        backgroundColor: "#ebfbff",
        borderColor: "#fff",
        borderWidth: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: -50
    },
    title: {
        color: "#54B0FF",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
        letterSpacing: 5,
    },
    content: {
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 16,
        lineHeight: 24
    },
    star: {
        flexDirection: "row",
        paddingBottom: 10
    },
    bottomView: {
        alignItems: "center",
        // backgroundColor: "#F0F9FF",
        padding: 20
    },
    btnView: {
        flexDirection:"row"
    },
    btn: {
        borderColor: "red",
        margin: 5,
        backgroundColor: "red"
    }
});