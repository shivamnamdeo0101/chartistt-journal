import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet, Linking } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BrokerContext } from '../../providers/BrokerProvider';
import TradeComp from '../../components/TradeComp';
import BrokerComp from '../../components/BrokerComp';
import { BROKER_API } from '../../service/BrokerService';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { USER_API } from '../../service/UserService';
import moment from 'moment';

const NotificationScreen = ({ navigation }) => {
  const user = useSelector(state => state?.userAuth?.user)
  const [list, setlist] = useState([])
  const [loading, setloading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const res = await USER_API.getAllNotifications(user?.token)
      if (res?.status === 200) {
        setlist(res?.data?.data)
        setloading(false)
      }
    }

    fetchData()

  }, [list])

  if (loading) {
    return (
      <Loading />
    )
  }

  const OpenUrl = (item) => {
    if (Linking.canOpenURL(item?.linkUrl)) {
      Linking.openURL(item?.linkUrl)
    } else {
      Alert.alert("Can't open url")
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: "#1e294f", padding: 10, }}>
      <View style={{ padding: 10, marginTop: 0, paddingTop: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>NOTIFICATIONS</Text>
            {/* <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>LIST</Text> */}
          </View>
          {/* <TouchableOpacity onPress={() => toggleModal()}>
            <Ionicons name="add-circle-sharp" color={"#717da8"} size={26} />
          </TouchableOpacity> */}
        </View>
        <ScrollView>
          <View style={{ flex: 1, marginBottom: 100 }}>


            {
              list?.map((item, index) => {
                return (
                  <View key={index} style={{ backgroundColor: "#070f4a", margin: 5, padding: 10, borderRadius: 10 }}>
                    <Text style={styles.timestamp}>{moment(item?.timestamp).fromNow()}</Text>
                    <Text style={styles.title}>{item?.title}</Text>
                    <Text style={styles.text}>{item?.text} </Text>
                    { item?.linkUrl &&  <Text style={{ ...styles.text, backgroundColor: "#975bd9", marginTop: 10, alignSelf: "flex-start", padding: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 10, fontSize: 12 }} onPress={() => OpenUrl(item)}> {item?.linkTitle}</Text>}                 
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default NotificationScreen

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
