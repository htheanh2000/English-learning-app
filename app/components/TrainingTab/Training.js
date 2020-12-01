import React, { useEffect, useState } from "react";
import { Appbar, Searchbar } from 'react-native-paper';
import { FlatList, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux'
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;

const Training = () => {
    const navigation = useNavigation();
    const [storyData, setStoryData] = useState([])
    const [arrImg, setArrImg] = useState([])
    const [storyTym, setStoryTym] = useState([])
    useEffect(() => {
        database()
            .ref('stories')
            .once('value')
            .then(snapshot => {
                const stories = snapshot.val()
                setStoryData(stories)
                console.log("storyData", stories)
                getImg(stories)
            });
    }, [])
    useEffect(() => {
        database()
            .ref('stories')
            .on('value', snapshot => {
                console.log('update stories data: ', snapshot.val());
                setStoryData(snapshot.val())
            });
    },[])

 

    useEffect(() => {
        if (auth().currentUser) {
            const userId = auth().currentUser.uid;
            if (userId) {
                database()
                    .ref('users/' + userId + '/story/')
                    .on('value' , snapshot => {
                        const storiesTym = snapshot.val()
                        console.log("update story user", snapshot.val())
                        if (storiesTym) {
                            setStoryTym(storiesTym)
                        }
                    });
            }
        }
    }, [])
    const getImg = async (stories) => {
        const arr = []
        await Promise.all(stories.map(async (item) => {
            console.log("arr", item.Url)
            const url = await storage()
                .ref("/Stories/" + item.Url)
                .getDownloadURL()
            arr.push(url)
        }))
        setArrImg(arr)
    }
    useEffect(() => {

    }, [])

    const Item = ({ item, index }) => (
        <TouchableOpacity onPress={() => onPressItem(item, index)} style={[styles.item]}>
            {
                arrImg ? <Image style={styles.image} source={{ uri: arrImg[index] }} /> : null
            }
            <Text style={styles.text}>{item.Name.vn}</Text>

            <View style={styles.viewView}>
                <Text style={{ textAlign: "center", paddingRight: 5 }} >{item.View ? item.View : 0}</Text>
                <AntDesign name={storyTym && storyTym[index] &&  storyTym[index].tym? "heart" : "hearto"} color="tomato" size={15} />

            </View>
        </TouchableOpacity>
    );

    function onPressItem(item, index) {
        navigation.navigate("Story", {
            story: item,
            index: index,
            UserTym: storyTym[index] && storyTym[index].tym || false
        })
    }
    function _goBack() {
        navigation.navigate("Home")
    }
    const _handleMore = () => console.log('Shown more');

    return (
        <View style={styles.container}>
            <Appbar.Header style={{ backgroundColor: 'transparent', zIndex: 999 }}>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Theme" />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>
            <View >
                <Searchbar
                    theme={{
                        colors: {
                            placeholder: '#000', text: '#000', primary: '#000',
                            underlineColor: 'transparent', background: '#003489'
                        },
                        fonts: {
                            fontSize: 2,
                        }
                    }}
                    style={styles.search}
                    placeholder="Search"
                />
            </View>


            <SafeAreaView >
                <ScrollView >
                    <View style={styles.gallery}>
                        {
                            storyData ?
                                storyData.map((item, index) => <Item item={item} index={index}></Item>)
                                : null
                        }

                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    gallery: {
        marginTop: 10,
        width: widthR,
        flexDirection: "row",
        marginBottom: widthR / 6 + 50,
        flexWrap: "wrap"
    },
    item: {
        borderBottomWidth: 1,
        borderColor: "#eee",
        width: widthR / 2 - 20,
        height: widthR / 2 - 20,
        margin: 10,
        marginTop: 0,
        overflow: "hidden",
        borderRadius: 20
    },
    title: {
        fontSize: 32,
        color: "red"
    },
    image: {
        width: widthR / 2 - 10,
        height: widthR / 2 - 10,
        opacity: .9
    },
    text: {
        textAlign: "center",
        position: "absolute",
        fontWeight: "bold",
        width: "100%",
        bottom: 10,
        color: "#000"
    },
    viewView: {
        position: "absolute",
        right: 20,
        top: 10,
        minWidth: 40,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 4,
        backgroundColor: "#b9c9c1",
        flexDirection: "row"
    },
    flat: {
        width: widthR / 3
    },
    right: {
        marginTop: widthR / 6 + 10
    },
    search: {
        width: widthR - 40,
        borderRadius: 10,
        backgroundColor: "#edf4ff",
        shadowColor: "#eee",
        // height:40,
        margin: 10,
        marginLeft: 20,
        elevation: 0,
        fontSize: 2
    }
});

export default Training;