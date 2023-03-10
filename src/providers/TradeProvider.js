import { createContext, useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, StyleSheet, Text, Button, Pressable, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Loading from "../components/Loading";
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import CustomButton from "../components/CustomButton";
import { TRADE_API } from "../service/TradeService";
import DateTimePicker from '@react-native-community/datetimepicker';
import { setTradeObj } from "../store/UserSlice";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const TradeContext = createContext(false, () => { }, {});

export const TradeProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contextData = [isOpen, setIsOpen];
    const user = useSelector(state => state?.userAuth?.user)
    const brokerId = useSelector(state => state?.userAuth?.brokerId)

    const dispatch = useDispatch()


    const auth = useSelector(state => state?.userAuth)

    const { control, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: auth?.tradeObj });

    useEffect(() => {
        if (Object.keys(auth?.tradeObj).length > 0) {
            reset(auth?.tradeObj);
        } else {
            reset({});
        }

    }, [auth])



    const [date, setDate] = useState(new Date());
    const [selectDate, setselectDate] = useState(false)

    const [dateTimestamp, setdateTimestamp] = useState(0)

    const onDateChange = (event, selectedDate) => {
        setselectDate(!selectDate)
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setdateTimestamp(Math.round(data.getTime() / 1000))
    };


    const onSubmit = async (data) => {

        if (!brokerId) {
            Alert.alert("Please select default broker")
            return
        }


        try {
            const tradePayload = {
                "userId": user?._id,
                "trade": {
                    "brokerId": brokerId,
                    "updateOn": Date.now(),
                    ...data,
                    "date": date
                }
            }
            console.log(tradePayload)
            const addTrade = await TRADE_API.addTrade(tradePayload, user?.token)
            if (addTrade?.status === 200) {
                setIsOpen(!isOpen);
                reset({})
                Alert.alert("Trade Added")
            }
        } catch (e) {
            console.log(e)
        }

    };

    const forUpdate = () => {
        if (Object.keys(auth?.tradeObj).length > 0) {
            return true
        } else {
            return false
        }
    }

    const cancelForm = () => {
        setIsOpen(!isOpen)
        reset({})
        dispatch(setTradeObj({}))
    }

    const deleteTrade = ()=>{
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteFromDB()
                }
            ]
        );
    }

    const deleteFromDB = async () => {
        const payload = {
            userId:user?._id,
            tradeId:auth?.tradeObj?._id
        }
        console.log(payload,"Payload")
        try {
            const res = await TRADE_API.remTrade(payload, user?.token)
            console.log(res,"res")

            if (res?.status === 200) {
                cancelForm()
                Alert.alert("Trade Deleted")
            }
        }catch(e){
            console.log(e)
        }
    }


    return (
        <TradeContext.Provider value={contextData}>
            <View style={{ backgroundColor: "#f03" }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                    onRequestClose={() => {
                        //Alert.alert("Modal has been closed.");
                        cancelForm();
                    }}
                >
                    <View style={{ elevation: 4, flex: 1, marginTop: 100, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#1e294f", padding: 16 }}>
                        <ScrollView>


                            <View style={{ flex: 1 }}>

                                
                                   
                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingRight:16}}>
                                      
                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", paddingLeft: 16 }}>{forUpdate()===true ? "Update Your Trade" : "Add Your Trade"}</Text>
                                        {forUpdate()===true && <TouchableOpacity onPress={()=>deleteTrade()}>
                                            <MaterialCommunityIcons name="delete-empty" color={"#717da8"} size={26} />
                                        </TouchableOpacity>}
                                    
                                    </View>

                                   

                                <View style={{ marginTop: 16 }}>


                                    <Controller
                                        control={control}
                                        name='date'
                                        rules={{ required: true }}
                                        defaultValue={date}
                                        render={({ field: { onChange, value } }) => (
                                            selectDate ?
                                                <DateTimePicker
                                                    
                                                    value={date}
                                                    mode='date'
                                                    display='calendar'
                                                    onChange={onDateChange}
                                                />
                                                :
                                                <TouchableOpacity onPress={() => setselectDate(!selectDate)} style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                                    <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Date</Text>
                                                    <Text style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, padding: 10 }} >
                                                        {date.toLocaleDateString()}
                                                    </Text>
                                                </TouchableOpacity>
                                        )}
                                    />
                                    {errors.date && <Text>This field is required.</Text>}
                                </View>
                                
                                <Controller
                                    control={control}
                                    name="tradeName"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Entry Trade Name</Text>
                                            <TextInput
                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                onChangeText={onChange}
                                                placeholderTextColor={"#ccd3db"}
                                                value={value?.toString()}
                                                placeholder="Entry Trade Name"
                                            />
                                        </View>
                                    )}
                                />
                                {errors.tradeName && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}
             


                                <Controller
                                    control={control}
                                    name="action"
                                    rules={{ required: true }}
                                    
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
                                {errors.action && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                <Controller
                                    control={control}
                                    name="segment"
                                    rules={{ required: true }}
                                    
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
                                {errors.segment && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                <Controller
                                    control={control}
                                    name="tradeType"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Trade Type</Text>
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
                                {errors.tradeType && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                <Controller
                                    control={control}
                                    name="chartTimeFrame"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Chart Time Frame</Text>
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
                                {errors.chartTimeFrame && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}


                                <Controller
                                    control={control}
                                    name="mindSetBeforeTrade"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Mindset Before Trade</Text>
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

                                {errors.mindSetBeforeTrade && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}
                                <Controller
                                    control={control}
                                    name="mindSetAfterTrade"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Mindset After Trade</Text>
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
                                {errors.mindSetAfterTrade && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                <Controller
                                    control={control}
                                    name="session"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Session</Text>
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
                                {errors.session && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}
                                <Controller
                                    control={control}
                                    name="quantity"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Quantity</Text>
                                            <TextInput
                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                onChangeText={onChange}
                                                placeholderTextColor={"#ccd3db"}
                                                value={value?.toString()}
                                                placeholder="Quantity"
                                            />
                                        </View>
                                    )}
                                />
                                {errors.quantity && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}
                                
                                <Controller
                                    control={control}
                                    name="entryPrice"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Entry Price</Text>
                                            <TextInput
                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                onChangeText={onChange}
                                                placeholderTextColor={"#ccd3db"}
                                                value={value?.toString()}
                                                placeholder="Entry Price"
                                            />
                                        </View>
                                    )}
                                />
                                {errors.entryPrice && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                <Controller
                                    control={control}
                                    name="exitPrice"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Exit Price</Text>
                                            <TextInput
                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                onChangeText={onChange}
                                                placeholderTextColor={"#ccd3db"}
                                                value={value?.toString()}
                                                placeholder="Exit Price"
                                            />
                                        </View>
                                    )}
                                />
                                {errors.exitPrice && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                
                                <Controller
                                    control={control}
                                    name="stopLoss"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Stop Loss</Text>
                                            <TextInput
                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                onChangeText={onChange}
                                                placeholderTextColor={"#ccd3db"}
                                                value={value?.toString()}
                                                placeholder="Stop Loss"
                                            />
                                        </View>
                                    )}
                                />
                                {errors.stopLoss && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}
                                <Controller
                                    control={control}
                                    name="targetPoint"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Target Point</Text>
                                            <TextInput
                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                onChangeText={onChange}
                                                placeholderTextColor={"#ccd3db"}
                                                value={value?.toString()}
                                                placeholder="Target Point"
                                            />
                                        </View>
                                    )}
                                />
                                {errors.targetPoint && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}
                                

                                
                                <Controller
                                    control={control}
                                    name="entryNote"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Entry Note</Text>
                                            <TextInput
                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                onChangeText={onChange}
                                                placeholderTextColor={"#ccd3db"}
                                                value={value?.toString()}
                                                placeholder="Entry Note"
                                            />
                                        </View>
                                    )}
                                />
                                {errors.entryNote && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}
                                <Controller
                                    control={control}
                                    name="exitNote"
                                    rules={{ required: true }}
                                    
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 16 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Exit Note</Text>
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
                                {errors.exitNote && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                            </View>

                        </ScrollView>
                        <View style={styles.bgButtonRow}>
                            <CustomButton
                                filled={false}
                                title={"Cancel"}
                                onPress={() => cancelForm()}
                            />
                            <CustomButton
                                filled={true}
                                title={forUpdate() ? "Update" : "Submit"}
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>

                    </View>
                </Modal>
            </View >


            {children}

        </TradeContext.Provider >
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalView: {
        padding: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    bgButtonRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 8, }

});
