import { View, Text,RefreshControl, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
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

const HomeChildMain = ({TFTR,AccLists,Filter,AllTrades,OverView,Stat,navigation}) => {

  const user = useSelector((state)=>state?.userAuth?.user)
  const refresh = useSelector((state)=>state?.data?.refresh)
  const tradeList = useSelector((state)=>state?.data?.tradeList)

  const dispatch = useDispatch()
  const [list, setlist] = useState([])
  const [loading, setloading] = useState(true)
  const [filterObj, setfilterObj] = useState({
    "sortBy":"date",
    "start":0,
    "end":Date.now(),
    "brokerId":-1,
    "refresh":refresh,
     "userId":user?._id,
  })

  const payload = {
    ...filterObj
  }

  console.log(filterObj,"filterObj")

  useEffect(() => {
    //setloading(true)
    const fetchData = async ()=>{
      const res = await TRADE_API.getAllTrades(payload,user?.token)
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


  if(loading){
    return <LoadingComp />
  }
  
  

  return (

    <View style={{flex:1,backgroundColor:"#f0f3f5",padding:14,paddingTop:5}}>
      <ScrollView  refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
      }>
      {TFTR && <TFTRComp list={tradeList}/>}
      {AccLists && <AccListsComp filter={filterObj} setFilter={setfilterObj} navigation={navigation}/>}
      {Filter && <FilterComp list={tradeList} filter={filterObj} setFilter={setfilterObj}/>}
      {AllTrades && <AllTradesComp list={tradeList} navigation={navigation} />}
      {OverView && <OverViewComp list={tradeList}/>}
      {Stat && <StatComp />}
      </ScrollView>
    </View>
  )
}

export default HomeChildMain