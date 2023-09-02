import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Actionsheet, useDisclose, Box, Center } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

import {Picker} from '@react-native-picker/picker';


import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../CustomButton';
import Modal from "react-native-modal";
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';

function UpdateProfileModal() {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
   

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Replace this with your login logic
        console.log('Login Data:', data);
        Alert.alert('Login Successful');
    };


    return (
        <View>
             <TouchableOpacity onPress={toggleModal} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <SimpleLineIcons
                name={"user"}
                size={20}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",fontSize:18,marginLeft:10}}>Edit Profile</Text>
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
                                    <Text style={{ fontSize: 20, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold", }}>UPDATE PROFILE</Text>
                                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>YOUR NAME</Text>
                        <View style={styles.textView}>
                            <Feather
                                name={"user"}
                                size={20}
                                color="#888"

                            />
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Your Name is required' }}
                                render={({ field }) => (
                                    <TextInput
                                        placeholder="Enter your name"
                                        onChangeText={field.onChange}
                                        value={field.value}
                                        placeholderTextColor={"#ccc"}
                                        style={styles.textInput}
                                    />
                                )}
                            />
                        </View>
                        {errors.name && <Text style={styles.errors}>{errors.name.message}</Text>}
                    </View>

                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>YOUR EMAIL</Text>
                        <View style={styles.textView}>
                            <MaterialCommunityIcons
                                name={"email"}
                                size={20}
                                color="#888"

                            />
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email format',
                                    },
                                }}
                                render={({ field }) => (
                                    <TextInput
                                        placeholder="Enter your email"
                                        onChangeText={field.onChange}
                                        value={field.value}
                                        placeholderTextColor={"#ccc"}
                                        style={styles.textInput}
                                    />
                                )}
                            />
                        </View>
                        {errors.email && <Text style={styles.errors}>{errors.email.message}</Text>}
                    </View>

                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>YOUR CONTACT NUMBER</Text>
                        <View style={styles.textView}>
                            <Feather
                                name={"phone-call"}
                                size={20}
                                color="#888"

                            />
                            <Controller
                                control={control}
                                name="contactNumber"
                                rules={{
                                    required: 'Your Contact Number is required',
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: 'Invalid contact number',
                                    },
                                }}
                                render={({ field }) => (
                                    <TextInput
                                        placeholder="Your Contact Number"
                                        keyboardType="phone-pad"
                                        onChangeText={field.onChange}
                                        placeholderTextColor={"#ccc"}
                                        style={styles.textInput}
                                    />
                                )}
                            />
                        </View>
                        {errors.contactNumber && (
                            <Text style={styles.errors}>{errors.contactNumber.message}</Text>
                        )}
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
                                    <Text style={{ color: "#000", textAlign: "justify", fontSize: 12, fontFamily: "Intro-Bold",width:"90%" }}>
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

export default UpdateProfileModal


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