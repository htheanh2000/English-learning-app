import React, { useState } from "react";
import { Appbar, Searchbar } from 'react-native-paper';
import { FlatList, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;

const DATA = [
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97fg3",
        url: "https://source.unsplash.com/random/1",
        title: "First Item",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        url: "https://source.unsplash.com/random/2",
        title: "Second Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        url: "https://source.unsplash.com/random/3",
        title: "Third Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        url: "https://source.unsplash.com/random/4",
        title: "Third Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        url: "https://source.unsplash.com/random/5",
        title: "Third Item",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97fg3",
        url: "https://source.unsplash.com/random/6",
        title: "First Item",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        url: "https://source.unsplash.com/random/7",
        title: "Second Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        url: "https://source.unsplash.com/random/8",
        title: "Third Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        url: "https://source.unsplash.com/random/9",
        title: "Third Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        url: "https://source.unsplash.com/random/",
        title: "Third Item",
    },
];

const leftData = DATA.slice(0, DATA.length / 2)
const rightData = DATA.slice(DATA.length / 2)


const ThemesComponent = () => {
    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();
    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Image style={styles.image} source={{ uri: item.url }} />
            <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
    );

    function onPressItem() {

        navigation.navigate("ThemeDetail")
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
        // navigation.pop()
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

export default ThemesComponent;