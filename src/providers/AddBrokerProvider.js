import { createContext, useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, StyleSheet, Text, Button, Pressable, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Loading from "../components/Loading";
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import CustomButton from "../components/CustomButton";
import { BROKER_API } from "../service/BrokerService";
import { setBrokerObj } from "../store/UserSlice";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectInput from "../components/SelectInput";
import SelectObjInput from "../components/SelectObjInput";
import { setBrokerEdit, setBrokerList } from "../store/DataSlice";
export const AddBrokerContext = createContext(false, () => { }, {});

export const AddBrokerProvider = ({ children }) => {
    const [addBrokerOpen, setAddBrokerOpen] = useState(false);
    const contextData = [addBrokerOpen, setAddBrokerOpen];
    const user = useSelector(state => state?.userAuth?.user)
    const auth = useSelector(state => state?.userAuth)
    const data = useSelector(state => state?.data)

    const [loading, setloading] = useState(false)

    const dispatch = useDispatch()
    const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm({});


    const [brokerName, setbrokerName] = useState({
        "userId": user?._id,
        "id": "0",
        "brokerName": "All",
        "iconLink": "https://ik.imagekit.io/lajz2ta7n/Brokers/ALL.png"
    })

    const [otherBrokerName, setotherBrokerName] = useState("")



    const addBrokerFun = async (brokerPayload) => {

        const addBroker = await BROKER_API.addBroker(brokerPayload, user?.token)

        if (addBroker?.status === 200) {
            setAddBrokerOpen(!addBrokerOpen);

            Alert.alert("Broker Added")
        }


    }



    const onSubmit = async (e) => {

        setloading(true)
        try {



            let brokerPayload;
            if (e?.otherBrokerName) {
                brokerPayload = {
                    "userId": user?._id,
                    id: Date.now(),
                    brokerName: e?.otherBrokerName,
                    iconLink: "null"
                }

                console.log(brokerPayload)

            } else {
                brokerPayload = {
                    "userId": user?._id,
                    ...e, id: Date.now(),
                    brokerName: brokerName?.label,
                    iconLink: brokerName?.iconLink
                }
            }

            await addBrokerFun(brokerPayload)


            const brokerTempList = await BROKER_API.getAllBrokers(user?._id, user?.token)
            dispatch(setBrokerList(brokerTempList?.data?.data))


        } catch (e) {
            console.log(e)
        }
        setloading(false)
    };

    const cancelForm = () => {
        setAddBrokerOpen(!addBrokerOpen)
        reset()
        //dispatch(setBrokerObj({}))
        dispatch(setBrokerEdit(false))
    }







    return (
        <AddBrokerContext.Provider value={contextData}>
            <View style={{ backgroundColor: "#f03" }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addBrokerOpen}
                    onRequestClose={() => {
                        //Alert.alert("Modal has been closed.");
                        cancelForm();
                    }}
                >

                    {loading ? <Loading /> : <View style={{ elevation: 4, flex: 1, marginTop: 100, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#1e294f", padding: 16 }}>


                        <ScrollView>


                            <View style={{ flex: 1 }}>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 16 }}>

                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", paddingLeft: 16 }}>{ "Add Broker"}</Text>


                                </View>

                                <View style={{ marginTop: 16 }}>


                                    <View>
                                        <View>
                                            <Controller
                                                control={control}
                                                name="brokerName"
                                                value={brokerName}
                                                render={({ field: { onChange, value } }) => (
                                                    <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                                        <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Select Broker  </Text>
                                                        <SelectObjInput
                                                            options={data?.allBrokerList}
                                                            label="Select broker"
                                                            value={brokerName}
                                                            setValue={setbrokerName}
                                                        />
                                                    </View>
                                                )}
                                            />
                                            {errors.brokerName && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                        </View>


                                        {
                                            brokerName?.value === "others" && <View>
                                                <Controller
                                                    control={control}
                                                    name="otherBrokerName"
                                                    value={otherBrokerName}
                                                    render={({ field: { onChange, value } }) => (
                                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Enter Broker Name  </Text>
                                                            <TextInput
                                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                                onChangeText={onChange}
                                                                placeholderTextColor={"#636b75"}
                                                                value={value?.toString()}
                                                                placeholder={"Enter Other Broker Name"}
                                                            />
                                                        </View>
                                                    )}
                                                />
                                                {errors.otherBrokerName && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                            </View>
                                        }



                                    </View>

                                </View>





                                <Controller
                                    control={control}
                                    name="amtDeposit"
                                    rules={{ required: false }}

                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}>Enter Depositted Amount</Text>
                                            <TextInput
                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                onChangeText={onChange}
                                                placeholderTextColor={"#636b75"}
                                                value={value?.toString()}
                                                keyboardType="number-pad"
                                                placeholder={"Depositted Amount"}

                                            />
                                        </View>
                                    )}
                                />
                                {errors.amtDeposit && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}


                            </View>

                        </ScrollView>

                        <View style={styles.bgButtonRow}>
                            <CustomButton
                                filled={false}
                                title={"Cancel"}
                                onPress={() => cancelForm()}
                            />
                            <CustomButton
                                filled={true}
                                title={"Submit"}
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>

                    </View>}





                </Modal>
            </View>


            {children}

        </AddBrokerContext.Provider>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalView: {

        padding: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    bgButtonRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 8 }

});
