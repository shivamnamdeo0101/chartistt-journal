import { View, Text, Button, TextInput, Alert } from 'react-native'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from './CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API } from '../service/UserService';
import { setAuthSuccess, setUserDetails } from '../store/UserSlice';
import { ScrollView } from 'react-native-gesture-handler';

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().email().required(),
});




const AddEmailFormComp = ({ navigation, setModal, modal }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch()
    const auth = useSelector(state => state?.userAuth)

    const user = useSelector(state => state?.userAuth?.user)


    function compareObjects(obj, previousObj) {
        // Check if the objects are null or undefined
        if (obj == null || previousObj == null) {
          return false;
        }
      
        // Get the keys of both objects
        const objKeys = Object.keys(obj);
        const previousObjKeys = Object.keys(previousObj);
      
        // Check if the objects have the same number of keys
        if (objKeys.length !== previousObjKeys.length) {
          return false;
        }
      
        // Check if the objects have the same keys
        if (!objKeys.every(key => previousObjKeys.includes(key))) {
          return false;
        }
      
        // Check if the values of each key in the objects are equal
        for (let key of objKeys) {
          if (obj[key] !== previousObj[key]) {
            return false;
          }
        }
      
        // The objects are equal
        return true;
      }



    const onSubmit = async (data) => {


        

        try {

            const prevObj = {
                "firstName":user?.firstName,
                "lastName":user?.lastName,
                "email":user?.email,
                "phoneNumber":user?.phoneNumber
            }
    
            if(compareObjects(data,prevObj)){
                modal && setModal(false)
                return
            }

            
            

            const res = await USER_API.userLogin(prevObj)

            if(res?.success === false){
                Alert.alert(res?.message)
                return
            }
            console.log(payload,"Payload")
            console.log(auth)


            console.log(res?.data?.data,"RES")

            if (res?.status === 200) {
                dispatch(setUserDetails(res?.data?.data))
                // dispatch(setAuthSuccess())
                // modal && setModal(false)

            }


        } catch (e) {
            console.log(e)
        }
    };

    return (
        <View style={{ backgroundColor: "#1e294f", flex: 1, padding: 16, flexDirection: "column", justifyContent: "space-between" }}>
            <ScrollView >
                <View>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>Complete Your Profile</Text>

                    <View style={{ backgroundColor: "#070f4a", padding: 10, borderRadius: 10, marginBottom: 10 }}>
                        <Text style={{ color: "#ccc", fontWeight: "bold" }}>First Name</Text>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue={user?.firstName}

                            render={({ field, }) => <TextInput placeholder='Enter your first name' value={field.value}
                                onChangeText={field.onChange}
                                style={{ color: "#fff" }}
                                {...field} />}
                        />
                        {errors.firstName && <Text style={{ color: "#f03" }}>{errors.firstName.message}</Text>}
                    </View>
                    <View style={{ backgroundColor: "#070f4a", padding: 10, borderRadius: 10, marginBottom: 10 }}>
                        <Text style={{ color: "#ccc", fontWeight: "bold" }}>Last Name</Text>
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue={user?.lastName}
                            render={({ field, value, onChange }) => <TextInput style={{ color: "#fff" }} placeholder='Enter your last name' value={field.value}
                                onChangeText={field.onChange}
                                {...field} />}
                        />
                        {errors.lastName && <Text style={{ color: "#f03" }}>{errors.lastName.message}</Text>}
                    </View>
                    <View style={{ backgroundColor: "#070f4a", padding: 10, borderRadius: 10, marginBottom: 10 }}>
                        <Text style={{ color: "#ccc", fontWeight: "bold" }}>Email</Text>
                        <Controller
                            name="email"
                            control={control}

                            defaultValue={user?.email}
                            render={({ field, value, onChange }) => <TextInput
                                placeholder='Enter your email' value={field.value}
                                onChangeText={field.onChange}
                                style={{ color: "#fff" }}
                                {...field} />}
                        />
                        {errors.email && <Text style={{ color: "#f03" }}>{errors.email.message}</Text>}
                    </View>
                    <View style={{ backgroundColor: "#070f4a", padding: 10, borderRadius: 10, marginBottom: 10 }}>
                        <Text style={{ color: "#ccc", fontWeight: "bold" }}>Phone Number</Text>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            defaultValue={user?.phoneNumber}

                            render={({ field, }) => <TextInput placeholder='Enter your phoneNumber' value={field.value}
                                onChangeText={field.onChange}
                                style={{ color: "#fff" }}
                                {...field} />}
                        />
                        {errors.phoneNumber && <Text style={{ color: "#f03" }}>{errors.phoneNumber.message}</Text>}
                    </View>


                </View>

            </ScrollView>

            <CustomButton width={"auto"} title={"Submit"} onPress={handleSubmit(onSubmit)} filled={true} />

        </View >
    )
}

export default AddEmailFormComp