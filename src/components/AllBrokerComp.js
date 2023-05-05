import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { setDefaultBrokerObj } from '../store/DataSlice'
import { setFilterObj } from '../store/UserSlice'

const AllBrokerComp = ({ value, setValue }) => {
    const data = useSelector(state => state?.data)
    const dispatch = useDispatch()

    const setDeafult = (item) => {


        dispatch(setDefaultBrokerObj({
            "brokerName": item?.label,
            "id": item?.id
        }))

        setValue({
            ...value,
            "brokerId": item?.id
        })
    }

    return (
        <View style={{ margin: 5 }}>
            <ScrollView horizontal={true}>

                <TouchableOpacity onPress={() => setDeafult({
                    "id": "0",
                    "label": "All",
                    "value": "All",
                    "iconLink": "https://ik.imagekit.io/lajz2ta7n/Brokers/all_im.png"
                })} style={{ backgroundColor: "transparent", margin: 5, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Image style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, backgroundColor: "#ccc", borderColor: value?.brokerId === "0" ? "#975bd9" : "transparent" }} source={{ uri: "https://ik.imagekit.io/lajz2ta7n/Brokers/all_im.png"}} />
                <Text style={{ fontSize: 10, color: "#fff" }}>All</Text>

                <View style={{ borderRadius: 3, width: 6, height: 6, backgroundColor: value?.brokerId === "0" ? "#975bd9" : "transparent" }}>

                </View>
            </TouchableOpacity>
            {
                data?.brokerList?.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => setDeafult(item)} style={{ backgroundColor: "transparent", margin: 5, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                            <Image style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, backgroundColor: "#ccc", borderColor: value?.brokerId === item?.id ? "#975bd9" : "transparent" }} source={{ uri: item?.iconLink === "null" ? "https://ui-avatars.com/api/?uppercase=true&background=random&name="+item?.brokerName : item?.iconLink}} />
                            <Text style={{ fontSize: 10, color: "#fff" }}>{item?.brokerName?.length > 10 ? item?.brokerName?.substring(0, 10) + ".." : item?.brokerName}</Text>

                            <View style={{ borderRadius: 3, width: 6, height: 6, backgroundColor: value?.brokerId === item?.id ? "#975bd9" : "transparent" }}>

                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
        </View >
    )
}

export default AllBrokerComp