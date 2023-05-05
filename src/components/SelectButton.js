import React ,{useState}from 'react';
import { View, Text, TouchableOpacity,ScrollView } from 'react-native';

const SelectButton = ({ label, value, setValue, options }) => {


    // const [view, setview] = useState(false)

    const setViewFalse = (e)=>{
        setValue(e.value)
        // setview(!view)
    }


    return (
        <View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
            
           {options?.map((option,index) => (
                <TouchableOpacity key={index} style={{borderWidth:2,borderColor: option?.value === value ? "#975bd9" : "#070f4a", width:"48%",borderRadius:10, padding:14,backgroundColor: "#070f4a"}} onPress={() => setViewFalse(option)}>
                    <Text style={{color:"#fff",fontWeight:"bold",textAlign:"center"}}>{option.label}</Text>
                </TouchableOpacity>
            ))}
            
           </View>
        </View>
    );
};

export default SelectButton;
