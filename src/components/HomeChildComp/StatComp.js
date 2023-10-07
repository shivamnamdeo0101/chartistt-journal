import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { profitOrLossForOneTrade } from '../../service/CalcService';
import { Text as TextSVG, Svg } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const StatComp = ({ list }) => {
  let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });

  console.log(JSON.stringify(list, 2, 2), 'list');

  const chartData = list?.map((item) => ({
    name: item?.trade?.tradeName?.length > 10 ? item?.trade?.tradeName?.substring(0, 10) + '...' : item?.trade?.tradeName,
    value: profitOrLossForOneTrade(item?.trade), // Calculate profit or loss here
  }));

  console.log(chartData);
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(160, 219, 209, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '0',
      strokeWidth: '0',
      stroke: '#a0dbd1',
    },
    yAxisLabel: '', // Set yAxisLabel to empty string to hide y-labels
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
        <TouchableOpacity>
          <Text style={{ color: '#000', fontFamily: 'Intro-Bold' }}>STATTISTICS</Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: '100%' }}>
        {list?.length > 0 ? (
          <ScrollView horizontal={true}>
            <LineChart
              data={{
                datasets: [
                  {
                    data: chartData.map((data) => data.value),
                    color: (opacity = 1) => {
                      return opacity >= 0 ? '#43b5a2' : '#faa5be';
                    },
                  },
                ],
              }}
              decorator={() => (
                <View>
                  <Svg>
                    <TextSVG
                      fontFamily="Intro-Semi-Bold"
                      x={tooltipPos.x}
                      y={tooltipPos.y}
                      fill="black"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {tooltipPos.value}₹
                    </TextSVG>
                  </Svg>
                </View>
              )}
              onDataPointClick={(data) => {
                let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;

                isSamePoint
                  ? setTooltipPos((previousState) => ({
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    }))
                  : setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });
              }}
              withHorizontalLabels={true}
              width={Dimensions.get('window').width}
              height={200}
              yAxisSuffix="₹"
              yAxisInterval={1}
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 6,
              }}
            />
          </ScrollView>
        ) : (
          <Text style={{ color: '#000', fontFamily: 'Intro-Bold', marginTop: 10, textAlign: 'center' }}>No Result Found</Text>
        )}
      </View>
    </View>
  );
};

export default StatComp;
