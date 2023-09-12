import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ScrollViewBase } from 'react-native'
import React from 'react'

import { LineChart } from 'react-native-chart-kit';
import { profitOrLossForOneTrade } from '../../service/CalcService';


const screenWidth = Dimensions.get("window").width;

const StatComp = ({ list }) => {


  

  console.log(JSON.stringify(list, 2, 2), "list")

  const chartData = list?.map((item) => ({
    name: item?.trade?.tradeName?.length > 10 ? item?.trade?.tradeName?.substring(0, 10) + "..." : item?.trade?.tradeName,
    value: profitOrLossForOneTrade(item?.trade), // Calculate profit or loss here
  }));

  console.log(chartData)
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
        <TouchableOpacity>
          <Text style={{ color: "#000", fontFamily: "Intro-Bold" }}>STATTISTICS</Text>
        </TouchableOpacity>
      
      </View>

      <View style={{ width: "100%", }}>
        {list?.length > 0 ? <ScrollView horizontal={true}>
          <LineChart
            data={{

              datasets: [
                {
                  data: chartData.map((data) => data.value),
                  color: (opacity = 1) => {
                    // Color the line based on profit (green for profit, red for loss)
                    return opacity >= 0 ? 'green' : 'red';
                  },
                },
              ],
            }}
            width={Dimensions.get("window").width} // Adjust the width as needed
            height={200} // Adjust the height as needed
            yAxisSuffix="₹" // You can customize the y-axis label
            chartConfig={chartConfig}
            style={{
              marginTop:8,
            }}
          />
        </ScrollView>
        
        :
            <Text style={{color:"#000",fontFamily:"Intro-Bold",marginTop:10,textAlign:"center"}}>No Result Found</Text>
        }
      </View>
    </View>
  )
}

export default StatComp