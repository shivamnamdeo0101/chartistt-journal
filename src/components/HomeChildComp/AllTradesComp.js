import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import TradeComp from './TradeComp';

const AllTradesComp = ({list,navigation}) => {
  return (
    <View>
      {
        list?.map((item, index) => {
          return (
            <TradeComp item={item} key={index} navigation={navigation}/>
          )
        })
      }
    </View>
  )
}

export default AllTradesComp