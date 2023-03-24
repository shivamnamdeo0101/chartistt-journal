import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import RangeComp from './RangeComp'

const FilterComp = () => {

    
  const rangeList = [
    {
      "value": "a",
      "title":"All"
    },
    {
      "value": "t",
      "title": "Today"
    },
    {
      "value": "y",
      "title": "Yesterday"
    },
    {
      "value": "1M",
      "title": "1M"
    },
    {
      "value": "3M",
      "title": "3M"
    },
    {
      "value": "6M",
      "title": "6M"
    },
    {
      "value": "1Y",
      "title": "1Y"
    }
    // {
    //   "value": "d",
    //   "title": "Custom Date"
    // },
    // {
    //   "value": "r",
    //   "title": "Custom Range"
    // }
  ]

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <ScrollView horizontal={true}>
                {
                    rangeList?.map((item, index) => {
                        return (
                            <RangeComp key={index} item={item} />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default FilterComp