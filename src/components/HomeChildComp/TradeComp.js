import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const TradeComp = ({ item,navigation }) => {
    return (
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={()=>navigation.navigate("EditTrade")} >

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                <Text style={{ backgroundColor: "#001AFF", padding: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, color: "#fff", fontFamily: "Intro-Semi-Bold" }}>Zerodha - Equity / Stocks</Text>
                <Text style={{ color: "#888", fontFamily: "Intro-Semi-Bold" }}>7-March-2023</Text>
            </View>
            <LinearGradient colors={item % 2 === 0 ? ['#2eae57', '#005148'] : ['#ff3131', '#8d2e69']} style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                        <View>
                            <Text style={{ fontFamily: "Intro-Semi-Bold", padding: 5, backgroundColor: "#8003" }}>SBIN</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "Intro-Semi-Bold" }}>Profit/Loss</Text>
                            <Text style={{ fontFamily: "Intro-Bold" }}>+25,000</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "Intro-Semi-Bold" }}>Risk/Reward</Text>
                            <Text style={{ fontFamily: "Intro-Bold" }}>1 : 5</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, margin: 5, borderColor: "#cccccc" }}></View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontFamily: "Intro-Semi-Bold" }}>Entry Price</Text>
                            <Text style={{ fontFamily: "Intro-Bold" }}>RS 500</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "Intro-Semi-Bold" }}>Action</Text>
                            <Text style={{ fontFamily: "Intro-Bold" }}>Buy</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "Intro-Semi-Bold" }}>Quantity</Text>
                            <Text style={{ fontFamily: "Intro-Bold" }}>500</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "Intro-Semi-Bold" }}>Exit price</Text>
                            <Text style={{ fontFamily: "Intro-Bold" }}>550</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default TradeComp