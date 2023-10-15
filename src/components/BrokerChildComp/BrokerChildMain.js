import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getTotalProfitLossPercentageForAllBroker, totalAccBal, totalDepositAmt } from '../../service/CalcService';

const BrokerChildMain = ({list}) => {


  const totalDeposit = totalDepositAmt(list)
  const totalAcc = parseFloat(totalAccBal(list)).toFixed(2)
  const change = totalAcc - totalDeposit
  const per = (change *100) / totalDeposit
  const totalPAndLPercentage = parseFloat(per).toFixed(2)
  const totalPercentage =list?.length > 0 ?  parseFloat(totalPAndLPercentage).toFixed(2) : 0

  return (
    <View style={{backgroundColor:"#fff",padding:10,borderRadius:5,marginBottom:10}}>
        <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",marginBottom:5}}>Total Accumulated Balance</Text>
        <Text style={{fontFamily:"Intro-Bold",color:"#000",fontSize:26,marginBottom:5}}>{parseFloat(totalAccBal(list)).toFixed(2)}</Text>
        <Text style={{fontFamily:"Intro-Semi-Bold",color:"#fff",backgroundColor:totalPAndLPercentage>=0 ?  "#00BF63" :"#f03",alignSelf:"flex-start",padding:5,marginBottom:5}}>{totalPercentage} %</Text>
        <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",marginBottom:5}}>Total Deposit Amount</Text>
        <Text style={{fontFamily:"Intro-Bold",color:"#000",fontSize:18}}>{totalDeposit}</Text>

    </View>
  )
}

export default BrokerChildMain    