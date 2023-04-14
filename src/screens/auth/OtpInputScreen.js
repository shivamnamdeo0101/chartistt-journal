import React, { useState,useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, Text,Alert } from "react-native";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import { OTP_API } from "../../service/OtpService";
import { USER_API } from "../../service/UserService";

const OtpInputScreen = ({ route, navigation }) => {
  const { to } = route.params;
  const [invalidCode, setInvalidCode] = useState(false);




  const checkOtp = async(otp)=>{
    const res = await OTP_API.checkOtp({code:otp,to})
    
    if(res?.data?.data.status === "approved"){
      console.log(res?.data)
      const login = await USER_API.userPhoneLogin({phoneNumber:to})
      console.log(login)
      // if(login?.success === 200){
      
      // }
    }
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
    backgroundColor:"#1e294f"
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
    color:"#fff"
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
    marginBottom:10,
    color:"#fff"
  },

  error: {
    color: "red",
  },
});



export default OtpInputScreen