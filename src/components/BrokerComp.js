import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBrokerId } from '../store/UserSlice'

const BrokerComp = ({item}) => {
    const dispatch = useDispatch()
    const brokerId = useSelector(state=>state?.userAuth?.brokerId)
    const setBrokerIdFun = (item)=>{
        dispatch(setBrokerId(item?._id))
        Alert.alert("Default Broker Selected")
        
    }
    return (
        <TouchableOpacity onPress={()=>setBrokerIdFun(item)} style={{ backgroundColor: "#070f4a", padding: 16, margin: 10, borderRadius: 10, borderWidth: 2, borderColor: brokerId === item?._id ? "#975bd9" : "#070f4a" }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingBottom: 10 }}>
                <View>
                    <Text style={styles.title}>Broker</Text>
                    <Text style={styles.text}>25k</Text>
                </View>
                <View>
                    <Text style={styles.title}>Deposit</Text>
                    <Text style={styles.text}>25k</Text>
                </View>
                <View>
                    <Text style={styles.title}>Withdraw</Text>
                    <Text style={styles.text}>100</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default BrokerComp


const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: "#f0f3f5",
        fontWeight: "400"

    },
    title: {
        fontSize: 14,
        color: "#717da8",
        fontWeight: "600"
    }

});
