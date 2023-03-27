import { View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import RangeComp from './RangeComp'
import { useSelector } from 'react-redux'

const FilterComp = ({ value, setValue }) => {

  const rangeList = [
    {
      "value": "a",
      "title": "All"
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

  const setDefault = (item)=>{
    setValue({...value,
      "filterType":item?.value
    })
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
      <ScrollView horizontal={true}>
        {
          rangeList?.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => setDefault(item)} style={{ padding: 10, marginRight: 5, backgroundColor: value?.filterType === item?.value ? "#975bd9" : "#1e294f", borderRadius: 4 }}>
                <Text style={{ color: "#ccc", fontWeight: "bold" }}>{item?.title}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default FilterComp