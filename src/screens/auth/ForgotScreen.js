import React, { useState } from 'react';
import {

    Platform,
    SafeAreaView,
    StatusBar, Image,
    StyleSheet,
    Text, Alert,
    View, Dimensions, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';

import ForgotPass from '../../components/ForgotPass';
const { height } = Dimensions.get('window');
const halfHeight = height / 3;

const ForgotScreen = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = (data) => {
        // Replace this with your login logic
        console.log('Login Data:', data);
        Alert.alert('Login Successful');
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#001AFF"
                barStyle={"default"}
                showHideTransition={"fade"}
                hidden={false}
            />


            <View style={styles.container}>



                <View style={[styles.half, { backgroundColor: '#001AFF', height: "40%", alignItems: "center", justifyContent: "center" }]}>
                    <Image source={require("../../assets/clogo.png")} style={{ width: 250, height: 160, }} />

                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 30 }}>Welcome Back</Text>
                    <Text style={{ color: "#fff", fontWeight: "400" }}>Sign in to continue</Text>
                </View>


                <View style={[styles.half, { backgroundColor: '#fff', height: "60%", borderTopLeftRadius: 16, borderTopRightRadius: 16 }]}>


                    <View style={{ flexDirection: "column", justifyContent: "space-around", flex: 1,marginLeft: 10, marginRight: 10, padding: 20  }}>

                        <View>
                            <Text style={{ fontSize: 20, color: "#000", marginBottom: 10, fontWeight: "bold", }}>FORGOT PASSWORD</Text>

                            <View style={styles.textInputContainer}>
                                <Text style={styles.textInputLabel}>Email</Text>
                                <View style={styles.textView}>
                                    <MaterialCommunityIcons
                                        name={"email"}
                                        size={20}
                                        color="#888"
                                        onPress={togglePasswordVisibility}

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
                                {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                            </View>
                        </View>




                        <View>
                            <CustomButton
                                text={"Submit"}
                                filled={true}
                                onPress={handleSubmit(onSubmit)}
                            />

                            <View style={{ flexDirection: "row", alignItems: "flex-start", alignSelf: "center", padding: 14 }}>
                                <Text style={{ color: "#001AFF", marginRight: 10, fontWeight: "bold" }}>Note :- </Text>
                                <Text style={{ color: "#000", textAlign: "justify", fontSize: 12, fontWeight: "bold" }}>SUBMIT THIS FORM TO GET TEMPRARY
                                    PASSWORD AND AFTER LOGIN RESET YOUR
                                    PASSWORD</Text>
                            </View>
                        </View>


                    </View>

                </View>

            </View>


        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001AFF"

    },
    half: {

    },
    textInputContainer: { marginBottom: 10, },
    textInputLabel: { color: "#000", fontWeight: "bold" },
    textInput: { color: "#000", flex: 1 },
    textView: { borderColor: "#f0f3f5", paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }
});


export default ForgotScreen