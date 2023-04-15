import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/auth/LoginScreen"
import OtpInputScreen from "../screens/auth/OtpInputScreen"
import CompleteProfileScreen from "../screens/auth/CompleteProfileScreen"

const AuthStack = createNativeStackNavigator()

const AuthNavigator = ({ navigation }) => {

    return (
        <AuthStack.Navigator initialRouteName="CompleteProfile">
            <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}  />
            <AuthStack.Screen name="OtpInput" component={OtpInputScreen} options={{headerShown:false}}  />
            <AuthStack.Screen name="CompleteProfile" component={CompleteProfileScreen} options={{headerShown:false}}  />


        </AuthStack.Navigator>
    )
}

export default AuthNavigator