import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChartisttHeader from '../../components/ChartisttHeader';
import HomeChildMain from '../../components/HomeChildComp/HomeChildMain';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';

const HomeScreen = ({navigation}) => {

  const user = useSelector((state)=>state?.userAuth?.user)
  const brokerList = useSelector((state)=>state?.data?.userBrokerList)


  const goToAddTrade = ()=>{

    if(brokerList?.length>0){
      navigation.navigate("AddTrade")
    }else{
      Alert.alert("Please add broker then you can add trade")
    }
    
  }
  return (
    <SafeAreaView style={{flex:1}}>
      
      
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={"dark-content"}
          showHideTransition={"fade"}
          hidden={false}
        />
        <ChartisttHeader title={"CHARTISTT JOURNAL"} />

        <HomeChildMain
          TFTR={true}
          AccLists={true}
          Filter={true}
          AllTrades={true}
          OverView={false}
          Stat={false}
          navigation={navigation}
        />




      
      <FAB
        icon={"plus"}
        label='Add Trade'
        animated
        color="#001AFF"
        rippleColor="#ccc"
        mode="elevated"
        backgroundColor="#fff"
        style={{
          position: 'absolute',
          margin: 16,
          bottom:0,
          right:0,
          zIndex:1
        }}
        onPress={() => goToAddTrade()}
      />
        
    </SafeAreaView>
  )
}

export default HomeScreen