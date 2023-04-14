import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/auth/LoginScreen"
import OtpInputScreen from "../screens/auth/OtpInputScreen"

const AuthStack = createNativeStackNavigator()

const AuthNavigator = ({ navigation }) => {

    return (
        <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}  />
            <AuthStack.Screen name="OtpInput" component={OtpInputScreen} options={{headerShown:false}}  />
        </AuthStack.Navigator>
    )
}

export default AuthNavigator