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
import SelectInput from "../components/SelectInput";

export const TradeContext = createContext(false, () => { }, {});

export const TradeProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contextData = [isOpen, setIsOpen];
    const user = useSelector(state => state?.userAuth?.user)
    const brokerId = useSelector(state => state?.data?.defaultBrokerObj?.id)
    const defaultBroker = useSelector(state => state?.data?.defaultBrokerObj)
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch()

    const [action, setaction] = useState("buy")
    const [segment, setsegment] = useState("equity")
    const [tradeType, settradeType] = useState("intraday")
    const [chartTimeFrame, setchartTimeFrame] = useState("1 min")
    const [mindSetBeforeTrade, setmindSetBeforeTrade] = useState("Angry")
    const [mindSetAfterTrade, setmindSetAfterTrade] = useState("Angry")
    const [session, setsession] = useState("morning")

    const addDefaultObj = {
        "tradeName": "",
        "action": "buy",
        "segment": "equity",
        "tradeType": "intraday",
        "chartTimeFrame": "1 min",
        "mindSetBeforeTrade": "Angry",
        "mindSetAfterTrade": "Angry",
        "session":"morning"   
     }
    


    
    const data = useSelector(state => state?.data)

    const auth = useSelector(state => state?.userAuth)

    const { control, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: Object.keys(auth?.tradeObj).length > 0 ? auth?.tradeObj : addDefaultObj });

    useEffect(() => {
        if (Object.keys(auth?.tradeObj).length > 0) {
            reset(auth?.tradeObj);
        } else {
            reset(addDefaultObj);
        }
        setloading(false)
    }, [auth?.tradeObj])



    const [date, setDate] = useState(new Date());
    const [selectDate, setselectDate] = useState(false)

    const [dateTimestamp, setdateTimestamp] = useState(0)

    const onDateChange = (event, selectedDate) => {
        setselectDate(!selectDate)
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setdateTimestamp(Math.round(data.getTime() / 1000))
    };



    const selectionData = {
        "action": action,
        "segment": segment,
        "tradeType": tradeType,
        "chartTimeFrame": chartTimeFrame,
        "mindSetBeforeTrade": mindSetBeforeTrade,
        "mindSetAfterTrade":mindSetAfterTrade,
        "session":session,
        
    }


    const onSubmit = async (data) => {
        setloading(true)
        if (!brokerId) {
            Alert.alert("Please select default broker")
            return
        }


        try {

            if (forUpdate()) {
                const tradePayload = {
                    "userId": user?._id,
                    "tradeId": auth?.tradeObj?._id,
                    "trade": { ...data,...selectionData,"updateOn":Date.now(), "date": date }
                }
                await updateTradeFun(tradePayload)
            } else {
                const tradePayload = {
                    "userId": user?._id,
                    "trade": {
                        "brokerId": brokerId,
                        "addOn": Date.now(),
                        ...data,...selectionData,
                        "date": date
                    }
                }
                await addTradeFun(tradePayload)
            }
        } catch (e) {
            console.log(e)
        }
        setloading(false)
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

    const deleteTrade = () => {
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

    const addTradeFun = async (payload) => {
        const res = await TRADE_API.addTrade(payload, user?.token)
        if (res?.status === 200) {
            cancelForm()
            Alert.alert("Trade Added")
        }
    }
    const updateTradeFun = async (payload) => {
        const res = await TRADE_API.updateTrade(payload, user?.token)
        if (res?.status === 200) {
            cancelForm()
            Alert.alert("Trade Updated")
        }
    }

    const deleteFromDB = async () => {
        setloading(true)
        const payload = {
            userId: user?._id,
            tradeId: auth?.tradeObj?._id
        }

        try {
            const res = await TRADE_API.remTrade(payload, user?.token)
            if (res?.status === 200) {
                cancelForm()
                Alert.alert("Trade Deleted")
            }
        } catch (e) {
            console.log(e)
        }
        setloading(false)
    }

    const [selectedValue, setSelectedValue] = useState('buy');

    const handleSelectPress = value => {
        setSelectedValue(value?.value);
    };


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
                    {loading ? <Loading /> : <View style={{ elevation: 4, flex: 1, marginTop: 100, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#1e294f", padding: 16 }}>
                        <ScrollView>


                            <View style={{ flex: 1 }}>



                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 16 }}>

                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", paddingLeft: 16 }}>{forUpdate() === true ? "Update Your Trade" : "Add Your Trade"}</Text>
                                    {forUpdate() === true && <TouchableOpacity onPress={() => deleteTrade()}>
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
                                            <View>
                                                {selectDate &&
                                                    <DateTimePicker

                                                        value={date}
                                                        mode='date'
                                                        display='calendar'
                                                        onChange={onDateChange}
                                                    />}

                                                <TouchableOpacity onPress={() => setselectDate(!selectDate)} style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                                    <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Date</Text>
                                                    <Text style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, padding: 10 }} >
                                                        {date.toLocaleDateString()}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                    {errors.date && <Text>This field is required.</Text>}
                                </View>




                                {errors.tradeName && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}


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
                                    value={action}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Action</Text>
                                            <SelectInput
                                                options={data?.actionList}
                                                label="Select an option"
                                                value={action}
                                                setValue={setaction}
                                            />
                                        </View>
                                    )}
                                />
                                {errors.action && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}


                                {/* <Controller
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
                                                {data?.actionList.map(item => (
                                                    <Picker.Item
                                                        key={item.value}
                                                        label={item.label}
                                                        value={item.value}
                                                    />
                                                ))}
                                            </Picker>
                                        </View>
                                    )}
                                />
                                {errors.action && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>} */}

                                <Controller
                                    control={control}
                                    name="segment"
                                    rules={{ required: true }}

                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Segment</Text>
                                            <SelectInput
                                                options={data?.segmentList}
                                                value={segment}
                                                setValue={setsegment}
                                            />
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
                                            <SelectInput
                                                options={data?.tradeTypeList}
                                                value={tradeType}
                                                setValue={settradeType}
                                            />
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
                                            <SelectInput
                                                options={data?.chartTimeFrameList}
                                                value={chartTimeFrame}
                                                setValue={setchartTimeFrame}
                                            />
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
                                            <SelectInput
                                                options={data?.emotionList}
                                                value={mindSetBeforeTrade}
                                                setValue={setmindSetBeforeTrade}
                                            />
                                        </View>
                                    )}
                                />

                                {errors.mindSetBeforeTrade && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}
                                <Controller
                                    control={control}
                                    name="mindSetAfterTrade"
                                    rules={{ required: true }}
                                    value={mindSetBeforeTrade}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Mindset After Trade</Text>
                                            <SelectInput
                                                options={data?.emotionList}
                                                value={mindSetAfterTrade}
                                                setValue={setmindSetAfterTrade}
                                            />
                                        </View>
                                    )}
                                />
                                {errors.mindSetAfterTrade && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                <Controller
                                    control={control}
                                    name="session"
                                    rules={{ required: true }}
                                    value={session}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Session</Text>
                                            <SelectInput
                                                options={data?.sessionList}
                                                value={session}
                                                setValue={setsession}
                                            />
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
                                                keyboardType="number-pad"
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
                                                keyboardType="number-pad"
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
                                                keyboardType="number-pad"
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
                                                keyboardType="number-pad"
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
                                                keyboardType="number-pad"
                                                placeholder="Target Point"
                                            />
                                        </View>
                                    )}
                                />
                                {errors.targetPoint && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}



                                <Controller
                                    control={control}
                                    name="entryNote"
                                    rules={{ required: false }}

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
                                    rules={{ required: false }}

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

                    </View>}
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
