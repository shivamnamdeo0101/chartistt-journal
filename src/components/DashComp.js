import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const DashComp = ({item}) => {
  return (
    <View style={{width:"45%",backgroundColor:"#070f4a",margin:5, padding:10,borderRadius:10}}>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.text}>{item?.value}</Text>
    </View>
  )
}

export default DashComp

const styles = StyleSheet.create({
    text:{
      fontSize:14,
      color:"#f0f3f5",
      fontWeight:"400",
      textAlign:"center"
      
    },
    title:{
        textAlign:"center",
      fontSize:14,
      color:"#717da8",
      fontWeight:"600"
    }
   
  });
  