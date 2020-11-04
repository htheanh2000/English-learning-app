import React, { useState, useEffect } from 'react';
import {View,Text, StyleSheet,Image,Dimensions } from 'react-native';
import Timeslide from '../../../Timeslide'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const tenten = props => {
    Timeslide.startService()
  return (
    <View style={styles.container}>
        <Image style={{width: screenWidth, height:screenHeight, opacity: .2}}
        source={{
            uri: "https://thongtinz.com/wp-content/uploads/2020/08/hinh-nen-mau-den-41.jpg",
          }}
        ></Image>
        <Text style={{ position:"absolute", color:"white",fontSize:20, fontWeight:"100", lineHeight:30 ,textAlign:"center", margin:30, alignItems:"center", justifyContent:"center"}}>“Chỉ cần biết rằng, khi bạn thực sự muốn thành công, bạn sẽ không bao giờ từ bỏ cho đến khi đạt được nó, dẫu cho tình hình có tệ đến đâu chăng nữa.”</Text>
    </View>
  );
};
export default tenten;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});