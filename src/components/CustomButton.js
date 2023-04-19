import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, title,filled,width }) => {
    return (
        <TouchableOpacity style={{width: width ? width : "45%", backgroundColor: filled? "#0b5cd6" : 'transparent',borderWidth:2, borderColor: filled? "transparent" : '#0b5cd6', padding: 16, borderRadius: 10, margin: 10 }} onPress={onPress}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton