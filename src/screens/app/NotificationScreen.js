import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import ChartisttHeader from '../../components/ChartisttHeader'
import LinearGradient from 'react-native-linear-gradient'

const NotificationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ChartisttHeader title={"NOTIFICATIONS"} />
      <ScrollView>
        <View style={{ padding: 10 }}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item, index) => {
              return (
                <View key={index} style={{borderBottomWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 5}}>
                  <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <Image source={require("../../assets/clogo.png")} style={{ width: 60, height: 40 }} />
                    <Text style={{ color: "#000", fontFamily: "Intro-Light", fontSize: 12 }}>2 days ago</Text>
                  </View>
                  <Text style={{ color: "#000", fontFamily: "Intro-Semi-Bold", fontSize: 14, }}>Discover 33 Notification Screen designs on Dribbble.
                    Minimal Onboarding app Ui Design app design app designer app onboarding blue blue theme clean ui.</Text>
{            index % 2 ===0 &&      <Text style={{ color: "#000", fontFamily: "Intro-Semi-Bold", textDecorationLine: "underline", color: "#001AFF" }}>Open Link</Text>
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