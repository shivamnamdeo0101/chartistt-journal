import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/app/HomeScreen"
import AppNavigator from "./AppNavigator"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


import TradeScreen from "../screens/app/TradeScreen";
import AddTradeScreen from "../screens/app/AddTradeScreen";
import ProfileScreen from "../screens/app/ProfileScreen";
import NotificationScreen from "../screens/app/NotificationScreen";
import BrokerScreen from "../screens/app/BrokerScreen";

const TabStack = createMaterialBottomTabNavigator()

const BottomTabNavigator = ({ navigation }) => {

    return (
        <TabStack.Navigator
            initialRouteName="Feed"
            activeColor="#fff"
            inactiveColor="#717da8"
            barStyle={{ backgroundColor: '#1e294f',padding:0 }}
        >
            <TabStack.Screen
                name="Home"
                component={AppNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={"#717da8"} size={26} />
                    ),
                }}
            />
            <TabStack.Screen
                name="Trades"
                component={TradeScreen}
                options={{
                    tabBarLabel: 'Trades',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="grid" color={"#717da8"} size={26} />
                    ),
                }}
            />
             <TabStack.Screen
                name="Broker"
                component={BrokerScreen}
                options={{
                    tabBarLabel: 'Brokers',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="pluscircle" color={"#717da8"} size={26} />
                    ),
                }}
            />
            <TabStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-sharp" color={"#717da8"} size={26} />
                    ),
                }}
            />
            <TabStack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: 'Alerts',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="bell" color={"#717da8"} size={26} />
                    ),
                }}
            />
        </TabStack.Navigator>
    )
}

export default BottomTabNavigator