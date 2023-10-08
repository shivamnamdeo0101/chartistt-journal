import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { Button, Actionsheet, useDisclose, Box, Center } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from './CustomButton';
import Modal from "react-native-modal";
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import LoadingComp from './LoadingComp';
import { USER_API } from '../service/UserService';

function ForgotPass() {
    
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const { control, handleSubmit,setError,reset, formState: { errors } } = useForm();
    const [loading, setloading] = useState(false)
    const onSubmit = async (data) => {

        setloading(true)

        try {
            const payload = {
                "email":data?.email
            }
            const res = await USER_API.sendTempPass(payload)
            if(res){
                toggleModal()
                reset()
                setloading(false)
                Alert.alert("Temprary password has been sent to your email")
            }
            

        } catch (e) {
            if (e?.message?.includes("User not found")) {
                setError('email', {
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
            <Text onPress={toggleModal} style={{ color: "#001AFF", textAlign: "right", textDecorationLine: "underline", fontFamily:"Intro-Bold", }}>
                  Forgot Password
            </Text>
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
                                    <View>
                                        <Text style={{ fontSize: 20, color: "#000", marginBottom: 10,fontFamily:"Intro-Bold", }}>FORGOT PASSWORD</Text>
                                        <View style={styles.textInputContainer}>
                                            <Text style={styles.textInputLabel}>Email</Text>
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
                                    </View>
                                    <View>
                                        <CustomButton
                                            text={"Submit"}
                                            filled={true}
                                            onPress={handleSubmit(onSubmit)}
                                        />

                                        <View style={{ flexDirection: "row", alignItems: "flex-start", alignSelf: "center", margin:10,}}>
                                            <Text style={{ color: "#001AFF", marginRight: 10, fontFamily:"Intro-Bold",}}>Note :- </Text>
                                            <Text style={{ color: "#000", textAlign: "justify", fontSize: 12, fontFamily:"Intro-Bold", }}>SUBMIT THIS FORM TO GET TEMPRARY
                                                PASSWORD AND AFTER LOGIN RESET YOUR
                                                PASSWORD</Text>
                                        </View>
                                    </View>
                                </View>
                    </View>
                </Modal>
            </View>

        </View>
    );
}

export default ForgotPass


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
    errors:{ color: 'red',fontFamily:"Intro-Semi-Bold",fontSize:14 },

    textInputContainer: { marginBottom: 10, },
    textInputLabel: { color: "#000", fontFamily:"Intro-Bold"  },
    textInput: { color: "#000", flex: 1,fontFamily:"Intro-Bold" },
    textView: { borderColor: "#f0f3f5", paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }
});