import { View, Text, TextInput, Button,ScrollView } from 'react-native';
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

const AddTradeScreen = ({ route, navigation }) => {

    //const {defaultData} = route?.params;


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };


    return (
        <View style={{ flex: 1, backgroundColor: "#1e294f" }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>ADD YOUR TRADE</Text>
                    <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>HERE...</Text>
                </View>


            </View>

            <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }} >
            <ScrollView>

            
                <View style={{flex:1}}>

                    <View style={{ marginTop: 16 }}>

                        
                        <Controller
                            control={control}
                            name="date"
                            rules={{ required: true }}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>

                                    <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Date</Text>
                                    <TextInput
                                        style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                        placeholderTextColor={"#636b75"}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Date"
                                        keyboardType="numeric"
                                    />

                                </View>
                            )}
                        />
                        {errors.date && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}
                    </View>


                    <Controller
                        control={control}
                        name="tradeName"

                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Enter Trade name</Text>
                                <TextInput
                                    style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                    onChangeText={onChange}
                                    placeholderTextColor={"#636b75"}
                                    value={value}
                                    placeholder="Trade Name"
                                />
                            </View>
                        )}
                    />
                    {errors.tradeName && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}

                    <Controller
                        control={control}
                        name="action"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Action</Text>
                                <Picker
                                    style={{ color: "#ccc", backgroundColor: "#070f4a", }}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="Buy" value="buy" />
                                    <Picker.Item label="Sell" value="sell" />
                                </Picker>
                            </View>
                        )}
                    />
                    {errors.action && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}

                    <Controller
                        control={control}
                        name="segment"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Segment</Text>
                                <Picker
                                    style={{ color: "#ccc", backgroundColor: "#070f4a", }}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="Equity" value="equity" />
                                    <Picker.Item label="Future" value="future" />
                                    <Picker.Item label="Option" value="option" />
                                    <Picker.Item label="Commodity" value="commodity" />
                                    <Picker.Item label="Currency" value="currency" />
                                    <Picker.Item label="Crypto Currency" value="crypto" />
                                </Picker>
                            </View>
                        )}
                    />
                    {errors.segment && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}

                    <Controller
                        control={control}
                        name="tradeType"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Select Trade Type</Text>
                                <Picker
                                    style={{ color: "#ccc", backgroundColor: "#070f4a", }}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="Intraday" value="intraday" />
                                    <Picker.Item label="Positional" value="positional" />
                                    <Picker.Item label="Investment" value="investment" />
                                </Picker>
                            </View>
                        )}
                    />
                    {errors.tradeType && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}

                    <Controller
                        control={control}
                        name="chartTimeFrame"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Select Chart Time Frame</Text>
                                <Picker
                                    style={{ color: "#ccc", backgroundColor: "#070f4a", }}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="1min" value="1min" />
                                    <Picker.Item label="2min" value="2min" />
                                    <Picker.Item label="3min" value="3min" />
                                    <Picker.Item label="5min" value="5min" />
                                    <Picker.Item label="10min" value="10min" />
                                    <Picker.Item label="15min" value="15min" />
                                    <Picker.Item label="30min" value="30min" />
                                    <Picker.Item label="45min" value="45min" />
                                    <Picker.Item label="1hr" value="1hr" />
                                    <Picker.Item label="2hr" value="2hr" />
                                    <Picker.Item label="3hr" value="3hr" />
                                    <Picker.Item label="4hr" value="4hr" />
                                    <Picker.Item label="5hr" value="5hr" />
                                    <Picker.Item label="1week" value="1week" />
                                    <Picker.Item label="1month" value="1month" />
                                </Picker>
                            </View>
                        )}
                    />
                    {errors.chartTimeFrame && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}


                    <Controller
                        control={control}
                        name="mindSetBeforeTrade"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Mindset Before Trade</Text>
                                <Picker
                                    style={{ color: "#ccc", backgroundColor: "#070f4a", }}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="Angry" value="angry" />
                                    <Picker.Item label="Confident" value="confident" />
                                    <Picker.Item label="Excited" value="excited" />
                                    <Picker.Item label="Fear" value="fear" />
                                    <Picker.Item label="Fomo" value="fomo" />
                                    <Picker.Item label="Greedy" value="greedy" />
                                    <Picker.Item label="Happy" value="happy" />
                                    <Picker.Item label="Joyful" value="joyful" />
                                    <Picker.Item label="Lazy" value="lazy" />
                                    <Picker.Item label="Non Confident" value="nonconfident" />
                                    <Picker.Item label="Other" value="other" />
                                    <Picker.Item label="Regret" value="regret" />
                                    <Picker.Item label="Sad" value="sad" />
                                    <Picker.Item label="Sentimental" value="sentimental" />
                                    <Picker.Item label="Sorrow" value="sorrow" />
                                    <Picker.Item label="Confident" value="confident" />
                                    <Picker.Item label="Gut Feeling" value="gutfelling" />
                                   

                                </Picker>
                            </View>
                        )}
                    />
                    
                    {errors.mindSetBeforeTrade && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}
                    <Controller
                        control={control}
                        name="mindSetAfterTrade"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Mindset After Trade</Text>
                                <Picker
                                    style={{ color: "#ccc", backgroundColor: "#070f4a", }}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="Angry" value="angry" />
                                    <Picker.Item label="Confident" value="confident" />
                                    <Picker.Item label="Excited" value="excited" />
                                    <Picker.Item label="Fear" value="fear" />
                                    <Picker.Item label="Fomo" value="fomo" />
                                    <Picker.Item label="Greedy" value="greedy" />
                                    <Picker.Item label="Happy" value="happy" />
                                    <Picker.Item label="Joyful" value="joyful" />
                                    <Picker.Item label="Lazy" value="lazy" />
                                    <Picker.Item label="Non Confident" value="nonconfident" />
                                    <Picker.Item label="Other" value="other" />
                                    <Picker.Item label="Regret" value="regret" />
                                    <Picker.Item label="Sad" value="sad" />
                                    <Picker.Item label="Sentimental" value="sentimental" />
                                    <Picker.Item label="Sorrow" value="sorrow" />
                                    <Picker.Item label="Confident" value="confident" />
                                    <Picker.Item label="Gut Feeling" value="gutfelling" />
                                   

                                </Picker>
                            </View>
                        )}
                    />
                    {errors.mindSetAfterTrade && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}

                    <Controller
                        control={control}
                        name="session"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Select Session</Text>
                                <Picker
                                    style={{ color: "#ccc", backgroundColor: "#070f4a", }}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="Morning" value="morning" />
                                    <Picker.Item label="Mid" value="mid" />
                                    <Picker.Item label="Last" value="investment" />
                                </Picker>
                            </View>
                        )}
                    />
                    {errors.session && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}
                    <Controller
                        control={control}
                        name="quantity"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Quantity</Text>
                                <TextInput
                                    style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                    onChangeText={onChange}
                                    placeholderTextColor={"#ccd3db"}
                                    value={value}
                                    placeholder="Quantity"
                                />
                            </View>
                        )}
                    />
                    {errors.mindSetBeforeTrade && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}
                    <Controller
                        control={control}
                        name="enrtyPrice"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Entry Price</Text>
                                <TextInput
                                    style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                    onChangeText={onChange}
                                    placeholderTextColor={"#ccd3db"}
                                    value={value}
                                    placeholder="Entry Price"
                                />
                            </View>
                        )}
                    />
                    {errors.enrtyPrice && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}

                    <Controller
                        control={control}
                        name="exitPrice"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Exit Price</Text>
                                <TextInput
                                    style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                    onChangeText={onChange}
                                    placeholderTextColor={"#ccd3db"}
                                    value={value}
                                    placeholder="Exit Price"
                                />
                            </View>
                        )}
                    />
                    {errors.exitPrice && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}

                    <Controller
                        control={control}
                        name="entryNote"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Entry Note</Text>
                                <TextInput
                                    style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                    onChangeText={onChange}
                                    placeholderTextColor={"#ccd3db"}
                                    value={value}
                                    placeholder="Entry Note"
                                />
                            </View>
                        )}
                    />
                    {errors.entryNote && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}
                    <Controller
                        control={control}
                        name="exitNote"
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 16 }}>
                                <Text style={{color:"#ccc",paddingLeft:5,marginBottom:5,fontWeight:"bold"}}>Exit Note</Text>
                                <TextInput
                                    style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                    onChangeText={onChange}
                                    placeholderTextColor={"#ccd3db"}
                                    value={value}
                                    placeholder="Exit Note"
                                />
                            </View>
                        )}
                    />
                    {errors.exitNote && <Text style={{paddingLeft:16,color:"#975bd9"}}>This field is required</Text>}

                </View>

                </ScrollView>
                <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
            </View>


        </View>
    )
}

export default AddTradeScreen