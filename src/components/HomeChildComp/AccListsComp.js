import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'

const AccListsComp = () => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
        <TouchableOpacity>
          <Text style={{ color: "#000", fontFamily: "Intro-Bold" }}>ACCOUNTS</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: "#001AFF", fontFamily: "Intro-Bold", textDecorationLine: "underline" }}>VIEW MORE</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 5 }}>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ marginRight: 5 }}>
              <Image style={{ width: 50, height: 50, borderRadius: 99, borderColor: "#001AFF", borderWidth: 2 ,}} source={{ uri: "https://ik.imagekit.io/lajz2ta7n/Brokers/Fyers.png" }} />
              <Text style={{ color: "#888", fontFamily: "Intro-Semi-Bold", textAlign: "center", fontSize: 12 }}>Add Broker</Text>
            </TouchableOpacity>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11]?.map((item, index) => {
                return (
                  <TouchableOpacity key={index} style={{ marginRight: 5 }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 99, borderColor: "#001AFF", borderWidth: 2}} source={{ uri: "https://ik.imagekit.io/lajz2ta7n/Brokers/Dhan.png" }} />
                    <Text style={{ color: "#888", fontFamily: "Intro-Semi-Bold", textAlign: "center", fontSize: 12 }}>Dhan</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default AccListsComp