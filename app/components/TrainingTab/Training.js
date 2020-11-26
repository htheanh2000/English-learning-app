import React, { useState } from "react";
import { Appbar, Searchbar } from 'react-native-paper';
import { FlatList, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;

const DATA = [
    {
        id: 1,
        url: require('../../assets/Story/Story.jpg'),
        title: "Story",
    },
    {
        id: 2,
        url: require('../../assets/Story/Story.jpg'),
        title: "Story",
    },
    {
        id: 3,
        url: require('../../assets/Story/Story.jpg'),
        title: "Story",
    },
    {
        id: 4,
        url: require('../../assets/Story/Story.jpg'),
        title: "Story",
    },
];

const leftData = DATA.slice(0, DATA.length / 2)
const rightData = DATA.slice(DATA.length / 2)


const Training = () => {
    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();
    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Image style={styles.image} source={item.url} />
            <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
    );

    function onPressItem() {
        navigation.navigate("Story")
    }

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => onPressItem((item.id))}
                style={{ backgroundColor: "transparent" }}
            />
        );
    };

    function _goBack() {
        db.collections.get('blogs').prepareCreate(blog => {
            blog.name = "blogNames[i] || blog.id"
          })
    }

    const _handleSearch = () => {
        <Searchbar
            placeholder="Search"
        //   onChangeText={onChangeSearch}
        //   value={searchQuery}
        />
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
                           fonts :{
                             fontSize:2,
                           }
                     }}
                    style={styles.search}
                    placeholder="Search"
                />
            </View>
          

            <SafeAreaView >
                <ScrollView >
                    <View style={styles.gallery}>
                        <FlatList style={[styles.flat]}
                            data={leftData}
                            key={'#'}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            extraData={selectedId}
                            numColumns={1}
                        />
                        <FlatList style={[styles.flat, styles.right]}
                            data={rightData}
                            key={'#'}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            extraData={selectedId}
                            numColumns={1}
                        />
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
        marginBottom:widthR / 6 + 50
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
        color: "#fff"
    },
    flat: {
        width: widthR / 3
    },
    right: {
        marginTop: widthR / 6 + 10
    },
    search: {
        width: widthR-40,
        borderRadius: 10,
        backgroundColor: "#edf4ff",
        shadowColor: "#eee",
        // height:40,
        margin:10,
        marginLeft:20,
        elevation: 0,
        fontSize: 2
    }
});

export default Training;