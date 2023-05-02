import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, Text, Alert } from "react-native";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import { OTP_API } from "../../service/OtpService";
import { USER_API } from "../../service/UserService";
import { useDispatch } from "react-redux";
import { setAuthSuccess, setUserDetails } from "../../store/UserSlice";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const OtpInputScreen = ({ route, navigation }) => {
  const { to, confirm } = route.params;
  const [invalidCode, setInvalidCode] = useState(false);
  const dispatch = useDispatch()

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const subscribe = async () => {
    await requestUserPermission()
    await messaging()
      .subscribeToTopic('app')
      .then(() => {
        console.log('Subscribed to topic');
      })
      .catch(error => {
        console.log('Error subscribing to topic:', error);
      });
  }


  const checkOtp = async (otp) => {
    try {


      const res = await OTP_API.checkOtp({ code: otp, to })

      if (res?.data?.data?.status === "approved") {

        const user = await USER_API.userLogin({
          // firstName: 'Your First Name',
          // lastName: 'Your Last Name',
          // email: 'email@email.com',
          phoneNumber: to
        })

        if (user?.status === 200) {
          dispatch(setUserDetails(user?.data?.data))
          subscribe()
          dispatch(setAuthSuccess())
          // if(user?.data?.data?.email === "email@email.com"){
          //   navigation.navigate("CompleteProfile")
          // }else{

          // }

        }

      }
    } catch (e) {
      Alert.alert(JSON.stringify(e?.message))
    }
  }

  // const confirmVerificationCode = async (code)=> {
  //   try {
  //     const res = await confirm.confirm(code);

  //     if(res){
  //       const user = await USER_API.userLogin({"phoneNumber":to})
  //       dispatch(setUserDetails({"phoneNumber":to,"userId":user?.data?.data?._id}))
  //       dispatch(setAuthSuccess())
  //     }

  //   } catch (error) {
  //     Alert.alert('Invalid code');
  //   }
  // }

  const verifyOtp = async (otp) => {
    console.log("Confirm", confirm)
    confirmVerificationCode(otp)
  }





  return (

    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.prompt}>Enter the code we sent you</Text>
      <Text style={styles.message}>
        {`Your phone (${to}) will be used to protect your account each time you log in.`}
      </Text>
      <Button
        title="Edit Phone Number"
        onPress={() => navigation.goBack()}
      />
      <OTPInputView
        style={{ width: "80%", height: 200 }}
        pinCount={6}
        autoFocusOnLoad={true}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          checkOtp(code)
        }}
      />
      {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e294f"
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "#fff",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#ccc",
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
    color: "#fff"
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
    marginBottom: 10,
    color: "#fff"
  },

  error: {
    color: "red",
  },
});



export default OtpInputScreen