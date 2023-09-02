import { View, Text } from 'react-native'
import React from 'react'
import TFTRComp from './TFTRComp'
import AccListsComp from './AccListsComp'
import AllTradesComp from './AllTradesComp'
import OverViewComp from './OverViewComp'
import StatComp from './StatComp'
import FilterComp from './FilterComp'

const HomeChildMain = ({TFTR,AccLists,Filter,AllTrades,OverView,Stat,navigation}) => {
  return (
    <View style={{backgroundColor:"#f0f3f5",padding:14,paddingTop:5}}>
      {TFTR && <TFTRComp />}
      {AccLists && <AccListsComp />}
      {Filter && <FilterComp />}
      {AllTrades && <AllTradesComp navigation={navigation} />}
      {OverView && <OverViewComp />}
      {Stat && <StatComp />}
    </View>
  )
}

export default HomeChildMain