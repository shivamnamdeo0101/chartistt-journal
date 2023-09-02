import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'

const FilterComp = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10,marginBottom:10 }}>
        <TouchableOpacity>
          <Text style={{ color: "#000", fontFamily: "Intro-Bold" }}>YOUR TRADES</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: "#001AFF", fontFamily: "Intro-Bold", textDecorationLine: "underline" }}>LAST 24H</Text>
        </TouchableOpacity>
      </View>

  )
}

export default FilterComp