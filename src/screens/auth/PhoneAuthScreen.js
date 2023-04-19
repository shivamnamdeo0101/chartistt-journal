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
import Loading from "../../components/Loading";
import { ActivityIndicator } from "react-native-paper";

const PhoneAuthScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);
  const [loading, setloading] = useState(false)

  const sendOtp = async () => {

    setloading(true)

    const res = await OTP_API.sendOtp({ "to": formattedValue })
    if (res?.status === 200) {
      setloading(false)
      navigation.navigate("OtpInput", { "to": formattedValue })
    } else {
      Alert.alert("Can not send otp")
    }

  }



  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>

          <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"center" }}>
              <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>CHARTISTT</Text>
              <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 ,textAlign:"center"}}>JOURNAL</Text>
            </View>
          </View>

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
            <Text style={styles.buttonText}> {loading ? <ActivityIndicator size={"small"} color="#fff" /> : "Continue with Phone Number"}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e294f",
    justifyContent: "center",
    padding: 20,

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

export default PhoneAuthScreen;

