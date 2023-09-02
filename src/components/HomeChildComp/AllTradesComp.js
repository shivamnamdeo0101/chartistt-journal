import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import TradeComp from './TradeComp';

const AllTradesComp = ({navigation}) => {
  return (
    <View>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, index) => {
          return (
            <TradeComp item={item} key={index} navigation={navigation}/>
          )
        })
      }
    </View>
  )
}

export default AllTradesComp