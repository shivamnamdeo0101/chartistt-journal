import { View, Text, TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import TradeComp from './TradeComp';
import { useDispatch, useSelector } from 'react-redux';
import { setTradeList } from '../../store/DataSlice';

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