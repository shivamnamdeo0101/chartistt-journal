import { View, Text, Image, SafeAreaView, ScrollView,Linking } from 'react-native'
import React,{useState,useEffect} from 'react'
import ChartisttHeader from '../../components/ChartisttHeader'
import { USER_API } from '../../service/UserService'
import { useSelector } from 'react-redux'
import LoadingComp from '../../components/LoadingComp'
import moment from 'moment';

const NotificationScreen = ({ navigation }) => {
  const user = useSelector(state => state?.userAuth?.user)
  const [list, setlist] = useState([])
  const [loading, setloading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const res = await USER_API.getAllNotifications(user?.token)
      if (res) {
        setlist(res)
        setloading(false)
      }
    }

    fetchData()

  }, [list])

  if (loading) {
    return (
      <LoadingComp />
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
    <SafeAreaView style={{ flex: 1 }}>

      <ChartisttHeader title={"NOTIFICATIONS"} />
      <ScrollView>
        <View style={{ padding: 10 }}>
          {
            list?.map((item, index) => {
              return (
                <View key={index} style={{ borderBottomWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 5 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Image source={require("../../assets/clogo.png")} style={{ width: 60, height: 40 }} />
                    <Text style={{ color: "#000", fontFamily: "Intro-Light", fontSize: 12 }}>{moment(item?.timestamp).fromNow()}</Text>
                  </View>
                  <Text style={{ color: "#000", fontFamily: "Intro-Semi-Bold", fontSize: 14, }}>{item?.title}</Text>
                  <Text style={{ color: "#888", fontFamily: "Intro-Semi-Bold", fontSize: 12, }}>{item?.text}</Text>
                  {item?.linkUrl&& <Text onPress={() => OpenUrl(item)} style={{ color: "#000", fontFamily: "Intro-Semi-Bold", textDecorationLine: "underline", color: "#001AFF" }}>{item?.linkTitle}</Text>
                  }


                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationScreen