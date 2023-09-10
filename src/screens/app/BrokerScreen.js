import { View, RefreshControl, Text, StatusBar, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import BrokerChildMain from '../../components/BrokerChildComp/BrokerChildMain'
import ChartisttHeader from '../../components/ChartisttHeader';
import BrokerListComp from '../../components/BrokerChildComp/BrokerListComp';
import AddBrokerModal from '../../components/BrokerChildComp/AddBrokerModal';
import { USER_API } from '../../service/UserService';
import LoadingComp from '../../components/LoadingComp';
import { useDispatch, useSelector } from 'react-redux';
import { BROKER_API } from '../../service/BrokerService';
import { setUserBrokerList, toggleRefresh } from '../../store/DataSlice';

const BrokerScreen = ({ navigation }) => {

  const user = useSelector(state => state?.userAuth?.user)
  const userBrokerList = useSelector(state => state?.data?.userBrokerList)

  const [list, setlist] = useState([])
  const [loading, setloading] = useState(true)
  const refresh = useSelector((state) => state?.data?.refresh)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const res = await BROKER_API.getAllBrokers(user?._id, user?.token)
      if (res) {
        dispatch(setUserBrokerList(res))
        setloading(false)
      }
    }

    fetchData()
    
  }, [refresh])


  if (loading) {
    return (
      <LoadingComp />
    )
  }

  const handleRefresh = () => {
    // Set refreshing to true to show the loading indicator
    dispatch(toggleRefresh(true));

    // Simulate an asynchronous data fetching operation
    setTimeout(() => {
      // After the data fetching is complete, set refreshing to false
      dispatch(toggleRefresh(false))
    }, 2000); // Simulated delay (2 seconds)
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ChartisttHeader title={"BROKERS"} />

      <ScrollView style={{ flex: 1 }} refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
      }>
        <View style={{ backgroundColor: "#f0f3f5", padding: 14, paddingTop: 5 }}>
          <BrokerChildMain list={userBrokerList} />
          <BrokerListComp list={userBrokerList} />
        </View>


      </ScrollView>
      <AddBrokerModal />
    </SafeAreaView>
  )
}

export default BrokerScreen