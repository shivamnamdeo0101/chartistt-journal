import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React ,{useContext}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBrokerId, setBrokerObj } from '../store/UserSlice'
import { BrokerContext } from '../providers/BrokerProvider'
import { setBrokerEdit, setDefaultBrokerObj } from '../store/DataSlice'
import { BROKER_API } from '../service/BrokerService'

const BrokerComp = ({item}) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useContext(BrokerContext)
    const brokerId = useSelector(state=>state?.userAuth?.brokerId)
    const user = useSelector(state=>state?.userAuth?.user)
    const brokerObj = useSelector(state=>state?.userAuth?.brokerObj)

    const setBrokerIdFun = ()=>{
        dispatch(setBrokerId(item?._id))
        dispatch(setDefaultBrokerObj(item))
        setIsOpen(!isOpen)
        dispatch(setBrokerEdit(true))
        //Alert.alert("Default Broker Selected")
       // dispatch(setBrokerObj(item))    
       
    }
    const makeDeault = (e)=>{
        dispatch(setBrokerObj(e))    
        dispatch(setBrokerId(item?._id))
        dispatch(setDefaultBrokerObj(item))
    }

    const deleteBroker = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure to delete this broker , it will also delete all the trades which belongs to this broker..?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteFromDB()
                }
            ]
        );
    }

    const deleteFromDB = async () => {
        const payload = {
            userId: user?._id,
            brokerId: item?.id
        }

        console.log(payload,"Payload broker delete")
        

        try
         {
            const res = await BROKER_API.remBroker(payload, user?.token)

            if(item?.id === brokerObj?.id){
                dispatch(setBrokerObj({}))    
                dispatch(setBrokerId(""))
                dispatch(setDefaultBrokerObj({}))

            }

            console.log(payload,"Deleted")

            if (res?.status === 200) {
          

                // const res = await BROKER_API.getAllBrokers(user?._id, user?.token)
                // dispatch(setBrokerList(res?.data?.data))
                Alert.alert("Broker Deleted")
            }


        } catch (e) {
            console.log(e)
        }
        
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
                <TouchableOpacity onPress={()=>setBrokerIdFun()}>
                    <Text style={styles.title}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>makeDeault(item)}>
                    <Text style={styles.title}>Make It Default</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteBroker(item)}>
                    <Text style={styles.title}>Delete</Text>
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
