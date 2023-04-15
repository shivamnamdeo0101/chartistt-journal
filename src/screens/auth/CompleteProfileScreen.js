import { View, Text,Button,TextInput } from 'react-native'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().matches(/^\d+$/, "Must be only digits").required(),
});

const CompleteProfileScreen = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);

    return (
        <View style={{ backgroundColor: "#1e294f",flex:1,padding:10,}}>
            <View>
            <View>
                <Text>First Name</Text>
                <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextInput {...field} />}
                />
                {errors.firstName && <Text>{errors.firstName.message}</Text>}
            </View>
            <View>
                <Text>Last Name</Text>
                <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextInput {...field} />}
                />
                {errors.lastName && <Text>{errors.lastName.message}</Text>}
            </View>
            <View>
                <Text>Email</Text>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextInput {...field} />}
                />
                {errors.email && <Text>{errors.email.message}</Text>}
            </View>
            <View>
                <Text>Phone Number</Text>
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextInput {...field} />}
                />
                {errors.phoneNumber && <Text>{errors.phoneNumber.message}</Text>}
            </View>
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    </View >
  )
}

export default CompleteProfileScreen