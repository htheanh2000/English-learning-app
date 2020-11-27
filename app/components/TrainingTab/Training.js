import React, { useEffect, useState } from "react";
import { Appbar, Searchbar } from 'react-native-paper';
import { FlatList, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;

const Training = () => {
    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();
    const [leftData, setLeftData] = useState([])
    const [rightData, setRightData] = useState([])
    const [arrImg, setArrImg] = useState([])
    useEffect(() => {
        database()
            .ref('stories')
            .once('value')
            .then(snapshot => {
                const stories = snapshot.val()
                // setStory(stories)
                console.log("story", stories)
                setLeftData(stories)
                setRightData(stories.slice(stories.length / 2))
                getImg(stories)
            });

    }, [])

    const getImg = async (stories) => {
        const arr = []
        await Promise.all(stories.map(async (item) => {
            console.log("arr",item.Url )
            const url = await storage()
                .ref("/Stories/" + item.Url)
                .getDownloadURL()
                arr.push(url)
        }))
        setArrImg(arr)
        
    }

    const Item = ({ item, index }) => (
        <TouchableOpacity onPress={()=> onPressItem(item)} style={[styles.item]}>
            {
                arrImg ?  <Image style={styles.image} source={{uri:arrImg[index]}} /> : null
            }
            <Text style={styles.text}>{item.Name.vn}</Text>
        </TouchableOpacity>
    );

    // const ItemRight = ({ item, index }) => (
    //     <TouchableOpacity onPress={()=> onPressItem(item)} style={[styles.item]}>
    //         {
    //             arrImg ?  <Image style={styles.image} source={{uri:arrImg[1]}} /> : null
    //         }
    //         <Text style={styles.text}>{item.Name.vn}</Text>
    //     </TouchableOpacity>
    // );

    function onPressItem(item) {
        navigation.navigate("Story", {
            story: item
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
                {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
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
                            leftData ?
                            leftData.map((item, index) =><Item item={item} index={index}></Item>)
                                : null
                        }

                        {/* {
                            rightData ?
                            rightData.map((item, index) =><ItemRight item={item} index={index}></ItemRight>)
                                : null
                        } */}

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
        // backgroundColor: "red",
        // marginTop: StatusBar.currentHeight || 0,
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
        // marginVertical: 8,
        // marginHorizontal: 16,
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