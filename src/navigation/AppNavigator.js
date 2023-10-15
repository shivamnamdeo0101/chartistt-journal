import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/app/HomeScreen"
import AddTradeScreen from "../screens/app/AddTradeScreen"
import { NavigationContainer } from "@react-navigation/native"
import BottomTabNavigator from "./BottomTabNavigator"
import EditTradeScreen from "../screens/app/EditTradeScreen"
import { flushAuthUser } from "../store/UserSlice"
import { useDispatch, useSelector } from "react-redux"
import {useEffect} from "react";

const AppStack = createNativeStackNavigator()

const AppNavigator = ({ navigation }) => {

   



    return (
        <AppStack.Navigator initialRouteName="Home">
            <AppStack.Screen name="Home" component={BottomTabNavigator} options={{headerShown:false}}  />
            <AppStack.Screen name="AddTrade" component={AddTradeScreen} options={{headerShown:false}}  />
            <AppStack.Screen name="EditTrade" component={EditTradeScreen} options={{headerShown:false}}  />


        </AppStack.Navigator>
    
    )
}

export default AppNavigator