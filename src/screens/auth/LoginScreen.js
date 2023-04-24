import { View, Text, TouchableOpacity, Image, Alert, PermissionsAndroid } from 'react-native'
import React, { useEffect ,useContext} from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { setAuthSuccess, setUserDetails } from '../../store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API } from '../../service/UserService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import messaging from '@react-native-firebase/messaging';
import PhoneAuthComp from './PhoneAuthScreen';


const LoginScreen = ({ navigation }) => {
  const user = useSelector(state => state?.userAuth)





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

  checkAndroidPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permission);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
};

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    checkAndroidPermission()
    subscribe()
  }, [])
  

  const subscribe = async () => {
    await requestUserPermission()
    await messaging()
      .subscribeToTopic('app')
      .then(() => {
        console.log('Subscribed to topic');
      })
      .catch(error => {
        console.log('Error subscribing to topic:', error);
      });
  }

  const googleLogin = async () => {

    // if(GoogleSignin.isSignedIn){
    //   GoogleSignin.signOut();
    //   GoogleSignin.revokeAccess()
    // }

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const payload = {
        "email": userInfo?.user?.email,
        "firstName": userInfo?.user?.givenName,
        "lastName": userInfo?.user?.familyName,

      }

      const login = await USER_API.userLogin(payload)

      console.log(login?.data?.data)
      
      if (login?.status === 200) {
        dispatch(setUserDetails(login?.data?.data))
        dispatch(setAuthSuccess())
      }


     
      

      // Alert.alert(JSON.stringify("User", user))

    } catch (error) {
      console.log("error", error)
      // Alert.alert(JSON.stringify)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1e294f", justifyContent: "center", alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}>CHARTISTT</Text>
          <Text style={{ marginLeft: 4, fontWeight: "500", color: "#975bd9", fontSize: 16 }}>JOURNAL</Text>
        </View>
      </View>
      {/* <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#070f4a", padding: 10, borderRadius: 10 }} onPress={() => navigation.navigate("PhoneAuth")}>
          <Image source={require("../../assets/google.png")} style={{ width: 30, height: 30 }} />
          <Text style={{ color: "#ccc", fontSize: 18, marginLeft: 10, fontWeight: "500" }}>Continue with phone</Text>
        </TouchableOpacity> */}
      {/* <View style={{ margin: 10 }}>


        <Text style={{ color: "#fff" }}>OR</Text>
      </View> */}
      <View>

        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#070f4a", padding: 10, borderRadius: 10 }} onPress={() => googleLogin()}>
          <Image source={require("../../assets/google.png")} style={{ width: 30, height: 30 }} />
          <Text style={{ color: "#ccc", fontSize: 18, marginLeft: 10, fontWeight: "500" }}>Continue with google</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default LoginScreen