import { View, Text, RefreshControl, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import TFTRComp from './TFTRComp'
import AccListsComp from './AccListsComp'
import AllTradesComp from './AllTradesComp'
import OverViewComp from './OverViewComp'
import StatComp from './StatComp'
import FilterComp from './FilterComp'
import { TRADE_API } from '../../service/TradeService'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComp from '../LoadingComp'
import { setTradeList, toggleRefresh } from '../../store/DataSlice'
import { flushAuthUser } from '../../store/UserSlice'

const HomeChildMain = ({ TFTR, AccLists, Filter, AllTrades, OverView, Stat, navigation }) => {

  const user = useSelector((state) => state?.userAuth?.user)
  const refresh = useSelector((state) => state?.data?.refresh)
  const tradeList = useSelector((state) => state?.data?.tradeList)
  
  ///Auto Logout
  const loggedTime = useSelector((state)=>state?.userAuth?.loggedTime)
  const currTime = Date.now()
  const logoutUser = ()=>{
    try{
      dispatch(flushAuthUser())
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    
      console.log(currTime - loggedTime)
      if(loggedTime!=null){
          if((Date.now() - loggedTime) > 172800000){
              logoutUser()
              console.log(currTime - loggedTime,"loggout")
          }
      }
  }, [currTime])
  ///Auto Logout
  


  const dispatch = useDispatch()
  const [list, setlist] = useState([])
  const [loading, setloading] = useState(true)
  const [filterObj, setfilterObj] = useState({
    "sortBy": "date",
    "start": 0,
    "end": Date.now() + 85987176,
    "brokerId": -1,
    "userId": user?._id,
    "duration": { "name": "ALL TRADES", "value": "a", "start": 0 },
    "refresh":refresh
  })

 
  const payload = {
    ...filterObj
  }

  useEffect(() => {
    //setloading(true)
    const fetchData = async () => {
      const res = await TRADE_API.getAllTrades(payload, user?.token)
      dispatch(setTradeList(res))
      setloading(false)
    }
    fetchData()
  }, [filterObj,refresh])








  const handleRefresh = () => {
    // Set refreshing to true to show the loading indicator
    dispatch(toggleRefresh(true));

    // Simulate an asynchronous data fetching operation
    setTimeout(() => {
      // After the data fetching is complete, set refreshing to false
      dispatch(toggleRefresh(false))
    }, 2000); // Simulated delay (2 seconds)
  };


  if (loading) {
    return <LoadingComp />
  }

  console.log(tradeList?.length)

  return (

    <View style={{ flex: 1, backgroundColor: "#f0f3f5", padding: 14, paddingTop: 5 }}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
      }>
        {TFTR && <TFTRComp list={tradeList} />}
        {AccLists && <AccListsComp filter={filterObj} setFilter={setfilterObj} navigation={navigation} />}
        {Filter && <FilterComp list={tradeList} filter={filterObj} setFilter={setfilterObj} />}
        {AllTrades && <AllTradesComp list={tradeList} navigation={navigation} />}
        {OverView && <OverViewComp list={tradeList} />}
        {Stat && <StatComp list={tradeList} />}
      </ScrollView>
    </View>
  )
}

export default HomeChildMain