import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/auth/LoginScreen"

const AuthStack = createNativeStackNavigator()

const AuthNavigator = ({ navigation }) => {

    return (
        <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen name="Login" component={LoginScreen}  />
        </AuthStack.Navigator>
    )
}

export default AuthNavigator