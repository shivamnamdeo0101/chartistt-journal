import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { setAuthSuccess, setUserDetails } from '../../store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API } from '../../service/UserService';

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
      dispatch(setUserDetails(login?.data?.data))
      dispatch(setAuthSuccess())
      console.log("User", user)

    } catch (error) {
      console.log(error)
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
    <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={() => googleLogin()}>
        <Text style={{ color: "#000" }}>Continue With Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen