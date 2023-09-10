import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Actionsheet, useDisclose, Box, Center } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Picker } from '@react-native-picker/picker';


import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../CustomButton';
import Modal from "react-native-modal";
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComp from '../LoadingComp';
import { BROKER_API } from '../../service/BrokerService';
import { toggleRefresh } from '../../store/DataSlice';

function AddBrokerModal() {

  
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const dispatch = useDispatch()

    const user = useSelector((state)=>state?.userAuth?.user)
    const refresh = useSelector((state)=>state?.data?.refresh)



    const { control, handleSubmit,setError,reset, formState: { errors } } = useForm();
    const [loading, setloading] = useState(false)
    const onSubmit = async (data) => {

        setloading(true)

        try {
            const payload = {
                "userId":user?._id,
                "updateOn":Date.now(),
                ...data
            }
            const res = await BROKER_API.addBroker(payload,user?.token)
            if(res){
                toggleModal()
                reset()
                dispatch(toggleRefresh(true))
                setTimeout(() => {
                    // After the data fetching is complete, set refreshing to false
                    dispatch(toggleRefresh(false))
                  }, 2000); // Simulated delay (2 seconds)
                Alert.alert("Broker Added")
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
            }else {
                Alert.alert(e?.message)
            }
        }
        setloading(false)
    };


    if (loading) {
        return (
            <LoadingComp />
        )
    }


    return (
        <View>
            <FAB
                icon={"plus"}
                label='Add Broker'
                animated
                color="#001AFF"
                rippleColor="#ccc"
                mode="elevated"
                backgroundColor="#fff"
                style={{
                    position: 'absolute',
                    margin: 16,
                    bottom: 0,
                    right: 0,
                    zIndex: 1
                }}
                onPress={toggleModal}
            />
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
                                    <Text style={{ fontSize: 20, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold", }}>ADD BROKER</Text>
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
                                                        value={field.value}
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
                                    text={"Submit"}
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

export default AddBrokerModal


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