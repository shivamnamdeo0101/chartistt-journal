import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext ,useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultRange, setFilterObj, setRangeDateRedux } from '../store/UserSlice'
import { DateModalContext } from '../providers/DateModalProvider'
import { setTradeList } from '../store/DataSlice'
import { TRADE_API } from '../service/TradeService'

const RangeComp = ({ item }) => {
    const defaultRange = useSelector(state => state?.userAuth?.defaultRange)
    const auth = useSelector(state => state?.userAuth)
    const user = useSelector(state => state?.userAuth?.user)

    const data = useSelector(state => state?.data)
    const [loading, setloading] = useState(true)

    const [list, setlist] = useState([])

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useContext(DateModalContext)

    const setDefault = async (item) => {
        dispatch(setDefaultRange(item?.value))
        try {
            if (item?.value === "r") {
                setIsOpen(!isOpen)
                dispatch(setFilterObj({
                    "userId": auth?.user?._id,
                    "filterType": "r",
                    "startDate": auth?.startDate,
                    "endDate": auth?.endDate
                }))

            } else if (item?.value === "d") {
                setIsOpen(!isOpen)
                dispatch(setFilterObj({
                    "userId": auth?.user?._id,
                    "filterType": "d",
                    "date": auth?.customDate
                }))
            } else {
                dispatch(setFilterObj({
                    "userId": auth?.user?._id,
                    "filterType": item?.value,
                }))
            }

            const res = await TRADE_API.getAllTrades(auth?.filterObj, user?.token)
            if (res?.status === 200) {
                setlist(res?.data?.data)
            }

        } catch (e) {
            console.log(e)
        }


    }

    // useEffect(() => {
    //   dispatch(setTradeList(list))
    //   setloading(false)
    // }, [list])
    


    return (
        <TouchableOpacity onPress={() => setDefault(item)} style={{ padding: 10, marginRight: 5, backgroundColor: defaultRange === item?.value ? "#975bd9" : "#1e294f", borderRadius: 4 }}>
            <Text style={{ color: "#ccc", fontWeight: "bold" }}>{item?.title}</Text>
        </TouchableOpacity>
    )
}

export default RangeComp