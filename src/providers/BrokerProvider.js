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
export const BrokerContext = createContext(false, () => { }, {});

export const BrokerProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contextData = [isOpen, setIsOpen];
    const user = useSelector(state => state?.userAuth?.user)
    const auth = useSelector(state => state?.userAuth)
    const [loading, setloading] = useState(true)

    const dispatch = useDispatch()
    const { control, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: auth?.brokerObj });

    

    useEffect(() => {
        if (Object.keys(auth?.brokerObj).length > 0) {
            reset(auth?.brokerObj);
        } else {
            reset({});
        }
        setloading(false)

    }, [auth])


    const addBrokerFun  = async (brokerPayload)=>{
        const addBroker = await BROKER_API.addBroker(brokerPayload, user?.token)
            
        if (addBroker?.status === 200) {
            setIsOpen(!isOpen);
            reset()
            Alert.alert("Broker Added")
        }

        
    }
    const updateBrokerFun  = async (brokerPayload)=>{
        console.log(brokerPayload)
        const updateBroker = await BROKER_API.updateBroker(brokerPayload, user?.token)
            
        if (updateBroker?.status === 200) {
            setIsOpen(!isOpen);
            reset()
            Alert.alert("Broker Updated")
        }
    }

    const onSubmit = async (data) => {
        setloading(true)
        try {
            

            if(forUpdate()){
                const brokerPayload = {
                    "userId": user?._id,
                    "brokerId":auth?.brokerObj?._id,
                    "broker":data
                }
                await updateBrokerFun(brokerPayload)
            }else{
                const brokerPayload = {
                    "userId": user?._id,
                    ...data
                }
                await addBrokerFun(brokerPayload)
            }
            
            

        } catch (e) {
            console.log(e)
        }
        setloading(false)
    };

    const cancelForm = () => {
        setIsOpen(!isOpen)
        reset()
        dispatch(setBrokerObj({}))
    }

    const forUpdate = () => {
        if (Object.keys(auth?.brokerObj).length > 0) {
            return true
        } else {
            return false
        }
    }
    const deleteBroker = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteFromDB()
                }
            ]
        );
    }

    const deleteFromDB = async () => {
        setloading(true)
        const payload = {
            userId:user?._id,
            brokerId:auth.brokerObj?._id
        }
        try {
            const res = await BROKER_API.remBroker(payload, user?.token)
            if (res?.status === 200) {
                cancelForm()
                Alert.alert("Broker Deleted")
            }
        }catch(e){
            console.log(e)
        }
        setloading(false)
    }

    


    return (
        <BrokerContext.Provider value={contextData}>
            <View style={{ backgroundColor: "#f03" }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                    onRequestClose={() => {
                        //Alert.alert("Modal has been closed.");
                        cancelForm();
                    }}
                >
                    
                   { loading ? <Loading /> : <View style={{ elevation: 4, flex: 1, marginTop: 100, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#1e294f", padding: 16 }}>


                        <ScrollView>


                            <View style={{ flex: 1 }}>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 16 }}>

                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", paddingLeft: 16 }}>{forUpdate() === true ? "Update Broker" : "Add Broker"}</Text>
                                    {forUpdate() === true && <TouchableOpacity onPress={() => deleteBroker()}>
                                        <MaterialCommunityIcons name="delete-empty" color={"#717da8"} size={26} />
                                    </TouchableOpacity>}

                                </View>

                                <View style={{ marginTop: 16 }}>


                                    <Controller
                                        control={control}
                                        name="brokerName"

                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>

                                                <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}> Broker Name</Text>
                                                <TextInput
                                                    style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                    placeholderTextColor={"#636b75"}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    placeholder={"Broker Name"}
                                                />

                                            </View>
                                        )}
                                    />
                                    {errors.brokerName && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}
                                </View>


                                <Controller
                                    control={control}
                                    name="amtWithdraw"

                                    rules={{ required: true }}

                                    render={({ field: { onChange, value } }) => (
                                        <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10, marginBottom: 0 }}>
                                            <Text style={{ color: "#ccc", paddingLeft: 5, marginBottom: 5, fontWeight: "bold" }}> Enter Withdrawn Amount</Text>

                                            <TextInput
                                                style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#070f4a", paddingLeft: 10, }}
                                                onChangeText={onChange}
                                                placeholderTextColor={"#636b75"}
                                                value={value?.toString()}
                                                placeholder={"Withdrawn Amount"}
                                                keyboardType="number-pad"

                                            />
                                        </View>
                                    )}
                                />
                                {errors.amtWithdraw && <Text style={{ paddingLeft: 16, color: "#975bd9" }}>This field is required</Text>}

                                <Controller
                                    control={control}
                                    name="amtDeposit"
                                    rules={{ required: true }}

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
                                title={forUpdate() === true ? "Update" : "Submit"}
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>

                    </View>}
                   




                </Modal>
            </View>


            {children}

        </BrokerContext.Provider>
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
