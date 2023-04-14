import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PhoneInput from "react-native-phone-number-input";
import { OTP_API } from "../../service/OtpService";

const PhoneAuthComp = ({navigation}) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);

  const sendOtp = async ()=>{
    const res = await OTP_API.sendOtp({"to":formattedValue})
    if(res?.status === 200){
      navigation.navigate("OtpInput",{"to":formattedValue})
    }else{
      Alert.alert("Can not send otp")
    }
   
  }

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>

          <View style={styles.wrapper}>
            <PhoneInput

              placeholderTextColor="#888"
              ref={phoneInput}
              defaultValue={value}
              defaultCode="IN"
              layout="first"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              countryPickerProps={{ withAlphaFilter: true }}
              withShadow
              autoFocus
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              sendOtp()
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {

  },

  wrapper: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },

  button: {

    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b5cd6",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 10
  },

  buttonText: {
    color: "white",
    fontSize: 14,
  }
});

export default PhoneAuthComp;


