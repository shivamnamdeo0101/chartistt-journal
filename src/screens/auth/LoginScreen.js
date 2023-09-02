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
import CustomButton from '../../components/CustomButton';

import ForgotPass from '../../components/ForgotPass';
import { useDispatch } from 'react-redux';
import { setAuthSuccess, setUserDetails } from '../../store/UserSlice';
import { USER_API } from '../../service/UserService';
import LoadingComp from '../../components/LoadingComp';
const { height } = Dimensions.get('window');
const halfHeight = height / 3;

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, setError, formState: { errors } } = useForm();

  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const onSubmit = async (data) => {

    setloading(true)

    try {

      const res = await USER_API.userEmailLogin(data)
      dispatch(setUserDetails(res))
      dispatch(setAuthSuccess())

    } catch (e) {
      if (e?.message?.includes("User not found")) {
        setError('email', {
          type: 'manual',
          message: e?.message, // Set the error message from the API response
        });
      } else if (e?.message?.includes("password is not correct")) {
        setError('password', {
          type: 'manual',
          message: e?.message, // Set the error message from the API response
        });
      } else if (e?.message?.includes("Unauthorized User")) {
        setError('email', {
          type: 'manual',
          message: e?.message, // Set the error message from the API response
        });
      } else {
        Alert.alert(e?.message)
      }
    }
    setloading(false)
  };


  if(loading){
    return(
      <LoadingComp />
    )
  }

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



        <View style={[styles.half, { backgroundColor: '#001AFF', height: "35%", alignItems: "center", justifyContent: "center" }]}>
          <Image source={require("../../assets/clogo.png")} style={{ width: 250, height: 160, }} />

          <Text style={{ color: "#fff", fontSize: 30, fontFamily: "Intro-Bold" }}>Welcome Back</Text>
          <Text style={{ color: "#fff", fontWeight: "400", fontFamily: "Intro-Bold" }}>Sign in to continue</Text>
        </View>


        <View style={[styles.half, { backgroundColor: '#fff', height: "65%", borderTopLeftRadius: 16, borderTopRightRadius: 16 }]}>


          <View style={{ marginLeft: 10, marginRight: 10, padding: 20 }}>

            <Text style={{ fontSize: 20, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold" }}>LOGIN</Text>

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
              {errors.email && <Text style={styles.errors}>{errors.email.message}</Text>}
            </View>

            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Password</Text>

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

              <TouchableOpacity style={{ flexDirection: "column", alignItems: "flex-end" }}

              >
                <ForgotPass />
                {/* <Text  style={{ color: "#001AFF", textAlign: "right", textDecorationLine: "underline", fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>
                  Forgot Password
                </Text> */}
              </TouchableOpacity>

            </View>


            <CustomButton
              text={"Login"}
              filled={true}
              onPress={handleSubmit(onSubmit)}
            />
            <CustomButton
              text={"Continue With Google"}
              filled={false}
              onPress={handleSubmit(onSubmit)}
            />
            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
              <TouchableOpacity>
                <Text style={{ color: "#000", fontFamily: "Intro-Bold", marginRight: 5 }}>Don't have account?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ color: "#001AFF", fontFamily: "Intro-Bold", textDecorationLine: "underline" }}>Create a new account</Text>
              </TouchableOpacity>
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
  errors: { color: 'red', fontFamily: "Intro-Semi-Bold", fontSize: 14 },
  textInputContainer: { marginBottom: 10, },
  textInputLabel: { color: "#000", fontFamily: "Intro-Bold" },
  textInput: { color: "#000", flex: 1, fontFamily: "Intro-Bold" },
  textView: { borderColor: "#f0f3f5", paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }
});

export default LoginScreen;