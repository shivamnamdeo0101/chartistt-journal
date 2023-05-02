import { View, Text } from 'react-native'
import React from 'react'
import AddEmailFormComp from '../../components/AddEmailFormComp'

const CompleteProfileScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <AddEmailFormComp navigation={navigation} />
    </View>
  )
}

export default CompleteProfileScreen