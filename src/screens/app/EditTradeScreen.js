import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';


import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import SelectInput from '../../components/SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API } from '../../service/UserService';
import DateTimePicker from '@react-native-community/datetimepicker';
import BrokerSelect from '../../components/BrokerSelect';
import SelectButton from '../../components/SelectButton';
import { TRADE_API } from '../../service/TradeService';
import { toggleRefresh } from '../../store/DataSlice';
import LoadingComp from '../../components/LoadingComp';


const EditTradeScreen = ({ navigation, route }) => {

    const user = useSelector((state) => state?.userAuth?.user)
    const [loading, setloading] = useState(false)
    const data = useSelector((state) => state?.data)
    const dispatch = useDispatch()

    const { item } = route.params;
    const optionTypeList = [

        {
            "label": "Put",
            "value": "put"
        },
        {
            "label": "Call",
            "value": "call"
        }

    ]
    const [isModalVisible, setModalVisible] = useState(false);
    const [action, setaction] = useState(item?.trade?.action)
    const [segment, setsegment] = useState(item?.trade?.segment)
    const [tradeType, settradeType] = useState(item?.trade?.tradeType)
    const [chartTimeFrame, setchartTimeFrame] = useState(item?.trade?.chartTimeFrame)
    const [mindSetBeforeTrade, setmindSetBeforeTrade] = useState(item?.trade?.mindSetBeforeTrade)
    const [mindSetAfterTrade, setmindSetAfterTrade] = useState(item?.trade?.mindSetAfterTrade)
    const [session, setsession] = useState(item?.trade?.session)
    const [optionType, setoptionType] = useState(item?.trade?.optionType)
  
    const b = data?.userBrokerList.find((b)=>b?.broker?._id === item?.broker?._id)

    const [broker, setbroker] = useState(b)


    const [date, setDate] = useState(new Date(item?.trade?.date));
    const [selectDate, setselectDate] = useState(false)
    const [dateTimestamp, setdateTimestamp] = useState(item?.trade?.date)


    const onDateChange = (event, selectedDate) => {
        setselectDate(!selectDate)
        const currentDate = selectedDate || endDate;
        setDate(currentDate);
        setdateTimestamp(Date.parse(currentDate));
    };





    const validateFun = (e) => {

        let entryWatch = parseFloat(e?.entryPrice);
        let targetWatch = parseFloat(e?.targetPoint);
        let stopLossWatch = parseFloat(e?.stopLoss);

        if(!date){
            Alert.alert("Please select date")
            return false
        }

        // console.log(action, "entryPrice", typeof entryWatch, "Target Point", targetWatch, "Stop Loss", stopLossWatch)

        if (action === "buy") {

            if (targetWatch > entryWatch) {
                if (entryWatch > stopLossWatch) {
                    return true
                } else {
                    Alert.alert("Entry price should be greater then Stop Loss")
                    return false
                }
            } else {
                Alert.alert("Target Price should be greater then Entry Price")
                return false
            }


        } else if (action === "sell") {

            if (stopLossWatch > entryWatch) {
                if (entryWatch > targetWatch) {
                    return true
                } else {
                    Alert.alert("Entry Price should be greater then Target Price")
                    return false
                }
            } else {
                Alert.alert("Stop Loss should be greater then Entry Price")
                return false
            }


        }
    }


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const updateTrade = {
        ...item?.trade,
        "action":action,
        "segment":segment,
        "tradeType":tradeType,
        "chartTimeFrame":chartTimeFrame,
        "mindSetBeforeTrade":mindSetBeforeTrade,
        "mindSetAfterTrade":mindSetAfterTrade,
        "session":session, 
    }
    const { control, reset, watch, setValue, validate, setError, getValues, handleSubmit, formState: { errors } } = useForm({ defaultValues: updateTrade});

    useEffect(() => {
        reset(updateTrade);
    }, [])

    const onSubmitCall = async (e) => {
        setloading(true)
        try {
            const trade = { ...e, 
                "action":action,
                "segment":segment,
                "tradeType":tradeType,
                "chartTimeFrame":chartTimeFrame,
                "mindSetBeforeTrade":mindSetBeforeTrade,
                "mindSetAfterTrade":mindSetAfterTrade,
                "session":session, 
                "date":dateTimestamp,
                "brokerId": broker?.broker?._id,  "updateOn": Date.now() }
            if (validateFun(trade)) {
                const payload = {
                    "userId": user?._id,
                    "trade": trade,
                    "tradeId":item?.trade?._id
                }

                console.log(JSON.stringify(payload,2,2))

                const res = await TRADE_API.updateTrade(payload, user?.token)
                if (res) {
                    toggleModal()
                    reset()
                    dispatch(toggleRefresh(true))
                    setTimeout(() => {
                        dispatch(toggleRefresh(false))
                    }, 2000); // Simulated delay (2 seconds)
                    setloading(false)
                    navigation.goBack()
                    Alert.alert("Trade Updated")
                }
                setloading(false)
            } else {
                setloading(false)
                return

            }
            setloading(false)
        } catch (e) {
            setloading(false)
            Alert.alert(e?.message)
        }

        setloading(false)
    };

    const handleDelete = () => {
        // Display a confirmation dialog
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this trade.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteFromDB();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const deleteFromDB = async () => {
        const payload = {
            userId: user?._id,
            brokerId: item?.broker?.brokerId,
            tradeId: item?.trade?._id
        }
        try {
            setloading(true)
            const res = await TRADE_API.remTrade(payload, user?.token)
            toggleModal()
            reset()
            setloading(false)
            dispatch(toggleRefresh(true))
            setTimeout(() => {
                // After the data fetching is complete, set refreshing to false
                dispatch(toggleRefresh(false))
            }, 2000); // Simulated delay (2 seconds)
            navigation.goBack()
            Alert.alert("Trade Deleted")

        } catch (e) {
            setloading(false)
            console.log(e, "Trade Deleted ")
        }
    }

    if (loading) {
        return <LoadingComp />
    }




    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle={"dark-content"}
                showHideTransition={"fade"}
                hidden={false}
            />
            <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, paddingBottom: 8, paddingTop: 8 }}>
                <TouchableOpacity style={{ padding: 5, borderRadius: 99 }}>
                    <SimpleLineIcons
                        name={'arrow-left'}
                        size={20}
                        color="#001AFF"
                        onPress={() => navigation.goBack()}
                    />
                </TouchableOpacity>
                <Text style={{ color: "#001AFF", fontFamily: "Intro-Semi-Bold", fontSize: 20, }}>EDIT TRADE</Text>
            </View>


            <View style={{ flexDirection: "column", justifyContent: "space-around", flex: 1, backgroundColor: "#f8f8f8", padding: 10 }}>
                <TouchableOpacity onPress={handleDelete} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f003", alignSelf: "flex-start", padding: 4, marginBottom: 5, borderRadius: 5 }}>
                    <Text style={{ color: "#f03", marginRight: 5, fontFamily: "Intro-Bold" }}>Delete This Trade</Text>
                    <AntDesign
                        name={"delete"}
                        size={12}
                        color="#f03"

                    />
                </TouchableOpacity>

                <ScrollView>

                    <View>

                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>DATE</Text>
                            <View style={styles.textView}>
                                <Fontisto
                                    name={"date"}
                                    size={20}
                                    color="#888"

                                />
                                <Controller
                                    name="date"
                                    control={control}
                                    defaultValue={date}
                                    rules={{
                                        required:false,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ flex: 1 }}>
                                            {selectDate &&
                                                <DateTimePicker
                                                    value={date}
                                                    mode='date'
                                                    display='calendar'
                                                    onChange={onDateChange}
                                                    maximumDate={new Date()}
                                                />}

                                            <TouchableOpacity onPress={() => setselectDate(!selectDate)} style={{ borderRadius: 10, overflow: 'hidden' }}>
                                                <Text style={{ color: "#ccc", fontFamily: "Intro-Bold", padding: 16, borderRadius: 10, }} >
                                                    {date?.toLocaleDateString()}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                            {errors.date && <Text style={styles.errors}>{errors.date.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>BROKER NAME</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="brokerId"
                                    control={control}
                                    render={({ field }) => (
                                        <BrokerSelect
                                            label="Broker"
                                            options={data?.userBrokerList}
                                            value={broker}
                                            setValue={setbroker}
                                            brokerIdTemp={item?.broker?._id}
                                        />
                                    )}
                                />
                            </View>
                            {errors.brokerId && <Text style={styles.errors}>{errors.brokerId.message}</Text>}
                        </View>



                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>TRADE NAME</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="tradeName"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Trade Name is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Enter Trade Name"
                                            onChangeText={field.onChange}
                                            value={field.value}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
                                        />
                                    )}
                                />
                            </View>
                            {errors.tradeName && <Text style={styles.errors}>{errors.tradeName.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>SELECT ACTION</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="action"
                                    control={control}
                                    defaultValue={action}
                                    rules={{
                                        required: 'Action is required',
                                    }}
                                    render={({ field }) => (
                                        <SelectButton
                                            label={"Action"}
                                            value={action}
                                            setValue={setaction}
                                            options={data?.actionList}
                                        />
                                    )}
                                />
                            </View>
                            {errors.action && <Text style={styles.errors}>{errors.action.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>SELECT SEGMENT TYPE</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="segment"
                                    control={control}
                                    defaultValue={segment}
                                    rules={{
                                        required: 'Segment Type is required',
                                    }}
                                    render={({ field }) => (
                                        <SelectInput
                                            label={"Segment Type"}
                                            value={segment}
                                            setValue={setsegment}
                                            options={data?.segmentList}
                                        />
                                    )}
                                />
                            </View>
                            {errors.segment && <Text style={styles.errors}>{errors.segment.message}</Text>}
                        </View>

                        {
                            segment === "option" &&

                            <View>
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.textInputLabel}>STRIKE PRICE</Text>
                                    <View style={styles.textView}>

                                        <Controller
                                            name="strikePrice"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: segment === 'option' ? 'Stike price is required' : false,
                                            }}
                                            render={({ field }) => (
                                                <TextInput
                                                    placeholder="Enter Strike Price"
                                                    onChangeText={field?.onChange}
                                                    value={field?.value?.toString()}
                                                    placeholderTextColor={"#ccc"}
                                                    style={styles.textInput}
                                                    keyboardType={"number-pad"}
                                                />
                                            )}
                                        />
                                    </View>
                                    {errors.strikePrice && <Text style={styles.errors}>{errors.strikePrice.message}</Text>}
                                </View>
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.textInputLabel}>SELECT OPTION TYPE</Text>
                                    <View style={styles.textView}>

                                        <Controller
                                            name="optionType"
                                            control={control}
                                            defaultValue={optionType}
                                            rules={{
                                                required: segment === 'option' ? 'Option Type is required' : false,
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <View style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 0 }}>
                                                    <SelectButton
                                                        options={optionTypeList}
                                                        value={optionType}
                                                        setValue={setoptionType}
                                                    />
                                                </View>
                                            )}
                                        />
                                    </View>
                                    {errors.optionType && <Text style={styles.errors}>{errors.optionType.message}</Text>}
                                </View>
                            </View>

                        }

                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>SELECT TRADE TYPE</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="tradeType"
                                    control={control}
                                    defaultValue={tradeType}
                                    rules={{
                                        required: 'Trade Type is required',
                                    }}
                                    render={({ field }) => (
                                        <SelectInput
                                            label={"Trade Type"}
                                            options={data?.tradeTypeList}
                                            value={tradeType}
                                            setValue={settradeType}
                                        />
                                    )}
                                />
                            </View>
                            {errors.tradeType && <Text style={styles.errors}>{errors.tradeType.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>SELECT CHART TIME FRAME</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="chartTimeFrame"
                                    control={control}
                                    defaultValue={chartTimeFrame}
                                    rules={{
                                        required: 'Chart Time Frame is required',
                                    }}
                                    render={({ field }) => (
                                        <SelectInput
                                            label={"Chart Time Frame"}
                                            options={data?.chartTimeFrameList}
                                            value={chartTimeFrame}
                                            setValue={setchartTimeFrame}
                                        />
                                    )}
                                />
                            </View>
                            {errors.chartTimeFrame && <Text style={styles.errors}>{errors.chartTimeFrame.message}</Text>}
                        </View>

                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>SELECT MINDSET BEFORE TRADE</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="mindSetBeforeTrade"
                                    control={control}
                                    defaultValue={mindSetBeforeTrade}
                                    rules={{
                                        required: 'Mindset Before Trade is required',
                                    }}
                                    render={({ field }) => (
                                        <SelectInput
                                            label={"Mindset Before Trade"}
                                            options={data?.emotionList}
                                            value={mindSetBeforeTrade}
                                            setValue={setmindSetBeforeTrade}
                                        />
                                    )}
                                />
                            </View>
                            {errors.mindSetBeforeTrade && <Text style={styles.errors}>{errors.mindSetBeforeTrade.message}</Text>}
                        </View>

                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>SELECT MINDSET AFTER TRADE</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="mindSetAfterTrade"
                                    control={control}
                                    defaultValue={mindSetAfterTrade}
                                    rules={{
                                        required: 'Mindset After Trade is required',
                                    }}
                                    render={({ field }) => (
                                        <SelectInput
                                            label={"Mindset Before Trade"}
                                            options={data?.emotionList}
                                            value={mindSetAfterTrade}
                                            setValue={setmindSetAfterTrade}
                                        />
                                    )}
                                />
                            </View>
                            {errors.mindSetAfterTrade && <Text style={styles.errors}>{errors.mindSetAfterTrade.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>SELECT SESSION</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="session"
                                    control={control}
                                    defaultValue={session}
                                    rules={{
                                        required: 'Session Is required',
                                    }}
                                    render={({ field }) => (
                                        <View style={{ flex: 1 }}>
                                            <SelectInput
                                                label={"Session"}
                                                options={data?.sessionList}
                                                value={session}
                                                setValue={setsession}
                                            />
                                        </View>
                                    )}
                                />
                            </View>
                            {errors.session && <Text style={styles.errors}>{errors.session.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>ENTER QUANTITY</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="quantity"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Quantity Is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Select Quantity"
                                            onChangeText={field.onChange}
                                            value={field.value?.toString()}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
                                            keyboardType={"number-pad"}

                                        />
                                    )}
                                />
                            </View>
                            {errors.quantity && <Text style={styles.errors}>{errors.quantity.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>ENTER ENTRY PRICE</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="entryPrice"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Entry Price Is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Enter Entry Price"
                                            onChangeText={field.onChange}
                                            value={field.value?.toString()}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
                                            keyboardType={"number-pad"}

                                        />
                                    )}
                                />
                            </View>
                            {errors.entryPrice && <Text style={styles.errors}>{errors.entryPrice.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>ENTER EXIT PRICE</Text>
                            <View style={styles.textView}>

                                <Controller
                                    name="exitPrice"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Exit Price Is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Enter Entry Price"
                                            onChangeText={field.onChange}
                                            value={field.value?.toString()}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
                                            keyboardType={"number-pad"}

                                        />
                                    )}
                                />
                            </View>
                            {errors.exitPrice && <Text style={styles.errors}>{errors.exitPrice.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>ENTER STOP LOSS</Text>
                            <View style={styles.textView}>
                                <Controller
                                    name="stopLoss"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Stop Loss Is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Enter Stop Loss"
                                            onChangeText={field.onChange}
                                            value={field.value?.toString()}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
                                            keyboardType={"number-pad"}

                                        />
                                    )}
                                />
                            </View>
                            {errors.stopLoss && <Text style={styles.errors}>{errors.stopLoss.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>ENTER TARGET POINT</Text>
                            <View style={styles.textView}>
                                <Controller
                                    name="targetPoint"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Target Point Is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Enter Target Point"
                                            onChangeText={field.onChange}
                                            value={field.value?.toString()}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
                                            keyboardType={"number-pad"}

                                        />
                                    )}
                                />
                            </View>
                            {errors.targetPoint && <Text style={styles.errors}>{errors.targetPoint.message}</Text>}
                        </View>

                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>ENTER ENTRY NOTE</Text>
                            <View style={styles.textView}>
                                <Controller
                                    name="entryNote"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Entry Note Is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Enter Entry Note"
                                            onChangeText={field.onChange}
                                            value={field.value}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
                                        />
                                    )}
                                />
                            </View>
                            {errors.entryNote && <Text style={styles.errors}>{errors.entryNote.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>ENTER EXIT NOTE</Text>
                            <View style={styles.textView}>
                                <Controller
                                    name="exitNote"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Exit Note Is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Enter Exit Note"
                                            onChangeText={field.onChange}
                                            value={field.value}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
                                        />
                                    )}
                                />
                            </View>
                            {errors.exitNote && <Text style={styles.errors}>{errors.exitNote.message}</Text>}
                        </View>


                    </View>
                </ScrollView>
                <View>
                    <CustomButton
                        text={"Submit"}
                        filled={true}
                        onPress={handleSubmit(onSubmitCall)}
                    />

                    <View style={{ flexDirection: "row", alignItems: "flex-start", alignSelf: "center", margin: 10, }}>

                        <Text style={{ color: "#000", textAlign: "justify", fontSize: 12, fontFamily: "Intro-Bold", width: "90%", textAlign: "center" }}>
                            <Text style={{ color: "#001AFF", marginRight: 10, fontFamily: "Intro-Bold", textAlign: "center" }}>Note :- </Text>
                            The trades recorded within this app are for informational and analytical purposes only.</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default EditTradeScreen


const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        flex: 1 / 3,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 300,
    },
    swipeIndicator: {
        width: 60,
        height: 3,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        marginBottom: 10,
    },
    half: {

    },
    errors: { color: 'red', fontFamily: "Intro-Semi-Bold", fontSize: 14 },

    textInputContainer: { marginBottom: 10, },
    textInputLabel: { color: "#000", fontFamily: "Intro-Bold" },
    textInput: { color: "#000", flex: 1, fontFamily: "Intro-Bold" },
    textView: { borderColor: "#f0f3f5", paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }
});