import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity ,Linking,Share,StyleSheet} from 'react-native'
import React from 'react'
import ChartisttHeader from '../../components/ChartisttHeader'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import UpdateProfileModal from '../../components/BrokerChildComp/UpdateProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { flushAuthUser } from '../../store/UserSlice';
import ResetPassModal from '../../components/ResetPassModal';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { flushAuthData } from '../../store/DataSlice';


const ProfileScreen = () => {

  const user = useSelector((state)=>state?.userAuth?.user)

  const dispatch = useDispatch()

  const logoutUser = async ()=>{
    try{
      dispatch(flushAuthUser())
      dispatch(flushAuthData())
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
    }catch(e){
      console.log(e)
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Chartistt Journal',
        message: 'You can install the Chartistt Journal app by clicking on the link below , AppLink :https://play.google.com/store/apps/details?id=com.thechartisttjournal',
        url: 'https://play.google.com/store/apps/details?id=com.thechartisttjournal'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ScrollView>
        <ChartisttHeader title={"PROFILE"} />
        <Image source={require("../../assets/cclogo.jpg")} style={{ width: 80, height: 80, alignSelf: "center", margin: 10, borderRadius: 99 }} />
        <Text style={{ color: "#000", fontSize: 16, fontFamily: "Intro-Bold", textAlign: "center" }}>{user?.fullName }</Text>
       


        <View style={{ padding: 16}}>
        <Text style={{ color: "#888", fontSize: 16, fontFamily: "Intro-Semi-Bold",paddingBottom:10,borderBottomWidth:1,borderColor:"#ccc",marginBottom:8 }}>General Settings</Text>

          <UpdateProfileModal />

          <TouchableOpacity onPress={() => Linking.openURL("https://docs.google.com/document/d/1OhCQ8EtoSkCSybkkI7Fw_ZSqh0saW2aAICHsZ6baiUg/edit?usp=sharing")} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <SimpleLineIcons
                name={"info"}
                size={16}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={styles.text}>About</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          
          <ResetPassModal />

          <TouchableOpacity onPress={() => Linking.openURL("https://docs.google.com/document/d/10ZOHLe2Y7KLf2-LZMxNFfDcKlfcppOKN_d6ctKgV98A/edit?usp=sharing")} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <MaterialCommunityIcons
                name={"read"}
                size={16}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={styles.text}>Terms & Conditions</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://docs.google.com/document/d/14degsglcRbzLGAMoI_HmyLEF8zb-cm2Ddt8DQ78JmS8/edit?usp=sharing")} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <MaterialCommunityIcons
                name={"police-badge-outline"}
                size={16}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={styles.text}>Privacy Policy</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:chartisttjournal@gmail.com?subject=Help and Contact&body=Type your message here...')} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <Feather
                name={"help-circle"}
                size={16}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={styles.text}>Help & Contact</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL("https://play.google.com/store/apps/details?id=com.thechartisttjournal")} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <MaterialIcons
                name={"star-rate"}
                size={16}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={styles.text}>Rate This App</Text>
            </View>
            <SimpleLineIcons
              name={"arrow-right"}
              size={16}
              color="#888"

            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onShare()} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <SimpleLineIcons
                name={"share-alt"}
                size={16}
                color="#888"
                style={{backgroundColor:"#fff",padding:10,borderRadius:99}}
              />
              <Text style={styles.text}>Share This App</Text>
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
                size={16}
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

const styles = StyleSheet.create({
  text:{fontFamily:"Intro-Semi-Bold",color:"#000",fontSize:14,marginLeft:10}
});