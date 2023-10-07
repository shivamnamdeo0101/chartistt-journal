import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const AccListsComp = ({filter,setFilter,navigation}) => {

  const userBrokerList = useSelector((state)=>state?.data?.userBrokerList)
  const allBrokerList = useSelector((state)=>state?.data?.allBrokerList)

  const getImg =(brokerName)=>{
    const broker =   allBrokerList?.find((item)=>item?.label?.includes(brokerName))
    return broker?.iconLink ? broker?.iconLink : "https://ui-avatars.com/api/?name=Others&background=random&color=fff"
  }


  const pressFun = (e)=>{
    setFilter({...filter,"brokerId":e,})
  }

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
        <TouchableOpacity>
          <Text style={{ color: "#000", fontFamily: "Intro-Bold" }}>ACCOUNTS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation?.navigate("Broker")}>
          <Text style={{ color: "#001AFF", fontFamily: "Intro-Bold", textDecorationLine: "underline" }}>VIEW MORE</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 5 }}>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={()=>pressFun(-1)} style={{ marginRight: 5 }}>
              <Image style={{ width: 50, height: 50, borderRadius: 99, borderColor: filter?.brokerId === -1 ? "#001AFF" :"#fff", borderWidth: 2 ,}} source={{ uri: "https://ui-avatars.com/api/?name=All&background=random&color=fff" }} />
              <Text style={{ color: "#888", fontFamily: "Intro-Semi-Bold", textAlign: "center", fontSize: 12 }}>All</Text>
            </TouchableOpacity>
            {
             userBrokerList?.map((item, index) => {
                return (
                  <TouchableOpacity onPress={()=>pressFun(item?.broker?._id)} key={index} style={{ marginRight: 5 }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 99, borderColor: filter?.brokerId === item?.broker?._id ? "#001AFF" :"#fff", borderWidth: 2}} source={{ uri: getImg(item?.broker?.brokerName) }} />
                    <Text style={{ color: "#888", fontFamily: "Intro-Semi-Bold", textAlign: "center", fontSize: 12 }}>{item?.broker?.brokerName?.length > 10 ? item?.broker?.brokerName?.substring(1,10)+".." : item?.broker?.brokerName}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default AccListsComp