import { createContext, useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, StyleSheet, Text, Button, Pressable, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Loading from "../components/Loading";
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import CustomButton from "../components/CustomButton";
import { TRADE_API } from "../service/TradeService";
import DateTimePicker from '@react-native-community/datetimepicker';
import { setCustomDate, setEndDateRedux, setRangeDateRedux, setStartDateRedux,} from "../store/UserSlice";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const DateModalContext = createContext(false, () => { }, {});

export const DateModalProvider = ({ children }) => {
   

   
      

    const [isOpen, setIsOpen] = useState(false);
    const contextData = [isOpen, setIsOpen];
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()




    const auth = useSelector(state => state?.userAuth)

    const { control, reset, handleSubmit, formState: { errors } } = useForm({});

    const [date, setDate] = useState(new Date());

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  
  
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    
    
   

    const [selectDate, setselectDate] = useState(false)

    const [dateTimestamp, setdateTimestamp] = useState(0)

    const onDateChange = (event, selectedDate) => {
        setselectDate(!selectDate)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        dispatch(setCustomDate(currentDate))
       
    };

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(!showStartDatePicker);
        setStartDate(currentDate);
        dispatch(setStartDateRedux(currentDate))


    };

    const handleEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(!showEndDatePicker);
        setEndDate(currentDate);
        dispatch(setEndDateRedux(currentDate))
       
    };

    // useEffect(() => {
    //  console.log(startDate,endDate,"From Provider")
    // }, [startDate,endDate])
    
    


    


    const onSubmit = async (data) => {
        setloading(true)
       
        
        try {
            if (auth?.defaultRange === "r") {

                console.log(startDate,endDate,"SDED")


                // dispatch(setStartDateRedux(data?.startDate))
                // dispatch(setEndDateRedux(data?.endDate))
                console.log("Form Filter Data",data)
                dispatch(setRangeDateRedux(data))

                setloading(false)

            }else{
                console.log(data,"Date Model")
                dispatch(setCustomDate(data?.date))
                setloading(false)
            }


            cancelForm()
            
        } catch (e) {
            console.log(e)
        }
       
    };



    const cancelForm = () => {
        setIsOpen(!isOpen)
        reset({})

    }


   

    return (
        <DateModalContext.Provider value={contextData}>
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
                    {loading ? <Loading /> :
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <ScrollView>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 16 }}>

                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", paddingLeft: 16 }}>Set Custom Date</Text>


                                    </View>

                                    {auth?.defaultRange === "d" ? <View style={{ marginTop: 16 }}>
                                        <Controller
                                            control={control}
                                            name='date'
                                            defaultValue={date}
                                            rules={{ required: true }}
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
                                        :
                                        <View style={{ marginTop: 16 }}>
                                            <Controller
                                                control={control}
                                                name='startDate'
                                                defaultValue={startDate}
                                                rules={{ required: true }}
                                                render={({ field: { onChange, value } }) => (
                                                    <View>
                                                        {showStartDatePicker &&
                                                            <DateTimePicker
                                                                testID="startDatePicker"
                                                                value={startDate}
                                                                mode='date'
                                                                display='calendar'
                                                                onChange={handleStartDateChange}
                                                            />}

                                                        <TouchableOpacity onPress={() => setShowStartDatePicker(!showStartDatePicker)} style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Start Date</Text>
                                                            <Text style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, padding: 10 }} >
                                                                {startDate.toLocaleDateString()}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            />
                                            {errors.startDate && <Text>This field is required.</Text>}

                                            <Controller
                                                control={control}
                                                name='endDate'
                                                defaultValue={endDate}
                                                rules={{ required: true }}
                                                render={({ field: { onChange, value } }) => (
                                                    <View>
                                                        {showEndDatePicker &&
                                                            <DateTimePicker
                                                                testID="endDatePicker"
                                                                value={endDate}
                                                                mode='date'
                                                                display='calendar'
                                                                onChange={handleEndDateChange}
                                                            />}

                                                        <TouchableOpacity onPress={() => setShowEndDatePicker(!showEndDatePicker)} style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select End Date</Text>
                                                            <Text style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, padding: 10 }} >
                                                                {endDate.toLocaleDateString()}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            />
                                            {errors.endDate && <Text>This field is required.</Text>}
                                        </View>


                                    }




                                </ScrollView>
                                <View style={styles.bgButtonRow}>
                                    <CustomButton
                                        filled={false}
                                        title={"Cancel"}
                                        onPress={() => cancelForm()}
                                    />
                                    <CustomButton
                                        filled={true}
                                        title={"Apply"}
                                        onPress={handleSubmit(onSubmit)}
                                    />
                                </View>

                            </View>
                        </View>
                    }
                </Modal>
            </View >


            {children}

        </DateModalContext.Provider >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#1e294f',
        height: '50%',
        padding: 20,
    },
    bgButtonRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 8, }

});
