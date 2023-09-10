import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

function SelectInput({ label, value, setValue, options }){
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const setViewFalse = (option) => {
        setValue(option.label);
        setModalVisible(false);
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleModal} style={styles.header}>
                <Text style={{ color: "#000", fontFamily: "Intro-Bold", padding: 16, paddingLeft: 5, textTransform: "capitalize" }}>{value}</Text>
            </TouchableOpacity>

            {
                isModalVisible &&
                <View style={{borderWidth:1,borderColor:"#ccc",borderRadius:5,padding:5,margin:2}}>
                {
                    options?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ backgroundColor: "#ccc", borderColor: item?.label === value ? "#001AFF" : "#fff", borderWidth: 2, borderRadius: 5, padding: 10, marginBottom: 5 }}
                                onPress={() => setViewFalse(item)}
                            >
                                <Text style={{ color: "#000", fontFamily: "Intro-Bold", textTransform: "capitalize" }}>{item.label}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            }

            {/* <Modal
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
                    <Text style={{ fontSize: 20, color: "#000", textTransform: "uppercase", marginBottom: 10, fontFamily: "Intro-Bold", }}>SELECT {label}</Text>


                   
                </View>
            </Modal> */}

        </View>
    );
};

export default SelectInput;

const styles = StyleSheet.create({
    container: {
        flex:1
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

