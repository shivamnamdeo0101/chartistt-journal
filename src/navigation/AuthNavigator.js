import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/auth/LoginScreen"
import ForgotScreen from "../screens/auth/ForgotScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"


const AuthStack = createNativeStackNavigator()

const AuthNavigator = ({ navigation }) => {

    return (
        <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}  />
            <AuthStack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}  />
        
        </AuthStack.Navigator>
    )
}

export default AuthNavigator