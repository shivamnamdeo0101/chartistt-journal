import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BrokerChildMain = () => {
  return (
    <View style={{backgroundColor:"#fff",padding:10,borderRadius:5,marginBottom:10}}>
        <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",marginBottom:5}}>Total Accumulated Balance</Text>
        <Text style={{fontFamily:"Intro-Bold",color:"#000",fontSize:26,marginBottom:5}}>$149.868</Text>
        <Text style={{fontFamily:"Intro-Semi-Bold",color:"#fff",backgroundColor:"#00BF63",alignSelf:"flex-start",padding:5,marginBottom:5}}>+49,89%</Text>
        <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",marginBottom:5}}>Total Deposit Amount</Text>
        <Text style={{fontFamily:"Intro-Bold",color:"#000",fontSize:18}}>$100.00</Text>

    </View>
  )
}

export default BrokerChildMain