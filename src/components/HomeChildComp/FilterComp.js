import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { TRADE_API } from '../../service/TradeService';
import { setTradeList } from '../../store/DataSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-native-modal";
import CustomButton from '../CustomButton';

const FilterComp = ({ list, filter, setFilter }) => {

  const user = useSelector((state) => state?.userAuth?.user)
  const dispatch = useDispatch()

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const sortOptions = ["date", "updateOn", "addOn"];
  const [currSortIndex, setcurrSortIndex] = useState(0);

  let currentDate = new Date();
  // Set the time to midnight (00:00:00)
  currentDate.setHours(0, 0, 0, 0);
  // Get the timestamp for the start of the current day
  const todayTimestamp = currentDate.getTime();

  const lastWeekTimestamp = currentDate - 7 * 24 * 60 * 60 * 1000; // 7 days

  const lastMonthTimestamp = (() => {
    const currentDate = new Date(todayTimestamp);
    currentDate.setMonth(currentDate.getMonth() - 1);
    return currentDate.getTime();
  })();

  const lastYearTimestamp = (() => {
    const currentDate = new Date(todayTimestamp);
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    return currentDate.getTime();
  })();

  // console.log("Start of Today:", moment(todayTimestamp).format("LLLL"));
  // console.log("Last Week:", moment(lastWeekTimestamp).format("LLLL"));
  // console.log("Last Month:", moment(lastMonthTimestamp).format("LLLL"));
  // console.log("Last Year:", moment(lastYearTimestamp).format("LLLL"));



  const timeOptions = [
    { "name": "ALL TRADES", "value": "a", "start": 0 },
    { "name": "TODAY", "value": "t", "start": todayTimestamp },
    { "name": "LAST WEEK", "value": "w", "start": lastWeekTimestamp },
    { "name": "LAST MONTH", "value": "m", "start": lastMonthTimestamp },
    { "name": "LAST YEAR", "value": "y", "start": lastYearTimestamp }
  ];
  const [timeIndex, settimeIndex] = useState(0);

  const handleSortClick = async () => {
    toggleModal()
    // Increment the current index and reset to 0 if it exceeds the array length
    // setcurrSortIndex((prevIndex) => (prevIndex + 1) % sortOptions.length);
    // setFilter({ ...filter, "sortBy": sortOptions[currSortIndex] })

    //  const res = await TRADE_API.getAllTrades(filter_temp,user?.token)
    //   console.log(filter_temp)
    //  dispatch(setTradeList(res))

  };

  const handleDuartionClick = async () => {
    toggleModal()
    // Increment the current index and reset to 0 if it exceeds the array length
    // settimeIndex((prevIndex) => (prevIndex + 1) % timeOptions.length);
    // setFilter({ ...filter, "start": timeOptions[timeIndex].name })

    //   const res = await TRADE_API.getAllTrades(filter_temp,user?.token)
    //   console.log(filter_temp)
    //  dispatch(setTradeList(res))
  };

  return (
    <View>


      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        onBackButtonPress={toggleModal}
        swipeDirection="down"
        propagateSwipe
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View>
            <View style={styles.swipeIndicator} />
          </View>

          <View style={{flex:1}}>
            <ScrollView>
            <Text style={{ fontSize: 20, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold", }}>FILTER</Text>


            <Text style={{ fontSize: 16, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold", }}>SORT BY</Text>

            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", padding: 1, margin: 10, marginLeft: 0 }}>

              {sortOptions?.map((item, index) => (
                <TouchableOpacity key={index} style={{ marginRight: 5, width: "30%", borderWidth: 2, borderColor: "#001AFF", borderRadius: 5, padding: 10, backgroundColor: "#fff" }} >
                  <Text style={{ color: "#000", textAlign: "center", textTransform: "uppercase",fontFamily:"Intro-Semi-Bold",fontSize:12 }}>{item}</Text>
                </TouchableOpacity>
              ))}



            </View>

            <Text style={{ fontSize: 16, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold", }}>DURATION</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", width: "100%", padding: 1, margin: 10, marginLeft: 0 }}>

              {timeOptions?.map((item, index) => (
                <TouchableOpacity key={index} style={{ marginRight: 5, marginBottom: 5, borderWidth: 2, borderColor: "#001AFF", borderRadius: 5, padding: 10, backgroundColor: "#fff" }} >
                  <Text style={{ textAlign: "center", color: "#000",fontSize:12, fontFamily:"Intro-Semi-Bold", textAlign: "center" }}>{item?.name}</Text>
                </TouchableOpacity>
              ))}

            </View>

            </ScrollView>
          </View>
              
          <CustomButton 
            text="Apply Filter"
            filled={true}
          />

        </View>
      </Modal>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, marginBottom: 10 }}>
        <TouchableOpacity onPress={() => handleSortClick()}>
          <Text style={{ color: "#001AFF", fontFamily: "Intro-Bold", textDecorationLine: "underline", textTransform: "uppercase" }}>TRADES SORT - {sortOptions[currSortIndex]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDuartionClick()}>
          <Text style={{ color: "#001AFF", fontFamily: "Intro-Bold", textDecorationLine: "underline" }}>{timeOptions[timeIndex]?.name}</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: "#000", fontFamily: "Intro-Semi-Bold", textTransform: "uppercase", marginBottom: 5, fontSize: 12 }}>RESULTS FOUND - {list?.length}</Text>

    </View>

  )
}

export default FilterComp


const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    flex: 1 / 3,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  swipeIndicator: {
    width: 60,
    height: 3,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
  },
  half: {

  },
  errors: { color: 'red', fontFamily: "Intro-Semi-Bold", fontSize: 14 },

  textInputContainer: { marginBottom: 10, },
  textInputLabel: { color: "#000", fontFamily: "Intro-Bold" },
  textInput: { color: "#000", flex: 1, fontFamily: "Intro-Bold" },
  textView: { borderColor: "#f0f3f5", paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }
});