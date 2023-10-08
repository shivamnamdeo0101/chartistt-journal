import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = () => {
    return (
        <View style={{ margin: 16 }}>
            <Text style={{ color: "#000000" }} >Email</Text>

            <View style={{flexDirection:"row",alignItems:"center", borderWidth: 2, borderColor: "#001AFF", borderRadius: 5,paddingLeft:8,paddingRight:8 }} >
                <MaterialCommunityIcons name={"lock"} color={"#000"} style={{fontSize: 20,}}  />
                <TextInput
                    placeholder='Enter the email'
                    placeholderTextColor="#ccc"
                    style={{flex:1,color: "#000",  }}
                />
                <MaterialCommunityIcons name={"lock"} color={"#000"} style={{fontSize: 20,}}  />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001AFF",

    },
    half: {
        flex: 1,
    },
});
export default CustomInput