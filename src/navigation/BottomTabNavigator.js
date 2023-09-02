import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AppNavigator from "./AppNavigator"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Text,StyleSheet} from "react-native";

import TradeScreen from "../screens/app/TradeScreen";
import ProfileScreen from "../screens/app/ProfileScreen";
import NotificationScreen from "../screens/app/NotificationScreen";
import BrokerScreen from "../screens/app/BrokerScreen";
import OverViewScreen from "../screens/app/OverViewScreen";
import HomeScreen from "../screens/app/HomeScreen";

const TabStack = createMaterialBottomTabNavigator()

const BottomTabNavigator = ({ navigation }) => {

    return (
        <TabStack.Navigator
            initialRouteName="Feed"
            activeColor="#001AFF"
            tabBarActiveBackgroundColor="#fff"
            inactiveColor="#888"
            barStyle={{ backgroundColor: '#fff',padding:0 }}
            
        >
            <TabStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: <Text style={styles.tabrBarFonts}> Home</Text>,
                    
                    tabBarIcon: ({ color,focused }) => (
                        <MaterialCommunityIcons name="home" color={color}  size={26} />
                    ),
                    
                }}
            />
            <TabStack.Screen
                name="Overview"
                component={OverViewScreen}
                options={{
                    tabBarLabel: <Text style={styles.tabrBarFonts}>Overview</Text>,
                    tabBarIcon: ({ color,focused }) => (
                        <Entypo name="grid" color={color}  size={26} />
                    ),
                }}
            />
             <TabStack.Screen
                name="Broker"
                component={BrokerScreen}
                options={{
                    tabBarLabel: <Text style={styles.tabrBarFonts}>Brokers</Text>,
                    tabBarIcon: ({ color,focused }) => (
                        <AntDesign name="pluscircle" color={color} size={26} />
                    ),
                }}
            />
            <TabStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: <Text style={styles.tabrBarFonts}>Profile</Text>,
                    tabBarIcon: ({ color,focused }) => (
                        <Ionicons name="person-sharp" color={color} size={26} />
                    ),
                }}
            />
            <TabStack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: <Text style={styles.tabrBarFonts}>Alerts</Text>,
                    tabBarIcon: ({ color,focused }) => (
                        <Entypo name="bell" color={color} size={26} />
                    ),
                }}
            />
        </TabStack.Navigator>
    )
}

export default BottomTabNavigator



const styles = StyleSheet.create({
    tabrBarFonts:{fontFamily:"Intro-Bold",fontSize:14}

});
  