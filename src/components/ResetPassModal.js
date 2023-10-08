import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useForm, Controller } from 'react-hook-form';

import Ionicons from 'react-native-vector-icons/Ionicons';


import Modal from "react-native-modal";

import { useDispatch, useSelector } from 'react-redux';
import CustomButton from './CustomButton';
import LoadingComp from './LoadingComp';
import { USER_API } from '../service/UserService';
import { setUserDetails } from '../store/UserSlice';

function ResetPassModal() {


    const [isModalVisible, setModalVisible] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [newPasswordVisible, setnewPasswordVisible] = useState(true);

    const toggleNewPass = () => {
        setnewPasswordVisible(!newPasswordVisible);
    };

    const [confirmPassVisible, setconfirmPassVisible] = useState(true);

    const toggleconfirmPassVisible = () => {
        setconfirmPassVisible(!confirmPassVisible);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const dispatch = useDispatch()
    const user = useSelector((state) => state?.userAuth?.user)
    const { control, handleSubmit, setError, reset,watch, formState: { errors } } = useForm();
    const [loading, setloading] = useState(false)
  

    const onSubmit = async (data) => {
    
        setloading(true)
        const obj = {
            "userId":user?._id,
            "newPassword":data?.newPassword
        }
        try {
            const res = await USER_API.resetPass(obj, user?.token)
            dispatch(setUserDetails(res))
            if (res) {
                toggleModal()
                reset()
                Alert.alert("Password Changed")
            }
        } catch (e) {

            if (e?.message?.includes("same as previous")) {
                setError('newPassword', {
                    type: 'manual',
                    message: e?.message, // Set the error message from the API response
                });
            } else {
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
            <TouchableOpacity onPress={toggleModal} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <SimpleLineIcons
                        name={"lock-open"}
                        size={20}
                        color="#888"
                        style={{ backgroundColor: "#fff", padding: 10, borderRadius: 99 }}
                    />
                    <Text style={{ fontFamily: "Intro-Semi-Bold", color: "#000", fontSize: 16, marginLeft: 10 }}>Reset Password</Text>
                </View>
                <SimpleLineIcons
                    name={"arrow-right"}
                    size={16}
                    color="#888"

                />
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
                                    <Text style={{ fontSize: 20, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold", }}>RESET PASSWORD</Text>
                                  

                                    <View style={styles.textInputContainer}>
                                        <Text style={styles.textInputLabel}>PREVIOUS/ TEMP PASSWORD</Text>

                                        <View style={styles.textView}>
                                            <MaterialCommunityIcons
                                                name={"lock"}
                                                size={20}
                                                color="#888"
                                                onPress={togglePasswordVisibility}

                                            />
                                            <Controller
                                                name="prevPassword"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Password must be at least 8 characters',
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: 'Password cannot exceed 16 characters',
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <TextInput
                                                        placeholder="Enter your previous / temp password"
                                                        onChangeText={field.onChange}
                                                        value={field.value}
                                                        secureTextEntry={passwordVisible}

                                                        placeholderTextColor={"#ccc"}
                                                        style={styles.textInput}
                                                    />
                                                )}
                                            />
                                            <Ionicons
                                                name={passwordVisible ? 'eye-off' : 'eye'}
                                                size={20}
                                                color="#888"
                                                onPress={togglePasswordVisibility}
                                            />
                                        </View>
                                        {errors.prevPassword && <Text style={styles.errors}>{errors.prevPassword.message}</Text>}


                                    </View>

                                    <View style={styles.textInputContainer}>
                                        <Text style={styles.textInputLabel}>NEW PASSWORD</Text>

                                        <View style={styles.textView}>
                                            <MaterialCommunityIcons
                                                name={"lock"}
                                                size={20}
                                                color="#888"
                                                onPress={toggleconfirmPassVisible}

                                            />
                                            <Controller
                                                control={control}
                                                name="newPassword"
                                                rules={{
                                                    required: 'Please confirm your new password',
                                                }}
                                                render={({ field }) => (
                                                    <TextInput
                                                        placeholder="Enter your new password"
                                                        onChangeText={field.onChange}
                                                        value={field.value}
                                                        secureTextEntry={newPasswordVisible}
                                                        placeholderTextColor={"#ccc"}
                                                        style={styles.textInput}
                                                    />
                                                )}
                                            />


                                            <Ionicons
                                                name={newPasswordVisible ? 'eye-off' : 'eye'}
                                                size={20}
                                                color="#888"
                                                onPress={toggleNewPass}
                                            />
                                        </View>
                                        {errors.newPassword && (
                                            <Text style={styles.errors}>{errors.newPassword.message}</Text>
                                        )}

                                    </View>
                                    <View style={styles.textInputContainer}>
                                        <Text style={styles.textInputLabel}>CONFIRM YOUR NEW PASSWORD</Text>

                                        <View style={styles.textView}>
                                            <MaterialCommunityIcons
                                                name={"lock"}
                                                size={20}
                                                color="#888"
                                                onPress={toggleconfirmPassVisible}

                                            />
                                            <Controller
                                                control={control}
                                                name="confirmNewPassword"
                                                rules={{
                                                    required: 'Please confirm your new password',
                                                    validate: (val) => {
                                                        if (watch('newPassword') != val) {
                                                            console.log(val)
                                                            return "New password and confirm password must be same ";
                                                        }
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <TextInput
                                                        placeholder="Confirm your new password"
                                                        onChangeText={field.onChange}
                                                        value={field.value}
                                                        secureTextEntry={confirmPassVisible}
                                                        placeholderTextColor={"#ccc"}
                                                        style={styles.textInput}
                                                    />
                                                )}
                                            />


                                            <Ionicons
                                                name={confirmPassVisible ? 'eye-off' : 'eye'}
                                                size={20}
                                                color="#888"
                                                onPress={toggleconfirmPassVisible}
                                            />
                                        </View>
                                        {errors.confirmNewPassword && (
                                            <Text style={styles.errors}>{errors.confirmNewPassword.message}</Text>
                                        )}

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

export default ResetPassModal


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