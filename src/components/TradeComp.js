import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import moment from 'moment';


const TradeComp = ({ item }) => {


  const ProfitOrLoss =  () => {
    let amt = (item?.exitPrice - item?.entryPrice) * item?.quantity;

    if(item?.action === "sell"){
      amt = amt * (-1)
    }
    

    if (amt < 0) {
      return (
        <View>
          <Text style={{...styles.title,color:"red"}}>Loss</Text>
          <Text style={{...styles.text,color:"red"}}>{amt}</Text>
        </View>
      )
    }else{
      return (
        <View>
          <Text style={{...styles.title,color:"green"}}>Profit</Text>
          <Text style={{...styles.text,color:"green"}}>+{amt}</Text>
        </View>
      )
    }


  }

  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ backgroundColor: "#070f4a", padding: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, color: "#fff", fontWeight: "bold",textTransform:"capitalize" }}>{item?.segment} / {item?.tradeType}</Text>
          <Text style={styles.text}>{moment(item?.addOn).fromNow()}</Text>
        </View>
        <View style={{ backgroundColor: "#070f4a", borderTopLeftRadius: 0, borderRadius: 10, padding: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingBottom: 10 }}>
            <View>
              <Text style={styles.title}>{item?.tradeName}</Text>
            </View>
           <ProfitOrLoss />
            <View>
              <Text style={styles.title}>Risk : Reward</Text>
              <Text style={styles.text}>1:5</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", borderTopColor: "#ccc", borderTopWidth: .5, paddingTop: 10, }}>
            <View>
              <Text style={styles.title}>Entry Price</Text>
              <Text style={styles.text}>{item?.entryPrice}</Text>
            </View>
            <View>
              <Text style={styles.title}>Action</Text>
              <Text style={styles.text}>{item?.action}</Text>
            </View>
            <View>
              <Text style={styles.title}>Quantity</Text>
              <Text style={styles.text}>{item?.quantity}</Text>
            </View>
            <View>
              <Text style={styles.title}>Exit Price</Text>
              <Text style={styles.text}>{item?.exitPrice}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default TradeComp


const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#f0f3f5",
    fontWeight: "400",
    textTransform:"capitalize"

  },
  title: {
    fontSize: 14,
    color: "#717da8",
    fontWeight: "600",
    textTransform:"capitalize"
  }

});
