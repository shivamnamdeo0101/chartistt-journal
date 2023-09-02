import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ScrollViewBase } from 'react-native'
import React from 'react'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const StatComp = () => {

  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        data: [-20, -45, 28, 80, 99]
      }
    ]
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
        <TouchableOpacity>
          <Text style={{ color: "#000", fontFamily: "Intro-Bold" }}>STATTISTICS</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: "#001AFF", fontFamily: "Intro-Bold", textDecorationLine: "underline" }}>VIEW MORE</Text>
        </TouchableOpacity>
      </View>

      <View style={{width:"100%",}}>
        <ScrollView horizontal={true}>
        <BarChart
  style={{}}
  data={data}
  width={screenWidth}
  height={250}
  yAxisLabel="$"
  chartConfig={{
    padding:10,
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
      padding:10
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }}
  verticalLabelRotation={30}
/></ScrollView>
              </View>
    </View>
  )
}

export default StatComp