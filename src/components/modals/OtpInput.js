import { StyleSheet, Text,Dimensions, View,TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import PhoneInput from "react-native-phone-number-input";
import OTPInputView from '@twotalltotems/react-native-otp-input'
const {width, height} = Dimensions.get("window")
const OtpInput = (props) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
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
                        <Text style={styles.title}>Your Phone!</Text>
                        <View style={styles.inputView}>
                        <Text style={styles.label}>Phone number</Text>
                        <OTPInputView
                            style={{width: '80%', height: 200}}
                            pinCount={4}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            // onCodeChanged = {code => { this.setState({code})}}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled = {(code => {
                                console.log(`Code is ${code}, you are good to go!`)
                            })}
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
        color:"#111110",
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
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
})