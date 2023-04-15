import { View, Text, TouchableOpacity, ScrollView, StyleSheet,Linking ,Share} from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { flushAuthData } from '../../store/UserSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';







const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state?.userAuth?.user)

  const dispatch = useDispatch()
  const logoutUser = async () => {

    dispatch(flushAuthData())

    if (GoogleSignin.isSignedIn) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
       title: 'Chartistt Journal',
  message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=com.chartistt_journal', 
  url: 'https://play.google.com/store/apps/details?id=com.chartistt_journal'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1e294f", padding: 10, }}>
      <View style={{ padding: 10, marginTop: 0, paddingTop: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>PROFILE</Text>
            {/* <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>LIST</Text> */}
          </View>
          {/* <TouchableOpacity onPress={() => toggleModal()}>
            <Ionicons name="add-circle-sharp" color={"#717da8"} size={26} />
          </TouchableOpacity> */}
        </View>
        <View>

          

          <View style={{flexDirection:"row",alignItems:"center", backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}> 
            <Feather name="user" color={"#717da8"} size={24} />
            <View style={{marginLeft:10}} >
              <Text style={styles.title}>Name</Text>
              <Text style={styles.text}>{user?.firstName ?   user?.firstName + " " + user?.lastName  : ""} </Text>
            </View>
          </View>

          <View style={{flexDirection:"row",alignItems:"center", backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}> 
            <MaterialIcons name="alternate-email" color={"#717da8"} size={24} />
            <View style={{marginLeft:10}} >
              <Text style={styles.title}>Email</Text>
              <Text style={styles.text}>{user?.email} </Text>
            </View>
          </View>

          <View style={{flexDirection:"row",alignItems:"center", backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}> 
            <MaterialIcons name="local-phone" color={"#717da8"} size={24} />
            <View style={{marginLeft:10}} >
              <Text style={styles.title}>Phone Number</Text>
              <Text style={styles.text}>{user?.phoneNumber} </Text>
            </View>
          </View>


          <TouchableOpacity onPress={()=>onShare()}  style={{flexDirection:"row",alignItems:"center", backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}> 
            <Feather name="share" color={"#717da8"} size={24} />
            <View style={{marginLeft:10}} >
              <Text style={styles.title}>Share This App</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>Linking.openURL("https://docs.google.com/document/d/14degsglcRbzLGAMoI_HmyLEF8zb-cm2Ddt8DQ78JmS8/edit?usp=sharing")} style={{flexDirection:"row",alignItems:"center", backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}> 
            <MaterialIcons name="privacy-tip" color={"#717da8"} size={24} />
            <View style={{marginLeft:10}} >
              <Text style={styles.title}>Privacy Policy</Text>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL('mailto:chartisttjournal@gmail.com?subject=Help and Contact&body=Type your message here...')}  style={{flexDirection:"row",alignItems:"center", backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}> 
            <Feather name="help-circle" color={"#717da8"} size={24} />
            <View style={{marginLeft:10}} >
              <Text style={styles.title}>Help & Contact</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>Linking.openURL("https://docs.google.com/document/d/10ZOHLe2Y7KLf2-LZMxNFfDcKlfcppOKN_d6ctKgV98A/edit?usp=sharing")} style={{flexDirection:"row",alignItems:"center", backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}> 
            <Entypo name="emoji-happy" color={"#717da8"} size={24} />
            <View style={{marginLeft:10}} >
              <Text style={styles.title}>Terms & Conditions</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>Linking.openURL("https://docs.google.com/document/d/1OhCQ8EtoSkCSybkkI7Fw_ZSqh0saW2aAICHsZ6baiUg/edit?usp=sharing")} style={{flexDirection:"row",alignItems:"center", backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}> 
            <Feather name="info" color={"#717da8"} size={24} />
            <View style={{marginLeft:10}} >
              <Text style={styles.title}>About Us</Text>
            </View>
          </TouchableOpacity>
          

          <TouchableOpacity onPress={() => logoutUser()} style={{ backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}>
            <Text style={{ ...styles.title, color: "#f03" }}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: "400",

  },
  title: {
    fontSize: 14,
    color: "#717da8",
    fontWeight: "600"
  },
  timestamp: {
    color: "#ccc",
    fontSize: 10
  }

});

