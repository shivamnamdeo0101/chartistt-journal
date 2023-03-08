import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#1e294f"}}>
        <ActivityIndicator size="large" color="#975bd9" />      
    </View>
  )
}

export default Loading