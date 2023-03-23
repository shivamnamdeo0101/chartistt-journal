import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

const TradeForm = ({ defaultData }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: defaultData });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (

        <View style={{flex:1,flexDirection:"column",justifyContent:"space-between"}} >

        <View>
            <View style={{width:100,height:2,backgroundColor:"#070f4a",alignSelf:"center"}}>

            </View>
            <View style={{marginBottom:10,marginTop:16}}>
                <Controller
                    control={control}
                    name="date"
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={{ color: "#ccc", marginLeft: 10,borderRadius:10, backgroundColor: "#070f4a", paddingLeft: 10 }}
                            placeholderTextColor={"#ccc"}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Date"
                            keyboardType="numeric"
                        />
                    )}
                />
                {errors.date && <Text>This field is required</Text>}
            </View>


            <Controller
                control={control}
                name="tradeName"

                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={{ color: "#ccc", marginLeft: 10,borderRadius:10, backgroundColor: "#070f4a", paddingLeft: 10 }}
                        onChangeText={onChange}
                        placeholderTextColor={"#ccc"}
                        value={value}
                        placeholder="Trade Name"
                    />
                )}
            />
            {errors.tradeName && <Text>This field is required</Text>}

            <Controller
                control={control}
                name="action"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <Picker
                        style={{ color: "#ccc" }}
                        selectedValue={value}
                        onValueChange={onChange}
                    >
                        <Picker.Item label="Buy" value="buy" />
                        <Picker.Item label="Sell" value="sell" />
                    </Picker>
                )}
            />
            {errors.action && <Text>This field is required</Text>}

            <Controller
                control={control}
                name="segment"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <Picker
                        style={{ color: "#ccc" }}
                        selectedValue={value}
                        onValueChange={onChange}
                    >
                        <Picker.Item label="Equity" value="equity" />
                        <Picker.Item label="Commodity" value="commodity" />
                        <Picker.Item label="Currency" value="currency" />
                    </Picker>
                )}
            />
            {errors.segment && <Text>This field is required</Text>}

            <Controller
                control={control}
                name="tradeType"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <Picker
                        style={{ color: "#ccc" }}
                        selectedValue={value}
                        onValueChange={onChange}
                    >
                        <Picker.Item label="Intraday" value="intraday" />
                        <Picker.Item label="Delivery" value="delivery" />
                    </Picker>
                )}
            />
            {errors.tradeType && <Text>This field is required</Text>}

            <Controller
                control={control}
                name="chartTimeFrame"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <Picker
                        selectedValue={value}
                        style={{ color: "#ccc" }}
                        onValueChange={onChange}
                    >
                        <Picker.Item label="1 min" value="1min" />
                        <Picker.Item label="5 min" value="5min" />
                        <Picker.Item label="15 min" value="15min" />
                    </Picker>
                )}
            />
            {errors.chartTimeFrame && <Text>This field is required</Text>}

        </View>
            <Button  title="Submit"  />
        </View>

    )

}

export default TradeForm;