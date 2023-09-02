import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ChartisttHeader from '../../components/ChartisttHeader'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UpdateProfileModal from '../../components/BrokerChildComp/UpdateProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { flushAuthUser } from '../../store/UserSlice';


const ProfileScreen = () => {

  const user = useSelector((state)=>state?.userAuth?.user)

  const dispatch = useDispatch()

  const logoutUser = ()=>{
    try{
      dispatch(dispatch(flushAuthUser()))
    }catch(e){
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ScrollView>
        <ChartisttHeader title={"PROFILE"} />
        <Image source={require("../../assets/cclogo.jpg")} style={{ width: 80, height: 80, alignSelf: "center", margin: 10, borderRadius: 99 }} />
        <Text style={{ color: "#000", fontSize: 20, fontFamily: "Intro-Bold", textAlign: "center" }}>{user?.fullName}</Text>
       


        <View style={{ padding: 16}}>
        <Text style={{ color: "#888", fontSize: 16, fontFamily: "Intro-Semi-Bold",paddingBottom:10,borderBottomWidth:1,borderColor:"#ccc",marginBottom:8 }}>General Settings</Text>

          <UpdateProfileModal />

          <TouchableOpacity style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <SimpleLineIcons
                name={"info"}
                size={20}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",fontSize:16,marginLeft:10}}>About</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <SimpleLineIcons
                name={"lock-open"}
                size={20}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",fontSize:16,marginLeft:10}}>Reset Password</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <MaterialCommunityIcons
                name={"read"}
                size={20}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",fontSize:16,marginLeft:10}}>Terms & Conditions</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <MaterialCommunityIcons
                name={"police-badge-outline"}
                size={20}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",fontSize:16,marginLeft:10}}>Privacy Policy</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <MaterialIcons
                name={"star-rate"}
                size={20}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",fontSize:16,marginLeft:10}}>Rate This App</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <SimpleLineIcons
                name={"share-alt"}
                size={20}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={{fontFamily:"Intro-Semi-Bold",color:"#000",fontSize:16,marginLeft:10}}>Share This App</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>logoutUser()} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <SimpleLineIcons
                name={"logout"}
                size={20}
                color="#f03"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={{fontFamily:"Intro-Semi-Bold",color:"#f00",fontSize:16,marginLeft:10}}>LOGOUT</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen