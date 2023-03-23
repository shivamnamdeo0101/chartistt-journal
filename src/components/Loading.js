import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#1e294f"}}>
        <View style={{backgroundColor:"#070f4a",padding:40,borderRadius:16}}>
          <ActivityIndicator size="large" color="#975bd9" /> 
          <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",color:"#fff"}}>Loading...</Text>  
        </View>     
    </View>
  )
}

export default Loading