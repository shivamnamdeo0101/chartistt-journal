import { View, Text } from 'react-native'
import React from 'react'

const OverViewComp = () => {
  return (
    <View >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>No. Of Trades</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>50</Text>
        </View>
        <View style={{ width: "45%", backgroundColor: "#2EAE57", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>NET P & L</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>50</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <View style={{ width: "45%", backgroundColor: "#2EAE57", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Avg Profit</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>500.00</Text>
        </View>
        <View style={{ width: "45%", backgroundColor: "#FF1616", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Avg Loss</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>500.00</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Risk Reward</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>2.61</Text>
        </View>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Win /Loss Ratio</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>0.00</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Rate Of Return</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>50%</Text>
        </View>
        <View style={{ width: "45%", backgroundColor: "#001AFF", padding: 5, alignItems: "center" }}>
          <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Total Brokers</Text>
          <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>10</Text>
        </View>
      </View>
    </View>
  )
}

export default OverViewComp