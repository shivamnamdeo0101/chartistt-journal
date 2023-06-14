import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext ,useState,useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BrokerContext } from '../../providers/BrokerProvider';
import TradeComp from '../../components/TradeComp';
import BrokerComp from '../../components/BrokerComp';
import { BROKER_API } from '../../service/BrokerService';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';

const BrokerScreen = ({ navigation }) => {
    const [isOpen, setBrokerModal] = useContext(BrokerContext)
    const user = useSelector(state=>state?.userAuth?.user)
    const [brokerList, setbrokerList] = useState([])
    const [loading, setloading] = useState(true)

    const toggleModal = () => {
        setBrokerModal(!isOpen);
    };

    
    useEffect(() => {
      const fetchData = async ()=>{
        const res = await BROKER_API.getAllBrokers(user?._id,user?.token)
        if(res?.status === 200){
            setbrokerList(res?.data?.data)
            setloading(false)
        }
      }

      fetchData()

    }, [brokerList])

    if(loading){
        return(
            <Loading />
        )
    }

    


    return (
        <View style={{ flex: 1, backgroundColor: "#1e294f", padding: 10, }}>
            <View style={{ padding: 10, marginTop: 0, paddingTop: 0 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>BROKER</Text>
                        <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>LIST</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleModal()}>
                        <Ionicons name="add-circle-sharp" color={"#717da8"} size={26} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{flex:1,marginBottom:100}}>

                   
                        {
                            brokerList?.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <BrokerComp item={item} />
                                    </View>
                                )
                            })
                        }
                         </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default BrokerScreen