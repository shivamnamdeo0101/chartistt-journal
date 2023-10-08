import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({text,onPress,filled}) => {
    return (
           <View style={{marginBottom:10}}>
             <TouchableOpacity style={filled ? { backgroundColor: "#001AFF",borderRadius:5 } : {borderWidth:2,borderColor: "#001AFF",borderRadius:5}} onPress={onPress}>
                <Text style={{padding:14,textAlign:"center",color:!filled ? "#001AFF" :"#fff" ,fontFamily:"Intro-Bold",textTransform:"uppercase"}}>{text}</Text>
            </TouchableOpacity>
           </View>
    )
}

export default CustomButton