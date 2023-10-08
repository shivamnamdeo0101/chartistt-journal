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
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",width:"100%"}}>
            
           {options?.map((option,index) => (
                <TouchableOpacity key={index} style={{width:"48%", borderWidth:2,borderColor: option?.value === value ? "#001AFF" : "#fff",borderRadius:5, padding:10,backgroundColor: "#fff"}} onPress={() => setViewFalse(option)}>
                    <Text style={{color:"#000",fontWeight:"bold",textAlign:"center"}}>{option.label}</Text>
                </TouchableOpacity>
            ))}
            
           </View>
        </View>
    );
};

export default SelectButton;