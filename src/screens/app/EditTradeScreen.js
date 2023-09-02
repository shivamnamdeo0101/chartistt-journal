import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


import { View, Text, StyleSheet,StatusBar, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Actionsheet, useDisclose, Box, Center } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../../components/CustomButton';


const EditTradeScreen = ({ navigation }) => {

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
        <View style={{ flex: 1,backgroundColor:"#fff" }}>
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


            <View style={{ flexDirection: "column", justifyContent: "space-around", flex: 1 ,backgroundColor:"#f8f8f8",padding:10}}>
                <ScrollView>
                    <View>
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
                                    defaultValue=""
                                    rules={{
                                        required: 'Action is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Select Action"
                                            onChangeText={field.onChange}
                                            value={field.value}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
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
                                    name="segmentType"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Segment Type is required',
                                    }}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder="Select Segment Type"
                                            onChangeText={field.onChange}
                                            value={field.value}
                                            placeholderTextColor={"#ccc"}
                                            style={styles.textInput}
                                        />
                                    )}
                                />
                            </View>
                            {errors.segmentType && <Text style={styles.errors}>{errors.segmentType.message}</Text>}
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputLabel}>DEPOSIT AMOUNT</Text>
                            <View style={styles.textView}>
                                
                                <Controller
                                    name="depositAmt"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Deposit Amount is required',
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
                            {errors.depositAmt && <Text style={styles.errors}>{errors.depositAmt.message}</Text>}
                        </View>
                    </View>
                </ScrollView>
                <View>
                    <CustomButton
                        text={"Update"}
                        filled={true}
                        onPress={handleSubmit(onSubmit)}
                    />

                    <View style={{ flexDirection: "row", alignItems: "flex-start", alignSelf: "center", margin: 10, }}>
                        
                        <Text style={{ color: "#000", textAlign: "justify", fontSize: 12, fontFamily: "Intro-Bold", width: "90%",textAlign:"center" }}>
                        <Text style={{ color: "#001AFF", marginRight: 10, fontFamily: "Intro-Bold", textAlign:"center" }}>Note :- </Text>
                            YOU'RE UPDATING THIS ACCOUNT ONLY FOR
                            CALCULATION PURPOSE</Text>
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

