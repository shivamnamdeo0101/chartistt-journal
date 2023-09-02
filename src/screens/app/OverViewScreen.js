import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChartisttHeader from '../../components/ChartisttHeader';
import HomeChildMain from '../../components/HomeChildComp/HomeChildMain';

const OverViewScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={"dark-content"}
          showHideTransition={"fade"}
          hidden={false}
        />
        <ChartisttHeader title={"OVERVIEW"} />

        <HomeChildMain
          TFTR={true}
          AccLists={true}
          Filter={true}
          AllTrades={false}
          OverView={true}
          Stat={true}
        />




      </ScrollView>
    </SafeAreaView>
  )
}


export default OverViewScreen