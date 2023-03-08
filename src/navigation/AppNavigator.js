import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/app/HomeScreen"
import BottomTabNavigator from "./BottomTabNavigator"

const AppStack = createNativeStackNavigator()

const AppNavigator = ({ navigation }) => {

    return (
        <AppStack.Navigator initialRouteName="Home">
            <AppStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}  />
        </AppStack.Navigator>
    )
}

export default AppNavigator