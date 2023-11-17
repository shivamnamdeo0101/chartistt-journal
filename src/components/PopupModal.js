import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import { FAB } from 'react-native-paper';
import LoadingComp from './LoadingComp';
import CustomButton from './CustomButton';


function PopupModal({setModalVisible,isModalVisible}) {

    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [loading, setloading] = useState(false)
  


    if (loading) {
        return (
            <LoadingComp />
        )
    }


    return (
        <View>
            <FAB
                icon={"plus"}
                label='Add Broker'
                animated
                color="#001AFF"
                rippleColor="#ccc"
                mode="elevated"
                backgroundColor="#fff"
                style={{
                    position: 'absolute',
                    margin: 16,
                    bottom: 0,
                    right: 0,
                    zIndex: 1
                }}
                onPress={toggleModal}
            />
            <View style={styles.container}>

                <Modal
                    isVisible={isModalVisible}
                    onSwipeComplete={toggleModal}
                    onBackButtonPress={toggleModal}
                    swipeDirection="down"
                    propagateSwipe
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <View>
                            <View style={styles.swipeIndicator} />
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "space-around", flex: 1 }}>
                            <ScrollView>
                                <View>
                                    <Text style={{ fontSize: 20, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold", }}>
                                    ⚠️ Important Warning for Traders:
                                    </Text>

                                    <Text style={{ fontSize: 16, color: "#000", marginBottom: 10, fontFamily: "Intro-SemiBold", }}>
                                    👉🏻 Did you know that approximately 90% of traders experience financial losses in the stock market?                                    
                                    </Text>

                                    <Text style={{ fontSize: 16, color: "#000", marginBottom: 10, fontFamily: "Intro-SemiBold", }}>
                                    👉🏻 Trading stocks involves inherent risks, and success is not guaranteed. The market can be unpredictable,
                                         and prices can fluctuate rapidly. Before engaging in any trading activity, it's crucial to educate yourself, conduct thorough research, and carefully consider your risk tolerance.
                                    </Text>

                                    <Text style={{ fontSize: 12, color: "#ccc", marginBottom: 10, fontFamily: "Intro-SemiBold", }}>
                                    <Text style={{color:"#f003"}}>Disclaimer :</Text> We are  not SEBI registered and this app is intended solely for creating trade journals. 
                                    It does not provide financial advice or facilitate actual trading.
                                    </Text>


                                    
                                    
                                </View>
                            </ScrollView>
                            <View>
                                <CustomButton
                                    text={"I Understand"}
                                    filled={true}
                                    onPress={toggleModal}
                                />

                                <View style={{ flexDirection: "row", alignItems: "flex-start", alignSelf: "center", margin: 10, }}>
                                    <Text style={{ color: "#001AFF", marginRight: 10, fontFamily: "Intro-Bold", }}>Note :- </Text>
                                    <Text style={{ color: "#000", textAlign: "justify", fontSize: 12, fontFamily: "Intro-Bold", width: "90%" }}>
                                    The trades recorded within this app are for informational and analytical purposes only.</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    );
}

export default PopupModal


const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        flex: 1 / 3,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 300,
    },
    swipeIndicator: {
        width: 60,
        height: 3,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        marginBottom: 10,
    },
    half: {

    },
    errors: { color: 'red', fontFamily: "Intro-Semi-Bold", fontSize: 14 },

    textInputContainer: { marginBottom: 10, },
    textInputLabel: { color: "#000", fontFamily: "Intro-Bold" },
    textInput: { color: "#000", flex: 1, fontFamily: "Intro-Bold" },
    textView: { borderColor: "#f0f3f5", paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }
});