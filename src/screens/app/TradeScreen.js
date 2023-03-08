import { View, Text, TouchableOpacity, Button,ScrollView } from 'react-native'
import React, { useState,useContext ,useEffect} from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TradeContext } from '../../providers/TradeProvider';
import TradeComp from '../../components/TradeComp';
import { BROKER_API } from '../../service/BrokerService';
import { TRADE_API } from '../../service/TradeService';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';

const TradeScreen = ({ navigation }) => {
    const user = useSelector(state=>state?.userAuth?.user)
    const [loading, setloading] = useState(true)
    const [isOpen, setIsOpen] = useContext(TradeContext)
    const [tradeList, settradeList] = useState([])
    useEffect(() => {
        const fetchData = async ()=>{
          const res = await TRADE_API.getAllTrades(user?._id,user?.token)
          if(res?.status === 200){
                settradeList(res?.data?.data)
                setloading(false)
          }
        }
  
        fetchData()
  
      }, [tradeList])
  
      if(loading){
          return(
              <Loading />
          )
      }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (

        <View style={{ flex: 1, backgroundColor: "#1e294f", padding: 10, }}>
        <View style={{ padding: 10, marginTop: 0,paddingTop:0 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>TRADE</Text>
                    <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>LIST</Text>
                </View>
                <TouchableOpacity onPress={() => toggleModal()}>
                    <Ionicons name="add-circle-sharp" color={"#717da8"} size={26} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {
                    tradeList?.map((item, index) => {
                        return (
                            <View key={index}>
                                <TradeComp item={item} />
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    </View>
    )
}

export default TradeScreen