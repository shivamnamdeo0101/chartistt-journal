import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DownloadComp from './DownloadComp';


const ChartisttHeader = ({ title }) => {

  

  return (
    <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, paddingBottom: 8, paddingTop: 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center", }}>
        <Image source={require("../assets/cclogo.jpg")} style={{ backgroundColor: "#001AFF", marginRight: 10, width: 30, height: 30, borderRadius: 15 }} />
        <Text style={{ color: "#001AFF", fontFamily: "Intro-Semi-Bold", fontSize: 16, }}>{title}</Text>
      </View>


      <View style={{ flexDirection: "row", alignItems: "center", }}>
        <DownloadComp />
      </View>
    </View>
  )
}

export default ChartisttHeader