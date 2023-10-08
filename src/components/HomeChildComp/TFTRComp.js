import { View, Text } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { totalDepositAmt,getPAndLForAllTrade } from '../../service/CalcService';

const TFTRComp = ({list}) => {

  const userBrokerList = useSelector((state)=>state?.data?.userBrokerList)

  const totalFund = parseFloat(totalDepositAmt(userBrokerList)).toFixed(2)
  const profitLoss = getPAndLForAllTrade(list)
  const totalReturn =parseFloat(parseFloat(profitLoss?.sumOfnetPAndL) + parseFloat(totalFund)).toFixed(2)

  
  
  return (
    <View colors={['#001aff', '#a97cff']} style={{ backgroundColor: "#001AFF", flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 14, borderRadius: 5 }}>

    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Entypo name="wallet" color={"#fff"}  size={26} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "#fff",fontFamily:"Intro-Bold" }}>Total Fund</Text>
        <Text style={{ color: "#fff" ,fontFamily:"Intro-Semi-Bold"}}>{totalFund}</Text>
      </View>
    </View>

    <View style={{ borderRightColor: "#fff", borderRightWidth: 1, height: 20, width: 3 }}>

    </View>

    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <FontAwesome5 name="money-check-alt" color={"#fff"} size={26} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "#fff",fontFamily:"Intro-Bold" }}>Total Return</Text>
        <Text style={{ color: "#f8f8f8" ,fontFamily:"Intro-Semi-Bold"}}>{totalReturn}</Text>
      </View>
    </View>

  </View>
  )
}

export default TFTRComp