import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { flushAuthData } from '../../store/UserSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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

          <View style={{ backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}>
            <Text style={styles.title}>First Name</Text>
            <Text style={styles.text}>{user?.firstName}</Text>
          </View>

          <View style={{ backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}>
            <Text style={styles.title}>Last Name</Text>
            <Text style={styles.text}>{user?.lastName}</Text>
          </View>

          <View style={{ backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.text}>{user?.email}</Text>
          </View>


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

