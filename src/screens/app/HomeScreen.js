import { View, Text, Image ,StyleSheet,ScrollView} from 'react-native'
import React, { useEffect, useContext } from 'react'
import { TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { flushAuthData } from '../../store/UserSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { BrokerContext } from '../../providers/BrokerProvider';
import { TRADE_API } from '../../service/TradeService';
import TradeComp from '../../components/TradeComp';

const HomeScreen = ({ navigation }) => {

  const [isOpen, setIsOpen] = useContext(BrokerContext)

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };



  const dispatch = useDispatch()
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '1070846552778-6fefn05h8q6q7eeuac0b9agv2b48rrb3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, [])


  const logoutUser = async () => {
    try {

      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      dispatch(flushAuthData())

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#1e294f" }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
        <AntDesign name="apple1" color={"#717da8"} size={26} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>CHARTISTT</Text>
          <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>JOURNAL</Text>
        </View>

        <TouchableOpacity onPress={() => toggleModal()}>
          <Entypo name="download" color={"#717da8"} size={26} />
        </TouchableOpacity>

      </View>


      <View style={{ backgroundColor: "#070f4a", flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 14, margin: 14, borderRadius: 14 }}>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Entypo name="wallet" color={"#717da8"} size={26} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "#fff" }}>Total Fund</Text>
            <Text style={{ color: "#ccc" }}>20K</Text>
          </View>
        </View>

        <View style={{ borderRightColor: "#ccc", borderRightWidth: 1, height: 20, width: 3 }}>

        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <FontAwesome5 name="money-check-alt" color={"#717da8"} size={26} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "#fff" }}>Total Return</Text>
            <Text style={{ color: "#ccc" }}>25K</Text>
          </View>
        </View>

      </View>


      <View style={{ margin: 10, padding: 10, marginTop: 0 }}>
       <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:10}}>
       <View style={{ flexDirection: "row", alignItems: "center" ,marginBottom:10}}>
          <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>YOUR</Text>
          <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>TRADES</Text>
        </View>
        <Text style={{color:"#717da8"}}>View More</Text>
       </View>


        <ScrollView>
        {
          [1,2,3].map((item,index)=>{
            return(
              <View key={index}>
                <TradeComp />
              </View>
            )
          })
        }
        </ScrollView>












      </View>



    </View>
  )
}

export default HomeScreen


