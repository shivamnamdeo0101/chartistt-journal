import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/app/HomeScreen"
import BottomTabNavigator from "./BottomTabNavigator"
import EditProfileScreen from "../screens/app/EditProfileScreen"

const AppStack = createNativeStackNavigator()

const AppNavigator = ({ navigation }) => {

    return (
        <AppStack.Navigator initialRouteName="Home">
            <AppStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}  />
            <AppStack.Screen name="EditProfile" component={EditProfileScreen} options={{headerShown:false}}  />
        </AppStack.Navigator>
    )
}

export default AppNavigator