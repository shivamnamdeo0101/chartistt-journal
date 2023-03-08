import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const TradeComp = ({item}) => {
  return (
    <View>
       <View style={{marginBottom:10}}>
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Text style={{backgroundColor:"#070f4a",padding:10,borderTopLeftRadius:10,borderTopRightRadius:10,color:"#fff",fontWeight:"bold"}}>Equity / Stocks</Text>
            <Text style={styles.text}>7 March 2023</Text>
          </View>
          <View style={{backgroundColor:"#070f4a",borderTopLeftRadius:0, borderRadius:10,padding:10}}>
            <View style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between",paddingBottom:10}}>
              <View>
                <Text style={styles.title}>{item?.tradeName}</Text>
              </View>
              <View>
                <Text style={styles.title}>Profit</Text>
                <Text style={styles.text}>25k</Text>
              </View>
              <View>
                <Text style={styles.title}>Risk : Reward</Text>
                <Text style={styles.text}>1:5</Text>
              </View>
            </View>
            <View style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between",borderTopColor:"#ccc",borderTopWidth:.5,paddingTop:10,}}>
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
    text:{
      fontSize:14,
      color:"#f0f3f5",
      fontWeight:"400"
      
    },
    title:{
      fontSize:14,
      color:"#717da8",
      fontWeight:"600"
    }
   
  });
  