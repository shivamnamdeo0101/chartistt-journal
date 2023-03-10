import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { flushAuthData } from '../../store/UserSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { BrokerContext } from '../../providers/BrokerProvider';
import { TRADE_API } from '../../service/TradeService';
import TradeComp from '../../components/TradeComp';
import DashComp from '../../components/DashComp';
import { BROKER_API } from '../../service/BrokerService';
import { CALC } from '../../utils/Calc';

const HomeScreen = ({ navigation }) => {

  const [isOpen, setIsOpen] = useContext(BrokerContext)

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const user = useSelector(state => state?.userAuth?.user)
  const [loading, setloading] = useState(true)
  const [tradeList, settradeList] = useState([])
  const [brokerList, setbrokerList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await TRADE_API.getAllTrades(user?._id, user?.token)
      if (res?.status === 200) {
        settradeList(res?.data?.data)
      }
    }

    fetchData()

  }, [tradeList])




  useEffect(() => {
    const fetchData = async () => {
      const res = await BROKER_API.getAllBrokers(user?._id, user?.token)
      if (res?.status === 200) {
        setbrokerList(res?.data?.data)
        setloading(false)
      }
    }

    fetchData()

  }, [brokerList])


  const dispatch = useDispatch()
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '1070846552778-6fefn05h8q6q7eeuac0b9agv2b48rrb3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, [])

  
  const getData = ()=>{

    if(tradeList?.length === 0){
      return {
        "pAndL":0,
        "avgP":0 ,
        "avgL": 0,
        "winLoss":0,
        "riskReward": 0 ,
        "tf":0,
        "tr":0
      }
    }

    let pAndL = 0;
    let tf = 0;

    let p = 0,l = 0,pAmt = 0,lAmt = 0;
    tradeList.forEach((item)=>{

      const tempTf = item?.entryPrice * item?.quantity
      tf+=tempTf
      let temp = (item?.exitPrice - item?.entryPrice )*item?.quantity 

      if(item?.action === "sell"){
        temp = temp * (-1)
      }
    

      if(temp < 0){
        l++;
        lAmt+=temp;
      }else{
        p++;
        pAmt+=temp;
      }

      pAndL+=temp
    })

    if(l === 0 ){
      l = 1
    }
    if(lAmt === 0 ){
      l = 1
    }

    
    if(p === 0 ){
      p = 1
    }
    if(pAmt === 0 ){
      pAmt = 1
    }
    
    let avgP = pAmt/p;
    let avgL = lAmt/l;

    if(avgL === 0 ){
      avgL = 1
    }
    if(avgP === 0 ){
      avgP = 1
    }
    
    

    pAndL = parseFloat(pAmt + lAmt).toFixed(2)
    avgP  = parseFloat(avgP).toFixed(2) 
    avgL = parseFloat(avgL).toFixed(2) 
    const winLoss = parseFloat(p/l).toFixed(2) 
    const riskReward = parseFloat(avgP/avgL).toFixed(2) 
    tf = parseFloat(tf).toFixed(2) 
    tr = parseFloat(parseFloat(tf)+parseFloat(pAndL)).toFixed(2) 

    return {
      "pAndL":checkNum(pAndL),
      "avgP":checkNumber(avgP) ,
      "avgL": checkNum(avgL),
      "winLoss":checkNumber(winLoss),
      "riskReward": checkNumber(riskReward) ,
      "tf":checkNumber(tf),
      "tr":checkNumber(tr)
    }
  }

  function checkNum(num) {
    if (!Number.isFinite(num)) {
        
      return num;
    } else {
      return 0;
    }
  }

  function checkNumber(num) {
    if (!Number.isFinite(num)) {

      if(num < 0){
        num = num * (-1)
      }
        
      return num;
    } else {
      return 0;
    }
  }

  



  const overView = [
    {
      "title": "No Of Trades",
      "value": tradeList?.length
    },
    {
      "title": "Net P&L",
      "value": getData()["pAndL"]
    },
    {
      "title": "Avg Profit",
      "value": getData()["avgP"]
    },
    {
      "title": "Avg Loss",
      "value": getData()["avgL"]
    },
    {
      "title": "Risk Reward",
      "value": getData()["riskReward"]
    },
    {
      "title": "Win / Loss Ratio",
      "value": getData()["winLoss"]
    },
    {
      "title": "Rate Of Return",
      "value": "Temp"
    },
    {
      "title": "Total Brokers",
      "value": brokerList?.length
    }

  ]


  return (
    <View style={{ flex: 1, backgroundColor: "#1e294f" }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
        <AntDesign name="apple1" color={"#717da8"} size={26} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>CHARTISTT</Text>
          <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>JOURNAL</Text>
        </View>

        <TouchableOpacity onPress={() => toggleModal()}>
          <Entypo name="download" color={"#717da8"} size={26} />
        </TouchableOpacity>

      </View>


      <View style={{ backgroundColor: "#070f4a", flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 14, margin: 14, borderRadius: 14 }}>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Entypo name="wallet" color={"#717da8"} size={26} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "#fff" }}>Total Fund</Text>
            <Text style={{ color: "#ccc" }}>{getData()["tf"]}</Text>
          </View>
        </View>

        <View style={{ borderRightColor: "#ccc", borderRightWidth: 1, height: 20, width: 3 }}>

        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <FontAwesome5 name="money-check-alt" color={"#717da8"} size={26} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "#fff" }}>Total Return</Text>
            <Text style={{ color: "#ccc" }}>{getData()["tr"]}</Text>
          </View>
        </View>

      </View>


      <View style={{ margin: 10, padding: 10, marginTop: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>OVERVIEW</Text>
            {/* <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>TRADES</Text> */}
          </View>
          {/* <Text style={{ color: "#717da8" }}>View More</Text> */}
        </View>
        <ScrollView>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {
              overView?.map((item, index) => {
                return (
                  <DashComp key={index} item={item} />
                )
              })
            }
          </View>
        </ScrollView>
      </View>



    </View>
  )
}

export default HomeScreen


