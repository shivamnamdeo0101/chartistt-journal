import React ,{useState}from 'react';
import { View, Text, TouchableOpacity,ScrollView } from 'react-native';

const SelectObjInput = ({ defaultValue, value, setValue, options }) => {


    const [view, setview] = useState(false)

    const setViewFalse = (e)=>{
        setValue(e)
        setview(!view)
    }

    return (
        <TouchableOpacity onPress={()=>setview(!view)} >
            <View style={{color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", padding: 14,marginBottom:2}}>
                <Text style={{color:"#fff",fontWeight:"bold",textTransform:"capitalize"}}>{value?.label}</Text>
            </View>
           {view && <View>
            
           {options?.map((option,index) => (
                <TouchableOpacity key={index} style={{padding:10,backgroundColor: "#070f4a"}} onPress={() => setViewFalse(option)}>
                    <Text style={{color:"#fff",fontWeight:"bold",}}>{option.label}</Text>
                </TouchableOpacity>
            ))}
            
           </View>}
        </TouchableOpacity>
    );
};

export default SelectObjInput;
