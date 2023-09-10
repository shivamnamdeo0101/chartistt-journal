import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../CustomButton';
import Modal from "react-native-modal";
import LoadingComp from '../LoadingComp';
import { USER_API } from '../../service/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../store/UserSlice';

function UpdateProfileModal() {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
   
    const dispatch = useDispatch()
    const user = useSelector((state)=>state?.userAuth?.user)
    const { control, handleSubmit,setError,reset, formState: { errors } } = useForm({ defaultValues: {   
        "userId":user?._id,
        "fullName":user?.fullName,
        "email":user?.fullName,
        "contact":user?.contact
    } });
    const [loading, setloading] = useState(false)
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            reset(user);
        } else {
            reset({});
        }
    }, [isModalVisible])

    const objectsHaveSameFields = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

    const onSubmit = async (data) => {
        // Replace this with your login logic
       
        const obj1 = {
            "userId":user?._id,
            "fullName": data?.fullName,
            "email": data?.email,
            "contact": data?.contact,
        }
        // const obj2 = {
        //     "userId":user?._id,
        //     "fullName": user?.fullName,
        //     "email": user?.email,
        //     "contact": user?.contact,
        // }

        setloading(true)

        try {
            const res = await USER_API.userUpdate(obj1,user?.token)
            dispatch(setUserDetails(res))
            if(res){
                toggleModal()
                reset()
                Alert.alert("Profile Updated")
            }
        } catch (e) {

            if(e?.message?.includes("Email ID already")){
                setError('email', {
                    type: 'manual',
                    message: e?.message, // Set the error message from the API response
                });
            }else if(e?.message?.includes("Contact number already")){
                setError('contact', {
                    type: 'manual',
                    message: e?.message, // Set the error message from the API response
                });
            }else if(e?.message?.includes("Email ID and Phone already")){
                setError('email', {
                    type: 'manual',
                    message: "Email ID already registered with us", // Set the error message from the API response
                });
                setError('contact', {
                    type: 'manual',
                    message: "Contact number already registered with us", // Set the error message from the API response
                });
            }else{

                
                console.log(e?.message)
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
                                name="fullName"
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
                        {errors.fullName && <Text style={styles.errors}>{errors.fullName.message}</Text>}
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
                                name="contact"
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
                                        value={field?.value?.toString()}
                                        placeholderTextColor={"#ccc"}
                                        style={styles.textInput}
                                    />
                                )}
                            />
                        </View>
                        {errors.contact && (
                            <Text style={styles.errors}>{errors.contact.message}</Text>
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