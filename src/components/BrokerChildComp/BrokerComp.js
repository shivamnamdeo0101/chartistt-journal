import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Actionsheet, useDisclose, Box, Center } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


import { Picker } from '@react-native-picker/picker';


import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../CustomButton';
import Modal from "react-native-modal";
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';
import moment from 'moment';
import LoadingComp from '../LoadingComp';
import { useDispatch, useSelector } from 'react-redux';
import { BROKER_API } from '../../service/BrokerService';
import { toggleRefresh } from '../../store/DataSlice';
import { getAccForOneBroker, getProfitOrLossPercentageForOneBroker, profitLossForTradeList } from '../../service/CalcService';

function BrokerComp({ item, index }) {

    const [isModalVisible, setModalVisible] = useState(false);
    const refresh = useSelector((state) => state?.data?.refresh)
    const dispatch = useDispatch()

    const accAmtForOneBroker = getAccForOneBroker(item)
    const pAndL = getProfitOrLossPercentageForOneBroker(item?.broker?.amtDeposit, accAmtForOneBroker)


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const user = useSelector((state) => state?.userAuth?.user)
    const { control, handleSubmit, setError, reset, formState: { errors } } = useForm({ defaultValues: item?.broker });
    const [loading, setloading] = useState(false)
    useEffect(() => {
        if (Object.keys(item?.broker).length > 0) {
            reset(item?.broker);
        } else {
            reset({});
        }
    }, [isModalVisible])
    const onSubmit = async (data) => {

        setloading(true)

        try {
            const payload = {
                "userId": user?._id,
                "broker": {
                    "brokerId": item?.broker?._id,
                    "amtDeposit": data?.amtDeposit,
                    "brokerName": data?.brokerName,
                    "updateOn": Date.now()
                }
            }
            const res = await BROKER_API.updateBroker(payload, user?.token)
            if (res) {
                toggleModal()
                reset()
                setloading(false)
                dispatch(toggleRefresh(true))
                setTimeout(() => {
                    // After the data fetching is complete, set refreshing to false
                    dispatch(toggleRefresh(false))
                }, 2000); // Simulated delay (2 seconds)
                Alert.alert("Broker Updated")
            }


        } catch (e) {
            if (e?.message?.includes("Broker Already Added")) {
                setError('brokerName', {
                    type: 'manual',
                    message: e?.message, // Set the error message from the API response
                });
            } else if (e?.message?.includes("Missing")) {
                setError('brokerName', {
                    type: 'manual',
                    message: e?.message, // Set the error message from the API response
                });
            } else {
                Alert.alert(e?.message)
            }
        }
        setloading(false)
    };


    const handleDelete = () => {
        // Display a confirmation dialog
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this broker ? all trades would be deleted which are added with this broker.',
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
            brokerId: item?.broker?._id
        }
        try {
            setloading(true)
            const res = await BROKER_API.remBroker(payload, user?.token)
                toggleModal()
                reset()
                setloading(false)
                dispatch(toggleRefresh(true))
                setTimeout(() => {
                    // After the data fetching is complete, set refreshing to false
                    dispatch(toggleRefresh(false))
                }, 2000); // Simulated delay (2 seconds)
                Alert.alert("Broker Deleted")
            
        } catch (e) {
            setloading(false)
            console.log(e,"Broker Deleted ")
        }
    }

    if (loading) {
        return (
            <LoadingComp />
        )
    }

    return (
        <View>
            <TouchableOpacity onPress={toggleModal} style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", padding: 10, backgroundColor: "#fff", marginBottom: 10, borderRadius: 5 }}>
                <View style={{alignItems: "center" }}>
                    <Image source={{ uri: "https://ik.imagekit.io/lajz2ta7n/Brokers/Paytm_Money.png" }} style={{ width: 50, height: 50 }} />
                    <Text style={{fontSize:12, color: pAndL >= 0 ? "#00BF63" : "#f03", fontFamily: "Intro-Semi-Bold" }}>{pAndL} % </Text>
                </View>
                <View>
                    <Text style={{ color: "#000", fontFamily: "Intro-Semi-Bold", fontSize: 12 }}>BROKER NAME</Text>
                    <Text style={{ color: "#000", fontFamily: "Intro-Bold", }}>{item?.broker?.brokerName}</Text>

                    <Text style={{ color: "#000", fontFamily: "Intro-Semi-Bold", fontSize: 12, marginTop: 5 }}>DEPOSIT</Text>
                    <Text style={{ color: "#000", fontFamily: "Intro-Bold" }}>{item?.broker?.amtDeposit}</Text>

                    <Text style={{ color: "#000", fontFamily: "Intro-Semi-Bold", fontSize: 12, marginTop: 5 }}>TOTAL TRADES</Text>
                    <Text style={{ color: "#000", fontFamily: "Intro-Bold" }}>{item?.trades?.length}</Text>
                </View>
                <View>
                    <Text style={{ color: "#000", fontFamily: "Intro-Semi-Bold", fontSize: 12 }}>DATE UPDATED</Text>
                    <Text style={{ color: "#000", fontFamily: "Intro-Bold", }}>{moment(item?.broker?.updateOn).fromNow()}</Text>

                    <Text style={{ color: "#000", fontFamily: "Intro-Semi-Bold", fontSize: 12, marginTop: 5 }}>ACCUMULATED</Text>
                    <Text style={{ color: accAmtForOneBroker >= 0 ? "#00BF63" : "#f03", fontFamily: "Intro-Bold" }}>{parseFloat(accAmtForOneBroker).toFixed(2)}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.container}>

                <Modal
                    isVisible={isModalVisible}
                    onSwipeComplete={toggleModal}
                    onBackButtonPress={toggleModal}
                    swipeDirection="down"
                    propagateSwipe
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <View>
                            <View style={styles.swipeIndicator} />
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "space-around", flex: 1 }}>
                            <ScrollView>
                                <View>

                                    <TouchableOpacity onPress={handleDelete} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f003", alignSelf: "flex-start", padding: 4, marginBottom: 5, borderRadius: 5 }}>
                                        <Text style={{ color: "#f03", marginRight: 5, fontFamily: "Intro-Bold" }}>Delete This Broker</Text>
                                        <AntDesign
                                            name={"delete"}
                                            size={12}
                                            color="#f03"

                                        />
                                    </TouchableOpacity>

                                    <Text style={{ fontSize: 20, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold", }}>UPDATE BROKER</Text>
                                    <View style={styles.textInputContainer}>
                                        <Text style={styles.textInputLabel}>BROKER NAME</Text>
                                        <View style={styles.textView}>
                                            <FontAwesome
                                                name={"hashtag"}
                                                size={20}
                                                color="#888"

                                            />
                                            <Controller
                                                name="brokerName"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: 'Broker Name is required',

                                                }}
                                                render={({ field }) => (
                                                    <TextInput
                                                        placeholder="Enter Broker Name"
                                                        onChangeText={field.onChange}
                                                        value={field.value}
                                                        placeholderTextColor={"#ccc"}
                                                        style={styles.textInput}
                                                    />
                                                )}
                                            />
                                        </View>
                                        {errors.brokerName && <Text style={styles.errors}>{errors.brokerName.message}</Text>}
                                    </View>
                                    <View style={styles.textInputContainer}>
                                        <Text style={styles.textInputLabel}>DEPOSIT AMOUNT</Text>
                                        <View style={styles.textView}>
                                            <FontAwesome
                                                name={"rupee"}
                                                size={20}
                                                color="#888"

                                            />
                                            <Controller
                                                name="amtDeposit"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: 'Deposit Amount is required',
                                                    validate: (value) => {
                                                        const numericValue = parseFloat(value);
                                                        if (isNaN(numericValue)) {
                                                            return 'Deposit Amount must be a number';
                                                        }
                                                        if (numericValue < 1) {
                                                            return 'Deposit Amount must be at least 1';
                                                        }
                                                        return true; // Validation passed
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <TextInput

                                                        placeholder="Enter deposit Amount"
                                                        onChangeText={field.onChange}
                                                        value={field.value.toString()}
                                                        placeholderTextColor={"#ccc"}
                                                        style={styles.textInput}
                                                        keyboardType='phone-pad'
                                                    />
                                                )}
                                            />
                                        </View>
                                        {errors.amtDeposit && <Text style={styles.errors}>{errors.amtDeposit.message}</Text>}
                                    </View>
                                </View>
                            </ScrollView>
                            <View>
                                <CustomButton
                                    text={"UPDATE"}
                                    filled={true}
                                    onPress={handleSubmit(onSubmit)}
                                />

                                <View style={{ flexDirection: "row", alignItems: "flex-start", alignSelf: "center", margin: 10, }}>
                                    <Text style={{ color: "#001AFF", marginRight: 10, fontFamily: "Intro-Bold", }}>Note :- </Text>
                                    <Text style={{ color: "#000", textAlign: "justify", fontSize: 12, fontFamily: "Intro-Bold", width: "90%" }}>
                                        YOU'RE ADDING THIS ACCOUNT ONLY FOR
                                        CALCULATION PURPOSE</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    );
}

export default BrokerComp


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
