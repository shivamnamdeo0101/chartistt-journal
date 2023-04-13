import { StyleSheet, Text,Dimensions, View,Platform, KeyboardAvoidingView, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import PhoneInput from "react-native-phone-number-input";
const {width, height} = Dimensions.get("window")
const InputPhone = (props) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
  return (
        <Modal
        visible={props.visible}
        transparent={true}
        animationType='fade'
        onRequestClose={() => props.onClose()}
        >
            <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.container}>
              <Text style={styles.header}>Chartist-Journal</Text>
              <View style={styles.modalView}>
                  <Text style={styles.title}>Your Phone!</Text>
                  <View style={styles.inputView}>
                  <Text style={styles.label}>Phone number</Text>
                  <PhoneInput
                      ref={phoneInput}
                      defaultValue={value}
                      defaultCode="DM"
                      layout="first"
                      onChangeText={(text) => {
                      setValue(text);
                      }}
                      onChangeFormattedText={(text) => {
                      setFormattedValue(text);
                      }}
                      withDarkTheme
                      withShadow
                      autoFocus
                      containerStyle={styles.containerStyle}
                      codeTextStyle={styles.codeTextStyle}
                      textContainerStyle={styles.textContainerStyle}

                  />
                  <Text style={styles.helperText}>A 6 digit OTP will be sent via SMS to verify your mobile number!</Text>
                  </View>
                  <TouchableOpacity
                  onPress={() => props.onClose()}
                  >
                  <Text style={styles.backBtn}>Back</Text>
                  </TouchableOpacity>
              </View>
              <View>
                  <TouchableOpacity 
                  onPress={() => {
                      if(phoneInput.current?.isValidNumber(value)) {
                          props.onSendOtp(formattedValue)
                      } else {
                          Alert.alert("Please provide valid phone number")
                      }
                  }}
                  style={styles.ctaBtn}>
                      <Text style={styles.ctaBtnText}>Continue</Text>
                  </TouchableOpacity>
              </View>
      </View>
      </KeyboardAvoidingView>
        </Modal>
  )
}

export default InputPhone

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#ffffff00",
        elevation:10,
        justifyContent:"space-between",
        alignItems:"center",
        flex:1
    },
    header: {
        textAlign:"center",
        fontSize:22,
        fontWeight:"bold",
        color:"#ffffff",
        marginTop:20
    },
    modalView: {
        backgroundColor:"#FFF",
        elevation:10,
        width:"95%",
        height:height/2,
        borderRadius:20,
        padding:15,
        paddingVertical:30
    },
    title: {
        textAlign:"center",
        fontSize:22,
        fontWeight:"bold",
        color:"#111110",
        marginBottom:20
    },
    inputView: {
        justifyContent:"center",
        flex:1
    },
    label: {
        fontSize:16,
        fontWeight:"500",
        color:"#111110",
        marginBottom:10
    },
    helperText: {
        fontSize:14,
        fontWeight:"500",
        color:"#111110",
        marginTop:25
    },
    backBtn: {
        fontSize:14,
        fontWeight:"500",
        color:"blue",
        marginTop:25
    },
    containerStyle: {
        backgroundColor:"#FFFFFF",
        height:60,
        justifyContent:"center",
        padding:0,
        borderRadius:10,
        alignSelf:"center",
        width:"100%"
    },
    codeTextStyle: {
        fontSize:14,
        color:"#111110",
    },
    textContainerStyle: {
        backgroundColor:"#FFFFFF",
        padding:0,
        margin:0,
        marginTop:0,
        paddingTop:0,
        paddingBottom:0,
        borderRadius:10,
    },
    ctaBtn: {
        backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:20,
        borderRadius:20,
        height:45,
        paddingHorizontal:30,
        justifyContent:"center",
        alignItems:"center",
    },
    ctaBtnText: {
        textAlign:"center",
        fontSize:22,
        fontWeight:"bold",
        color:"#ffffff",
    },
})