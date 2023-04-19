import { StyleSheet, Text,Dimensions, View,TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import PhoneInput from "react-native-phone-number-input";
import OTPInputView from '@twotalltotems/react-native-otp-input'
const {width, height} = Dimensions.get("window")
const OtpInput = (props) => {
    const [code, setCode] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    handleCodeFilled = (code) => {

    }
  return (
    <View >
        <Modal
        visible={props.visible}
        transparent={true}
        animationType='fade'
        onRequestClose={() => props.onClose()}
        >
            <View style={styles.container}>
                    <Text style={styles.header}>Chartist-Journal</Text>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>OTP Verification</Text>
                        <View style={styles.inputView}>
                        <Text style={styles.helperText}>Enter the otp you received to</Text>
                        <Text style={styles.helperText}>{props.mobileNo}</Text>
                        <OTPInputView
                            style={{width: '90%', height: 100, alignSelf:"center"}}
                            pinCount={6}
                            code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            onCodeChanged = {code => { setCode(code)}}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled = {(code => {
                                console.log(`Code is ${code}, you are good to go!`)
                                props.onOtpConfirm(code)
                            })}
                        />
                        
                        </View>
                        <TouchableOpacity
                        onPress={() => props.onClose()}
                        >
                        <Text style={styles.backBtn}>Resend Otp</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity 
                        onPress={() => {
                            if(code.length==6) {
                                props.onOtpConfirm(code)
                            } else {
                                Alert.alert("Please fill your otp")
                            }
                        }}
                        style={styles.ctaBtn}>
                            <Text style={styles.ctaBtnText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </Modal>
    </View>
  )
}

export default OtpInput

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#ffffff00",
        elevation:10,
        justifyContent:"space-between",
        alignItems:"center"
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
        color:"#5299cc",
        marginTop:25
    },
    backBtn: {
        fontSize:14,
        fontWeight:"500",
        color:"blue",
        marginTop:25
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
    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 40,
        height: 50,
        backgroundColor:"#ebf4fc",
        borderRadius:5,
        color:"#000"
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
})