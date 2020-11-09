import React, { useState } from "react";
import { Appbar, Searchbar } from 'react-native-paper';
import { FlatList, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
const widthR = Dimensions.get("screen").width;
const heightR = Dimensions.get("screen").height;
import AntDesign from 'react-native-vector-icons/AntDesign';


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
        url: "https://source.unsplash.com/random/10",
        title: "Third Item",
    },
];



const ThemeDetail = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [tym, setTym] =useState(false)

    const navigation = useNavigation();
    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Image style={styles.image} source={{ uri: item.url }} />
            <View style={styles.itemView}>
                <Text style={styles.itemTitle}>Bùi Thị Xuân</Text>
                <Text style={styles.itemContent}>
                    "Con nhà tướng không được khiếp nhược trước quân thù"
                </Text>
            </View>

            <View style={styles.miniHeartIcon}  >
                              <AntDesign name= {tym ? "heart" :"heart" }  color= "tomato" size={20} />
                        </View>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor: "trasparent" }}
            />
        );
    };

    const _goBack = () => {
        navigation.pop()
    }

    const _handleSearch = () => {
        <Searchbar
            placeholder="Search"
        //   onChangeText={onChangeSearch}
        //   value={searchQuery}
        />
    }


    const _handleMore = () => console.log('Shown more');
    const handleSettym =()=> {
        // if(tym) {
        //     setTym(true)
        // }
        // else {
        //     setTym(false)
        // } 
        console.log("tym", tym);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Appbar.Header style={{ backgroundColor: 'transparent', zIndex:9 }}>
                    <Appbar.BackAction onPress={_goBack} />
                    <Appbar.Content title="" />
                    {/* <Appbar.Action icon="heart" onPress={_handleSearch} /> */}
                    <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
                </Appbar.Header>
            </View>
            <View style={styles.shadow}>
                <Image style={styles.backgroundImg} source={{ uri: "https://source.unsplash.com/random/" }}></Image>
                <Text style={styles.backgroundText}>Decoration</Text>
                        <TouchableOpacity style={styles.heartIcon} onPress={()=>setTym(!tym)} >
                              <AntDesign name= {tym ? "heart" :"hearto" }  color= "tomato" size={30} />
                        </TouchableOpacity>
            </View>
            
            <SafeAreaView style={styles.gallery}>
                <ScrollView >
                    <FlatList
                        data={DATA}
                        key={'#'}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff"
    },
    gallery: {
        marginTop:0,
        overflow: "scroll",
        height:300,
    },
    item: {
        width: widthR - 30,
        height: widthR / 3,
        margin: 15,
        marginTop: 0,
        overflow: "hidden",
        flexDirection: "row",
    },
    title: {
        fontSize: 32,
    },
    image: {
        width: widthR / 3,
        height: widthR / 3,
        opacity: .9,
        borderRadius: 20
    },
    text: {
        textAlign: "center",
        position: "absolute",
        fontWeight: "bold",
        width: "100%",
        bottom: 10,
        color: "#fff"
    },
    backgroundImg: {
        width: widthR,
        height: heightR * 1 / 3,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderColor: "black",
        zIndex:1
    },
    shadow: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        backgroundColor: '#0000',
    },
    header: {
        position: "absolute",
        width: widthR
    },
    backgroundText: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 10,
        marginLeft: 30
    },
    heartIcon: {
        position: "absolute",
        right: 50,
        bottom: 70,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 50,
        zIndex:999
    },
    itemView: {
        margin: 20,
        marginTop: 10,
        width: "100%",
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111"
    },
    itemContent: {
        fontSize: 16,
        width: 200,
        height: 80,
    },
    miniHeartIcon: {
        position: "absolute",
        right: 50,
        bottom: 0,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 50,
        zIndex:999
    }
});

export default ThemeDetail;