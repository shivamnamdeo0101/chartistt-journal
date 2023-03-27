import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { setDefaultBrokerObj } from '../store/DataSlice'
import { setFilterObj } from '../store/UserSlice'

const AllBrokerComp = ({value,setValue}) => {
    const data = useSelector(state=>state?.data)

    
    const setDeafult = (item)=>{
        setValue({...value,
          "brokerId":item?.id
        })
      }

    return (
        <View style={{margin:5}}>
            <ScrollView horizontal={true}>
            {
                data?.allBrokerList?.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} onPress={()=>setDeafult(item)} style={{ backgroundColor:"transparent",margin:5, alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                            <Image style={{ width:44,height:44,borderRadius:22 ,borderWidth:2,borderColor: value?.brokerId === item?.id ?  "#975bd9" : "transparent"}} source={{uri:item?.iconLink}}/>
                            <Text style={{fontSize:10,color:"#fff"}}>{item?.label?.length > 20 ? item?.label?.substring(0,20) : item?.label}</Text>
                           
                            <View style={{borderRadius:3, width:6,height:6,backgroundColor:value?.brokerId === item?.id ?  "#975bd9" :"transparent"}}>

                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            </ScrollView>
        </View>
    )
}

export default AllBrokerComp