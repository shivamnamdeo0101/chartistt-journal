import { View, Text, Image } from 'react-native'
import React from 'react'
import BrokerComp from './BrokerComp'

const BrokerListComp = ({list}) => {
    return (
        <View>
            {
                list?.map((item, index) => {
                    return (
                        <BrokerComp item={item} key={index}/>
                    )
                })
            }
        </View>
    )
}

export default BrokerListComp