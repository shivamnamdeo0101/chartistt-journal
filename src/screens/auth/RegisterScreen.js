import React, { useState } from 'react';
import {

    Platform,
    SafeAreaView,
    StatusBar, Image,
    StyleSheet,
    Text, Alert,
    View, Dimensions, TextInput, TouchableOpacity, ScrollView, BackHandler
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';



import CustomButton from '../../components/CustomButton';
import { useDispatch } from 'react-redux';

const { height } = Dimensions.get('window');
const halfHeight = height / 3;


const RegisterScreen = ({ navigation }) => {

    const { control, handleSubmit, formState: { errors }, watch, getValues } = useForm();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [confirmPassVisible, setconfirmPassVisible] = useState(false);

    const toggleconfirmPassVisible = () => {
        setconfirmPassVisible(!confirmPassVisible);
    };

    
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        // Replace this with your login logic

        try{
            dispatch(setAuthSuccess())
          }catch(e){
            console.log(e)
          }
        console.log('Login Data:', data);
        Alert.alert('Login Successful');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, paddingBottom: 8, paddingTop: 8 }}>
                    <TouchableOpacity style={{ padding: 5, borderRadius: 99 }}>
                        <SimpleLineIcons
                            name={'arrow-left'}
                            size={20}
                            color="#001AFF"
                            onPress={() => navigation.goBack()}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: "#001AFF", fontFamily: "Intro-Semi-Bold", fontSize: 20, }}>REGISTER</Text>
                </View>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
                <StatusBar
                    animated={true}
                    backgroundColor="#fff"
                    barStyle={"dark-content"}
                    showHideTransition={"fade"}
                    hidden={false}
                />

                <View style={{ marginLeft: 10, marginRight: 10, padding: 20 }}>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                       
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>

                        <Image
                            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                            source={{ uri: "https://assets.website-files.com/62d80c12020f3f06727964a0/62de47019e2173b2491b1e5e_The%20Chartistt%20Logo-p-500.jpg" }} />
                        <Text style={{ fontSize: 20, color: "#000",fontFamily: "Intro-Semi-Bold" }}>CHARTISTT JOURNAL</Text>
                    </View>


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

                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>YOUR PASSWORD</Text>

                        <View style={styles.textView}>
                            <MaterialCommunityIcons
                                name={"lock"}
                                size={20}
                                color="#888"
                                onPress={togglePasswordVisibility}

                            />
                            <Controller
                                name="password"
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
                                        placeholder="Enter your password"
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
                        {errors.password && <Text style={styles.errors}>{errors.password.message}</Text>}


                    </View>

                    <View style={styles.textInputContainer}>
                        <Text style={styles.textInputLabel}>CONFIRM YOUR PASSWORD</Text>

                        <View style={styles.textView}>
                            <MaterialCommunityIcons
                                name={"lock"}
                                size={20}
                                color="#888"
                                onPress={toggleconfirmPassVisible}

                            />
                            <Controller
                                control={control}
                                name="confirmPassword"
                                rules={{
                                    required: 'Please confirm your password',
                                    validate: (val) => {
                                        if (watch('password') != val) {
                                            console.log(val)
                                            return "Your passwords do no match";
                                        }
                                    }
                                }}
                                render={({ field }) => (
                                    <TextInput
                                        placeholder="Enter your password"
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
                        {errors.confirmPassword && (
                            <Text style={styles.errors}>{errors.confirmPassword.message}</Text>
                        )}

                    </View>


                    <CustomButton
                        text={"Register"}
                        filled={true}
                        onPress={handleSubmit(onSubmit)}
                    />

                    <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                        <TouchableOpacity>
                            <Text style={{ color: "#000", fontFamily: "Intro-Bold", marginRight: 5 }}>Already have an account?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ color: "#001AFF", fontFamily: "Intro-Bold", textDecorationLine: "underline" }}>Login here</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"

    },
    half: {

    },
    errors: { color: 'red', fontFamily: "Intro-Semi-Bold", fontSize: 14 },

    textInputContainer: { marginBottom: 10, },
    textInputLabel: { color: "#000", fontFamily: "Intro-Bold" },
    textInput: { color: "#000", flex: 1, fontFamily: "Intro-Bold" },
    textView: { borderColor: "#f0f3f5", paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }
});
