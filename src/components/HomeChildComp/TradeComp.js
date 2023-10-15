import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { profitOrLossForOneTrade, riskRewardForOneTrade } from '../../service/CalcService';

const TradeComp = ({ item,navigation }) => {

    const ProfitOrLoss = () => {

        const amt = profitOrLossForOneTrade(item?.trade);

        if (amt < 0) {
          return (
            <View >
              <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Loss</Text>
              <Text style={{ fontFamily: "Intro-Bold" ,color: "#fff" }}>{amt}</Text>
            </View>
          )
        } else {
          return (
            <View >
              <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#fff" }}>Profit</Text>
              <Text style={{ fontFamily: "Intro-Bold", color: "#fff" }}>+{amt}</Text>
            </View>
          )
        }
    }
    

    return (
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={()=>navigation.navigate("EditTrade",{"item":item})} >

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                <Text style={{ backgroundColor: "#001AFF", padding: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, color: "#fff", fontFamily: "Intro-Semi-Bold",textTransform:"capitalize" }}>{item?.broker?.brokerName} - {item?.trade?.segment} / {item?.trade?.tradeType}</Text>
                <Text style={{ color: "#888", fontFamily: "Intro-Semi-Bold",fontSize:10 }}>Update On {moment(item?.trade?.updateOn).fromNow()}</Text>
            </View>
            <LinearGradient colors={profitOrLossForOneTrade(item?.trade) < 0 ?['#faa5be', '#8d2e69'] : ['#43b5a2', '#005148'] } style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                        <View>
                            <Text style={{ fontFamily: "Intro-Semi-Bold", padding: 5, backgroundColor: "#8003" ,color:"#fff"}}>{item?.trade?.tradeName?.length > 10 ? item?.trade?.tradeName?.substring(0,10)+"..." : item?.trade?.tradeName}</Text>
                        </View>
                        <ProfitOrLoss />
                        <View>
                            <Text style={styles.heading}>Risk/Reward</Text>
                            <Text style={styles.text}>{riskRewardForOneTrade()}</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, margin: 5, borderColor: "#cccccc" }}></View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View>
                            <Text style={styles.heading}>Entry Price</Text>
                            <Text style={styles.text}>RS {item?.trade?.entryPrice}</Text>
                        </View>
                        <View>
                            <Text style={styles.heading}>Action</Text>
                            <Text style={{color:"#fff", fontFamily: "Intro-Bold",textTransform:"capitalize" }}>{item?.trade?.action}</Text>
                        </View>
                        <View>
                            <Text style={styles.heading}>Quantity</Text>
                            <Text style={styles.text}>{item?.trade?.quantity}</Text>
                        </View>
                        <View>
                            <Text style={styles.heading}>Exit price</Text>
                            <Text style={styles.text}>{item?.trade?.exitPrice}</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default TradeComp

const styles = StyleSheet.create({
    heading:{ fontFamily: "Intro-Semi-Bold",color:"#fff" },
    text:{ fontFamily: "Intro-Bold",color:"#fff" }
});