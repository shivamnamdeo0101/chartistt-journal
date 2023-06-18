import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React ,{useContext}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBrokerId, setBrokerObj } from '../store/UserSlice'
import { BrokerContext } from '../providers/BrokerProvider'
import { setBrokerEdit, setDefaultBrokerObj } from '../store/DataSlice'

const BrokerComp = ({item}) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useContext(BrokerContext)
    const brokerId = useSelector(state=>state?.userAuth?.brokerId)
    const brokerObj = useSelector(state=>state?.userAuth?.brokerObj)

    const setBrokerIdFun = (item)=>{
        
        setIsOpen(!isOpen)
        dispatch(setBrokerEdit(true))
        //Alert.alert("Default Broker Selected")
       // dispatch(setBrokerObj(item))    
        dispatch(setBrokerId(item?._id))
        dispatch(setDefaultBrokerObj(item))
    }
    const makeDeault = (item)=>{
        dispatch(setBrokerObj(item))    
        dispatch(setBrokerId(item?._id))
        dispatch(setDefaultBrokerObj(item))
    }


    return (
        <View  >
            
            
            <TouchableOpacity  style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between" , backgroundColor: "#070f4a", padding: 16, margin: 10,marginBottom:0, borderTopLeftRadius:10,borderTopRightRadius:10, borderWidth: 2, borderColor: brokerObj?._id === item?._id ? "#975bd9" : "#070f4a" }} >
                <View>
                    <Text style={styles.title}>Broker</Text>
                    <Text style={styles.text}>{item?.brokerName}</Text>
                </View>
                <View>
                    <Text style={styles.title}>Deposit</Text>
                    <Text style={styles.text}>{item?.amtDeposit}</Text>
                </View>
                <View>
                    <Text style={styles.title}>Withdraw</Text>
                    <Text style={styles.text}>{item?.amtWithdraw}</Text>
                </View>
            </TouchableOpacity>

            <View  style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between" ,backgroundColor: "#070f4a", padding: 16, margin: 10,marginTop:0,borderBottomLeftRadius:10,borderBottomRightRadius:10 }}>
                <TouchableOpacity onPress={()=>setBrokerIdFun(item)}>
                    <Text style={styles.title}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>makeDeault(item)}>
                    <Text style={styles.title}>Make It Default</Text>
                </TouchableOpacity>
               
            </View>


        </View>
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
