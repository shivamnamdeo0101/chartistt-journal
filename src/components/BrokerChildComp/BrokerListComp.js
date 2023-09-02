import { View, Text, Image } from 'react-native'
import React from 'react'
import BrokerComp from './BrokerComp'

const BrokerListComp = () => {
    return (
        <View>
            {
                [1, 2, 3, 4, 5, 6, 7]?.map((item, index) => {
                    return (
                        <BrokerComp item={item} key={index}/>
                    )
                })
            }
        </View>
    )
}

export default BrokerListComp