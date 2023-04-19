import React, { useState,useEffect } from 'react';
import { Alert, Button, TextInput,View } from 'react-native';
import auth from '@react-native-firebase/auth';
import {InputPhone, OtpInput} from "../../components"
export default function PhoneAuthComp() {
  // If null, no SMS has been sent
  const [phoneModal, setPhoneModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [mobileNo, setMobileNo] = useState("");

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    console.log("phoneNumber", phoneNumber)
    setMobileNo(phoneNumber);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("confirmation",confirmation)
    setPhoneModal(false);
    setOtpModal(true);
    setConfirm(confirmation);
  }

  async function confirmCode(code) {
    try {
      const response = await confirm.confirm(code);
      console.log("response", response);
      setOtpModal(false);
      Alert.alert("OTP verified successfully")
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => setPhoneModal(true)}
  //     />
  //   );
  // }

  // return (
  //   <View style={{}}>
  //     <TextInput value={code} onChangeText={text => setCode(text)} />
  //     <Button title="Confirm Code" onPress={() => confirmCode()} />
      
  //   </View>
  // );
  return (
    <>
      <Button
        title="Phone Number Sign In"
        onPress={() => setPhoneModal(true)}
      />
    <InputPhone 
    onSendOtp={(phone) => signInWithPhoneNumber(phone)}
    visible={phoneModal}
    onClose={() => setPhoneModal(false)}
    />
    <OtpInput 
    onOtpConfirm={(code) => confirmCode(code)}
    visible={otpModal}
    onClose={() => setOtpModal(false)}
    mobileNo={mobileNo}
    />
    </>
  );
}