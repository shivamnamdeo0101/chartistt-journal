import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import BrokerChildMain from '../../components/BrokerChildComp/BrokerChildMain'
import ChartisttHeader from '../../components/ChartisttHeader';
import BrokerListComp from '../../components/BrokerChildComp/BrokerListComp';
import AddBrokerModal from '../../components/BrokerChildComp/AddBrokerModal';

const BrokerScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex:1}}>

      <ChartisttHeader title={"BROKERS"} />
      
      <ScrollView>
      <View style={{ backgroundColor: "#f0f3f5", padding: 14, paddingTop: 5 }}>
        <BrokerChildMain />
        <BrokerListComp />
      </View>
      

      </ScrollView>
      <AddBrokerModal />
    </SafeAreaView>
  )
}

export default BrokerScreen