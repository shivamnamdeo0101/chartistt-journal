import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


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


const AddTradeScreen = ({ navigation }) => {

    const user = useSelector((state) => state?.userAuth?.user)

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
    const [action, setaction] = useState("buy")
    const [segment, setsegment] = useState("equity")
    const [tradeType, settradeType] = useState("intraday")
    const [chartTimeFrame, setchartTimeFrame] = useState("1min")
    const [mindSetBeforeTrade, setmindSetBeforeTrade] = useState("angry")
    const [mindSetAfterTrade, setmindSetAfterTrade] = useState("angry")
    const [session, setsession] = useState("morning")
    const [optionType, setoptionType] = useState("call")
    const [broker, setbroker] = useState(data?.userBrokerList?.length > 0 ? userBrokerList[0] : {})

    const data = useSelector((state) => state?.data)
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)

    const [date, setDate] = useState(new Date());
    const [selectDate, setselectDate] = useState(false)
    const [dateTimestamp, setdateTimestamp] = useState(Date.now())

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


    const { control, reset, watch, setValue, validate, setError, getValues, handleSubmit, formState: { errors } } = useForm();


    const onSubmitCall = async (e) => {

        if(date === 0){
            Alert.alert("Please select date")
            return false
        }


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
                 "brokerId": broker?.broker?._id, "date": dateTimestamp,"addOn":Date.now(),"updateOn":Date.now() }
            if (validateFun(trade)) {
                const payload = {
                    "userId": user?._id,
                    "trade": trade
                }

                //console.log(JSON.stringify(payload))
                const res = await TRADE_API.addTrade(payload, user?.token)
                if (res) {
                    toggleModal()
                    reset()
                    dispatch(toggleRefresh(true))
                    setTimeout(() => {
                        dispatch(toggleRefresh(false))
                    }, 2000); // Simulated delay (2 seconds)
                    setloading(false)
                    navigation.goBack()
                    Alert.alert("Trade Added")

                }
            } else {
                setloading(false)
                return
            }
            setloading(false)

        } catch (e) {
            Alert.alert(e?.message)
            setloading(false)

        }

        setloading(false)


    };


    if(loading){
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
                <Text style={{ color: "#001AFF", fontFamily: "Intro-Semi-Bold", fontSize: 20, }}>ADD TRADE</Text>
            </View>


            <View style={{ flexDirection: "column", justifyContent: "space-around", flex: 1, backgroundColor: "#f8f8f8", padding: 10 }}>


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
                                        required: 'Date is required',

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
                                    value={action}
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
                                            value={field.value}
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
                                            value={field.value}
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
                                            value={field.value}
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
                                            value={field.value}
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
                                            value={field.value}
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
                            YOU'RE ADDING THIS ACCOUNT ONLY FOR
                            CALCULATION PURPOSE</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default AddTradeScreen


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