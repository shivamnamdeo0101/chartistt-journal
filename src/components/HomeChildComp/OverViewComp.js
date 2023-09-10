import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { getPAndLForAllTrade ,gerRiskRewardForAllTrade, totalDepositAmt} from '../../service/CalcService'

const OverViewComp = ({list}) => {

  const userBrokerList = useSelector(state => state?.data?.userBrokerList)
  const noOfTrades = list?.length;
  const noOfUserBokers = userBrokerList?.length
  const netpAndL = getPAndLForAllTrade(list)
  const riskReward = gerRiskRewardForAllTrade(list)
  const winLoss = getPAndLForAllTrade(list)?.winLoss

  const profitLoss = getPAndLForAllTrade(list)
  const totalFund = parseFloat(totalDepositAmt(userBrokerList)).toFixed(2)
  const totalReturn =parseFloat(parseFloat(profitLoss?.sumOfnetPAndL) + parseFloat(totalFund)).toFixed(2)
  const rateOfReturn = parseFloat(((totalReturn - totalFund)/totalReturn)*100).toFixed(2)

  return (
    <View >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>No. Of Trades</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>{noOfTrades}</Text>
        </View>
        <View style={{ width: "45%", backgroundColor: "#2EAE57", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>NET P & L</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>{netpAndL?.sumOfnetPAndL}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <View style={{ width: "45%", backgroundColor: "#2EAE57", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Avg Profit</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>{netpAndL?.sumOfavgProfit}</Text>
        </View>
        <View style={{ width: "45%", backgroundColor: "#FF1616", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Avg Loss</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>{netpAndL?.sumOfavgLoss}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Risk Reward</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>{riskReward}</Text>
        </View>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Win /Loss Ratio</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>{winLoss}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Rate Of Return</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>{rateOfReturn} %</Text>
        </View>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Total Brokers</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>{noOfUserBokers}</Text>
        </View>
      </View>
    </View>
  )
}

export default OverViewComp