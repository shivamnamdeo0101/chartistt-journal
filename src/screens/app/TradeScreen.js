import { View, Text, TouchableOpacity, Button, ScrollView, Alert, RefreshControl } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TradeContext } from '../../providers/TradeProvider';
import TradeComp from '../../components/TradeComp';
import { BROKER_API } from '../../service/BrokerService';
import { TRADE_API } from '../../service/TradeService';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import FilterComp from '../../components/FilterComp';
import { BrokerContext } from '../../providers/BrokerProvider';
import { setTradeList } from '../../store/DataSlice';
import { setClearRange, setCustomDate, setFilterObj } from '../../store/UserSlice';
import AllBrokerComp from '../../components/AllBrokerComp';

const TradeScreen = ({ navigation }) => {
    const user = useSelector(state => state?.userAuth?.user)
    const auth = useSelector(state => state?.userAuth)
    const data = useSelector(state => state?.data)

    const filter = useSelector(state => state?.filterObj)


    const brokerObj = useSelector(state => state?.userAuth)


    const [loading, setloading] = useState(true)
    const [isOpen, setIsOpen] = useContext(TradeContext)

    const dispatch = useDispatch()


    const [BrokerisOpen, setBrokerIsOpen] = useContext(BrokerContext)

    const [tradeList, settradeList] = useState([])


    const [filterObj, setfilterObj] = useState({
        "userId": auth?.user?._id,
        "filterType": "a",
        "brokerId": "0"
    })


    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setloading(true)

            const res = await TRADE_API.getAllTrades(filterObj, user?.token)
            if (res?.status === 200) {
                dispatch(setTradeList(res?.data?.data))
                setloading(false)
            }
        }

        fetchData()
    }, [filterObj, isOpen])

    useEffect(() => {
        const fetchData = async () => {
            setloading(true)

            const res = await TRADE_API.getAllTrades(filterObj, user?.token)
            if (res?.status === 200) {
                dispatch(setTradeList(res?.data?.data))
                setloading(false)
            }
        }

        fetchData()
    }, [refreshing])



    if (refreshing) {
        return (
            <Loading />
        )
    }
    
    const toggleModal = () => {

        const len = Object.keys(brokerObj?.brokerObj)?.length
        if (( len > 0)) {
            setIsOpen(!isOpen);
           
        }else{
            
            Alert.alert(
                'Message',
                'You need to add one default broker first ...',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate("Broker")
                    }
                ]
            );
            return
        }



        
    };

    

    const RenderTradeList = ({ list }) => {

        return (
            <View>
                {
                    list?.map((item, index) => {
                        return (
                            <View key={index}>
                                <TradeComp item={item} />
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    return (

        <View style={{ flex: 1, backgroundColor: "#1e294f", padding: 10, }}>
            <View style={{ padding: 10, marginTop: 0, paddingTop: 0 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>TRADE</Text>
                        <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>LIST</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleModal()}>
                        <Ionicons name="add-circle-sharp" color={"#717da8"} size={26} />
                    </TouchableOpacity>
                </View>



                <ScrollView

                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}>

                    {/* <TouchableOpacity style={{ marginBottom:10,backgroundColor:"#070f4a",padding:10,borderRadius:10 }} onPress={() => navigation.navigate("Broker")}>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Default Broker (Click To Change)</Text>
                        <Text style={{ color: "#fff", fontWeight: "400" }}>{data?.defaultBrokerObj?.brokerName}</Text>
                    </TouchableOpacity> */}
                    {/* <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 10 }}>Pull down To refresh...</Text>
                        <Ionicons name="refresh-circle-outline" color={"#fff"} size={10} />
                    </View> */} 

                    <AllBrokerComp value={filterObj} setValue={setfilterObj} />

                    <FilterComp value={filterObj} setValue={setfilterObj} />

                    <Text style={{ marginBottom: 10, marginTop: 10, color: "#fff", fontWeight: "bold" }}>Total Trades {data?.tradeList?.length}</Text>

                    <View style={{ marginBottom: 100 }}>
                        <RenderTradeList list={data?.tradeList} />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default TradeScreen